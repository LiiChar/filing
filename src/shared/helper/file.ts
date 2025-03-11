import fs from 'fs';
import path from 'path';
import { promises as pfs } from 'fs';

export const saveFilesToServer = async (
	files: File[],
	uploadDir: string = 'upload',
	modifyBuffer?: (buffer: Buffer, path: string) => Promise<Buffer>
): Promise<string[]> => {
	// Получаем текущую директорию, где запущен сервер
	const serverDir = process.cwd();

	// Создаем полный путь к директории загрузки
	const resolvedUploadDir = path.join(serverDir, uploadDir);

	// Создаем директорию, если она не существует
	if (!fs.existsSync(resolvedUploadDir)) {
		fs.mkdirSync(resolvedUploadDir, { recursive: true });
	}

	const savedFilePaths: string[] = [];

	for (const file of files) {
		// Пропускаем файлы с некорректным именем
		if (!file.name || file.name === 'undefined') continue;

		// Генерируем путь к файлу
		const fileName = file.name;
		const filePath = path.resolve(resolvedUploadDir, fileName);

		// Создаем все необходимые поддиректории, если они не существуют
		const dirname = path.dirname(filePath);
		if (!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname, { recursive: true });
		}

		// Читаем файл как ArrayBuffer и сохраняем его на сервере
		let buffer = Buffer.from(await file.arrayBuffer());
		if (modifyBuffer) buffer = (await modifyBuffer(buffer, filePath)) as any;
		fs.writeFileSync(filePath, buffer);

		// Сохраняем путь к файлу
		savedFilePaths.push(filePath.split('filing')[1]);
	}

	return savedFilePaths;
};

export type DirectoryElement = {
	title: string;
	path: string;
	isDirectory: boolean;
};

export const getDirectoryByPath = async (
	dirPath: string,
	recursive: boolean = false,
	includeFiles: boolean = true,
	includeDirectories: boolean = true
): Promise<DirectoryElement[]> => {
	try {
		// Проверяем, существует ли директория
		await pfs.access(dirPath);

		// Читаем содержимое директории
		const files = await pfs.readdir(dirPath, { withFileTypes: true });

		const result: DirectoryElement[] = [];

		for (const file of files) {
			const fullPath = path.join(dirPath, file.name);

			if (file.isDirectory()) {
				if (includeDirectories) {
					result.push({ title: file.name, path: fullPath, isDirectory: true });
				}

				if (recursive) {
					const nestedFiles: any = await getDirectoryByPath(
						fullPath,
						recursive,
						includeFiles,
						includeDirectories
					);
					result.push(...nestedFiles);
				}
			} else if (file.isFile() && includeFiles) {
				result.push({ title: file.name, path: fullPath, isDirectory: false });
			}
			// Можно добавить обработку символических ссылок, если нужно
		}

		return result;
	} catch (err) {
		throw new Error('Directory not found or access denied');
	}
};

export const getExtFile = (file: string): string => {
	// Используем path.extname для получения расширения
	const extension = path.extname(file).toLowerCase();

	// Убираем точку в начале расширения
	return extension ? extension.slice(1) : '';
};
