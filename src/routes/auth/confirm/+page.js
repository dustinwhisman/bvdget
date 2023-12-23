import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const email = url.searchParams.get('email') ?? '';
	if (!email) {
		throw redirect(303, '/auth/login');
	}

	return { email };
};
