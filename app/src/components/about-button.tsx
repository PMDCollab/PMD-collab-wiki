import { Link } from "react-router-dom";

export default function AboutButton() {
    return <Link className="my-link" to={'/About'}>
            <button className='my-btn nes-btn'>About</button>
    </Link> 

}