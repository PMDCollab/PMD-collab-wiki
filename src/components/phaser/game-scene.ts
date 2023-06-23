import Phaser from "phaser"
import { AnimationType, Dungeon, IAnim } from "../../types/enum"
import { MyGame } from "./game-container"
export default class GameScene extends Phaser.Scene {
  metadata: IAnim | undefined
  dungeon: Dungeon | undefined
  action = ""
  animUrl = ""
  shadowsUrl = ""

  constructor() {
    super({ key: "gameScene" })
  }

  init() {
    const g = this.game as MyGame
    this.metadata = g.animationData.Anims.Anim.find(
      (m) => m.Name === g.sprite.action
    )
    this.animUrl = g.sprite.animUrl
    this.shadowsUrl = g.sprite.shadowsUrl
    this.action = g.sprite.action
    this.dungeon = g.dungeon
  }

  preload() {
    const m = this.metadata as IAnim
    this.load.image(
      "small-ba",
      `${process.env.PUBLIC_URL}/maps/${this.dungeon}.png`
    )
    this.load.spritesheet(
      `${this.action}-${AnimationType.ANIM}`,
      this.animUrl,
      { frameWidth: m.FrameWidth, frameHeight: m.FrameHeight }
    )
    this.load.spritesheet(
      `${this.action}-${AnimationType.SHADOW}`,
      this.shadowsUrl,
      { frameWidth: m.FrameWidth, frameHeight: m.FrameHeight }
    )
  }

  create() {
    const animations = [AnimationType.ANIM, AnimationType.SHADOW]
    animations.forEach((animationType) => {
      const frameArray = this.anims.generateFrameNumbers(
        `${this.action}-${animationType}`,
        { start: 0, end: -1 }
      )
      const m = this.metadata as IAnim
      const durationArray = Array.isArray(m.Durations.Duration)
        ? m.Durations.Duration
        : [m.Durations.Duration]
      for (let i = 0; i < frameArray.length; i++) {
        if (durationArray[i]) {
          frameArray[i]["duration"] = durationArray[i] * 20
        } else {
          frameArray[i]["duration"] =
            durationArray[i % durationArray.length] * 20
        }
      }
      this.anims.create({
        key: `${animationType}`,
        frames: frameArray,
        repeat: -1
      })
    })

    const scaleFactor =
      this.metadata?.FrameHeight && this.metadata.FrameHeight < 100 ? 2 : 1
    this.add.image(100, 100, "small-ba").setScale(scaleFactor, scaleFactor)
    this.add
      .sprite(100, 110, `${this.action}-${AnimationType.SHADOW}`)
      .setScale(scaleFactor, scaleFactor)
      .setTintFill(0xffffff)
      .play(AnimationType.SHADOW)
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.ANIM}`)
      .setScale(scaleFactor, scaleFactor)
      .play(AnimationType.ANIM)
  }
}
