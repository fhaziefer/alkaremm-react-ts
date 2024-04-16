type Props = {
    label?: string;
    data?: Data[];
    disabled?: boolean;
    loading?: boolean;
    onClicked?: (id: string, text: string) => void;
};

type Data = {
    id?: string;
    text?: string;
};

const DropdownOption = ({ ...props }: Props) => {

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedText = props.data?.find(data => data.id === selectedId)?.text || ''; // Mendapatkan teks terkait dengan ID terpilih
        if (props.onClicked) {
            props.onClicked(selectedId || "", selectedText);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            {props.disabled ?
                <select
                    className="select w-full max-w-xs"
                    disabled>
                    <option>
                        {props.label}
                    </option>
                </select> :
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleSelectChange}>
                    <option disabled selected>
                        {props.label}
                    </option>
                    {props.data?.map((data) => (
                        <option
                            key={data.id}
                            value={data.id}>
                            {data.text}
                        </option>
                    ))}
                </select>
            }
            {props.loading ? <span className="loading loading-spinner loading-md"></span> : null}
        </div>
    );
};

export default DropdownOption;
