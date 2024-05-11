import React, { useState } from 'react';
import Button from '../Ui/Button';
import { apiRemoveAvatar, apiUploadAvatar } from '../../Services/Api/AlkareemApi/patch';
import { env } from '../../Utils/env';
import '../../css/avaLoading.css'
import { apiRemoveAvatarAdmin, apiUploadAvatarAdmin } from '../../Services/Api/AlkareemApi/Admin/patch';
import AvatarCropper from '../Ui/AvatarCropper';
import Modal from '../Ui/Modal';

type Props = {
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  avatarNow?: string;
  gender?: string;
  token?: string
  id?: string;
  isAdmin?: boolean;
};

const SettingAvatar = ({ isAdmin = false, token, onConfirm, onCancel, ...props }: Props) => {

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(props.avatarNow || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [cropOpen, setCropOpen] = useState(false)
  const baseUrl = env.REACT_APP_BASE_URL
  const MAX_FILE_SIZE_MB = 1;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        resizeImage(file);
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const image = new Image();
          image.onload = () => {
            setCropOpen(true);
            setAvatar(file);
            setAvatarUrl(reader.result as string);
            setError(false);
            setIsLoading(false);
          };
          image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        setError(true);
        setErrorMessage('File tidak valid. Mohon gunakan file dengan format JPG, JPEG, atau PNG.');
        setIsLoading(false);
      }
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

  const resizeImage = (file: File) => {
    const MAX_SIZE = 3 * 1024 * 1024; // 1 MB in bytes
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target!.result as string;
  
      img.onload = () => {
        const scaleFactor = Math.min(1, MAX_SIZE / (img.width * img.height));
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob as Blob], file.name, { type: 'image/jpeg' });
          setAvatar(resizedFile);
          setAvatarUrl(URL.createObjectURL(resizedFile));
          setCropOpen(true);
          setIsLoading(false);
        }, 'image/jpeg', 0.9);
      };
    };
  
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setRemove(true);
    setError(false);
    if (props.gender === 'MALE') {
      setAvatarUrl(`${baseUrl}/images/avatar/male.jpg`)
    } else if (props.gender === 'FEMALE') {
      setAvatarUrl(`${baseUrl}/images/avatar/female.jpg`)
    } else {
      setAvatarUrl(`${baseUrl}/images/avatar/unknown.jpg`)
    }
  };

  const handleConfirm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (onConfirm) {
      try {
        if (avatar) {
          if (isAdmin === true) {
            var changeAvatar = await apiUploadAvatarAdmin(props.id!, token!, avatar,);
          } else {
            var changeAvatar = await apiUploadAvatar(token!, avatar);
          }
          if (changeAvatar.status !== 200) {
            setError(true);
            setErrorMessage(changeAvatar);
          } else {
            setError(false)
            setAvatar(null);
            onConfirm(event);
          }
        }

        if (remove) {
          if (isAdmin === true) {
            var removeAvatar = await apiRemoveAvatarAdmin({ token, userId: props.id });
          } else {
            var removeAvatar = await apiRemoveAvatar({ token });
          }
          if (removeAvatar.status !== 200) {
            setError(true);
            setErrorMessage('Gagal menghapus foto profil, coba lagi.');
          } else {
            setAvatar(null);
            onConfirm(event);
          }
        }
      } catch (error) {
        setError(true);
        setErrorMessage('Gagal memperbaharui foto profil, coba lagi.');
      }
    }
    setIsLoading(false);
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onCancel) {
      setAvatarUrl(props.avatarNow)
      onCancel(event);
    }
  };

  const handleCroppedFile = (file: File) => {
    setCroppedFile(file);
  };

  const handleConfirmCrop = () => {
    if (croppedFile) {
      // Update avatar URL with cropped image
      setAvatarUrl(URL.createObjectURL(croppedFile));
      setAvatar(croppedFile)
      // Reset croppedFile state
      setCroppedFile(null);
    }
    setCropOpen(false); // Close crop modal
  };

  const handleCancelCrop = () => {
    setAvatarUrl(props.avatarNow)
    setCroppedFile(null); // Reset croppedFile state
    setCropOpen(false); // Close crop modal
  };

  return (
    <div className="flex flex-col gap-4">
      <Modal
        open={cropOpen}
        onClose={() => setCropOpen((prev) => !prev)}
      >
        <AvatarCropper
          image={avatarUrl}
          onCroppedFile={handleCroppedFile}
          onConfirm={handleConfirmCrop}
          onCancel={handleCancelCrop} />
      </Modal>
      <h1 className="text-3xl font-bold pl-1 mb-4">Foto Profil</h1>

      <div className="flex flex-col gap-4">
        <div className="h-48 flex flex-row mx-auto avatar ">
          {isLoading ?
            <div className="h-48 w-48 rounded-full border-4 border-spin">
              <img src={avatarUrl} alt="Avatar Preview" />
            </div>
            :
            <div className="h-48 w-48 rounded-full">
              <img src={avatarUrl} alt="Avatar Preview" />
            </div>}
        </div>

        <div className="flex-row flex relative">
          <div className="flex flex-col w-[75%] mx-auto gap-4">
            {isLoading ?
              <div className="flex flex-row gap-6 mx-auto">
                <label className="text-sm cursor-not-allowed text-gray-600 font-bold">
                  Ganti Foto
                </label>
                <span className="text-sm cursor-not-allowed text-gray-600 font-bold">
                  Hapus Foto
                </span>
              </div>
              :
              <div className="flex flex-row gap-6 mx-auto">
                <label htmlFor="upload-button" className="text-sm cursor-pointer text-primary hover:font-bold">
                  Ganti Foto
                </label>
                <span onClick={handleRemoveAvatar} className="text-sm cursor-pointer text-error hover:font-bold">
                  Hapus Foto
                </span>
                <input accept="image/jpeg, image/jpg, image/png" type="file" id="upload-button" hidden onChange={handleChangeAvatar} />
              </div>
            }
            <span className="text-xs text-center w-full">
              Gunakan format JPG, JPEG, atau PNG dengan bentuk persegi. Minimal 1.000 piksel per sisi, maksimal ukuran 1 Mb.
            </span>
          </div>
          {error &&
            <span className="text-xs text-center w-full text-red-500 absolute -bottom-6">
              {errorMessage}
            </span>
          }
        </div>
      </div>

      <div className="flex-row flex w-full justify-between my-6">
        <Button onClick={handleCancel} disabled={isLoading} variant="ghost" className="w-[49%]">
          Batal
        </Button>
        <Button onClick={handleConfirm} disabled={isLoading || error} variant="primary" className="w-[49%]">
          {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Simpan'}
        </Button>
      </div>
    </div>
  );
};

export default SettingAvatar;
