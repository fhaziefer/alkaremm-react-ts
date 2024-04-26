import React, { useEffect, useState } from 'react'

interface Props {
    label?: string,
    sublabel?: string,
    number?: number
    initialValue?: number
}

const CountUser = ({ ...props }: Props) => {
    props.initialValue = 0
    const [count, setCount] = useState(props.initialValue);
    const duration = 3000;

    useEffect(() => {
        let startValue = props.initialValue;
        const interval = Math.floor(
            duration / (props.number! - props.initialValue!));

        const counter = setInterval(() => {
            startValue! += 1;
            setCount(startValue!);
            if (startValue! >= props.number!) {
                clearInterval(counter);
            }
        }, interval);

        return () => {
            clearInterval(counter);
        };
    }, [props.number, props.initialValue]);
    return (
        <>
            <div className="w-auto mx-3 flex flex-col items-center my-4">
                {props.number &&
                    <h1 className="text-6xl font-bold text-primary">
                        {count}
                    </h1>
                }
                {props.sublabel &&
                    <h1 className='text-xs italic'>{props.sublabel}</h1>
                }
                {props.label &&
                    <h1 className='text-xs'>{props.label}</h1>
                }
            </div>
        </>
    )
}

export default CountUser