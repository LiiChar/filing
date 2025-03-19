import path from 'path';
import { PUBLIC_PATH, UPLOAD_PATH } from '../const/url';

const userId = 'ea5e50d6-f6b5-4672-bd1a-e92b65a3cbfa';
export const uploadPath = path.join(
	process.cwd(),
	PUBLIC_PATH,
	UPLOAD_PATH,
	userId
);
