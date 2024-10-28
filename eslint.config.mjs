// @ts-check
import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    // extends: ["plugin:tailwindcss/recommended"],
    rules: {
      'no-console': 'off', // allow console.log in TypeScript files
      'vue/no-restricted-syntax': ['error', {
        selector: 'VElement[name=\'a\']',
        message: 'Use NuxtLink instead.',
      }],
      'vue/multi-word-component-names': 'off',
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-v-html': 'off',
    },
  },
  // {
  //   ...
  // }
)
