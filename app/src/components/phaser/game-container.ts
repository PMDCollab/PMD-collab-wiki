import Phaser from "phaser";
import { Dungeon, IAnimData } from "../../types/enum";
import GameScene from "./game-scene";

export default class GameContainer{
    div: HTMLDivElement;
    infoKey: string;
    action: string;
    game: MyGame;
    dungeon: Dungeon;
    constructor(div: HTMLDivElement, infoKey: string, action: string, animationData: IAnimData, dungeon: Dungeon){
        this.div = div;
        this.infoKey = infoKey;
        this.action = action;
        this.dungeon = dungeon;
        const config = {
            type: Phaser.CANVAS,
            width: 200,
            height: 200,
            parent: this.div,
            pixelArt: true,
            scene: GameScene,
            scale: {mode: Phaser.Scale.NONE},
            autoFocus: false,
            input: false
          };
          this.game = new MyGame(config, infoKey, action, animationData, dungeon);
    }
}

export class MyGame extends Phaser.Game{
    infoKey: string;
    action: string;
    animationData: IAnimData;
    dungeon: Dungeon
    constructor(config: Phaser.Types.Core.GameConfig | undefined, infoKey: string, action: string, animationData: IAnimData, dungeon: Dungeon){
        super(config);
        this.dungeon = dungeon;
        this.infoKey = infoKey;
        this.action = action;
        this.animationData = animationData;
    }
}