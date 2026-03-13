export type GeneralChangeEventType = (
	event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
	name?: string,
	value?: string | number | boolean | (string | number)[],
) => void;
