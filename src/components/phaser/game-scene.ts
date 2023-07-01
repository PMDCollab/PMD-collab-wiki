import Phaser from "phaser"
import { AnimationType, Dungeon, IAnim } from "../../types/enum"
import { MyGame } from "./game-container"
export default class GameScene extends Phaser.Scene {
  metadata: IAnim | undefined
  dungeon: Dungeon | undefined
  action = ""
  animUrl = ""
  shadowsUrl = ""
  scaleFactor = 2

  constructor() {
    super({ key: "gameScene" })
  }

  init() {
    const { animationData, sprite, dungeon } = this.game as MyGame;
    this.metadata = animationData.Anims.Anim.find(
      ({ Name }) => Name === sprite.action
    );
    this.animUrl = sprite.animUrl;
    this.shadowsUrl = sprite.shadowsUrl;
    this.action = sprite.action;
    this.dungeon = dungeon;
    this.scaleFactor =
      Math.max(...animationData.Anims.Anim.map(({ FrameHeight }) => FrameHeight ?? 0))
        > 120 ? 1 : 2;
  }

  preload() {
    const { FrameWidth, FrameHeight } = this.metadata as IAnim
    this.load.image(
      "small-ba",
      `${process.env.PUBLIC_URL}/maps/${this.dungeon}.png`
    )
    this.load.spritesheet(
      `${this.action}-${AnimationType.ANIM}`,
      this.animUrl,
      { frameWidth: FrameWidth, frameHeight: FrameHeight }
    )
    this.load.spritesheet(
      `${this.action}-${AnimationType.SHADOW}`,
      this.shadowsUrl,
      { frameWidth: FrameWidth, frameHeight: FrameHeight }
    )
  }

  create() {
    for (const animationType of [AnimationType.ANIM, AnimationType.SHADOW]) {
      const frameArray = this.anims.generateFrameNumbers(
        `${this.action}-${animationType}`,
        { start: 0, end: -1 }
      )
      const { Durations } = this.metadata as IAnim
      const durationArray = Array.isArray(Durations.Duration)
        ? Durations.Duration
        : [Durations.Duration]
      for (let i = 0; i < frameArray.length; i++) {
        frameArray[i]["duration"] =
          durationArray[i % durationArray.length] * 20
      }
      this.anims.create({
        key: animationType.toString(),
        frames: frameArray,
        repeat: -1
      })
    }

    this.add
      .image(100, 100, "small-ba")
      .setScale(this.scaleFactor, this.scaleFactor)
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.SHADOW}`)
      .setScale(this.scaleFactor, this.scaleFactor)
      .setTintFill(0xffffff)
      .play(AnimationType.SHADOW)
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.ANIM}`)
      .setScale(this.scaleFactor, this.scaleFactor)
      .play(AnimationType.ANIM)
  }
}
