module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
	plugins: ['stylelint-order'],
	rules: {
		indentation: 'tab',
		'plugin/declaration-block-no-ignored-properties': false,
		'comment-empty-line-before': null,
		'declaration-empty-line-before': null,
		'function-name-case': 'lower',
		'no-descending-specificity': null,
		'no-invalid-double-slash-comments': null,
		'rule-empty-line-before': false
	},
	ignoreFiles: ['node_modules/**/*', 'build/**/*']
}
