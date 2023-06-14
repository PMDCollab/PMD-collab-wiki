import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function AboutButton() {
  return (
    <Link className="my-link" to={"/About"}>
      <button style={{ fontSize: ".8em" }} className="my-btn nes-btn">
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <FontAwesomeIcon icon={faSearch} />
          <p style={{ margin: "0px", marginLeft: "5px" }}>About</p>
        </div>
      </button>
    </Link>
  )
}
