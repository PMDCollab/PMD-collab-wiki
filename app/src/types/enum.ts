export const CDN_URL = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master";
export const DISCORD_APP_URL = 'https://cdn.discordapp.com/attachments/'

export type CreditInformation = {
    contact: string | undefined,
    discord: string | undefined,
    name: string | undefined
}

export enum AnimationType {
    ANIM = "Anim",
    SHADOW = "Shadow"
}

export interface IPMDCollab {
    AnimData: IAnimData
}

export interface IAnimData {
    ShadowSize: number
    Anims: {
        Anim: IAnim[]
    }
}

export interface IAnim {
    Name: string
    Index: number
    FrameWidth: number
    FrameHeight: number
    Durations: IDuration
    CopyOf: string
}

export interface IDuration{
    Duration: number | number[]
}

export interface ICreditNames{
    Contact: string[],
    Discord: string[],
    Name: string[]
}

export enum RankMethod{
    POKEDEX_NUMBER = 'Pokedex Number',
    LAST_MODIFICATION = 'Last Modification',
    NAME = 'Name',
    PORTRAIT_AUTHOR = 'Portrait Author',
    SPRITE_AUTHOR = 'Sprite Author'
}