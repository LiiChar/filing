import React from 'react';

// Создаем объединенный тип для свойств
type PlayerProps = {
	src?: string;
} & (
	| React.ComponentProps<'img'>
	| React.ComponentProps<'video'>
	| React.ComponentProps<'audio'>
);

function getFileTypeByUrl(
	url: string
): 'audio' | 'image' | 'video' | 'unknown' {
	// Извлекаем расширение файла из ссылки
	const extension = url.split('.').pop()?.toLowerCase();

	// Определяем тип файла по расширению
	if (!extension) {
		return 'unknown';
	}

	const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'flac'];
	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
	const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv'];

	if (audioExtensions.includes(extension)) {
		return 'audio';
	} else if (imageExtensions.includes(extension)) {
		return 'image';
	} else if (videoExtensions.includes(extension)) {
		return 'video';
	} else {
		return 'unknown';
	}
}

export const Player = ({ src, ...props }: PlayerProps) => {
	const typeFile = getFileTypeByUrl(src ?? '');

	return (
		<>
			{typeFile === 'image' ? (
				<img src={src} {...(props as React.ComponentProps<'img'>)} />
			) : typeFile === 'video' ? (
				<video src={src} {...(props as React.ComponentProps<'video'>)} />
			) : typeFile === 'audio' ? (
				<audio src={src} {...(props as React.ComponentProps<'audio'>)} />
			) : (
				<></>
			)}
		</>
	);
};
