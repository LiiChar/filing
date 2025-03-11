import {
	Folder,
	File,
	FileText,
	FileImage,
	FileCode,
	FileArchive,
	FileVideo,
	FileAudio,
} from 'lucide-react';
import {
	FileExcelOutlined,
	FilePdfOutlined,
	FilePptOutlined,
	FileUnknownOutlined,
	FileWordOutlined,
} from '@ant-design/icons';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { JSX } from 'react';

/**
 * Возвращает иконку в зависимости от расширения файла или типа (директория/файл).
 * @param fileName - Имя файла или директории.
 * @param iconProps - Свойства для иконки (например, размер, цвет).
 * @returns Компонент иконки.
 */
export const FileIcon = ({
	fileName,
	...iconProps
}: {
	fileName: string;
} & IconBaseProps) => {
	// Иконка по умолчанию для файлов
	const defaultIcon = <File {...(iconProps as any)} />;

	// Иконка для директорий
	if (!fileName.includes('.')) {
		return <Folder {...(iconProps as any)} />;
	}

	// Разделяем имя файла на части
	const parts = fileName.split('.');
	if (parts.length < 2) {
		return defaultIcon;
	}

	// Получаем расширение файла
	const extension = parts[parts.length - 1].toLowerCase();

	// Маппинг расширений на иконки
	const iconMap: Record<string, JSX.Element> = {
		// Документы
		txt: <FileText {...(iconProps as any)} />,
		pdf: <FilePdfOutlined {...(iconProps as any)} />,
		doc: <FileWordOutlined {...(iconProps as any)} />,
		docx: <FileWordOutlined {...(iconProps as any)} />,
		xls: <FileExcelOutlined {...(iconProps as any)} />,
		xlsx: <FileExcelOutlined {...(iconProps as any)} />,
		ppt: <FilePptOutlined {...(iconProps as any)} />,
		pptx: <FilePptOutlined {...(iconProps as any)} />,

		// Изображения
		jpg: <FileImage {...(iconProps as any)} />,
		jpeg: <FileImage {...(iconProps as any)} />,
		png: <FileImage {...(iconProps as any)} />,
		gif: <FileImage {...(iconProps as any)} />,
		bmp: <FileImage {...(iconProps as any)} />,
		svg: <FileImage {...(iconProps as any)} />,

		// Архивы
		zip: <FileArchive {...(iconProps as any)} />,
		rar: <FileArchive {...(iconProps as any)} />,
		tar: <FileArchive {...(iconProps as any)} />,
		gz: <FileArchive {...(iconProps as any)} />,
		'7z': <FileArchive {...(iconProps as any)} />,

		// Код
		js: <FileCode {...(iconProps as any)} />,
		ts: <FileCode {...(iconProps as any)} />,
		html: <FileCode {...(iconProps as any)} />,
		css: <FileCode {...(iconProps as any)} />,
		json: <FileCode {...(iconProps as any)} />,
		xml: <FileCode {...(iconProps as any)} />,

		// Видео
		mp4: <FileVideo {...(iconProps as any)} />,
		mkv: <FileVideo {...(iconProps as any)} />,
		avi: <FileVideo {...(iconProps as any)} />,
		mov: <FileVideo {...(iconProps as any)} />,

		// Аудио
		mp3: <FileAudio {...(iconProps as any)} />,
		wav: <FileAudio {...(iconProps as any)} />,
		ogg: <FileAudio {...(iconProps as any)} />,

		// Другое
		exe: <FileUnknownOutlined {...(iconProps as any)} />,
		dll: <FileUnknownOutlined {...(iconProps as any)} />,
	};

	// Возвращаем иконку по расширению или иконку по умолчанию
	return iconMap[extension] || defaultIcon;
};
