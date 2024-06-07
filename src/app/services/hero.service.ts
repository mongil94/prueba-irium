import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Hero } from '../interfaces/heroes/hero.interface';
import { API_CONTEXT } from '../constants/api-context.constant';
import { DeleteHeroResponse } from '../interfaces/heroes/deleteHero-response.interface';
import { CreateHeroResponse } from '../interfaces/heroes/createHero-response.interface';
import { CreateHeroForm } from '../interfaces/heroes/createHero-form.interface';
import { EditHeroResponse } from '../interfaces/heroes/editHero-response.interface';
import { HeroOptions } from '../interfaces/heroes/hero-edited-created.interface';
import { OriginHero } from '../enums/origin-hero.enum';
import { HERO_OPTIONS } from '../constants/hero-options.constant';

const heroOptions: HeroOptions = HERO_OPTIONS;

@Injectable()
export class HeroService {
  constructor(private _http: HttpClient) {}
  private _majorId: number;
  private _heroData$ = new BehaviorSubject<HeroOptions>(heroOptions);

  private _capitalizeWord(word: string): string {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetterCap + remainingLetters;
  }

  get heroData$(): Observable<HeroOptions> {
    return this._heroData$;
  }

  public setHeroData(value: HeroOptions) {
    this._heroData$.next(value);
  }

  public getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${API_CONTEXT}/heroes`).pipe(
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
    return this._http
      .delete<DeleteHeroResponse>(`${API_CONTEXT}/hero/${id}`)
      .pipe(
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

  public editHero(
    body: CreateHeroForm,
    id: number
  ): Observable<EditHeroResponse> {
    body.heroName = this._capitalizeWord(body.heroName);
    return this._http.put<EditHeroResponse>(`${API_CONTEXT}/hero`, body).pipe(
      map((response) => {
        return {
          message: response.message,
          heroEdited: { ...body, id: id },
        };
      })
    );
  }

  public createHero(body: CreateHeroForm): Observable<CreateHeroResponse> {
    body.heroName = this._capitalizeWord(body.heroName);
    return this._http
      .post<CreateHeroResponse>(`${API_CONTEXT}/hero`, body)
      .pipe(
        map((response) => {
          this._majorId += 1;
          return {
            message: response.message,
            heroCreated: { ...body, id: this._majorId },
          };
        })
      );
  }

  public editHeroList(options: HeroOptions): Hero[] {
    let fullHeroList = options.fullHeroList;
    if (options.origin === OriginHero.NEW) {
      fullHeroList = [...fullHeroList, options.hero];
    } else {
      const filteredHeroList = fullHeroList.filter(
        (item) => item.id !== options.hero.id
      );
      fullHeroList = [...filteredHeroList, options.hero];
    }
    return fullHeroList;
  }
}
