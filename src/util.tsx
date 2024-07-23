import { Dispatch, SetStateAction } from 'react';
import { Maybe, Monster, MonsterForm } from './generated/graphql';
import { URLSearchParamsInit } from 'react-router-dom';

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

const pad = (number: number) => number < 10 ? `0${number}` : number.toString();
export const thumbnailScale = (str?: Maybe<string>) => Math.max(9 / Math.max(str?.length ?? 0, 9), 0.6);

export function formatDate(n?: string | number | Date) {
  if (!n) return "";
  const date = new Date(n);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear().toString().slice(2)}`;
}

export function getLastModification(t?: Maybe<Date> | "") {
  return t ? `Modified at ${formatDate(t.getTime())}` : "";
}

export function getMonsterBounty(monster: Monster, type: 'sprites' | 'portraits', useUnnecessary = false): number {
  return monster.forms.reduce((a, monster) => {
    if (!monster.portraits.required && !useUnnecessary) return a;
    return Math.max(a, getFormBounty(monster, type));
  }, 0);
}
export function getFormBounty(monster: MonsterForm, type: 'sprites' | 'portraits'): number {
  const { exists, full, incomplete } = monster[type].bounty ?? {};
  return Math.max(exists || 0, full || 0, incomplete || 0);
}

// TODO: if the new version with Object.groupBy comes around then replace this
export function groupBy<T, K extends PropertyKey>(arr: T[], cb: (element: T) => K): Partial<Record<K, T[]>> {
  return arr.reduce((a, element) => {
    const key = cb(element);
    (a[key] = a[key] || []).push(element);
    return a;
  }, {} as Record<K, T[]>);
}

export function getUniqueMonsterName(monster: Monster, form?: MonsterForm) {
  return !form?.fullName || monster.name == form.fullName ? monster.name : `${monster.name} ${form.fullName}`;
}

/**
 * Returns a callback that is used in setSearchParams to toggle a parameter on/off. Falsy values will omit the parameter entirely.
 * @param key the key to set
 * @param value the value to set it to or delete
 * @returns a callback that is used in setSearchParams to toggle a parameter on/off
 */
export function toggleParamCallback<T>(key: string, value: T): (prev: URLSearchParams) => URLSearchParamsInit {
  return param => (value ? param.set(key, value.toString()) : param.delete(key), param);
}