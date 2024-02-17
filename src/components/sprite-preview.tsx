import { useCallback, useRef } from "react"
import { MonsterHistory, Sprite } from "../generated/graphql"
import { Dungeon, IPMDCollab } from "../types/enum"
import Lock from "./lock"
import GameContainer from "./phaser/game-container"
import { Card, Grid, Typography } from "@mui/material"

interface Props {
  sprite: Sprite
  dungeon: Dungeon
  animData: IPMDCollab
  history: MonsterHistory[]
}
export default function SpritePreview({ sprite, dungeon, animData, history }: Props) {
  const gameContainer = useRef<GameContainer>()

  const container = useCallback(
    (node: HTMLDivElement) => {
      async function initialize() {
        gameContainer.current = new GameContainer(
          node,
          sprite,
          animData.AnimData,
          dungeon
        )
      }

      if (node !== null) {
        gameContainer.current?.game.destroy(true)
      }

      initialize()
    },
    [animData, sprite, dungeon]
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
