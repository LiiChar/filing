import { createSession } from '@/lib/session';
import { fromTheme } from 'tailwind-merge';

export async function signup(userId: string) {
	if (userId) await createSession(userId as string);
}
