// Spell.ts
export interface Spell {
    index: string;
    name: string;
    level: number;
    url: string;
  };
  
  export interface SpellData {
    count: number;
    results: Spell[];
  };