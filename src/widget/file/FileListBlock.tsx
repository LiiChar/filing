'use server';

import { FileList } from '@/components/file/FileList';
import { getDirectoryByPath } from '@/shared/helper/file';
import { uploadPath } from '@/shared/type/fileS';

type FileListBlockProps = {
	path?: string;
	variant?: 'accardion' | 'list';
};

export const FileListBlock = async ({
	path = '',
	variant,
}: FileListBlockProps) => {
	console.log(uploadPath + '/' + path);
	const filesArr = await getDirectoryByPath(
		uploadPath + '/' + path,
		true,
		true,
		true
	);

	return (
		<FileList
			col={3}
			variant={variant}
			files={filesArr.filter(f => !f.isDirectory)}
		/>
	);
};
