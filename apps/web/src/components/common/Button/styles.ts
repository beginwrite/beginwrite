import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'p-2 rounded-md',
  variants: {
    colors: {
      primary: 'bg-blue-600 text-white',
    },
  },
});
