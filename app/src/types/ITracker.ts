export enum MinPath{
    NAME = 'n',
    PORTRAIT_MODIFIED = 'pm',
    SPRITE_MODIFIED = 'sm',
    PORTRAIT_CREDIT = 'pc',
    PORTRAIT_FILES = 'pf',
    SPRITE_CREDIT = 'sc',
    SPRITE_FILES = 'sf',
    RELATED = 'r',
    PRIMARY= 'p',
    SECONDARY= 's',
    PORTRAIT_LINK = 'pl',
    PORTRAIT_RECOLOR_LINK = 'prl',
    SPRITE_LINK = 'sl',
    SPRITE_RECOLOR_LINK = 'srl'
}

export interface ITracker{
    [MinPath.NAME]: string
    [MinPath.PORTRAIT_MODIFIED]: string
    [MinPath.SPRITE_MODIFIED]: string
    [MinPath.PORTRAIT_CREDIT]: Credit
    [MinPath.PORTRAIT_FILES]: number[]
    [MinPath.SPRITE_CREDIT]: Credit
    [MinPath.SPRITE_FILES]: number[]
    [MinPath.RELATED]: string[]
    [MinPath.PORTRAIT_LINK]: string
    [MinPath.PORTRAIT_RECOLOR_LINK]: string
    [MinPath.SPRITE_LINK]: string
    [MinPath.SPRITE_RECOLOR_LINK]: string
}

export interface Credit {
    [MinPath.PRIMARY]: string
    [MinPath.SECONDARY]: string[]
}

export enum Name {
    Empty = "",
    Female = "Female",
    Shiny = "Shiny",
}