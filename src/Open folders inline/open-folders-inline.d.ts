import {Except} from 'type-fest';

// It is not empty, but I don't use it
type ContentNotFile = {}; // eslint-disable-line @typescript-eslint/ban-types
type ContentIsFile = {
	// ...
	filename: string;
	filepath: string;
	fileurl: string;
	isexternalfile: false;
	mimetype: string;
	// ...
};

type SanitizedContentFile = Except<ContentIsFile, 'filepath' | 'fileurl'> & {
	filePath: string[]; // Different case than ContentIsFile, to indicate that it gets modified
	fileUrl: string; // ^
	imgPath: string;
};

type Module = (
	| {
			contents: Array<ContentNotFile | ContentIsFile>;
			contentsinfo: unknown;
			url: string;
	  }
	| {
			description: string;
	  }
) & {
	// ...
	id: number;
	// ...
};

type ContentsResponse = {
	// ...
	id: number;
	modules: Module[];
	// ...
};

type GetContentsResponseFailed = {
	errorcode: string;
	exception: string;
	message: string;
};

export {ContentsResponse, GetContentsResponseFailed, SanitizedContentFile};
