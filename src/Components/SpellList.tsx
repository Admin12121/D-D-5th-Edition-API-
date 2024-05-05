const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells(): Promise<Spell[]> {
  const spellIndexes = await fetch(BASE_URL + "/api/spells").then((response) =>
    response.json()
  );

  return spellIndexes.results;
}

export async function fetchSpellData(spellUrl: string): Promise<Data> {
  const spellData = await fetch(BASE_URL + spellUrl).then((response) => response.json());
  return spellData;
}

export interface Spell {
  name: string;
  url: string;
}

export interface Data {
  name: string;
  level: number;
  school: {
    name: string;
  };
  casting_time: string;
  range: string;
  components: string[];
  duration: string;
}
