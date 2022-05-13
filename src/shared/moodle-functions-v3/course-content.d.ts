export type CompletionDataDetails = {
	rulename: string;
	rulevalue: {
		status: number;
		description: string;
	};
};

export type CompletionData = {
	state: number;
	timecompleted: number;
	// eslint-disable-next-line @typescript-eslint/ban-types
	overrideby: null;
	valueused: boolean;
	hascompletion: boolean;
	isautomatic: boolean;
	istrackeduser: boolean;
	uservisible: boolean;
	details: CompletionDataDetails[];
};

export type ContentsInfo = {
	filescount: number;
	filessize: number;
	lastmodified: number;
	mimetypes: string[];
	repositorytype?: string;
};

type ContentsBase = {
	type: string;
	filename: string;
	filesize: number;
	fileurl: string;
	timemodified: number;
};

type ModuleBase = {
	id: number;
	name: string;
	instance: number;
	contextid: number;
	visible: number;
	uservisible: boolean;
	visibleoncoursepage: number;
	modicon: string;
	modplural: string;
	indent: number;
	onclick: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	afterlink: null;
	customdata: string;
	noviewlink: boolean;
	completion: number;
	dates: Array<{
		label: 'Opened:' | 'Closed:' | 'Due:';
		timestamp: number;
	}>;
};

export type ResourceModule = ModuleBase & {
	modname: 'resource';

	url: string;
	contents: Array<
		ContentsBase & {
			filepath: string;
			timecreated: number;
			sortorder: number;
			mimetype: string;
			isexternalfile: boolean;
			userid: number;
			// eslint-disable-next-line @typescript-eslint/ban-types
			author: null | string;
			// eslint-disable-next-line @typescript-eslint/ban-types
			license: null | string;
		}
	>;
	contentsinfo: ContentsInfo;
	completiondata?: CompletionData;
	description?: string;
};
export type ForumModule = ModuleBase & {
	modname: 'forum';

	url: string;
	completiondata?: CompletionData;
};
export type FolderModule = ModuleBase & {
	modname: 'folder';

	url?: string;
	contents: Array<
		ContentsBase & {
			filepath: string;
			timecreated: number;
			sortorder: number;
			mimetype: string;
			isexternalfile: boolean;
			userid: number;
			// eslint-disable-next-line @typescript-eslint/ban-types
			author: null | string;
			// eslint-disable-next-line @typescript-eslint/ban-types
			license: null | string;
		}
	>;
	contentsinfo: ContentsInfo;
	completiondata?: CompletionData;
	description?: string;
};
export type AssignModule = ModuleBase & {
	modname: 'assign';

	url: string;
	completiondata?: CompletionData;
	description?: string;
};
export type UrlModule = ModuleBase & {
	modname: 'url';

	url: string;
	contents: Array<
		ContentsBase & {
			// eslint-disable-next-line @typescript-eslint/ban-types
			filepath: null;
			// eslint-disable-next-line @typescript-eslint/ban-types
			timecreated: null;
			// eslint-disable-next-line @typescript-eslint/ban-types
			sortorder: null;
			// eslint-disable-next-line @typescript-eslint/ban-types
			userid: null;
			// eslint-disable-next-line @typescript-eslint/ban-types
			author: null;
			// eslint-disable-next-line @typescript-eslint/ban-types
			license: null;
		}
	>;
	contentsinfo: ContentsInfo;
	completiondata?: CompletionData;
	description?: string;
};
export type LabelModule = ModuleBase & {
	modname: 'label';

	description: string;
	completiondata?: CompletionData;
};
export type PageModule = ModuleBase & {
	modname: 'page';

	url: string;
	contents: Array<
		ContentsBase & {
			filepath: string;
			// eslint-disable-next-line @typescript-eslint/ban-types
			timecreated: null | number;
			sortorder: number;
			// eslint-disable-next-line @typescript-eslint/ban-types
			userid: null | number;
			// eslint-disable-next-line @typescript-eslint/ban-types
			author: null;
			// eslint-disable-next-line @typescript-eslint/ban-types
			license: null | string;
			mimetype?: string;
			isexternalfile?: boolean;
		}
	>;
	contentsinfo: ContentsInfo;
};
export type FeedbackModule = ModuleBase & {
	modname: 'feedback';

	url: string;
	description?: string;
	completiondata?: CompletionData;
};

export type Module =
	| ResourceModule
	| ForumModule
	| FolderModule
	| AssignModule
	| UrlModule
	| LabelModule
	| PageModule
	| FeedbackModule;

export type CourseContent = {
	id: number;
	name: string;
	visible: number;
	summary: string;
	summaryformat: number;
	section: number;
	hiddenbynumsections: number;
	uservisible: boolean;
	modules: Module[];
};
