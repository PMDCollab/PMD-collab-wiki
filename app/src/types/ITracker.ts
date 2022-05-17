export interface ITracker {
    name:                  string;
    portrait_modified:     string;
    sprite_modified:       string;
    portrait_credit:       Credit;
    portrait_files:        { [key: string]: boolean };
    sprite_credit:         Credit;
    sprite_files:          { [key: string]: boolean };
    subgroups:             { [key: string]: ITracker };
}

export interface IFlattenTracker{
    name:                  string;
    portrait_modified:     string;
    sprite_modified:       string;
    portrait_credit:       Credit;
    portrait_files:        { [key: string]: boolean };
    sprite_credit:         Credit;
    sprite_files:          { [key: string]: boolean };
    related:               string[]
}

export interface Credit {
    primary:   string;
    secondary: string[];
    total:     number;
}

export enum Name {
    Empty = "",
    Female = "Female",
    Shiny = "Shiny",
}