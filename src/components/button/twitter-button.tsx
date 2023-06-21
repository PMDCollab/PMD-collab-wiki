import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Twitter() {
  return (
    <a
      href="https://twitter.com/PMD_Spritebot"
      target="_blank"
      className="my-btn nes-btn twitter-button"
    >
      <div className="navbar-button-inner">
        <FontAwesomeIcon icon={faTwitter} />
        <p className="navbar-text">Twitter</p>
      </div>
    </a>
  )
}
