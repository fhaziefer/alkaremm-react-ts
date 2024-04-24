import React, { useEffect, useRef, useState } from 'react';
import Input from './Input';
import { useDebounce } from '../../Hooks/useDebounce';
import Button from './Button';
import { RxCross2 } from "react-icons/rx";

interface Props {
    data?: Data[]
    label?: string
    disabled?: boolean;
    loading?: boolean;
    helper?: string;
    placeholder?: string
    index?: number
    onClicked?: (id: string, text: string) => void;
    onQueryChange?: (query: string) => void;
}

interface Data {
    id?: string;
    bani_name?: string;
    string?: string;
    name?: string;
    text?: string;
}

const AutoComplete = ({ index, helper, label, data, placeholder, disabled = false, onClicked, onQueryChange }: Props & { index: number }) => {
    const [query, setQuery] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [string, setString] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const debouncedQuery = useDebounce(query);
    const autoCompleteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target as Node)) {
                clearContent();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuery(value);
        setString(value);
        setIsOpen(value.length > 3);
        onQueryChange?.(value);
    };

    const handleItemClick = (id?: string, text?: string) => {
        setIsOpen(false);
        setString(text!)
        setId(id!)
        onClicked?.(id!, text!)
    };

    const clearContent = () => {
        setQuery('')
        setString('')
        setId('')
        setString('')
        setIsOpen(false)
    }

    const filteredData = data?.filter(item =>
        item.bani_name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.text?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.string?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const containerHeight = filteredData && filteredData.length > 0 ? Math.min(filteredData.length * 55, 200) : 55;

    return (
        <div ref={autoCompleteRef} className={`relative z-[${index}]`}>
            {label && <h1 className='mb-2 text-sm'>{label}</h1>}
            <Input className='text-sm' disabled={disabled} placeholder={placeholder} onChange={handleChangeInput} value={string} />
            {helper && isOpen && <span className='text-xs text-gray-500 font italic absolute right-2 top-0'>{helper}</span>}
            {isOpen && <Button onClick={clearContent} variant='ghost' className='absolute rounded-full right-0'><RxCross2 /></Button>}
            {isOpen && (
                <div className={`absolute order-first top-full left-0 right-0 overflow-y-auto rounded-b-xl border border-gray-700 bg-base-100`} style={{ maxHeight: 120, height: containerHeight }}>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
                        {filteredData?.map((item) => (
                            <React.Fragment key={item.id}>
                                <li><a onClick={() => handleItemClick(item.id, item.bani_name || item.name || item.text)}>{item.bani_name || item.name || item.text || item.string}</a></li>
                                <div className='border-b border-gray-700 bg-base-100'></div>
                            </React.Fragment>
                        ))}
                        {filteredData?.length === 0 && <li><a>Data tidak ditemukan</a></li>}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default AutoComplete;
