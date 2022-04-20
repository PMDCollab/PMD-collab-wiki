export const CDN_URL = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master";

export enum Emotion {
    ANGRY = "Angry",
    ANGRY_R = "Angry^",
    CRYING = "Crying",
    CRYING_R = "Crying^",
    DETERMINED = "Determined",
    DETERMINED_R = "Determined^",
    DIZZY = "Dizzy",
    DIZZY_R = "Dizzy^",
    HAPPY = "Happy",
    HAPPY_R = "Happy^",
    INSPIRED = "Inspired",
    INSPIRED_R = "Inspired^",
    JOYOUS = "Joyous",
    JOYOUS_R = "Joyous^",
    NORMAL = "Normal",
    NORMAL_R = "Normal^",
    PAIN = "Pain",
    PAIN_R = "Pain^",
    SAD = "Sad",
    SAD_R = "Sad^",
    SHOUTING = "Shouting",
    SHOUTING_R = "Shouting^",
    SIGH = "Sigh",
    SIGH_R = "Sigh^",
    SPECIAL0 = "Special0",
    SPECIAL0_R = "Special0^",
    SPECIAL1 = "Special1",
    SPECIAL1_R = "Special1^",
    SPECIAL2 = "Special2",
    SPECIAL2_R = "Special2^",
    SPECIAL3 = "Special3",
    SPECIAL3_R = "Special3^",
    STUNNED = "Stunned",
    STUNNED_R = "Stunned^",
    SURPRISED = "Surprised",
    SURPRISED_R = "Surprised^",
    TEARY_EYED = "Teary-Eyed",
    TEARY_EYED_R = "Teary-Eyed^",
    WORRIED = "Worried",
    WORRIED_R = "Worried^"
}

export enum Action {
    IDLE = "Idle",
    WALK = "Walk",
    SLEEP = "Sleep",
    HURT = "Hurt",
    ATTACK = "Attack",
    CHARGE = "Charge",
    SHOOT = "Shoot",
    STRIKE = "Strike",
    CHOP = "Chop",
    SCRATCH = "Scratch",
    PUNCH = "Punch",
    SLAP = "Slap",
    SLICE = "Slice",
    MULTI_SCRATCH = "MultiScratch",
    MULTI_STRIKE = "MultiStrike",
    UPPERCUT = "Uppercut",
    RICOCHET = "Ricochet",
    BITE = "Bite",
    SHAKE = "Shake",
    JAB = "Jab",
    KICK = "Kick",
    LICK = "Lick",
    SLAM = "Slam",
    STOMP = "Stomp",
    APPEAL = "Appeal",
    DANCE = "Dance",
    TWIRL = "Twirl",
    TAIL_WHIP = "TailWhip",
    SING ="Sing",
    SOUND = "Sound",
    RUMBLE = "Rumble",
    FLAP_AROUND = "FlapAround",
    GAS = "Gas",
    SHOCK = "Shock",
    EMIT = "Emit",
    SP_ATTACK = "SpAttack",
    WITHDRAW = "Withdraw",
    REAR_UP = "RearUp",
    SWELL = "Swell",
    SWING = "Swing",
    DOUBLE = "Double",
    ROTATE = "Rotate",
    HOP = "Hop",
    HOVER = "Hover",
    QUICK_STRIKE = "QuickStrike",
    EVENT_SLEEP = "EventSleep",
    WAKE = "Wake",
    EAT = "Eat",
    TUMBLE = "Tumble",
    POSE = "Pose",
    PULL = "Pull",
    PAIN = "Pain",
    FLOAT = "Float",
    DEEP_BREATH = "DeepBreath",
    NOD = "Nod",
    SIT = "Sit",
    LOOK_UP = "LookUp",
    SINK = "Sink",
    TRIP = "Trip",
    LAYING = "Laying",
    LEAP_FORTH = "LeapForth",
    HEAD = "Head",
    CRINGE = "Cringe",
    LOST_BALANCE = "LostBalance",
    TUMBLE_BACK = "TumbleBack",
    HIT_GROUND = "HitGround",
    FAINT = "Faint",
    FAINTED = "Fainted",
    STANDING_UP = "StandingUp",
    DIG_IN = "DigIn",
    DIG_OUT = "DigOut",
    WIGGLE = "Wiggle",
    YAWN = "Yawn",
    RAISE_ARMS = "RaiseArms",
    CAREFUL_WALK = "CarefulWalk",
    INJURED = "Injured",
    JUMP = "Jump",
    ROAR = "Roar",
    WAVE = "Wave",
    CRY = "Cry",
    BOW = "Bow",
    SPECIAL0 = "Special0",
    SPECIAL1 = "Special1",
    SPECIAL2 = "Special2",
    SPECIAL3 = "Special3",
    SPECIAL4 = "Special4",
    SPECIAL5 = "Special5",
    SPECIAL6 = "Special6",
    SPECIAL7 = "Special7",
    SPECIAL8 = "Special8",
    SPECIAL9 = "Special9",
    SPECIAL10 = "Special10",
    SPECIAL11 = "Special11",
    SPECIAL12 = "Special12",
    SPECIAL13 = "Special13",
    SPECIAL14 = "Special14",
    SPECIAL15 = "Special15",
    SPECIAL16 = "Special16",
    SPECIAL17 = "Special17",
    SPECIAL18 = "Special18",
    SPECIAL19 = "Special19",
    SPECIAL20 = "Special20",
    SPECIAL21 = "Special21",
    SPECIAL22 = "Special22",
    SPECIAL23 = "Special23",
    SPECIAL24 = "Special24",
    SPECIAL25 = "Special25",
    SPECIAL26 = "Special26",
    SPECIAL27 = "Special27",
    SPECIAL28 = "Special28",
    SPECIAL29 = "Special29",
    SPECIAL30 = "Special30",
    SPECIAL31 = "Special31"
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
