import { Credit } from '../generated/graphql';
import { getUniqueMonsterName } from '../util';
import { MonsterFormWithRef } from './pokemon-carousel';

/**
 * This entire file literally just exists for the shopping cart feature
 * i couldn't throw this code anywhere else without it looking ugly
 */
type CreditString = string;
type SpriteType = 'sprites' | 'portraits';
type Pokemon = string;
type Emotion = string;
type OfficialCreditFormat = Record<CreditString, Record<SpriteType, Record<Pokemon, Emotion[]>>>

export async function generateCredits(visibleMonsters: MonsterFormWithRef[], creditedMonsters: Set<string>) {
  if (!visibleMonsters) {
    window.alert("No monster data found!");
    return;
  }
  let buffer = `All custom graphics not originating from official PMD games are licensed under Attribution-NonCommercial 4.0 International ` +
    `http://creativecommons.org/licenses/by/4.0/.\n` +
    `All graphics referred to in this file can be found in http://sprites.pmdcollab.org/\n\n`;

  const creditFormat: OfficialCreditFormat = {};
  for (const form of visibleMonsters) {
    const monsterName = getUniqueMonsterName(form.monster, form);
    if (!creditedMonsters.has(monsterName)) continue;
    for (const history of form.portraits.history) {
      if (history.obsolete || !history.credit) continue;
      const creditPerson = creditToString(history.credit);
      if (!creditFormat[creditPerson]) creditFormat[creditPerson] = { sprites: {}, portraits: {} } as Record<SpriteType, Record<Pokemon, Emotion[]>>;
      const portraitCredits = creditFormat[creditPerson].portraits;
      if (portraitCredits[monsterName]) portraitCredits[monsterName].push(...history.modifications); // TODO: dont push duplicates
      else portraitCredits[monsterName] = [...history.modifications];
    }
    for (const history of form.sprites.history) { // TODO: dont copy this code maybe
      if (history.obsolete || !history.credit) continue;
      const creditPerson = creditToString(history.credit);
      if (!creditFormat[creditPerson]) creditFormat[creditPerson] = { sprites: {}, portraits: {} } as Record<SpriteType, Record<Pokemon, Emotion[]>>;
      const portraitCredits = creditFormat[creditPerson].sprites;
      if (portraitCredits[monsterName]) portraitCredits[monsterName].push(...history.modifications);
      else portraitCredits[monsterName] = [...history.modifications];
    }
  }
  // parse creditFormat into a string
  // TODO: maybe different data structure bcs order might not be maintained
  for (const [creditPerson, creditWork] of Object.entries(creditFormat).sort(sortEntriesByKey)) {
    buffer += `${creditPerson}\n`;
    for (const [spriteType, monsterCredits] of Object.entries(creditWork).sort(sortEntriesByKey)) {
      if (!Object.keys(monsterCredits).length) continue;
      if (spriteType == 'sprites') buffer += `\tSprite:\n`;
      else buffer += `\tPortrait:\n`;
      for (const [pokemon, emotions] of Object.entries(monsterCredits)) {
        buffer += `\t\t${pokemon}: ${[...new Set(emotions)].join(",")}\n`; // TODO: don't remove duplicates here maybe? idk
      }
    }
  }
  // paste to text
  const url = URL.createObjectURL(new Blob([buffer], { type: 'text/plain' }));
  window.open(url, '_blank');
}

function creditToString(credit: Credit): CreditString {
  const result = [];
  // TODO: i haven't used discordHandle at all, maybe i should (if not, remove it from carrousel query)
  if (credit.name) result.push(credit.name);
  if (credit.id) result.push(`Discord:<@!${credit.id}>`);
  if (credit.contact) result.push(`Contact:${credit.contact}`);
  return result.join("\t");
}


const sortEntriesByKey: (first: [string, ...any[]], second: [string, ...any[]]) => number = (([keyA], [keyB]) => keyA.localeCompare(keyB))