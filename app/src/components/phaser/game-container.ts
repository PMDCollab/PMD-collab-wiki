import Phaser from "phaser";
import { IAnimData } from "../../types/enum";
import GameScene from "./game-scene";

export default class GameContainer{
    div: HTMLDivElement;
    infoKey: string;
    action: string;
    game: MyGame;
    constructor(div: HTMLDivElement, infoKey: string, action: string, animationData: IAnimData){
        this.div = div;
        this.infoKey = infoKey;
        this.action = action;
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
          this.game = new MyGame(config, infoKey, action, animationData);
    }
}

export class MyGame extends Phaser.Game{
    infoKey: string;
    action: string;
    animationData: IAnimData;
    constructor(config: Phaser.Types.Core.GameConfig | undefined, infoKey: string, action: string, animationData: IAnimData){
        super(config);
        this.infoKey = infoKey;
        this.action = action;
        this.animationData = animationData;
    }
}