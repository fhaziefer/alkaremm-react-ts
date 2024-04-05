import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' ;
}

export default function Button({className, variant, ...props}: ButtonProps) {
    return <button {...props} className={cn(buttonVariants({variant}), className)} />;
}

const buttonVariants = cva(
    'py-2 px-4 rounded-md font-semibold hover:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-blue-700 text-black',
                secondary: 'bg-white text-black',
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
)