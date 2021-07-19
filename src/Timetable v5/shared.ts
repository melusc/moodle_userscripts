export const parseTimeToString = (timeInMinutes: number): string => {
	const minutes = timeInMinutes % 60;
	const hours = Math.floor(timeInMinutes / 60);

	const paddedMinutes = `0${minutes}`.slice(-2);

	return `${hours}:${paddedMinutes}`;
};

const timeValidationRegex = new RegExp(
	'^([0-1]?[0-9]' // 0 - 19 hours
		+ '|2[0-3])' // Or 20 - 23 hours
		+ ':([0-5][0-9])$', // 00 - 59 minutes
);

export const parseStringToTime = (string: string): number | false => {
	string = string.trim();

	if (!timeValidationRegex.test(string)) {
		return false;
	}

	const [hours, minutes] = string.split(':');

	const hoursInMinutes = Number(hours) * 60;

	return hoursInMinutes + Number(minutes);
};
