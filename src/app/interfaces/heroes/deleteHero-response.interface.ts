import { Hero } from './hero.interface';

export interface DeleteHeroResponse {
  message: string;
  heroList: Hero[];
  fullHeroList: Hero[];
}
