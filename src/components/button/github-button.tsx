import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function GithubButton() {
  return (
    <a
      href="https://github.com/PMDCollab/SpriteCollab"
      target="_blank"
      className="my-btn nes-btn"
    >
      <div className="navbar-button-inner">
      <FontAwesomeIcon icon={faGithub} />
        <p className="navbar-text">Github</p>
      </div>
    </a>
  )
}
