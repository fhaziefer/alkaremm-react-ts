import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type CheckBoxProps = React.HTMLAttributes<HTMLInputElement> & {
    variant?: 'primary' | 'secondary' | 'neutral';
    size?: 'tiny' | 'medium' | 'large';
    disabled?: boolean
    checked?: boolean
    id?: string | number
    onChange? : React.ChangeEvent<HTMLInputElement> | any
}

export default function CheckBox({className, checked, disabled, variant, size, ...props}: CheckBoxProps) {
    return <input onChange={props.onChange} id={props.id} checked={checked} disabled={disabled} type='checkbox' {...props} className={cn(checkBoxVariants({variant, size}), className)} />;
}

const checkBoxVariants = cva(
    'checkbox rounded-full',
    {
        variants: {
            variant: {
                neutral: 'checkbox-neutral',
                primary: 'checkbox-primary',
                secondary: 'checkbox-secondary',
            },
            size : {
                tiny: 'checkbox-xs',
                medium:'checkbox-sm',
                large: 'checkbox-lg'
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'medium'
        }
    }
)