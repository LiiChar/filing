export function getFormattedDate(
	format: string,
	date: Date = new Date()
): string {
	const day = date.getDate();
	const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
	const year = date.getFullYear();
	const hours24 = date.getHours();
	const hours12 = hours24 % 12 || 12; // Преобразуем в 12-часовой формат
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const ampm = hours24 >= 12 ? 'PM' : 'AM';

	const formattedDate = format
		.replace('d', String(day).padStart(2, '0')) // День (двузначный)
		.replace('m', String(month).padStart(2, '0')) // Месяц (двузначный)
		.replace('y', String(year)) // Год
		.replace('h', String(hours24).padStart(2, '0')) // Часы (24-часовой формат)
		.replace('i', String(minutes).padStart(2, '0')) // Минуты
		.replace('s', String(seconds).padStart(2, '0')) // Секунды
		.replace('a', ampm); // AM/PM

	return formattedDate;
}
