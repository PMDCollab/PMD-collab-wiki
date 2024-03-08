import {
  Assets,
  FrameObject,
  ISpritesheetFrameData,
  Spritesheet,
  Texture,
  utils
} from "pixi.js"
import { useEffect, useState } from "react"

export const useSprite = (
  url: string,
  frameWidth: number,
  frameHeight: number,
  durationArray: number[]
) => {
  const [frames, setFrames] = useState<FrameObject[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setFrames(null)
      setIsLoading(true)
      try {
        if (!Assets.cache.has(url)) {
          Assets.add({
            alias: url,
            src: url
          })
        }
        const loadedAnim = await Assets.load<Texture>(url)

        const frames: utils.Dict<ISpritesheetFrameData> = {}
        const animations: utils.Dict<string[]> = { pokemon: [] }
        const durations: utils.Dict<number> = {}
        let k = 0

        for (let j = 0; j < loadedAnim.baseTexture.height / frameHeight; j++) {
          for (let i = 0; i < loadedAnim.baseTexture.width / frameWidth; i++) {
            const id = `${url}-${k}`
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
            animations.pokemon.push(id)
            k++
          }
        }

        const spriteSheet = new Spritesheet({
          texture: Texture.from(url),
          data: {
            frames: frames,
            meta: {
              scale: 1
            },

            animations: animations
          }
        })

        Object.keys(frames).forEach((id) => {
          Texture.removeFromCache(id)
        })

        await spriteSheet.parse()

        setFrames(
          Object.keys(frames).map((frame) => ({
            time: durations[frame] * 40,
            texture: Texture.from(frame)
          }))
        )
      } catch (error) {
        console.warn(url, error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, frameWidth, frameHeight, durationArray])
  return { frames, isLoading }
}
