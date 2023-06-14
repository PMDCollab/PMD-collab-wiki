import Phaser from "phaser"
import { Sprite } from "../../generated/graphql"
import { Dungeon, IAnimData } from "../../types/enum"
import GameScene from "./game-scene"

export default class GameContainer {
  div: HTMLDivElement
  sprite: Sprite
  game: MyGame
  dungeon: Dungeon
  constructor(
    div: HTMLDivElement,
    sprite: Sprite,
    animationData: IAnimData,
    dungeon: Dungeon
  ) {
    this.div = div
    this.sprite = sprite
    this.dungeon = dungeon
    const config = {
      type: Phaser.CANVAS,
      width: 200,
      height: 200,
      parent: this.div,
      pixelArt: true,
      scene: GameScene,
      scale: { mode: Phaser.Scale.NONE },
      autoFocus: false,
      input: false
    }
    this.game = new MyGame(config, sprite, animationData, dungeon)
  }
}

export class MyGame extends Phaser.Game {
  sprite: Sprite
  animationData: IAnimData
  dungeon: Dungeon
  constructor(
    config: Phaser.Types.Core.GameConfig | undefined,
    sprite: Sprite,
    animationData: IAnimData,
    dungeon: Dungeon
  ) {
    super(config)
    this.dungeon = dungeon
    this.sprite = sprite
    this.animationData = animationData
  }
}
