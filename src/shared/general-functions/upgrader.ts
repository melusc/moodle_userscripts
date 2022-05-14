export const cleanAuthStorage = () => {
	GM_deleteValue('lastValidatedToken');
	GM_deleteValue('password');
};

export type Version = readonly [number, number, number];

export const parseVersion = (version: string): Version => {
	if (!/^\d+\.\d+\.\d+$/.test(version)) {
		throw new Error(`Invalid version: ${version}.`);
	}

	const [major, minor, patch] = version.split('.').map(Number) as [
		number,
		number,
		number,
	];

	return [major, minor, patch] as const;
};

const compareSingle = (a: number, b: number) => a - b;
export const compare = (a: Version, b: Version) =>
	compareSingle(a[0], b[0])
	|| compareSingle(a[1], b[1])
	|| compareSingle(a[2], b[2]);

const key = 'lastUpgraded';
const upgrader = (versions: Record<string, () => void>) => {
	const rawCurrentVersion = GM_getValue<string | undefined>(key);
	// Only version that can be negativ.
	// The default is therefore always the smallest and will trigger all upgraders
	// Theoretically, 0.0.0 won't need an upgrade yet, since it is the first valid version, but doesn't matter
	const currentVersion
		= rawCurrentVersion === undefined
			? ([-1, -1, -1] as const)
			: parseVersion(rawCurrentVersion);

	// Order by version, with lowest version first
	const upgraders = Object.entries(versions)
		.map(([version, cb]) => [parseVersion(version), cb] as const)
		.sort(([a], [b]) => compare(a, b));

	// Always call the lowest versions first
	// but only those that have never been called before (i.e. greater than currentVersion)
	for (const [version, cb] of upgraders) {
		if (compare(currentVersion, version) < 0) {
			cb();
		}
	}

	GM_setValue(key, GM_info.script.version);
};

const upgraderSilent = (versions: Record<string, () => void>) => {
	try {
		upgrader(versions);
	} catch (error: unknown) {
		console.error('Upgrading threw %o. Failing silently.', error);
	}
};

export {upgraderSilent as upgrader};
