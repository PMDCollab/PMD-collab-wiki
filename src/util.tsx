import { Monster, MonsterForm } from './generated/graphql';

const pad = (number: number) => number < 10 ? `0${number}` : number.toString();
export const thumbnailScale = (str: string) => Math.max(9 / Math.max(str.length, 9), 0.6);

export function formatDate(n: number | undefined) {
    if (!n) return n;
    const date = new Date(n);
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear().toString().slice(2)}`;
}

export function getLastModification(t: Date | undefined) {
    return t ? `Modified at ${formatDate(t.getTime())}` : "";
}

export const getMonsterMaxPortraitBounty = (monster: Monster, useUnnecessary = false) => monster.forms.reduce(
    (a, b) => !b.portraits.required && !useUnnecessary ? 0 : Math.max(a, getFormMaxPortraitBounty(b)), 0
)
export const getFormMaxPortraitBounty = (form: MonsterForm) => Math.max(
    form.portraits.bounty.exists || 0,
    form.portraits.bounty.full || 0,
    form.portraits.bounty.incomplete || 0
)
export const getMonsterMaxSpriteBounty = (monster: Monster, useUnnecessary = false) => monster.forms.reduce(
    (a, b) => !b.sprites.required && !useUnnecessary ? 0 : Math.max(a, getFormMaxSpriteBounty(b)), 0
)
export const getFormMaxSpriteBounty = (form: MonsterForm) => Math.max(
    form.sprites.bounty.exists || 0,
    form.sprites.bounty.full || 0,
    form.sprites.bounty.incomplete || 0
)