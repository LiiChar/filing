'use server';

import { TreeViewElement } from '@/components/ui/tree-view-api';
import { compressImage } from '@/lib/image';
import {
	DirectoryElement,
	getDirectoryByPath,
	saveFilesToServer,
} from '@/shared/helper/file';
import { User } from '@/shared/type/user';
import { promises as fs } from 'fs';
import { getFormattedDate } from '../helper/date';
import { FILE_PATH, OPTIMAZE_PATH } from '../const/url';

export const handleFileUpload = async (formData: FormData) => {
	const files = formData.getAll('files') as File[];
	let user = formData.get('user') as User | null;

	try {
		if (!user) {
			console.error('Ошибка при сохранении файлов: вы неавторизованы');
			return { success: false, error: 'Не удалось сохранить файлы' };
		}
		if (user) {
			user = JSON.parse(user as unknown as string);
		}

		// Сохраняем файлы на сервере
		const savedFilePaths = await saveFilesToServer(
			files,
			'/public/upload/' + user!.id
		);

		console.log('Файлы успешно сохранены:', savedFilePaths);
		return { success: true, paths: savedFilePaths };
	} catch (error) {
		console.error('Ошибка при сохранении файлов:', error);
		return { success: false, error: 'Не удалось сохранить файлы' };
	}
};

export const getFilesByPath = async (
	uploadPath: string,
	options?: { sort?: 'default' | 'asc' }
) => {
	if (!uploadPath) return null;
	const { sort = 'default' } = options ?? {};
	const startPath = uploadPath.split('/')[uploadPath.split('/').length - 1];

	let files: TreeViewElement[] = [
		{
			id: startPath,
			name: startPath,
			children: [],
			isSelectable: true,
		},
	];
	try {
		// Проверяем, существует ли директория
		await fs.access(uploadPath);
		const filesArr = await getDirectoryByPath(uploadPath, true, true, true);
		// Читаем содержимое директории
		filesArr.forEach(p => {
			// Проверяем, что userId присутствует в пути
			const dirPath = p.path.split(startPath)[1];
			if (!dirPath) {
				console.warn(`Start path "${startPath}" not found in path: ${p.path}`);
				return; // Пропускаем этот путь
			}

			// Разбиваем путь на части и удаляем пустые элементы
			const paths = dirPath.split('/').filter(Boolean);

			// Начинаем с корневого элемента
			let currentLevel = files[0];

			// Проходим по каждому сегменту пути
			paths.forEach((segment, index) => {
				// Если это последний сегмент, добавляем файл
				if (index === paths.length - 1) {
					if (!currentLevel.children) {
						currentLevel.children = [];
					}
					currentLevel.children.push({
						id: p.path,
						name: p.title,
						isSelectable: false,
						metadata: p.metadata,
					});
				} else {
					// Если это не последний сегмент, ищем или создаем директорию
					if (!currentLevel.children) {
						currentLevel.children = [];
					}

					// Ищем существующую директорию
					let nextLevel = currentLevel.children.find(
						child => child.name === segment
					);

					// Если директория не найдена, создаем новую
					if (!nextLevel) {
						nextLevel = {
							id: segment,
							name: segment,
							isSelectable: false,
							children: [],
						};
						currentLevel.children.push(nextLevel);
					}

					// Переходим на следующий уровень
					currentLevel = nextLevel;
				}
			});
		});

		if (sort) {
			if (sort == 'default') {
				files[0].children = files[0].children?.sort(
					(a, b) => (b.children?.length ?? 0) - (a.children?.length ?? 0)
				);
			}
		}
		return files;
	} catch (err) {
		console.log(err);

		return null;
	}
};

export const handleCompressImage = async (formData: FormData) => {
	const files = formData.getAll('files') as File[];
	let user = formData.get('user') as User | null;

	try {
		if (!user) {
			console.error('Ошибка при сохранении файлов: вы неавторизованы');
			return { success: false, error: 'Не удалось сохранить файлы' };
		}
		if (user) {
			user = JSON.parse(user as unknown as string);
		}

		// Сохраняем файлы на сервере
		const savedFilePaths = await saveFilesToServer(
			files,
			`/${FILE_PATH}/${user!.id}/${OPTIMAZE_PATH}/${getFormattedDate(
				'd-m-y'
			)}/`,
			(buffer: Buffer, path: string) => compressImage(buffer, path)
		);

		console.log('Файлы успешно сохранены:', savedFilePaths);
		return { success: true, paths: savedFilePaths };
	} catch (error) {
		console.error('Ошибка при сохранении файлов:', error);
		return { success: false, error: 'Не удалось сохранить файлы' };
	}
};
