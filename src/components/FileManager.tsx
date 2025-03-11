'use client';

import { useEffect, useState } from 'react';
import { FileIcon } from './ui/file-icon';
import {
	CollapseButton,
	File,
	Folder,
	Tree,
	TreeViewElement,
} from './ui/tree-view-api';
import { useListener } from '@/shared/store/useListener';
import { getFilesByPath } from '@/shared/actions/file';

type FileDir = Record<string, (string | Record<string, any>)[]>;

type FileManagerProps = {
	dir: TreeViewElement[];
	path: string;
};

const getTreeViewByRecord = (dir: FileDir) => {
	const elements: TreeViewElement[] = Object.entries(dir).map(
		([k, d]): TreeViewElement => {
			if (typeof d == 'string') {
				return {
					id: d,
					name: d,
					isSelectable: true,
				};
			}
			if (typeof d == 'object') {
				return {
					id: k,
					name: k,
					isSelectable: true,
					children: getTreeViewByRecord(d as unknown as FileDir),
				};
			}
			throw new Error('Unexpect typeof of directory');
		}
	);
	return elements;
};

export const isDirectory = (elem: TreeViewElement) => {
	const includeDot = elem.name.includes('.');
	return !includeDot;
};

export const FileManager = ({ dir, path }: FileManagerProps) => {
	const [elements, setElements] = useState<TreeViewElement[]>(dir);
	const { addListener, removeListener } = useListener();

	useEffect(() => {
		const callback = async () => {
			try {
				const files = await getFilesByPath(path);
				console.log(files);
				if (files) {
					setElements(files);
				}
			} catch (error) {
				console.error('Ошибка при получении файлов:', error);
			}
		};

		addListener('updateFileManager', callback);
		return () => {
			removeListener('updateFileManager', callback);
		};
	}, []);

	return (
		<Tree className=' h-full' initialSelectedId={dir[0].id} elements={elements}>
			{elements.map(el => (
				<ShowDirectory key={el.id + el.name} dir={el} />
			))}
			<CollapseButton elements={elements} />
		</Tree>
	);
};

export const ShowDirectory = ({ dir }: { dir: TreeViewElement }) => {
	return (
		<>
			{dir.children ? (
				<Folder showNested={true} element={dir.name} value={dir.id}>
					{dir.children.map(f => (
						<ShowDirectory key={f.id + f.name} dir={f} />
					))}
				</Folder>
			) : (
				<File
					fileIcon={<FileIcon className='h-4 w-4' fileName={dir.name.trim()} />}
					value={dir.id}
				>
					<div className='line-clamp-1 text-left'>{dir.name.trim()}</div>
				</File>
			)}
		</>
	);
};
