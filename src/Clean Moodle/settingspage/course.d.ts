export type Course = Readonly<{
	courseName: string;
	courseId: number;
	value: string | false | undefined;
}>;
