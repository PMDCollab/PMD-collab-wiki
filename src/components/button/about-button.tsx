import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function AboutButton() {
  return (
    <Link className="my-btn nes-btn" to={"/About"}>
      <div className="navbar-button-inner">
        <FontAwesomeIcon icon={faCircleInfo} />
        <p className="navbar-text">About</p>
      </div>
    </Link>
  )
}
