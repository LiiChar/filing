import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import { initServer } from '@/shared/helper/init';
import { ConfigProvider } from 'antd';
import { antTheme } from '@/shared/theme/antConfig';
import { Init } from '@/widget/layout/Init';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { FileManagerAside } from '@/widget/file/FileManagerAside';
import { Footer } from '@/widget/layout/Footer';
import { Header } from '@/widget/layout/Header';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Filing - modify file',
	description: 'Modify your files',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	'use server';
	await initServer();
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
			>
				<Init />
				<AntdRegistry>
					<ConfigProvider theme={antTheme}>
						<SidebarProvider>
							<FileManagerAside />
							<main className='w-full'>
								<Header />
								<SidebarTrigger className='translate-x-[12.5px] z-50 sticky top-12' />
								<SidebarInset>{children}</SidebarInset>
								<Footer />
							</main>
						</SidebarProvider>
					</ConfigProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
