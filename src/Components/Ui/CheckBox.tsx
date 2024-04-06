import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type CheckBoxProps = React.HTMLAttributes<HTMLInputElement> & {
    variant?: 'primary' | 'secondary';
    disabled?: boolean
}

export default function CheckBox({className, disabled, variant, ...props}: CheckBoxProps) {
    return <input disabled={disabled} type='checkbox' {...props} className={cn(checkBoxVariants({variant}), className)} />;
}

const checkBoxVariants = cva(
    'checkbox rounded-full',
    {
        variants: {
            variant: {
                primary: 'checkbox checkbox-primary rounded-full',
                secondary: 'checkbox rounded-full',
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
)