import { getGreeting } from '../../Utils/birthdayConverter';

interface Props {
    name?: string
}

const GreetingTime = ({...props}:Props) => {
    const greeting = getGreeting();
    return (
        <div className="font-bold text-4xl my-4">
            <h1>
                Selamat {greeting},
            </h1>
            <h1>
                {props.name}.
            </h1>
        </div>
    )
}

export default GreetingTime