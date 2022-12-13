import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"

export default function DiscordButton() {
  return (
    <a
      style={{ fontSize: ".8em" }}
      href="https://discord.gg/skytemple"
      target="_blank"
      className="my-btn nes-btn is-primary"
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <FontAwesomeIcon icon={faGamepad} />
        <p style={{ margin: "0px", marginLeft: "5px" }}>Discord</p>
      </div>
    </a>
  )
}
