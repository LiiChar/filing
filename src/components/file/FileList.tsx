import { DirectoryElement } from '@/shared/helper/file';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { groupBy } from '@/shared/helper/array';
import { getFormattedDate } from '@/shared/helper/date';
import { FileElement } from './FileElement';
import { cn } from '@/lib/utils';

type FileListProps = {
	files: DirectoryElement[];
	variant?: 'accardion' | 'list';
	group?: 'date' | 'size';
	col?: number;
	betweenDistance?: number;
} & React.ComponentProps<'div'>;

export const FileList = ({
	files,
	variant = 'list',
	...arg
}: FileListProps) => {
	return (
		<>
			{variant == 'list' && <FileListDefault files={files} {...arg} />}
			{variant == 'accardion' && (
				<FileListAccardion files={filesToAccardionElement(files)} {...arg} />
			)}
		</>
	);
};

const FileListDefault = ({
	files,
	col = 1,
	betweenDistance = 8,
	...arg
}: FileListProps) => {
	return (
		<div className={cn(arg.className, `flex flex-wrap gap-2`)} {...arg}>
			{files.map(d => (
				<FileElement
					key={d.path + d.title}
					style={{
						gap: `${betweenDistance / 1}px`,
						width: `${Math.floor(100 / col) - betweenDistance / 2}%`,
					}}
					onClick={arg.onClick}
					file={d}
				/>
			))}
		</div>
	);
};

const filesToAccardionElement = (files: DirectoryElement[]) => {
	const accardion = groupBy(files, f =>
		f.metadata.createdAt
			? getFormattedDate('d-m-y', f.metadata.createdAt)
			: 'Неизвестно'
	);

	return accardion;
};

type FileAccardionProps = {
	files: Record<string, DirectoryElement[]>;
} & Omit<FileListProps, 'files'>;

const FileListAccardion = ({
	files,
	col = 1,
	betweenDistance = 8,
	...arg
}: FileAccardionProps) => {
	return (
		<Accordion
			className={cn(arg.className, 'w-full')}
			{...(arg as any)}
			type='multiple'
			collapsible
		>
			{Object.entries(files).map(([head, dir]) => (
				<AccordionItem value={head}>
					<AccordionTrigger className='w-full'>{head}</AccordionTrigger>
					<AccordionContent>
						<div className='flex flex-wrap gap-2'>
							{dir.map(d => (
								<FileElement
									file={d}
									style={{
										gap: `${betweenDistance / 1}px`,
										width: `${Math.floor(100 / col) - betweenDistance / 2}%`,
									}}
								/>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
