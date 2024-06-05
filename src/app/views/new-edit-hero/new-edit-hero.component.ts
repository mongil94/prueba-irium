import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, first, takeUntil } from 'rxjs';
import { OriginHero } from 'src/app/enums/origin-hero.enum';
import { HeroOptions } from 'src/app/interfaces/heroes/hero-edited-created.interface';
import { Hero } from 'src/app/interfaces/heroes/hero.interface';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  templateUrl: 'new-edit-hero.component.html',
  styleUrls: ['new-edit-hero.component.scss'],
})
export class NewEditHeroComponent implements OnInit, OnDestroy {
  constructor(
    private _heroService: HeroService,
    private _router: Router,
    private _translateService: TranslateService
  ) {}

  private _heroCreated: Hero;
  private _heroEdited: Hero;
  private _destroy$: Subject<void> = new Subject<void>();
  private _heroData: HeroOptions;

  public titleComponent: string;
  public buttonPrimary: string;
  public isAllowRecord = false;
  public newEditHeroForm = new FormGroup({
    heroName: new FormControl('', { nonNullable: true }),
    humanName: new FormControl('', { nonNullable: true }),
    age: new FormControl('', { nonNullable: true }),
  });

  private _getHeroData() {
    this._heroService.heroData$.pipe(first()).subscribe({
      next: (result) => {
        this._heroData = result;
      },
      complete: () => {
        this._setDataTranslate();
      },
    });
  }

  private _setDataTranslate() {
    const literals = [
      'NEW_EDIT_HERO.TITLE_CREATE',
      'NEW_EDIT_HERO.TITLE_EDIT',
      'BUTTON.CREATE',
      'BUTTON.EDIT',
    ];
    this._translateService
      .stream([...literals])
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response) => {
          if (this._heroData.origin === OriginHero.EDIT) {
            this.titleComponent = response[literals[1]];
            this.buttonPrimary = response[literals[3]];
          } else {
            this.titleComponent = response[literals[0]];
            this.buttonPrimary = response[literals[2]];
          }
        },
      });
  }

  public cancel() {
    this._router.navigateByUrl('/');
  }

  public recordHero() {
    this._heroService.heroData$.pipe(first()).subscribe({
      next: (result) => {
        if (result.origin === OriginHero.EDIT) {
          this._heroService
            .editHero(this.newEditHeroForm.getRawValue(), result.hero.id)
            .pipe(first())
            .subscribe({
              next: (response) => {
                this._heroEdited = response.heroEdited;
                this._heroService.setHeroData({
                  heroList: result.heroList,
                  fullHeroList: result.fullHeroList,
                  hero: this._heroEdited,
                  origin: OriginHero.EDIT,
                });
              },
              complete: () => {
                this._router.navigateByUrl('/');
              },
            });
        } else {
          this._heroService
            .createHero(this.newEditHeroForm.getRawValue())
            .pipe(first())
            .subscribe({
              next: (response) => {
                this._heroCreated = response.heroCreated;
                this._heroService.heroData$
                  .pipe(first())
                  .subscribe((response) => {
                    this._heroService.setHeroData({
                      hero: this._heroCreated,
                      heroList: response.heroList,
                      fullHeroList: response.fullHeroList,
                      origin: OriginHero.NEW,
                    });
                  });
              },
              complete: () => {
                this._router.navigateByUrl('/', {
                  state: { origin: OriginHero.NEW },
                });
              },
            });
        }
      },
    });
  }

  ngOnInit(): void {
    this._getHeroData();
    if (this._heroData.origin === OriginHero.EDIT) {
      this.newEditHeroForm.patchValue({
        heroName: this._heroData.hero.heroName,
        humanName: this._heroData.hero.humanName,
        age: this._heroData.hero.age,
      });
      this.isAllowRecord = true;
    }
    this.newEditHeroForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: () => {
          const heroName = this.newEditHeroForm.get('heroName')?.value;
          const humanName = this.newEditHeroForm.get('humanName')?.value;
          const age = this.newEditHeroForm.get('age')?.value;
          this.isAllowRecord = !!(heroName && humanName && age);
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
