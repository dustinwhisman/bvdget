const globals = require('globals');
const js = require('@eslint/js');
const eslintPluginSvelte = require('eslint-plugin-svelte');
const prettier = require('eslint-config-prettier');

module.exports = [
	js.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	prettier,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
	},
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'build',
			'.svelte-kit',
			'package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
			'.netlify',
		],
	},
];
