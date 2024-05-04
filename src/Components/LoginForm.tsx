import Input from './Ui/Input'

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
                className='text-sm'
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
                className='text-sm'
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