import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { TABLE_COLUMNS } from 'src/app/constants/table-columns.constant';
import { Hero } from 'src/app/interfaces/heroes/hero.interface';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  templateUrl: 'filter-list.component.html',
  styleUrls: ['filter-list.component.scss'],
})
export class FilterListComponent implements OnInit, OnDestroy {
  constructor(
    private _heroService: HeroService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

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

  public goToNewHero() {
    this._router.navigateByUrl('new');
  }

  public editHero(ev: Hero) {
    console.log(ev);
  }

  public deteleRow(ev: Hero) {
    const dialogRef = this._dialog.open(DialogDeleteComponent);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        result
          ? this._heroService
              .deleteHero(ev.id, this.dataSource, this.dataTable)
              .pipe(first())
              .subscribe((response) => {
                this.dataSource = response.heroList;
                this.dataTable = response.fullHeroList;
              })
          : null;
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
