import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		const { error } = await supabase.auth.signInWithOtp({ email });
		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		throw redirect(303, `/auth/confirm?email=${email}`);
	},
};

export const load = () => {
	return {
		title: 'Log In',
	};
};
