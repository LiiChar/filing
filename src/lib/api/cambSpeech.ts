'use server';

import * as fs from 'fs';
import * as path from 'path';

const secret_key = 'bf2beffd-4a05-4445-a88a-09970e79a775';

const LanguageRec = {
	en: 1,
	ru: 2,
};

const Voices = [
	{
		id: 20299,
		voice_name: 'Gary',
		gender: 1,
		age: 43,
	},
	{
		id: 20298,
		voice_name: 'Daniel',
		gender: 1,
		age: 33,
	},
	{
		id: 20303,
		voice_name: 'Arielle',
		gender: 2,
		age: 28,
	},
	{
		id: 20305,
		voice_name: 'Alice',
		gender: 2,
		age: 65,
	},
];

export const cambSpeechTTs = async ({
	text,
	language,
	outputFilePath = 'output.mp3', // Путь для сохранения файла
}: {
	text: string;
	language: 'en' | 'ru';
	outputFilePath?: string; // Опциональный параметр для указания пути сохранения файла
}) => {
	console.log(1);
	const options = {
		method: 'POST',
		headers: { 'x-api-key': secret_key, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			text: text,
			voice_id: Voices[0].id,
			language: LanguageRec[language],
			gender: Voices[0].gender,
			age: Voices[0].age,
		}),
	};

	console.log(1);

	try {
		// Шаг 1: Получаем URL аудиофайла
		const audioResponse = await fetch(
			'https://client.camb.ai/apis/tts-stream',
			options
		);

		if (!audioResponse.ok) {
			throw new Error(`Failed to fetch audio: ${audioResponse.statusText}`);
		}
		console.log(2);

		const content = await audioResponse.text();

		// Шаг 3: Создаем поток для записи файла
		// Шаг 4: Записываем данные из стрима в файл
		fs.writeFile(outputFilePath, content, err => {
			console.log('File written successfully.');
		});

		console.log(3);

		console.log(`Audio saved to ${path.resolve(outputFilePath)}`);
		return outputFilePath; // Возвращаем путь к сохраненному файлу
	} catch (error) {
		console.error('Error during TTS process:', error);
		throw error;
	}
};
