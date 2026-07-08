import styles from './FilledButton.module.scss';

export default function FilledButton({
  fullWidth = false,
  variant = 'primary',
  children,
}: {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantCss = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
  }[variant]
  return (
    <button
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''} ${variantCss}`}
    >{children}</button>
  );
}