import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function HomeButton() {
  return (
    <Link className="my-link" to={"/"}>
      <button
        style={{ fontSize: ".8em" }}
        className="my-btn nes-btn is-warning"
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <FontAwesomeIcon icon={faHome} />
          <p style={{ margin: "0px", marginLeft: "5px" }}>Home</p>
        </div>
      </button>
    </Link>
  )
}
