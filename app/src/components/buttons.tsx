import HomeButton from "./home-button";

export default function Buttons(){
    return <div style={{display:'flex'}}>
        <HomeButton/>
        <button className='my-btn nes-btn'>Join Discord</button>
        <button className='my-btn nes-btn'>About</button>
    </div>
}