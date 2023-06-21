import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function HomeButton() {
  return (
    <Link className="my-btn nes-btn is-warning" to={"/"}>
      <div className="navbar-button-inner">
        <FontAwesomeIcon icon={faHome} />
        <p className="navbar-text">Home</p>
      </div>
    </Link>
  )
}
