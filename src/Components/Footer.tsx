import { env } from "../Utils/env";
import { getYearNow } from "../Utils/birthdayConverter";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

    const year = getYearNow()
    const instagram = env.REACT_APP_INSTAGRAM_URL
    const twitter = env.REACT_APP_TWITTER_URL
    const youtube = env.REACT_APP_YOUTUBE_URL
    const facebook = env.REACT_APP_FACEBOOK_URL

    return (
        <footer className="footer p-10 text-neutral-content">
            <aside>
                <img className="w-16 h-16 fill-gray-400" src="logo.png" alt="logo" />
                <p><b>Alkareem</b><br />Official Website of Bani KH. Abdul Karim Lirboyo<br />Copyright Ⓒ {year}</p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href={instagram}><FaInstagram className="h-6 w-6 hover:text-rose-400"/></a>
                    <a href={twitter}><FaXTwitter className="h-6 w-6 hover:text-white"/></a>
                    <a href={facebook}><FaFacebook className="h-6 w-6 hover:text-blue-500"/></a>
                    <a href={youtube}><FaYoutube className="h-6 w-6 hover:text-red-600"/></a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer