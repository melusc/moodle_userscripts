type Errored = {
	exception: string;
	errorcode: string;
	message: string;
};

type Contents = {
	// ...
	filename: string;
	filepath: string;
	fileurl: string;
	timemodified: number;
	// ...
};

type Module = {
	// ...
	url: string;
	name: string;
	modname: string;
	contents?: Contents[];
	// ...
};

type Ok = Array<{
	// ...
	name: string;
	modules: Module[];
	// ...
}>;

export type Response = Ok | Errored;
