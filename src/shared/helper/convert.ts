import { TreeViewElement } from '@/components/ui/tree-view-api';
import { DirectoryElement } from './file';

export const treeViewFileToDirectory = (
	tree: TreeViewElement
): DirectoryElement => {
	return {
		isDirectory: false,
		metadata: tree.metadata || {},
		path: tree.id,
		title: tree.name,
	};
};
