type Values = Record<
	string,
	| {
			rawXML: string;
	  }
	| {
			rawByteString: string;
			mediaType: string;
	  }
>;

type Pointers = Record<string, string>;

export {Values, Pointers};
