import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hero } from '../interfaces/heroes/hero.interface';
import { API_CONTEXT } from '../constants/api-context.constant';
import { DeleteHeroResponse } from '../interfaces/heroes/deleteHero-response.interface';
import { CreateHeroResponse } from '../interfaces/heroes/createHero-response.interface';
import { CreateHeroForm } from '../interfaces/heroes/createHero-form.interface';

@Injectable()
export class HeroService {
  constructor(private _http: HttpClient) {}
  private _majorId: number;

  public getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${API_CONTEXT}`).pipe(
      map((response) => {
        this._majorId = response[response.length - 1].id;
        return response;
      })
    );
  }

  public deleteHero(
    id: number,
    heroList: Hero[],
    fullHeroList: Hero[]
  ): Observable<DeleteHeroResponse> {
    return this._http.delete<DeleteHeroResponse>(`${API_CONTEXT}/${id}`).pipe(
      map((response) => {
        heroList = heroList.filter((item) => id !== item.id);
        fullHeroList = fullHeroList.filter((item) => id !== item.id);
        return {
          message: response.message,
          heroList: heroList,
          fullHeroList: fullHeroList,
        };
      })
    );
  }

  public editHero(body: Partial<Hero>): Observable<Hero[]> {
    return this._http.put<Hero[]>(`${API_CONTEXT}`, body);
  }

  public createHero(body: CreateHeroForm): Observable<CreateHeroResponse> {
    return this._http.post<CreateHeroResponse>(`${API_CONTEXT}`, body).pipe(
      map((response) => {
        this._majorId += 1;
        return {
          message: response.message,
          heroCreated: { ...body, id: this._majorId },
        };
      })
    );
  }
}
