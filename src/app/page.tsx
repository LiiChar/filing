'use server';

import { handleFileUpload } from '@/shared/actions/file';
import { FileUploadBlock } from '@/widget/file/FileUploadBlock';

export default async function Home() {
	return (
		<>
			<div className='grid items-center justify-items-center w-full p-8 pb-20 gap-16 '>
				<div className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
					<FileUploadBlock handleUpload={handleFileUpload} />
				</div>
			</div>
		</>
	);
}
