import { Scene } from "phaser"
import { AnimationType, Dungeon, IAnim } from "../../types/enum"
import { MyGame } from "./game-container"
export default class GameScene extends Scene {
  metadata?: IAnim
  dungeon?: Dungeon
  action = ""
  animUrl = ""
  shadowsUrl = ""
  scaleFactor = 2

  constructor() {
    super({ key: "gameScene" })
  }

  init() {
    const {
      animationData: {
        Anims: { Anim }
      },
      sprite: { animUrl, shadowsUrl, action },
      dungeon
    } = this.game as MyGame;
    this.metadata = Anim.find(({ Name }) => Name === action);
    this.animUrl = animUrl;
    this.shadowsUrl = shadowsUrl;
    this.action = action;
    this.dungeon = dungeon;
    this.scaleFactor = Math.max(
      ...Anim.map(({ Name, FrameHeight }) => Name !== "QuickStrike" ? FrameHeight : 0)
    ) > 120 ? 1 : 2;
  }

  preload() {
    const { FrameWidth: frameWidth, FrameHeight: frameHeight } = this.metadata!;
    this.load.image("small-ba", `/maps/${this.dungeon}.png`);
    this.load.spritesheet(
      `${this.action}-${AnimationType.ANIM}`,
      this.animUrl,
      { frameWidth, frameHeight }
    );
    this.load.spritesheet(
      `${this.action}-${AnimationType.SHADOW}`,
      this.shadowsUrl,
      { frameWidth, frameHeight }
    );
  }

  create() {
    for (const animationType of [AnimationType.ANIM, AnimationType.SHADOW]) {
      const frames = this.anims.generateFrameNumbers(
        `${this.action}-${animationType}`,
        { start: 0, end: -1 }
      );
      const { Durations: { Duration } } = this.metadata!;
      const durationArray = Array.isArray(Duration) ? Duration : [Duration];
      for (let i = 0; i < frames.length; i++) {
        frames[i].duration = durationArray[i % durationArray.length] * 20;
      }
      this.anims.create({
        key: animationType.toString(),
        frames,
        repeat: -1
      });
    }

    this.add
      .image(100, 100, "small-ba")
      .setScale(this.scaleFactor, this.scaleFactor);
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.SHADOW}`)
      .setScale(this.scaleFactor, this.scaleFactor)
      .setTintFill(0xffffff)
      .play(AnimationType.SHADOW);
    this.add
      .sprite(100, 105, `${this.action}-${AnimationType.ANIM}`)
      .setScale(this.scaleFactor, this.scaleFactor)
      .play(AnimationType.ANIM);
  }
}
