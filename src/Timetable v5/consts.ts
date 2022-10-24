export const notificationIconUrl = 'https://i.imgur.com/ZtPH8v7.png';

export const enum Lang {
	noSchool = 'No school',
	afterSchool = 'No school anymore',
	freeLesson = 'Free lesson',
	weekend = 'Weekend',
	holiday = 'Holiday',

	emptyBeforeAnchor = "Today's timetable is empty, you can update it ",
	emptyInAnchor = 'here',

	now = 'Now',
	next = 'Next',
}

export const enum TimetableStates {
	before,
	after,
	during,
	empty,
	loading,
	holiday,
	weekend,
}
