import { Hero } from './hero.interface';

export interface CreateHeroResponse {
  message: string;
  heroCreated: Hero;
}
