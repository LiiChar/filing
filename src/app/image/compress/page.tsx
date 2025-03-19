'use server';

import { handleCompressImage } from '@/shared/actions/file';
import { OPTIMAZE_PATH } from '@/shared/const/url';
import { FileListBlock } from '@/widget/file/FileListBlock';
import { FileUploadBlock } from '@/widget/file/FileUploadBlock';
import { Footer } from '@/widget/layout/Footer';
import { Header } from '@/widget/layout/Header';

export default async function Compress() {
	return (
		<div className='grid items-center justify-items-center w-full p-8 pb-20 gap-16 '>
			<div className='w-full h-full'>
				<FileUploadBlock
					option={{
						title: 'Сжатие изображений',
					}}
					handleUpload={handleCompressImage}
					allowExt={['webp', 'png', 'jpeg']}
				/>
				<FileListBlock path={OPTIMAZE_PATH} variant='accardion' />
			</div>
		</div>
	);
}
