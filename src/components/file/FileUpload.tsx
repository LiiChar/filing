'use client';

import React, { useCallback, useState } from 'react';
import { Upload, message, Spin } from 'antd';
import {
	FileImageOutlined,
	FilePdfOutlined,
	FileWordOutlined,
	FileExcelOutlined,
	FilePptOutlined,
	FileZipOutlined,
	FileTextOutlined,
	FileMarkdownOutlined,
	FileUnknownOutlined,
	SoundOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FileExtensions } from '@/shared/type/file';
import { getExtFile } from '@/shared/helper/file';
import { Inbox, Loader2 } from 'lucide-react';

const { Dragger } = Upload;

interface FilePreview {
	url: string;
	type: string;
	name: string;
	status: 'uploading' | 'done' | 'error';
	file: File;
}

export type FileUploadProps = {
	allowExt?: FileExtensions[];
	onFilesChange: (files: File[]) => void;
};

export const FileUploader = ({ onFilesChange, allowExt }: FileUploadProps) => {
	const [files, setFiles] = useState<FilePreview[]>([]);

	const handleBeforeUpload: UploadProps['beforeUpload'] = useCallback(
		(file: any) => {
			const isImage = file.type.startsWith('image/');
			const isVideo = file.type.startsWith('video/');
			const isAudio = file.type.startsWith('audio/');
			if (!isImage && !isVideo && !isAudio) {
				message.info('Файл загружен, но это не изображение, видео или аудио.');
			}
			return true; // Разрешаем загрузку всех файлов
		},
		[]
	);

	const handleChange: UploadProps['onChange'] = useCallback(
		(info: any) => {
			const { fileList } = info;

			const newFiles = fileList.map((file: any) => ({
				url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : '',
				type: file.type || 'unknown',
				name: file.name,
				status: file.status || 'uploading',
				file: file.originFileObj,
			}));
			setFiles(newFiles);
			onFilesChange(newFiles.map((f: FilePreview) => f.file));
		},
		[onFilesChange]
	);

	const getFileIcon = (type: string) => {
		if (type.startsWith('image/')) {
			return <FileImageOutlined className='text-4xl text-blue-500' />;
		}
		if (type.startsWith('video/')) {
			return <FileImageOutlined className='text-4xl text-red-500' />;
		}
		if (type.startsWith('audio/')) {
			return <SoundOutlined className='text-4xl text-green-500' />;
		}
		if (type === 'application/pdf') {
			return <FilePdfOutlined className='text-4xl text-red-500' />;
		}
		if (
			type === 'application/msword' ||
			type ===
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		) {
			return <FileWordOutlined className='text-4xl text-blue-500' />;
		}
		if (
			type === 'application/vnd.ms-excel' ||
			type ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		) {
			return <FileExcelOutlined className='text-4xl text-green-500' />;
		}
		if (
			type === 'application/vnd.ms-powerpoint' ||
			type ===
				'application/vnd.openxmlformats-officedocument.presentationml.presentation'
		) {
			return <FilePptOutlined className='text-4xl text-orange-500' />;
		}
		if (type === 'application/zip' || type === 'application/x-zip-compressed') {
			return <FileZipOutlined className='text-4xl text-purple-500' />;
		}
		if (type === 'text/plain') {
			return <FileTextOutlined className='text-4xl text-gray-500' />;
		}
		if (type === 'text/markdown') {
			return <FileMarkdownOutlined className='text-4xl text-gray-500' />;
		}
		return <FileUnknownOutlined className='text-4xl text-gray-500' />;
	};

	return (
		<div className='w-full h-full'>
			<Dragger
				name='files'
				multiple
				beforeUpload={handleBeforeUpload}
				onChange={handleChange}
				showUploadList={false}
				accept={allowExt ? allowExt.map(e => `.${e}`).join(' ,') : '*'}
				className='w-full h-full rounded-lg p-6 text-center  transition-colors'
			>
				{files.length > 0 ? (
					<div className='flex flex-wrap gap-4'>
						{files.map((file, index) => (
							<div
								key={index}
								className='w-24 h-24 flex flex-col items-center justify-center  rounded-lg p-2 relative'
							>
								{file.status === 'uploading' ? (
									<Loader2 className='fill:foreground animate-spin text-3xl stroke:foreground text-blue-500' />
								) : (
									<>
										{file.type.startsWith('image/') ? (
											<img
												src={file.url}
												alt={file.name}
												className='w-full h-full object-cover rounded-lg'
											/>
										) : file.type.startsWith('video/') ? (
											<video
												src={file.url}
												className='w-full h-full object-cover rounded-lg'
												controls
											/>
										) : file.type.startsWith('audio/') ? (
											<div className='w-full h-full flex items-center justify-center'>
												<audio controls src={file.url} className='w-full' />
											</div>
										) : (
											<>
												{getFileIcon(file.type)}
												<span className='text-xs mt-2 text-center truncate w-full'>
													{file.name}
												</span>
											</>
										)}
									</>
								)}
								<span className='absolute bottom-2 right-3 invert text-xs text-foreground'>
									{file.type.split('/')[1] ||
										file.type ||
										file.name.split('.')[file.name.split('.').length - 1]}
								</span>
							</div>
						))}
					</div>
				) : (
					<>
						<div className='w-full'>
							<Inbox className='w-20 h-20 mx-auto fill:foreground text-3xl stroke:foreground text-blue-500' />
						</div>
						<p className='ant-upload-text text-lg font-semibold'>
							Перетащите файлы сюда или нажмите для выбора
						</p>
					</>
				)}
			</Dragger>
		</div>
	);
};
