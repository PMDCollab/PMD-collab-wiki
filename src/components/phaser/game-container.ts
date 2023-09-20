import Phaser from "phaser"
import { Sprite } from "../../generated/graphql"
import { Dungeon, IAnimData } from "../../types/enum"
import GameScene from "./game-scene"

export default class GameContainer {
  game: MyGame
  constructor(
    public div: HTMLDivElement,
    public sprite: Sprite,
    animationData: IAnimData,
    public dungeon: Dungeon
  ) {
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
    this.game = new MyGame(sprite, animationData, dungeon, config)
  }
}

export class MyGame extends Phaser.Game {
  constructor(
    public sprite: Sprite,
    public animationData: IAnimData,
    public dungeon: Dungeon,
    config?: Phaser.Types.Core.GameConfig
  ) {
    super(config);
  }
}
