export const load = async ({ locals: { getUser } }) => {
	const user = await getUser();
	return {
		user,
	};
};
