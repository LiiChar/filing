'use client';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { SignupForm } from '../auth/signup';

export const Init = () => {
	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) {
			return;
		} else {
			localStorage.setItem('user', JSON.stringify({ id: v4() }));
		}
	});
	return (
		<>
			<SignupForm />
		</>
	);
};
