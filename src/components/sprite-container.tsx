import { AnimatedSprite, Sprite, Stage, Text } from "@pixi/react"
import { XMLParser } from "fast-xml-parser"
import {
  Assets,
  BaseTexture,
  FrameObject,
  ISpritesheetFrameData,
  SCALE_MODES,
  Spritesheet,
  Texture,
  utils
} from "pixi.js"
import { Suspense, useEffect, useState } from "react"
import { Sprite as SpriteQL } from "../generated/graphql"
import { AnimationType, Dungeon, IAnimData, IPMDCollab } from "../types/enum"

BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST

export const SpriteContainer = (props: {
  dungeon: Dungeon
  animDataXml: string
  sprite: SpriteQL
}) => {
  return (
    <Stage
      width={200}
      height={200}
      onUnmount={() => {
        utils.clearTextureCache()
      }}
    >
      <Sprite
        image={`/maps/${props.dungeon}.png`}
        x={100}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={2}
      />
      <Suspense
        fallback={<Text text="Loading..." anchor={0.5} x={100} y={100} />}
      >
        <AnimatedSpriteContainer
          animDataXml={props.animDataXml}
          sprite={props.sprite}
        />
      </Suspense>
    </Stage>
  )
}

const AnimatedSpriteContainer = (props: {
  animDataXml: string
  sprite: SpriteQL
}) => {
  const [data, setData] = useState<null | IPMDCollab>(null)
  useEffect(() => {
    const fetchData = fetchXml(props.animDataXml)
    setData(fetchData)
  }, [])
  return data?.AnimData ? (
    <AnimatedPokemon animationData={data.AnimData} sprite={props.sprite} />
  ) : null
}

const AnimatedPokemon = (props: {
  animationData: IAnimData
  sprite: SpriteQL
}) => {
  const [frames, setFrames] = useState<FrameObject[]>([])
  const [shadowFrames, setShadowFrames] = useState<FrameObject[]>([])

  const metadata = props.animationData.Anims.Anim.find(
    ({ Name }) => Name === props.sprite.action
  )!
  const metadataDurations = metadata.Durations.Duration
  const durationArray = Array.isArray(metadataDurations)
    ? metadataDurations
    : [metadataDurations]

  const animUrl = props.sprite.animUrl
  const action = props.sprite.action
  const shadowsUrl = props.sprite.shadowsUrl

  // load
  useEffect(() => {
    const { FrameWidth: frameWidth, FrameHeight: frameHeight } = metadata

    if (!Assets.cache.has(`${animUrl}-${action}-${AnimationType.ANIM}`)) {
      Assets.add({
        alias: `${animUrl}-${action}-${AnimationType.ANIM}`,
        src: animUrl
      })
    }

    if (!Assets.cache.has(`${animUrl}-${action}-${AnimationType.SHADOW}`)) {
      Assets.add({
        alias: `${animUrl}-${action}-${AnimationType.SHADOW}`,
        src: shadowsUrl
      })
    }

    const loadData = async () => {
      try {
        const loadedAnim = await Assets.load<Texture>(
          `${animUrl}-${action}-${AnimationType.ANIM}`
        )

        const loadedShadow = await Assets.load(
          `${animUrl}-${action}-${AnimationType.SHADOW}`
        )

        const frames: utils.Dict<ISpritesheetFrameData> = {}
        const animations: utils.Dict<string[]> = { [action]: [] }
        const durations: utils.Dict<number> = {}
        let k = 0

        for (let j = 0; j < loadedAnim.baseTexture.height / frameHeight; j++) {
          for (let i = 0; i < loadedAnim.baseTexture.width / frameWidth; i++) {
            const id = `${animUrl}-${action}-${AnimationType.ANIM}-${k}`
            frames[id] = {
              frame: {
                h: frameHeight,
                w: frameWidth,
                x: i * frameWidth,
                y: j * frameHeight
              },
              sourceSize: {
                h: frameHeight,
                w: frameWidth
              }
            }
            durations[id] = durationArray[i]
            animations[action].push(id)
            k++
          }
        }

        const spriteSheet = new Spritesheet({
          texture: Texture.from(`${animUrl}-${action}-${AnimationType.ANIM}`),
          data: {
            frames: frames,
            meta: {
              scale: 1
            },

            animations: animations
          }
        })

        await spriteSheet.parse()

        setFrames(
          Object.keys(frames).map((frame) => ({
            time: durations[frame] * 40,
            texture: Texture.from(frame)
          }))
        )

        const shadowFrames: utils.Dict<ISpritesheetFrameData> = {}
        const shadowAnimations: utils.Dict<string[]> = { [action]: [] }
        const shadowDurations: utils.Dict<number> = {}

        for (
          let j = 0;
          j < loadedShadow.baseTexture.height / frameHeight;
          j++
        ) {
          for (
            let i = 0;
            i < loadedShadow.baseTexture.width / frameWidth;
            i++
          ) {
            const id = `${animUrl}-${action}-${AnimationType.SHADOW}-${k}`
            shadowFrames[id] = {
              frame: {
                h: frameHeight,
                w: frameWidth,
                x: i * frameWidth,
                y: j * frameHeight
              },
              sourceSize: {
                h: frameHeight,
                w: frameWidth
              }
            }
            shadowDurations[id] = durationArray[i]
            shadowAnimations[action].push(id)
            k++
          }
        }

        const shadowSpriteSheet = new Spritesheet({
          texture: Texture.from(`${animUrl}-${action}-${AnimationType.SHADOW}`),
          data: {
            frames: shadowFrames,
            meta: {
              scale: 1
            },

            animations: shadowAnimations
          }
        })

        await shadowSpriteSheet.parse()

        setShadowFrames(
          Object.keys(shadowFrames).map((frame) => ({
            time: shadowDurations[frame] * 40,
            texture: Texture.from(frame)
          }))
        )
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  return frames?.length > 0 && shadowFrames?.length > 0 ? (
    <>
      <AnimatedSprite
        isPlaying={true}
        x={100}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        textures={shadowFrames}
        scale={2}
      />
      <AnimatedSprite
        isPlaying={true}
        x={100}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        textures={frames}
        scale={2}
      />
    </>
  ) : null
}

function fetchXml(animDataXml: string) {
  const parser = new XMLParser()
  let result: any
  let status = "pending"
  let fetching = fetch(animDataXml)
    .then((res) => res.text())
    // Fetch request has gone well
    .then((success) => {
      status = "fulfilled"
      result = parser.parse(success) as IPMDCollab
    })
    // Fetch request has failed
    .catch((error) => {
      status = "rejected"
      result = error
    })

  return () => {
    if (status === "pending") {
      throw fetching // Suspend(A way to tell React data is still fetching)
    } else if (status === "rejected") {
      throw result // Result is an error
    } else if (status === "fulfilled") {
      return result // Result is a fulfilled promise
    }
  }
}
