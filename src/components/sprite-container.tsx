import { AnimatedSprite, Sprite, Stage, Text } from "@pixi/react"
import { BaseTexture, SCALE_MODES, TextStyle } from "pixi.js"
import { Sprite as SpriteQL } from "../generated/graphql"
import { useSprite } from "../hooks/useSprite"
import { Dungeon, IAnim, IAnimData } from "../types/enum"

BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST

export const SpriteContainer = (props: {
  dungeon: Dungeon
  animationData: IAnimData
  sprite: SpriteQL
}) => {
  const metadata = props.animationData.Anims.Anim.find(
    ({ Name }) => Name === props.sprite.action
  )
  const metadataDurations = metadata?.Durations?.Duration
  const durationArray = metadataDurations
    ? Array.isArray(metadataDurations)
      ? metadataDurations
      : [metadataDurations]
    : undefined

  const animUrl = props.sprite.animUrl
  const action = props.sprite.action
  const shadowsUrl = props.sprite.shadowsUrl

  return metadata && durationArray ? (
    <Stage width={200} height={200}>
      <Sprite
        image={`/maps/${props.dungeon}.png`}
        x={100}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={2}
      />
      <AnimatedPokemon
        metadata={metadata}
        sprite={props.sprite}
        durationArray={durationArray}
        animUrl={animUrl}
        shadowsUrl={shadowsUrl}
        action={action}
      />
    </Stage>
  ) : null
}

const AnimatedPokemon = (props: {
  metadata: IAnim
  sprite: SpriteQL
  durationArray: number[]
  animUrl: string
  shadowsUrl: string
  action: string
}) => {
  const { FrameWidth: frameWidth, FrameHeight: frameHeight } = props.metadata

  const pokemon = useSprite(
    props.animUrl,
    frameWidth,
    frameHeight,
    props.durationArray
  )
  const shadow = useSprite(
    props.shadowsUrl,
    frameWidth,
    frameHeight,
    props.durationArray
  )

  return (!pokemon.isLoading || !shadow.isLoading) &&
    shadow.frames &&
    pokemon.frames ? (
    <>
      <AnimatedSprite
        isPlaying={true}
        x={100}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        textures={shadow.frames}
        scale={2}
        name="shadow"
      />
      <AnimatedSprite
        isPlaying={true}
        x={100}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        textures={pokemon.frames}
        scale={2}
        name="pokemon"
      />
    </>
  ) : (
    <Text
      text="Loading"
      x={100}
      y={100}
      anchor={{ x: 0.5, y: 0.5 }}
      style={
        new TextStyle({
          fontFamily: "wonderMail",
          fontSize: 30,
          fill: ["#fff"],
          stroke: "#000",
          strokeThickness: 1
        })
      }
    />
  )
}
