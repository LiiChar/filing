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
import { PUBLIC_PATH, UPLOAD_PATH } from '@/shared/const/url';
import { deepSortByProperties } from '@/shared/helper/array';
import { DirectoryElement, getDirectoryByPath } from '@/shared/helper/file';
import { uploadPath } from '@/shared/type/fileS';
import { Tree, TreeDataNode } from 'antd';
import { promises as fs } from 'fs';
import path from 'path';

export const FileManagerAside = async () => {
	let files: TreeViewElement[] | null = await getFilesByPath(uploadPath);

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
