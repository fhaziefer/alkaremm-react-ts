import { useEffect, useState } from "react"
import { ICountTotalUsers } from '../../Types/Alkareem/RES/CountUser'
import { apiCountUser } from '../../Services/Api/AlkareemApi/get'
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import CountUser from './CountUser'
import Loading from '../Loading'
import { getDayNowString, getFullDateNow } from "../../Utils/birthdayConverter"

interface Props {
    label?: string
}

const CarouselCountUser = ({ ...props }: Props) => {

    const { getItem } = useLocalStorage()
    const token = getItem('token')
    const dateNow = getFullDateNow()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [countUser, setCountUser] = useState<ICountTotalUsers | null>(null)

    const fetchTotalUser = async () => {
        setIsLoading(true)
        const data = await apiCountUser({ token: token })
        if (data.status !== 200) {
            setError(true)
            setIsLoading(false)
            return data
        } else {
            setCountUser(data.data)
            setError(false)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTotalUser()
    }, [token])


    return (
        <>
            {isLoading ? <Loading /> :
                <div className="flex flex-col items-center gap-1 my-8 bg-base-200 rounded-box py-4 border border-gray-500 shadow">
                    {props.label && <><h1 className="font-bold text-2xl text-center max-w-[80%] mt-4">{props.label}</h1> <h1 className="text-xs italic text-gray-500">(Terakhir diperbaharui: {dateNow})</h1></>}
                    {error ? <span className="text-error my-10 font-bold text-xl">Error, tidak dapat memuat data</span> :
                        <div className="w-full carousel rounded-box bg-base-200">
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Abdul Karim"
                                    number={countUser?.data.totalUser}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Hannah"
                                    number={countUser?.data.totalHannah}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Salamah"
                                    number={countUser?.data.totalSalamah}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Aisyah"
                                    number={countUser?.data.totalAisyah}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Maryam"
                                    number={countUser?.data.totalMaryam}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Zainab"
                                    number={countUser?.data.totalZainab}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Bani Qomariyah"
                                    number={countUser?.data.totalQomariyah}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Masih Hidup"
                                    number={countUser?.data.totalAlive}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Sudah Wafat"
                                    number={countUser?.data.totalDeath}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Laki-laki"
                                    number={countUser?.data.totalMale}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Perempuan"
                                    number={countUser?.data.totalFemale}
                                    sublabel="Orang"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    number={countUser?.data.totalFamily}
                                    sublabel="Keluarga"
                                />
                            </div>
                            <div className="carousel-item">
                                <CountUser
                                    label="Belum Menikah"
                                    number={countUser?.data.totalSingle}
                                    sublabel="Orang"
                                />
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default CarouselCountUser