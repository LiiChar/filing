export const getSrc = (src: string) => {
	const path = src.split('/public/')[1];

	if (path) {
		return `/${path}`;
	}
	return src;
};
