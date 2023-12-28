export const formatDate = (value) =>
	new Date(`${value}T00:00:00.000`).toLocaleDateString('en-US', {
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
	});
