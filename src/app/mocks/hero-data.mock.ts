import { OriginHero } from '../enums';

export const HERO_DATA_NONE = {
  hero: { heroName: '', humanName: '', age: '', id: 0 },
  heroList: [{ heroName: '', humanName: '', age: '', id: 0 }],
  fullHeroList: [{ heroName: '', humanName: '', age: '', id: 0 }],
  origin: OriginHero.NONE,
};

export const HERO_DATA_EDIT = {
  hero: { heroName: '', humanName: '', age: '', id: 0 },
  heroList: [{ heroName: '', humanName: '', age: '', id: 0 }],
  fullHeroList: [{ heroName: '', humanName: '', age: '', id: 0 }],
  origin: OriginHero.EDIT,
};

export const HERO_DATA_NEW = {
  hero: { heroName: '', humanName: '', age: '', id: 0 },
  heroList: [{ heroName: '', humanName: '', age: '', id: 0 }],
  fullHeroList: [{ heroName: '', humanName: '', age: '', id: 0 }],
  origin: OriginHero.NEW,
};
