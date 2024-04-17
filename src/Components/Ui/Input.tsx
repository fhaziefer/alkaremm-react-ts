import React from 'react'
import { cva } from 'class-variance-authority';
import { cn } from '../../Utils/cn';

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
    variant?: 'primary' | 'secondary' | 'error' | 'join'; 
    disabled?: boolean
    placeholder?: string
    type?: string
    value?: string
}

export default function Input({className, disabled, variant, placeholder, type, value, ...props}: InputProps) {
    return <input value={value} disabled={disabled} placeholder={placeholder} type={type} {...props} className={cn(inputVariants({variant}), className)} />;
}

const inputVariants = cva(
    '',
    {
        variants: {
            variant: {
                primary: 'input input-bordered w-full',
                secondary: 'input w-full',
                error: 'input input-bordered input-error w-full',
                join: 'input focus:border-none join-item'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
)