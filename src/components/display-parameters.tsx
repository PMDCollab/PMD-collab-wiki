import { Dispatch, SetStateAction } from "react"

export default function DisplayParameters(props: {
  setShowIndex: Dispatch<SetStateAction<boolean>>
  setPortraitAuthor: Dispatch<SetStateAction<boolean>>
  setSpriteAuthor: Dispatch<SetStateAction<boolean>>
  setShowLastModification: Dispatch<SetStateAction<boolean>>
  setShowPortraitBounty: Dispatch<SetStateAction<boolean>>
  setShowSpriteBounty: Dispatch<SetStateAction<boolean>>
  showPortraitAuthor: boolean
  showSpriteAuthor: boolean
  showIndex: boolean
  showLastModification: boolean
  showPortraitBounty: boolean
  showSpriteBounty: boolean
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: '200px '.repeat(2), justifyItems: 'left', flexFlow: "column", alignItems: "start" }}>
      <label className="my-label">
        <input
          type="checkbox"
          className="nes-checkbox my-cursor"
          checked={props.showIndex}
          onChange={(e) => {
            props.setShowIndex(e.target.checked)
          }}
        />
        <span style={{ fontSize: "0.7em" }}>Index</span>
      </label>
      <label className="my-label">
        <input
          type="checkbox"
          className="nes-checkbox my-cursor"
          checked={props.showPortraitAuthor}
          onChange={(e) => {
            props.setPortraitAuthor(e.target.checked)
          }}
        />
        <span style={{ fontSize: "0.7em" }}>Portrait Author</span>
      </label>
      <label className="my-label">
        <input
          type="checkbox"
          className="nes-checkbox my-cursor"
          checked={props.showSpriteAuthor}
          onChange={(e) => {
            props.setSpriteAuthor(e.target.checked)
          }}
        />
        <span style={{ fontSize: "0.7em" }}>Sprite Author</span>
      </label>
      <label className="my-label">
        <input
          type="checkbox"
          className="nes-checkbox my-cursor"
          checked={props.showLastModification}
          onChange={(e) => {
            props.setShowLastModification(e.target.checked)
          }}
        />
        <span style={{ fontSize: "0.7em" }}>Last Change</span>
      </label>
      <label className="my-label">
        <input
          type="checkbox"
          className="nes-checkbox my-cursor"
          checked={props.showPortraitBounty}
          onChange={(e) => {
            props.setShowPortraitBounty(e.target.checked)
          }}
        />
        <span style={{ fontSize: "0.7em" }}>Portrait Bounty</span>
      </label>
      <label className="my-label">
        <input
          type="checkbox"
          className="nes-checkbox my-cursor"
          checked={props.showSpriteBounty}
          onChange={(e) => {
            props.setShowSpriteBounty(e.target.checked)
          }}
        />
        <span style={{ fontSize: "0.7em" }}>Sprite Bounty</span>
      </label>
    </div>
  )
}
