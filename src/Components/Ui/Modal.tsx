import { useRef } from 'react';
import cn from "classnames"
import { useOnClickOutside } from "usehooks-ts";

type ModalProps = {
    label?: string;
    body?: string;
    open: boolean;
    onClose(): void;
}

export default function Modal({ open, onClose, label, body }: ModalProps) {
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        onClose();
    });
    const modalClass = cn({
        "modal modal-bottom sm:modal-middle": true,
        "modal-open": open,
    });
    return (
        <div>
            <dialog className={modalClass}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{label}</h3>
                    <p className="py-4">{body}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => onClose()}></button>
                </form>
            </dialog>
        </div>
    )
}