import { useState } from 'react';
import CheckBox from './Ui/CheckBox';
import Input from './Ui/Input'
import Button from './Ui/Button';

const LoginForm = ({ username, setUsername, password, setPassword }: any) => {

    const handleUsername = (event: any) => {
        const inputUsername = event.value.toLowerCase()
        setUsername(inputUsername);
    };

    const handlePassword = (event: any) => {
        setPassword(event.value)
    };

    return (
        <div className='flex flex-col gap-4 items-center my-4 mx-4'>
            <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) =>
                    handleUsername(
                        (e.target as HTMLInputElement)
                    )
                }
            />
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) =>
                    handlePassword(
                        (e.target as HTMLInputElement)
                    )
                }
            />
        </div>
    )
}

export default LoginForm