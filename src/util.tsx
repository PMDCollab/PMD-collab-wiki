import { Monster } from './generated/graphql';

const pad = (number: number) => number < 10 ? `0${number}` : number.toString();

export function formatDate(n: number | undefined) {
    if (!n) return n;
    const date = new Date(n);
    return `${pad(date.getDate())}/${pad(date.getMonth())}/${date.getFullYear().toString().slice(2)}`;
}

export function getLastModification(t: Date | undefined) {
    return t ? `Modified at ${formatDate(t.getTime())}` : "";
}

export const getMonsterMaxPortraitBounty = (monster: Monster) => monster.forms.reduce(
    (a, b) => Math.max(
        a,
        b.portraits.bounty.exists || 0,
        b.portraits.bounty.full || 0,
        b.portraits.bounty.incomplete || 0
    ), 0)

export const getMonsterMaxSpriteBounty = (monster: Monster) => monster.forms.reduce(
    (a, b) => Math.max(
        a,
        b.sprites.bounty.exists || 0,
        b.sprites.bounty.full || 0,
        b.sprites.bounty.incomplete || 0
    ), 0)