import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

export default function DiscordButton() {
  return (
    <a
      href="https://discord.gg/skytemple"
      target="_blank"
      className="my-btn nes-btn discord-button"
    >
      <div className="navbar-button-inner">
        <FontAwesomeIcon icon={faDiscord} />
        <p className="navbar-text">Discord</p>
      </div>
    </a>
  )
}
