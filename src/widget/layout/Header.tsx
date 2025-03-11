import { HeaderNavigation } from '@/components/layout/HeaderNavigation';
import { getUser } from '@/shared/helper/user';
import { getCookie } from 'cookies-next/server';
import Image from 'next/image';

export const Header = async () => {
	const user = await getUser();
	return (
		<header className='h-[40px] w-full '>
			<div className='flex h-full px-4 justify-between gap-6 items-center'>
				<div>
					<Image width={20} height={20} alt='logo' src='/vercel.svg' />
				</div>
				<HeaderNavigation />
				<div>{user ? user.id : ''}</div>
			</div>
		</header>
	);
};
