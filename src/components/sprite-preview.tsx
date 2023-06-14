import { XMLParser } from "fast-xml-parser"
import { useCallback, useState } from "react"
import { Sprite } from "../generated/graphql"
import { Dungeon, IPMDCollab } from "../types/enum"
import Lock from "./lock"
import GameContainer from "./phaser/game-container"

export default function SpritePreview(props: {
  sprite: Sprite
  dungeon: Dungeon
  animDataUrl: string
}) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const container = useCallback(
    (node: HTMLDivElement) => {
      async function initialize() {
        const xmlData = await (await fetch(props.animDataUrl)).text()
        const parser = new XMLParser()
        const data = parser.parse(xmlData) as IPMDCollab
        new GameContainer(
          node as HTMLDivElement,
          props.sprite,
          data.AnimData,
          props.dungeon
        )
      }

      if (node !== null && !initialized) {
        setInitialized(true)
        initialize()
      }
    },
    [initialized, props.animDataUrl, props.sprite, props.dungeon]
  )

  return (
    <div
      className="my-container nes-container"
      style={{
        display: "flex",
        alignItems: "center",
        flexFlow: "column",
        margin: "10px"
      }}
    >
      <div id={`action-${props.sprite.action}`} ref={container}></div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-around",
          gap: "2px"
        }}
      >
        <Lock locked={props.sprite.locked} />
        <p style={{ fontSize: "0.6em", margin: "0px" }}>
          {props.sprite.action}
        </p>
      </div>
    </div>
  )
}
