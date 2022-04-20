import Phaser from "phaser";
import { Action, AnimationType, IAnim } from "../../types/enum";
import { MyGame } from "./game-container";

export default class GameScene extends Phaser.Scene {
    metadata: IAnim | undefined;
    action: Action = Action.IDLE;
    infoKey: string = '';

    constructor() {
        super({key: 'gameScene'});
    }

    init(){
        const g = this.game as MyGame;
        this.metadata = g.animationData.Anims.Anim.find(m=>m.Name === g.action);
        if(this.metadata?.CopyOf){
            this.action = this.metadata.CopyOf as Action;
            this.metadata = g.animationData.Anims.Anim.find(m=>m.Name === this.action);
        }
        else{
            this.action = g.action;
        }
        this.infoKey = g.infoKey;
    }

    preload(){
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(100, 110, 120, 50);
    
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
          x: width / 2,
          y: (height / 2) - 100,
          text: 'Loading...',
          style: {
            font: '30px monospace'
          }
        });
        loadingText.setOrigin(0.5, 0.5);
    
        const percentText = this.make.text({
          x: width / 2,
          y: (height / 2) -50,
          text: '0%',
          style: {
            font: '28px monospace'
          }
        });
        percentText.setOrigin(0.5, 0.5);
    
        const assetText = this.make.text({
          x: width / 2,
          y: (height / 2) + 70,
          text: '',
          style: {
            font: '28px monospace'
          }
        });
    
        assetText.setOrigin(0.5, 0.5);
    
        this.load.on('progress', (value: number) => {
          percentText.setText((value * 100).toFixed(1) + '%');
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(100, 110, 50 * value, 10);
        });
    
        this.load.on('fileprogress', (file: { key: string; }) => {
          assetText.setText('Loading asset: ' + file.key);
        });
    
        this.load.on('complete', () => {
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          percentText.destroy();
          assetText.destroy();
        });

        const m = this.metadata as IAnim;
        this.load.spritesheet(`${this.infoKey}/${this.action}-${AnimationType.ANIM}`,`${process.env.PUBLIC_URL}/collab/sprite/${this.infoKey}/${this.action}-${AnimationType.ANIM}.png`, {frameWidth: m.FrameWidth, frameHeight: m.FrameHeight});
        this.load.spritesheet(`${this.infoKey}/${this.action}-${AnimationType.SHADOW}`,`${process.env.PUBLIC_URL}/collab/sprite/${this.infoKey}/${this.action}-${AnimationType.SHADOW}.png`, {frameWidth: m.FrameWidth, frameHeight: m.FrameHeight});
    }

    create() {
        this.anims.create({
            key: 'pokemonAnimation',
            frames: this.anims.generateFrameNumbers(`${this.infoKey}/${this.action}-${AnimationType.ANIM}`, {start: 0, end: - 1}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'shadowAnimation',
            frames: this.anims.generateFrameNumbers(`${this.infoKey}/${this.action}-${AnimationType.SHADOW}`, {start: 0, end: - 1}),
            frameRate: 8,
            repeat: -1
        });

        this.add.sprite(75,80,`${this.infoKey}/${this.action}-${AnimationType.SHADOW}`).setScale(2,2).setTintFill(0xffffff).play('shadowAnimation');
        this.add.sprite(75,75,`${this.infoKey}/${this.action}-${AnimationType.ANIM}`).setScale(2,2).play('pokemonAnimation');
    }
}