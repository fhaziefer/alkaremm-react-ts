import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

const LayoutSideBlank = ({ ...props }: Props) => {
    return (
        <div className='w-[94%] sm:w-[77%] md:w-[77%] lg:w-[57%] mx-auto mt-0 md:mt-16 lg:mt-16'>
            {props.children}
        </div>
    )
}

export default LayoutSideBlank