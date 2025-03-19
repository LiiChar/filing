'use client';

import { FileUploader } from '@/components/file/FileUpload';
import { getUser } from '@/shared/helper/user';
import { handleFileUpload } from '@/shared/actions/file';
import { Button } from 'antd';
import { useMemo, useState } from 'react';
import { FileExtensions } from '@/shared/type/file';
import { useListener } from '@/shared/store/useListener';
import { FileList } from '@/components/file/FileList';

export type FileUploadBlockProps = {
	allowExt?: FileExtensions[];
	handleUpload: (formData: FormData) => Promise<any>;
	option?: {
		title?: string;
		description?: string;
	};
};

export const FileUploadBlock = ({
	allowExt,
	handleUpload,
	option,
}: FileUploadBlockProps) => {
	const { description, title } = option ?? {};
	const [files, setFiles] = useState<File[]>([]);
	const { triggerEvent } = useListener();

	const handleSubmit = async (formData: FormData) => {
		files.forEach(file => {
			if (file.name != 'undefined') {
				formData.append('files', file);
			}
		});
		let user = await getUser();
		const userStorage = localStorage.getItem('user');
		if (userStorage && !user) {
			user = JSON.parse(userStorage);
		}
		formData.append('user', JSON.stringify(user));
		await handleUpload(formData);
		triggerEvent('updateFileManager');
	};

	return (
		<section className='w-full'>
			{title && <p className='text-2xl text-center font-bold pb-2'>{title}</p>}
			<form action={handleSubmit}>
				<FileUploader allowExt={allowExt} onFilesChange={setFiles} />
				<Button className='mt-2' htmlType='submit'>
					Сохранить
				</Button>
			</form>
		</section>
	);
};
