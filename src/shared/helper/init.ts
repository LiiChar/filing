'use server';

import { getCookie, setCookie } from 'cookies-next/client';
import { randomUUID } from 'crypto';

export async function initServer() {
	'use server';

	const userData = getCookie('user');
	if (!userData) {
		setCookie('user', JSON.stringify({ id: randomUUID() }));
		console.log(getCookie('user'));
		return;
	}
	const user = JSON.parse(userData);

	if ('id' in user && !user.id) {
		setCookie('user', JSON.stringify({ id: randomUUID() }));
		return;
	}
}
