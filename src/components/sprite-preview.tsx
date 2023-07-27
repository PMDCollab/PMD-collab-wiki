import { XMLParser } from "fast-xml-parser"
import { useCallback, useState } from "react"
import { Sprite } from "../generated/graphql"
import { Dungeon, IPMDCollab } from "../types/enum"
import Lock from "./lock"
import GameContainer from "./phaser/game-container"
import { Card, Grid, Typography } from "@mui/material"

export default function SpritePreview({ sprite, dungeon, animDataUrl }: {
  sprite: Sprite
  dungeon: Dungeon
  animDataUrl: string
}) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const container = useCallback(
    (node: HTMLDivElement) => {
      async function initialize() {
        const xmlData = await (await fetch(animDataUrl)).text()
        const parser = new XMLParser()
        const data = parser.parse(xmlData) as IPMDCollab
        new GameContainer(
          node as HTMLDivElement,
          sprite,
          data.AnimData,
          dungeon
        )
      }

      if (node !== null && !initialized) {
        setInitialized(true)
        initialize()
      }
    },
    [initialized, animDataUrl, sprite, dungeon]
  )

  return (
    <Card>
      <div id={`action-${sprite.action}`} ref={container}></div>
      <Grid container justifyContent="center" alignItems="start">
        <Lock locked={sprite.locked} />
        <Typography align="center" color="GrayText">
          {sprite.action}
        </Typography>
      </Grid>
    </Card>
  )
}
