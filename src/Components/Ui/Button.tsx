import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' ;
    disabled?: boolean
}

export default function Button({className, disabled, variant, ...props}: ButtonProps) {
    return <button disabled={disabled} {...props} className={cn(buttonVariants({variant}), className)} />;
}

const buttonVariants = cva(
    'btn',
    {
        variants: {
            variant: {
                neutral: 'btn btn-neutral',
                primary: 'btn btn-primary text-white hover:text-gray-100',
                secondary: 'btn btn-secondary text-white hover:text-gray-100',
                accent: 'btn btn-accent hover:text-gray-800',
                ghost: 'btn btn-ghost hover:text-white',
                link: 'btn btn-link',
            }
        },
        defaultVariants: {
            variant: 'neutral'
        }
    }
)