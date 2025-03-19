'use client';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

export const HeaderNavigation = () => {
	return (
		<div className='flex justify-between gap-4'>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Изображений</NavigationMenuTrigger>
						<NavigationMenuContent>
							<Link href='/image/compress' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Сжатие
								</NavigationMenuLink>
							</Link>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Аудио</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink>Link</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Видео</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink>Link</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Текст</NavigationMenuTrigger>
						<NavigationMenuContent>
							<Link href='/text/tts' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Текст в речь
								</NavigationMenuLink>
							</Link>
							<Link href='/text/stt' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Речь в текст
								</NavigationMenuLink>
							</Link>
							<Link href='/text/image' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Текст с изображения
								</NavigationMenuLink>
							</Link>
							<Link href='/text/vrez' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Текст во врезку
								</NavigationMenuLink>
							</Link>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
