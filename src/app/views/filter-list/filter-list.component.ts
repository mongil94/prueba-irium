import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, first, takeUntil } from 'rxjs';
import { TABLE_COLUMNS } from 'src/app/constants/table-columns.constant';
import { Hero } from 'src/app/interfaces/heroes/hero.interface';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  templateUrl: 'filter-list.component.html',
})
export class FilterListComponent implements OnInit, OnDestroy {
  constructor(private _heroService: HeroService) {}

  private _destroy$: Subject<void> = new Subject<void>();

  public filterListForm = new FormGroup({
    hero: new FormControl(''),
  });
  public dataSource: Hero[] = [];
  public dataTable: Hero[] = [];
  public displayedColumns: string[] = TABLE_COLUMNS;

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

  ngOnInit(): void {
    this._getHeroes();
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
