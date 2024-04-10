import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type CheckBoxProps = React.HTMLAttributes<HTMLInputElement> & {
    variant?: 'primary' | 'secondary' | 'neutral';
    disabled?: boolean
    checked?: boolean
}

export default function CheckBox({className, checked, disabled, variant, ...props}: CheckBoxProps) {
    return <input checked={checked} disabled={disabled} type='checkbox' {...props} className={cn(checkBoxVariants({variant}), className)} />;
}

const checkBoxVariants = cva(
    'checkbox rounded-full',
    {
        variants: {
            variant: {
                neutral: 'checkbox-neutral',
                primary: 'checkbox-primary',
                secondary: 'checkbox-secondary',
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
)