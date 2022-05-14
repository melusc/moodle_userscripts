export type ValidIconObject =
	| {
			rawXML: string;
	  }
	| {
			dataURI: string;
	  };

export type Values = Record<
	string,
	| {
			rawXML: string;
	  }
	| {
			dataURI: string;
	  }
>;

export type Pointers = Record<string, string>;

export type Icons = {
	pointers: Pointers;
	values: Values;
};
