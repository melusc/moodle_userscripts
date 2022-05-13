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

const compareSingle = (a: number, b: number) => (a > b ? 1 : (a < b ? -1 : 0));
export const compare = (a: Version, b: Version) =>
	compareSingle(a[0], b[0])
	|| compareSingle(a[1], b[1])
	|| compareSingle(a[2], b[2]);

const upgrader = (versions: Record<string, () => void>) => {
	const currentVersion = parseVersion(GM_info.version);

	const upgraders = Object.entries(versions)
		.map(([version, cb]) => [parseVersion(version), cb] as const)
		.sort(([a], [b]) => compare(a, b));

	for (const [version, cb] of upgraders) {
		if (compare(currentVersion, version) === -1) {
			break;
		}

		cb();
	}
};

const upgraderSilent = (versions: Record<string, () => void>) => {
	try {
		upgrader(versions);
	} catch (error: unknown) {
		console.error('Upgrading threw %o. Failing silently.', error);
	}
};

export {upgraderSilent as upgrader};
