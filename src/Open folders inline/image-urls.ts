const imageURLs: Record<string, string> = {
	'application/pdf': 'pdf-256',
	'application/zip': 'archive-256',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
		'document-256',
	'application/msword': 'document-256',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
		'spreadsheet-256',
	'application/vnd.ms-excel': 'spreadsheet-256',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation':
		'powerpoint-256',
	'application/vnd.ms-powerpoint': 'powerpoint-256',

	'text/plain': 'sourcecode-256',

	'audio/mp3': 'mp3-256',
	'audio/mp4': 'mp3-256',
	'video/quicktime': 'quicktime-256',
	'video/mp4': 'mpeg-256',

	/* I'm copying moodle by using these
			urls for the various mimetypes,
			I found all these in moodle and
			got them from there */
};

/*
	I could append &preview=1 to the url and the end-effect would be (almost) the same
	but by doing it this way, the browser can cache the images and
	doesn't have to download each file individually, which would be much slower
*/

export const getImageURL = (
	mimetype: string | undefined,
	defaultValue: string,
) => {
	if (mimetype === undefined) {
		return defaultValue;
	}

	const icon = imageURLs[mimetype];
	if (icon) {
		return `/theme/image.php/classic/core/1601902087/f/${icon}`;
	}

	return defaultValue;
};
