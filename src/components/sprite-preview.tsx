import { XMLParser } from "fast-xml-parser"
import { useCallback, useRef } from "react"
import { MonsterHistory, Sprite } from "../generated/graphql"
import { Dungeon, IPMDCollab } from "../types/enum"
import Lock from "./lock"
import GameContainer from "./phaser/game-container"
import { Card, Grid, Typography } from "@mui/material"

export default function SpritePreview({
  sprite,
  dungeon,
  animDataUrl,
  history
}: {
  sprite: Sprite
  dungeon: Dungeon
  animDataUrl: string
  history: MonsterHistory[]
}) {
  const gameContainer = useRef<GameContainer>()

  const container = useCallback(
    (node: HTMLDivElement) => {
      async function initialize() {
        const xmlData = await (await fetch(animDataUrl)).text()
        const parser = new XMLParser()
        const data = parser.parse(xmlData) as IPMDCollab
        gameContainer.current = new GameContainer(
          node,
          sprite,
          data.AnimData,
          dungeon
        )
      }
      if (node !== null) {
        gameContainer.current?.game.destroy(true)
      }
      initialize()
    },
    [animDataUrl, sprite, dungeon]
  )

  return (
    <Card>
      <div id={`action-${sprite.action}`} ref={container}></div>
      <Grid container justifyContent="center" alignItems="start">
        <Lock
          locked={sprite.locked}
          history={history.filter((e) =>
            e.modifications.includes(sprite.action)
          )}
        />
        <Typography align="center">{sprite.action}</Typography>
      </Grid>
    </Card>
  )
}
