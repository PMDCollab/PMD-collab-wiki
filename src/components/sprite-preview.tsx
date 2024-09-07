import { useCallback, useRef } from "react"
import { CopyOf, MonsterHistory, Sprite, SpriteUnion } from "../generated/graphql"
import { Dungeon, IPMDCollab } from "../types/enum"
import Lock from "./lock"
import GameContainer from "./phaser/game-container"
import { Card, Grid, Typography } from "@mui/material"
import { XMLParser } from 'fast-xml-parser'

interface Props {
  actions: SpriteUnion[]
  sprite: SpriteUnion
  dungeon: Dungeon
  animDataXml: string
  history: MonsterHistory[]
  phaserWindows: GameContainer[]
}

// TODO: move util function somewhere else perhaps? it's only for type checking
const isCopyOf = (sprite: SpriteUnion): sprite is CopyOf => sprite.__typename === "CopyOf";
function getOriginalSprite(sprite: SpriteUnion, actions: SpriteUnion[]): Sprite {
  if (isCopyOf(sprite)) {
    return getOriginalSprite(actions.find(action => action.action === sprite.copyOf)!, actions);
  }
  return sprite;
}

export default function SpritePreview({ actions, sprite, dungeon, animDataXml, history, phaserWindows }: Props) {
  const gameContainer = useRef<GameContainer>()

  const container = useCallback(
    (node: HTMLDivElement) => {
      async function initialize() {
        const xmlData = await (await fetch(animDataXml)).text();
        const parser = new XMLParser();
        const data = parser.parse(xmlData) as IPMDCollab;
        const mainSprite = getOriginalSprite(sprite, actions);
        gameContainer.current = new GameContainer(
          node,
          mainSprite,
          data.AnimData,
          dungeon
        )
        phaserWindows.push(gameContainer.current);
      }

      if (node !== null) {
        gameContainer.current?.game.destroy(true)
        initialize()
      }
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
