export const parseTimeToString = (timeInMinutes: number): string => {
	const minutes = timeInMinutes % 60;
	const hours = Math.floor(timeInMinutes / 60);

	const paddedMinutes = `0${minutes}`.slice(-2);

	return `${hours}:${paddedMinutes}`;
};

// ((0 - 19) or (20 - 23)):(00-59)
const timeValidationRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export const parseStringToTime = (string: string): number | false => {
	string = string.trim();

	if (!timeValidationRegex.test(string)) {
		return false;
	}

	const [hours, minutes] = string.split(':');

	const hoursInMinutes = Number(hours) * 60;

	return hoursInMinutes + Number(minutes);
};
