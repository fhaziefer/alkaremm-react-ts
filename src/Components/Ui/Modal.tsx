import { ReactElement, useRef } from 'react';
import cn from "classnames"
import { useOnClickOutside } from "usehooks-ts";

type ModalProps = {
    label?: string;
    body?: string;
    open: boolean;
    onClose(): void;
    children?: ReactElement
}

export default function Modal({ ...props }: ModalProps) {
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        props.onClose();
    });
    const modalClass = cn({
        "modal modal-bottom sm:modal-middle": true,
        "modal-open": props.open,
    });
    return (
        <div>
            <dialog className={modalClass}>
                <div className="modal-box">
                    {props.label && <h3 className="font-bold text-lg">{props.label}</h3>}
                    {props.body && <p className="py-4">{props.body}</p>}
                    {props.children}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => props.onClose()}></button>
                </form>
            </dialog>
        </div>
    )
}