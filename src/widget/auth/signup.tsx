'use client';
import { getUser } from '@/shared/helper/user';
import { signup } from '@/shared/actions/auth';
import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';

const getUserStorage = () => {
	const user = getUser();
	const form = new FormData();
	if (user) {
		return user.id;
	} else {
		return v4();
	}
};

export function SignupForm() {
	const ref = useRef<HTMLFormElement>(null);
	const SignUpAction = signup.bind(null, getUserStorage());

	useEffect(() => {
		if (!ref.current) return;
		ref.current.submit();
	}, []);

	return <form className='hidden' action={SignUpAction}></form>;
}
