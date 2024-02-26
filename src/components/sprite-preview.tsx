import { useCallback, useRef } from "react"
import { MonsterHistory, Sprite } from "../generated/graphql"
import { Dungeon, IPMDCollab } from "../types/enum"
import Lock from "./lock"
import GameContainer from "./phaser/game-container"
import { Card, Grid, Typography } from "@mui/material"

interface Props {
  sprite: Sprite
  dungeon: Dungeon
  animDataXml: string
  history: MonsterHistory[]
}
export default function SpritePreview({ sprite, dungeon, animDataXml, history }: Props) {
  const gameContainer = useRef<GameContainer>()

  const container = useCallback(
    (node: HTMLDivElement) => {
      async function initialize() {
        gameContainer.current = new GameContainer(
          node,
          sprite,
          animDataXml.AnimData,
          dungeon
        )
      }

      // TODO: the phaser instance isn't being destroyed on page change, this seriously needs to be fixed
      if (node !== null) {
        gameContainer.current?.game.destroy(true)
      }

      initialize()
    },
    [animDataXml, sprite, dungeon]
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
