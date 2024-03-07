import { Card, Grid, Typography } from "@mui/material"
import { MonsterHistory, Sprite } from "../generated/graphql"
import { Dungeon } from "../types/enum"
import Lock from "./lock"
import { SpriteContainer } from "./sprite-container"

interface Props {
  sprite: Sprite
  dungeon: Dungeon
  animDataXml: string
  history: MonsterHistory[]
  infoKey: number
}
export default function SpritePreview({
  sprite,
  dungeon,
  animDataXml,
  history
}: Props) {
  return (
    <Card>
      <SpriteContainer
        dungeon={dungeon}
        animDataXml={animDataXml}
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
