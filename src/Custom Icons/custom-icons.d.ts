/**
 * @deprecated Use plain dataURI instead
 * It is deprecated because it makes everything
 * more complicated and it is more error-prone
 * It can't handle characters with unicode code value
 * larger than 256 (2^8)
 * There are solutions (like simply using fetch) but
 * there is no reason to not just use the dataURI like that
 */
type DeprecatedValue = {
	rawByteString: string;
	mediaType: string;
};

type Values = Record<
	string,
	| {
			rawXML: string;
	  }
	| DeprecatedValue
	| {
			dataURI: string;
	  }
>;

type Pointers = Record<string, string>;

export {Values, Pointers};
