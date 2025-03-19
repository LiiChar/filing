'use server';

import { handleFileUpload } from '@/shared/actions/file';
import { FileListBlock } from '@/widget/file/FileListBlock';
import { FileUploadBlock } from '@/widget/file/FileUploadBlock';

export default async function Home() {
	return (
		<>
			<div className='grid items-center justify-items-center w-full p-8 pb-20 gap-16 '>
				<div className='w-full h-full'>
					<FileUploadBlock handleUpload={handleFileUpload} />
					<FileListBlock variant='accardion' />
				</div>
			</div>
		</>
	);
}
