import AboutButton from "./about-button"
import DiscordButton from "./discord-button"
import HomeButton from "./home-button"

export default function Buttons(){
    return <div style={{display:'flex'}}>
        <HomeButton/>
        <DiscordButton/>
        <AboutButton/>
    </div>
}