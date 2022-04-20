import Phaser from "phaser";
import { Action, AnimationType, CDN_URL, IAnim } from "../../types/enum";
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

        const m = this.metadata as IAnim;
        this.load.image('small-ba',`${process.env.PUBLIC_URL}/small-ba.png`);
        this.load.spritesheet(`${this.infoKey}/${this.action}-${AnimationType.ANIM}`,`${CDN_URL}/sprite/${this.infoKey}/${this.action}-${AnimationType.ANIM}.png`, {frameWidth: m.FrameWidth, frameHeight: m.FrameHeight});
        this.load.spritesheet(`${this.infoKey}/${this.action}-${AnimationType.SHADOW}`,`${CDN_URL}/sprite/${this.infoKey}/${this.action}-${AnimationType.SHADOW}.png`, {frameWidth: m.FrameWidth, frameHeight: m.FrameHeight});
    }

    create() {
      [AnimationType.ANIM, AnimationType.SHADOW].forEach(animationType=>{
        const frameArray = this.anims.generateFrameNumbers(`${this.infoKey}/${this.action}-${animationType}`, {start: 0, end: - 1});
        const m = this.metadata as IAnim;
        const durationArray = Array.isArray(m.Durations.Duration) ? m.Durations.Duration : [m.Durations.Duration];
        for (let i = 0; i < frameArray.length; i++) {
          if(durationArray[i]){
            frameArray[i]['duration'] = durationArray[i] * 20;
          }
          else{
            frameArray[i]['duration'] = durationArray[i%durationArray.length] * 20;
          }
        }
        this.anims.create({
            key: `${animationType}`,
            frames: frameArray,
            repeat: -1
        });
      });

        this.add.image(100,100,'small-ba').setScale(2,2);
        this.add.sprite(100,105,`${this.infoKey}/${this.action}-${AnimationType.SHADOW}`).setScale(2,2).setTintFill(0xffffff).play(AnimationType.SHADOW);
        this.add.sprite(100,100,`${this.infoKey}/${this.action}-${AnimationType.ANIM}`).setScale(2,2).play(AnimationType.ANIM);
    }
}