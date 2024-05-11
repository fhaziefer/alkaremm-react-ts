import React, { useEffect, useState } from 'react';
import { Cropper, CropperRef, CropperState, DefaultSettings, FixedCropper, getTransformedImageSize, ImageRestriction, retrieveSizeRestrictions } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import Button from './Button';

type Props = {
    image?: string;
    onCroppedFile?: (file: File) => void;
    onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const AvatarCropper = ({ onConfirm, onCancel, onCroppedFile, ...props }: Props) => {
    const [src, setSrc] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        if (props.image) {
            setSrc(props.image!)
        }
    }, [props.image])

    const onChange = (cropper: CropperRef) => {
        const canvas = cropper.getCanvas();
        if (canvas) {
            const dataURL = canvas?.toDataURL('image/jpeg', 0.9);
            const blob = dataURLtoBlob(dataURL);
            const file = new File([blob], "cropped_image.jpeg", { type: 'image/jpeg' });

            if (file.size > 1 * 1024 * 1024) { // 1 MB in bytes
                resizeImage(canvas, file);
            } else {
                if (onCroppedFile) {
                    onCroppedFile(file);
                }
            }
        }
    };

    const resizeImage = (canvas: HTMLCanvasElement, file: File) => {
        const MAX_SIZE = 1024 * 1024; // 1 MB in bytes
        const ctx = canvas.getContext('2d')!;
        const quality = 0.9; // Compression quality

        const dataURL = canvas.toDataURL('image/jpeg', quality);

        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const scaleFactor = Math.sqrt(MAX_SIZE / (width * height));

            const resizedCanvas = document.createElement('canvas');
            resizedCanvas.width = width * scaleFactor;
            resizedCanvas.height = height * scaleFactor;

            const resizedCtx = resizedCanvas.getContext('2d')!;
            resizedCtx.drawImage(img, 0, 0, resizedCanvas.width, resizedCanvas.height);

            const resizedDataURL = resizedCanvas.toDataURL('image/jpeg', quality);
            const resizedBlob = dataURLtoBlob(resizedDataURL);

            const resizedFile = new File([resizedBlob], "cropped_image.jpeg", { type: 'image/jpeg' });

            if (onCroppedFile) {
                onCroppedFile(resizedFile);
            }
        };
    };


    const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        if (onConfirm) {
            onConfirm(event)
            setIsLoading(false)
        }
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onCancel) {
            onCancel(event);
        }
    };

    const dataURLtoBlob = (dataURL: string) => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    };

    return (
        <div className='flex flex-col gap-4'>
            <FixedCropper
                className='items-center w-full h-96 mx-auto rounded-3xl'
                onChange={onChange}
                src={src}
                stencilSize={{
                    width: 300,
                    height: 300
                }}
                stencilProps={{
                    handlers: false,
                    grid: true,
                    lines: false,
                    movable: false,
                    resizable: false
                }}
                imageRestriction={ImageRestriction.stencil}
            />
            <div className="flex-row flex w-full justify-between my-6">
                <Button onClick={handleCancel} disabled={isLoading} variant="ghost" className="w-[49%]">
                    Batal
                </Button>
                <Button onClick={handleButton} disabled={isLoading || error} variant="primary" className="w-[49%]">
                    {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Simpan'}
                </Button>
            </div>
        </div>
    )
};

export default AvatarCropper