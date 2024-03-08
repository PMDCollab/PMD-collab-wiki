import { Card, Grid, Typography } from "@mui/material"
import { MonsterHistory, Sprite } from "../generated/graphql"
import { Dungeon, IAnimData } from "../types/enum"
import Lock from "./lock"
import { SpriteContainer } from "./sprite-container"

interface Props {
  sprite: Sprite
  dungeon: Dungeon
  animationData: IAnimData
  history: MonsterHistory[]
  infoKey: number
}
export default function SpritePreview({
  sprite,
  dungeon,
  animationData,
  history
}: Props) {
  return (
    <Card>
      <SpriteContainer
        dungeon={dungeon}
        animationData={animationData}
        sprite={sprite}
      />
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
