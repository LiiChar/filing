import { getCookie } from 'cookies-next/client';
import { User } from '../type/user';

export const getUser = () => {
	'use client';
	const userData = getCookie('user');
	if (!userData) {
		return null;
	}
	const user: User = JSON.parse(userData);
	return user;
};
