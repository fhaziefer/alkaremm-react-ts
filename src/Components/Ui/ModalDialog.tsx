import { useRef } from 'react';
import cn from "classnames"
import { useOnClickOutside } from "usehooks-ts";
import Button from './Button';

type ModalProps = {
    label?: string;
    body?: string;
    btn?: boolean;
    btnYesLabel?: string
    open: boolean;
    onClose(): void;
    onYes: () => void;
}

export default function ModalDialog({ ...props }: ModalProps) {
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
                    <h3 className="font-bold text-lg">{props.label}</h3>
                    <p className="pt-4">{props.body}</p>
                    {props.btn && <div className="modal-action">
                        <form className='flex-row flex w-full justify-between my-6' method="dialog">
                            <Button className='w-[49%]' variant='ghost' onClick={() => props.onClose()}>Tidak</Button>
                            <Button className='w-[49%]' variant='primary' onClick={props.onYes}>{props.btnYesLabel}</Button>
                        </form>
                    </div>}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => props.onClose()}></button>
                </form>
            </dialog>
        </div>
    )
}