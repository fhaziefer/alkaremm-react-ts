import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'outline' | 'neutral' | 'primary' | 'secondary' | 'ghost' | 'link' | 'join' | 'error';
    disabled?: boolean
    size?: 'normal' | 'tiny' | 'small' | 'large'
}

export default function Button({ className, disabled, variant, size, ...props }: ButtonProps) {
    return <button disabled={disabled} {...props} className={cn(buttonVariants({ variant, size }), className)} />;
}

const buttonVariants = cva(
    'btn',
    {
        variants: {
            variant: {
                outline: 'btn-outline hover:bg-gray-400 hover:text-black',
                neutral: 'btn-neutral',
                primary: 'btn-primary text-white hover:text-gray-100',
                error: 'btn-error text-white hover:text-gray-100 hover:bg-red-600',
                secondary: 'btn-secondary text-white hover:text-gray-100',
                ghost: 'btn-ghost hover:text-white',
                link: 'btn-link',
                join: 'join-item'
            }, 
            size: {
                normal: '',
                tiny: 'btn-xs',
                small: 'btn-sm',
                large: 'btn-lg',
            }
        },
        defaultVariants: {
            variant: 'neutral',
            size: 'normal'
        }
    }
)