import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const ReloadOnSCSSChange = () => ({
	name: 'styles-hmr',
	enforce: 'post',
	handleHotUpdate({ file, server }) {
		if (file.endsWith('.scss')) {
			server.ws.send({
				type: 'full-reload',
				path: '*',
			});
		}
	},
});

export default defineConfig({
	plugins: [sveltekit(), ReloadOnSCSSChange()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
