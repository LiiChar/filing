import { cambSpeechTTs } from './api/cambSpeech';

type ttsArg = {
	text: string;
	language: 'en' | 'ru';
};

export const tts = async ({ language, text }: ttsArg) => {
	const url = await cambSpeechTTs({ language, text });
	return url;
};
