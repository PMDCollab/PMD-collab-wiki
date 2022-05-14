import { Link } from "react-router-dom";

export default function HomeButton(){
    return <Link className="my-link" to={'/'}>
        <button style={{fontSize:'.8em'}} className='my-btn nes-btn is-primary'>Home</button>
    </Link>
}