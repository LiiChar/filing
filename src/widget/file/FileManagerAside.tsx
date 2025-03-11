'use server';

import { FileManager } from '@/components/file/FileManager';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { TreeViewElement } from '@/components/ui/tree-view-api';
import { getFilesByPath } from '@/shared/actions/file';
import { deepSortByProperties } from '@/shared/helper/array';
import { DirectoryElement, getDirectoryByPath } from '@/shared/helper/file';
import { Tree, TreeDataNode } from 'antd';
import { promises as fs } from 'fs';
import path from 'path';

export const FileManage = async () => {
	// Путь к директории клиента
	const userId = 'ea5e50d6-f6b5-4672-bd1a-e92b65a3cbfa';
	const uploadPath = path.join(process.cwd(), 'public', 'upload', userId);

	let files: TreeViewElement[] | null = await getFilesByPath(uploadPath);

	if (files) {
		files[0].children = files[0].children?.sort(
			(a, b) => (b.children?.length ?? 0) - (a.children?.length ?? 0)
		);
	}

	return (
		<Sidebar variant='sidebar' side='left'>
			<SidebarContent>
				{!files ? (
					<div>Error</div>
				) : (
					<FileManager path={uploadPath} dir={files} />
				)}
			</SidebarContent>
		</Sidebar>
	);
};
