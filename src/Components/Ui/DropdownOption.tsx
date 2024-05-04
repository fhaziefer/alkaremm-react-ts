type Props = {
    label: string;
    data?: Data[];
    disabled?: boolean;
    loading?: boolean;
    onClicked?: (id: any, text: string) => void;
};

type Data = {
    id?: any;
    text?: string;
};

const DropdownOption = ({ label, data, disabled = false, loading = false, onClicked }: Props) => {

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedText = data?.find(data => data.id === selectedId)?.text || '';
        if (onClicked) {
            onClicked(selectedId || "", selectedText);
        }
    };

    return (
        <div className="flex flex-row gap-2 w-full">
            <select
                className={`select ${disabled ? 'select-disabled' : 'select-bordered'} flex w-[100%]`}
                onChange={handleSelectChange}
                disabled={disabled}
                defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>
                    {label}
                </option>
                {data?.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>
                        {item.text}
                    </option>
                ))}
            </select>
            {loading && <span className="loading loading-spinner loading-md"></span>}
        </div>
    );
};

export default DropdownOption;
