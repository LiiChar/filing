import { DirectoryElement } from '@/shared/helper/file';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Player } from './Player';
import { getSrc } from '@/shared/helper/url';
import { getFormattedDate } from '@/shared/helper/date';
import { formatFileSize } from '@/shared/helper/text';
import { Button } from '../ui/button';
import Image from 'next/image';
import { FileIcon } from '../ui/file-icon';
import { cn } from '@/lib/utils';

type FileElementProps = {
	file: DirectoryElement;
	variant?: 'default' | 'compact' | 'card';
} & React.ComponentProps<'div'>;

export const FileElement = ({
	file,
	variant = 'default',
	...arg
}: FileElementProps) => {
	return (
		<>
			{variant == 'default' && (
				<FileDefault file={file} variant={variant} {...arg} />
			)}
			{variant == 'compact' && (
				<FileCompact file={file} variant={variant} {...arg} />
			)}
			{variant == 'card' && <FileCard file={file} variant={variant} {...arg} />}
		</>
	);
};

const FileDefault = ({ file, ...arg }: FileElementProps) => {
	return (
		<div
			{...arg}
			className={cn(
				arg.className,
				'flex gap-3 w-full p-2 border-foreground border-[1px] rounded-sm'
			)}
		>
			<div>
				<FileIcon
					className='min-w-6 mt-2 max-w-6 h-6 w-6'
					fileName={file.path.trim()}
					alt={file.title}
				/>
			</div>
			<div className='w-full h-full'>
				<div className='w-full h-full flex flex-col'>
					<div className='text-lg'>{file.title}</div>
					{file.metadata && (
						<div className='flex w-full items-center justify-between'>
							<div className='text-sm text-foreground/80'>
								{file.metadata.size && formatFileSize(file.metadata.size)}
							</div>
							<div className='text-sm text-foreground/80'>
								{file.metadata.createdAt &&
									getFormattedDate('h:i d-m-y', file.metadata.createdAt)}
							</div>
						</div>
					)}
				</div>
				<div></div>
			</div>
		</div>
	);
};

const FileCompact = ({ file, ...arg }: FileElementProps) => {
	return (
		<div {...arg}>
			<HoverCard>
				<HoverCardTrigger>
					<div className='line-clamp-1 text-left overflow-ellipsis'>
						{file.title.trim()}
					</div>
				</HoverCardTrigger>
				<HoverCardContent>
					<div className='text-left'>
						<div>
							<Player
								alt={file.title.trim()}
								className='w-full mb-2'
								controls
								src={getSrc(file.path)}
							/>
						</div>
						<div>{file.title.trim()}</div>
						{file.metadata && file.metadata.size && (
							<div>Размер: {formatFileSize(file.metadata.size)}</div>
						)}
						{file.metadata && file.metadata.createdAt && (
							<div>
								Дата создания:{' '}
								{getFormattedDate('h:i d-m-y', file.metadata.createdAt)}
							</div>
						)}
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
};

const FileCard = ({ file, ...arg }: FileElementProps) => {
	return <div {...arg}></div>;
};
