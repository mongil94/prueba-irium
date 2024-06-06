import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, first, takeUntil } from 'rxjs';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { EMPTY_HERO } from 'src/app/constants/empty-hero.constant';
import { TABLE_COLUMNS } from 'src/app/constants/table-columns.constant';
import { OriginHero } from 'src/app/enums/origin-hero.enum';
import { HeroOptions } from 'src/app/interfaces/heroes/hero-edited-created.interface';
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
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  private _destroy$: Subject<void> = new Subject<void>();

  public filterListForm = new FormGroup({
    hero: new FormControl(''),
  });
  public dataSource: Hero[] = [];
  public dataTable: Hero[] = [];
  public displayedColumns: string[] = TABLE_COLUMNS;
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

  public editHero(ev: Hero) {
    const heroOptions: HeroOptions = {
      heroList: this.dataSource,
      fullHeroList: this.dataTable,
      origin: OriginHero.EDIT,
      hero: ev,
    };
    this._heroService.setHeroData(heroOptions);
    this._router.navigateByUrl('edit');
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
              .subscribe({
                next: (response) => {
                  this.dataSource = response.heroList;
                  this.dataTable = response.fullHeroList;
                  this._snackBar.open(
                    response.message,
                    this._translateService.instant('SNACK_BAR.CLOSE'),
                    { duration: 2000 }
                  );
                },
              })
          : null;
      });
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
