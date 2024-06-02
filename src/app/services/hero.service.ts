import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hero } from '../interfaces/heroes/hero.interface';
import { API_CONTEXT } from '../constants/api-context.constant';

@Injectable()
export class HeroService {
  constructor(private _http: HttpClient) {}

  public getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${API_CONTEXT}`);
  }
}
