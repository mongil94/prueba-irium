import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { EMPTY_HERO } from 'src/app/constants/empty-hero.constant';
import { OriginHero } from 'src/app/enums/origin-hero.enum';
import { HeroOptions } from 'src/app/interfaces/heroes/hero-edited-created.interface';
import { Hero } from 'src/app/interfaces/heroes/hero.interface';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  templateUrl: 'filter-list.component.html',
  styleUrls: ['filter-list.component.scss'],
})
export class FilterListComponent implements OnInit, OnDestroy {
  constructor(private _heroService: HeroService, private _router: Router) {}

  private _destroy$: Subject<void> = new Subject<void>();

  public filterListForm = new FormGroup({
    hero: new FormControl(''),
  });
  public dataSource: Hero[] = [];
  public dataTable: Hero[] = [];
  public isLoading = false;

  private _getHeroes() {
    this._heroService
      .getHeroes()
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.dataTable = response;
        },
      });
  }

  private _getHeroData() {
    this._heroService.heroData$.pipe(first()).subscribe({
      next: (result) => {
        if (result.origin === OriginHero.NONE) {
          this._getHeroes();
          this.isLoading = true;
          document
            .getElementById('main-container')
            ?.classList.add('position-relative');
          setTimeout(() => {
            this.isLoading = false;
            document
              .getElementById('main-container')
              ?.classList.remove('position-relative');
          }, 1000);
        } else {
          this.dataTable = this._heroService.editHeroList(result);
        }
      },
    });
  }

  public goToNewHero() {
    const heroOptions: HeroOptions = {
      heroList: this.dataSource,
      fullHeroList: this.dataTable,
      origin: OriginHero.NEW,
      hero: EMPTY_HERO,
    };
    this._heroService.setHeroData(heroOptions);
    this._router.navigateByUrl('new');
  }

  public outputDataTable(event: Hero[]) {
    this.dataTable = event;
  }

  ngOnInit(): void {
    this._getHeroData();
    this.filterListForm
      .get('hero')
      ?.valueChanges.pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (newValue) => {
          if (newValue) {
            this.dataSource = this.dataTable.filter((item) =>
              item.heroName.toUpperCase().includes(newValue.toUpperCase())
            );
          } else {
            this.dataSource = [];
          }
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
