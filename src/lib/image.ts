import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { getExtFile } from '@/shared/helper/file';

/**
 * Сжимает изображение и возвращает сжатые данные.
 * @param inputBuffer - Бинарные данные изображения (Buffer).
 * @param options - Опции для сжатия (необязательно).
 * @returns Сжатые бинарные данные изображения (Buffer).
 */
export const compressImage = async (
	inputBuffer: Buffer,
	path?: string,
	options?: {
		quality?: number; // Качество сжатия (0-100)
		format?: 'jpeg' | 'png' | 'webp'; // Формат выходного изображения
	}
): Promise<Buffer> => {
	let { quality = 80, format = 'jpeg' } = options || {};

	if (path) format = getExtFile(path) as any;
	// Сжатие изображения с помощью sharp
	const compressedBuffer = await sharp(inputBuffer)
		.toFormat(format, { quality })
		.toBuffer();

	return compressedBuffer;
};

/**
 * Сжимает изображение по указанному пути и сохраняет сжатое изображение.
 * @param inputPath - Путь к исходному изображению.
 * @param options - Опции для сжатия (необязательно).
 * @returns Путь к сжатому изображению.
 */
export const compressImageByPath = async (
	inputPath: string,
	options?: {
		outputPath?: string; // Путь для сохранения сжатого изображения
		quality?: number; // Качество сжатия (0-100)
		format?: 'jpeg' | 'png' | 'webp'; // Формат выходного изображения
	}
): Promise<string> => {
	const { quality = 80, format, outputPath } = options || {};

	// Определяем формат на основе расширения файла, если не указан явно
	const detectedFormat =
		format || path.extname(inputPath).toLowerCase().replace('.', '');
	const supportedFormats = ['jpeg', 'jpg', 'png', 'webp'];

	if (!supportedFormats.includes(detectedFormat)) {
		throw new Error(`Unsupported file format: ${detectedFormat}`);
	}

	// Определяем путь для сохранения сжатого изображения
	const outputFilePath =
		outputPath || inputPath.replace(/(\.\w+)$/, `_compressed.$1`);

	// Сжатие изображения с помощью sharp
	await sharp(inputPath)
		.toFormat(detectedFormat as 'jpeg' | 'png' | 'webp', { quality })
		.toFile(outputFilePath);

	return outputFilePath;
};
