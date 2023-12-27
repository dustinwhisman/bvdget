import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const token = formData.get('token');

		const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		throw redirect(303, '/overview');
	},
};

export const load = async ({ url }) => {
	const email = url.searchParams.get('email') ?? '';
	if (!email) {
		throw redirect(303, '/auth/login');
	}

	return {
		email,
		title: 'Confirm Login',
	};
};
