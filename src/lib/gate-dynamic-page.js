import { redirect } from '@sveltejs/kit';

export const gateDynamicPage = async (supabase) => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user == null) {
		throw redirect(303, '/');
	}
};
