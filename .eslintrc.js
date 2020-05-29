module.exports = {
	env: {
		'react-native/react-native': true,
	},
	parser: 'babel-eslint',
	extends: ['plugin:react/recommended', 'airbnb'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'react-native'],
	rules: {
		eqeqeq: 'off',
		curly: 'error',
		quotes: ['error', 'double'],
		'class-methods-use-this': 0,
		'react/prop-types': 0,
		'react/destructuring-assignment': [0],
		'react/jsx-props-no-spreading': [0],
		'no-console': 'off',
		'no-use-before-define': ['error', {
			'functions': false,
			'classes': false
		}]
	},
};
