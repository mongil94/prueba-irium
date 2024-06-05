import { OriginHero } from 'src/app/enums/origin-hero.enum';
import { Hero } from './hero.interface';

export interface HeroOptions {
  hero: Hero;
  heroList: Hero[];
  fullHeroList: Hero[];
  origin: OriginHero;
}
