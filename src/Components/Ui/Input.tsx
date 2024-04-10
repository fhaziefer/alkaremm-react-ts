import React from 'react'
import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
    variant?: 'primary' | 'secondary' | 'error';
    disabled?: boolean
    placeholder?: string
    type?: string
    value?: string
}

export default function Input({className, disabled, variant, placeholder, type, value, ...props}: InputProps) {
    return <input value={value} disabled={disabled} placeholder={placeholder} type={type} {...props} className={cn(inputVariants({variant}), className)} />;
}

const inputVariants = cva(
    'input',
    {
        variants: {
            variant: {
                primary: 'input input-bordered w-full max-w-xs',
                secondary: 'input w-full max-w-xs',
                error: 'input input-bordered input-error w-full max-w-xs'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
)