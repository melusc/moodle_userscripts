type GetContentsModuleContentsNonFile = {
  author: null;
  filename: string;
  filepath: null | string;
  filesize: 0;
  fileurl: string;
  license: null;
  sortorder: null | 0 | 1;
  timecreated: null;
  timemodified: number;
  type: string;
  userid: null;
};

type GetContentsModuleContentsIsFile = {
  author: null | string;
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  isexternalfile: false;
  license: null | string;
  mimetype: string;
  sortorder: 0 | 1;
  timecreated: number;
  timemodified: number;
  type: string;
  userid: number;
};

type GetContentsModuleContentsIsFileSanitized = Omit<GetContentsModuleContentsIsFile, 'filepath'> & {
  filepath: Array<string>;
}

type GetContentsModuleContents =
  | GetContentsModuleContentsNonFile
  | GetContentsModuleContentsIsFile;

type GetContentsModule = (
  | {
    contents: Array<GetContentsModuleContents>;
    contentsinfo: unknown;
    url: string;
  }
  | {
    description: string;
  }
) & {
  afterlink: null; // Could only find null here, I don't use it anyway
  completion: number;
  customdata: string;
  id: number;
  indent: number;
  instance: number;
  modicon: string;
  modname: string;
  modplural: string;
  name: string;
  noviewlink: boolean;
  onclick: string;
  uservisible: boolean;
  visible: number;
  visibleoncoursepage: number;
};

type GetContentsResponse = {
  hiddenbynumsections: number;
  id: number;
  modules: Array<GetContentsModule>;
  name: string;
  section: number;
  summary: string;
  summaryformat: number;
  uservisible: boolean;
  visible: number;
};

type GetContentsResponseFailed = {
  errorcode: string;
  exception: string;
  message: string;
};

export {
  GetContentsResponse,
  GetContentsResponseFailed,
  GetContentsModuleContents,
  GetContentsModuleContentsIsFile,
  GetContentsModuleContentsNonFile,
  GetContentsModuleContentsIsFileSanitized,
};
