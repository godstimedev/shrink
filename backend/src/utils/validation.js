export const isValidUrl = (string) => {
	try {
		new URL(string);
		return true;
	} catch (_) {
		return false;
	}
};

export const isValidShortCode = (code) => {
	// Short code should be alphanumeric, 6-10 characters
	return /^[a-zA-Z0-9]{6,10}$/.test(code);
};
