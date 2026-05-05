export type ButtonVariants =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
export type ButtonSizes = 'default' | 'sm' | 'lg' | 'icon';

export const ButtonSizesClass: Record<ButtonSizes, string> = {
  sm: 'min-h-8 rounded-md px-3 text-sm gap-1.5 has-[>svg]:px-2.5',
  default: 'min-h-9 rounded-md px-4 text-sm gap-2 has-[>svg]:px-3',
  lg: 'min-h-10 rounded-md px-5 text-base gap-2.5 has-[>svg]:px-4',
  icon: 'h-9 w-9 shrink-0 rounded-md p-0',
};

export const ButtonVariantClass: Record<ButtonVariants, string> = {
  default:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md active:bg-primary/95',
  destructive:
    'bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:shadow-md active:bg-destructive/95 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70',
  outline:
    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-input/80 hover:shadow-md dark:bg-input/20 dark:hover:bg-input/40',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md active:bg-secondary/90',
  ghost:
    'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'h-auto min-h-0 px-0 py-0 text-primary underline-offset-4 hover:underline hover:text-primary/80',
};
