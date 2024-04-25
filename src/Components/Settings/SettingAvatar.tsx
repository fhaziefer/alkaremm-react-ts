import React, { useState } from 'react';
import Button from '../Ui/Button';
import { apiRemoveAvatar, apiUploadAvatar } from '../../Services/Api/AlkareemApi/patch';
import { env } from '../../Utils/env';
import '../../css/avaLoading.css'

type Props = {
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  avatarNow?: string;
  gender?: string;
  token?: string
};

const SettingAvatar = ({ token, onConfirm, onCancel, ...props }: Props) => {

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(props.avatarNow || '');
  const [errorMessage, setErrorMessage] = useState('');
  const baseUrl = env.REACT_APP_BASE_URL
  const MAX_FILE_SIZE_MB = 1;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(true);
        setErrorMessage(`Maksimal ukuran gambar ${MAX_FILE_SIZE_MB} MB`);
        setIsLoading(false);
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(file);
          setAvatarUrl(reader.result as string);
          setError(false);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        setError(true);
        setErrorMessage('File tidak valid. Mohon gunakan file dengan format JPG, JPEG, atau PNG.');
        setIsLoading(false);
      }
    }
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

  const handleButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (onConfirm) {
      try {
        if (avatar) {
          const changeAvatar = await apiUploadAvatar(token!, avatar);
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
          const removeAvatar = await apiRemoveAvatar({ token });
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

  return (
    <div className="flex flex-col gap-4">
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
            <div className="flex flex-row gap-6 mx-auto">
              <label htmlFor="upload-button" className="text-sm cursor-pointer text-primary hover:font-bold">
                Ganti Foto
              </label>
              <span onClick={handleRemoveAvatar} className="text-sm cursor-pointer text-error hover:font-bold">
                Hapus Foto
              </span>
              <input type="file" id="upload-button" hidden onChange={handleChangeAvatar} />
            </div>
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
        <Button onClick={handleButton} disabled={isLoading || error} variant="primary" className="w-[49%]">
          {isLoading ? <span className="loading loading-spinner loading-md"></span> : 'Simpan'}
        </Button>
      </div>
    </div>
  );
};

export default SettingAvatar;
