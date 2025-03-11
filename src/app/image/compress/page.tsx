'use server';

import { handleCompressImage } from '@/shared/actions/file';
import { FileManage } from '@/widget/file/FileManagerAside';
import { FileUploadBlock } from '@/widget/file/FileUploadBlock';
import { Footer } from '@/widget/layout/Footer';
import { Header } from '@/widget/layout/Header';

export default async function Home() {
	return (
		<div className='grid items-center justify-items-center w-full p-8 pb-20 gap-16 '>
			<div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<FileUploadBlock
					option={{
						title: 'Сжатие изображений',
					}}
					handleUpload={handleCompressImage}
					allowExt={['webp', 'png', 'jpeg']}
				/>
			</div>
		</div>
	);
}
