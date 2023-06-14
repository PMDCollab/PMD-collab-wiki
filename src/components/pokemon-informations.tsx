import Credits from "./credits"
import Emotions from "./emotions"
import { formatDate } from "./pokemon-thumbnail"
import SpritePreview from "./sprite-preview"
import { Dungeon } from "../types/enum"
import { useRef } from "react"
import { MonsterForm } from "../generated/graphql"
import Bounty from "./bounty"

export default function PokemonInformations(props: {
  info: MonsterForm
  infoKey: number
}) {
  const bg = useRef<Dungeon>(
    Object.keys(Dungeon)[
      Math.floor(Math.random() * Object.keys(Dungeon).length)
    ] as Dungeon
  )
  const portraitDate = props.info.portraits.modifiedDate
    ? new Date(props.info.portraits.modifiedDate)
    : undefined
  const spriteDate = props.info.sprites.modifiedDate
    ? new Date(props.info.sprites.modifiedDate)
    : undefined
  const portraitSheetUrl = props.info.portraits.sheetUrl ? (
    <a
      target="_blank"
      style={{ fontSize: "0.6em", marginRight: "5%" }}
      className="nes-text is-primary"
      href={props.info.portraits.sheetUrl}
      rel="noreferrer"
    >
      Download all portraits
    </a>
  ) : null
  const portraitRecolorSheetUrl = props.info.portraits.recolorSheetUrl ? (
    <a
      target="_blank"
      style={{ fontSize: "0.6em" }}
      className="nes-text is-primary"
      href={props.info.portraits.recolorSheetUrl}
      rel="noreferrer"
    >
      Download recolor portraits
    </a>
  ) : null
  const zipUrl = props.info.sprites.zipUrl ? (
    <a
      target="_blank"
      style={{ fontSize: "0.6em", marginRight: "5%" }}
      className="nes-text is-primary"
      href={props.info.sprites.zipUrl}
      rel="noreferrer"
    >
      Download all sprites
    </a>
  ) : null
  const spriteRecolorSheetUrl = props.info.sprites.recolorSheetUrl ? (
    <a
      target="_blank"
      style={{ fontSize: "0.6em" }}
      className="nes-text is-primary"
      href={props.info.sprites.recolorSheetUrl}
      rel="noreferrer"
    >
      Download recolor sprites
    </a>
  ) : null
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <div>
            <h4 style={{ textAlign: "left" }}>Portraits</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <p
                style={{
                  textAlign: "left",
                  fontSize: "0.6em",
                  margin: "0px",
                  width: "min-content"
                }}
              >
                {getLastModification(portraitDate)}
              </p>
              <Bounty bounty={props.info.portraits.bounty} />
            </div>
          </div>

          {portraitSheetUrl}
          {portraitRecolorSheetUrl}
        </div>
        <Credits
          primary={props.info.portraits.creditPrimary}
          secondary={props.info.portraits.creditSecondary}
        />
      </div>
      {props.info.portraits.emotions.length !== 0 ? (
        <Emotions
          emotions={props.info.portraits.emotions.concat(
            props.info.portraits.emotionsFlipped
              ? props.info.portraits.emotionsFlipped
              : []
          )}
        />
      ) : (
        <p>No portraits available for now.</p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <div>
            <h4 style={{ textAlign: "left" }}>Sprites</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <p
                style={{
                  textAlign: "left",
                  fontSize: "0.6em",
                  margin: "0px",
                  width: "min-content"
                }}
              >
                {getLastModification(spriteDate)}
              </p>
              <Bounty bounty={props.info.sprites.bounty} />
            </div>
          </div>

          {zipUrl}
          {spriteRecolorSheetUrl}
        </div>
        <Credits
          primary={props.info.sprites.creditPrimary}
          secondary={props.info.sprites.creditSecondary}
        />
      </div>
      {props.info.sprites.actions.length !== 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {props.info.sprites.actions.map((k) =>
            k.__typename === "Sprite" && props.info.sprites.animDataXml ? (
              <SpritePreview
                key={k.action}
                dungeon={bg.current}
                sprite={k}
                animDataUrl={props.info.sprites.animDataXml}
              />
            ) : null
          )}
        </div>
      ) : (
        <p>No sprites available for now.</p>
      )}
    </div>
  )
}

function getLastModification(t: Date | undefined) {
  if (t) {
    return "Modified at " + formatDate(t.getTime())
  }
  return ""
}
