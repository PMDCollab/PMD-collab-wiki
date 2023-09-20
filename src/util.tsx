import { Maybe, Monster, MonsterForm } from './generated/graphql';

const pad = (number: number) => number < 10 ? `0${number}` : number.toString();
export const thumbnailScale = (str?: Maybe<string>) => Math.max(9 / Math.max(str?.length ?? 0, 9), 0.6);

export function formatDate(n: number) {
    const date = new Date(n);
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear().toString().slice(2)}`;
}

export function getLastModification(t?: Date) {
    return t ? `Modified at ${formatDate(t.getTime())}` : "";
}

export const getMonsterMaxPortraitBounty = (monster: Monster, useUnnecessary = false) => monster.forms.reduce(
    (a, b) => !b.portraits.required && !useUnnecessary ? 0 : Math.max(a, getFormMaxPortraitBounty(b)), 0
)
export const getFormMaxPortraitBounty = ({ portraits: { bounty: { exists, full, incomplete } } }: MonsterForm) => Math.max(
    exists || 0,
    full || 0,
    incomplete || 0
)
export const getMonsterMaxSpriteBounty = (monster: Monster, useUnnecessary = false) => monster.forms.reduce(
    (a, b) => !b.sprites.required && !useUnnecessary ? 0 : Math.max(a, getFormMaxSpriteBounty(b)), 0
)
export const getFormMaxSpriteBounty = ({ sprites: { bounty: { exists, full, incomplete } } }: MonsterForm) => Math.max(
    exists || 0,
    full || 0,
    incomplete || 0
)
