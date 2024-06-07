import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';
import { HeroOptions } from 'src/app/interfaces/heroes/hero-edited-created.interface';
import { Hero } from 'src/app/interfaces/heroes/hero.interface';
import { HeroService } from '../../services/hero.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TABLE_COLUMNS } from '../../constants/table-columns.constant';
import { MatCardModule } from '@angular/material/card';
import { OriginHero } from '../../enums/index';

@Component({
  selector: 'table-heroes',
  templateUrl: 'table-heroes.component.html',
  styleUrls: ['table-heroes.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslateModule, MatCardModule],
})
export class TableHeroesComponent {
  constructor(
    private _heroService: HeroService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private ngZone: NgZone
  ) {}

  public displayedColumns: string[] = TABLE_COLUMNS;

  @Input() dataSource: Hero[];
  @Input() dataTable: Hero[];
  @Output() updatedDataTable: EventEmitter<Hero[]> = new EventEmitter();

  public editHero(ev: Hero) {
    const heroOptions: HeroOptions = {
      heroList: this.dataSource,
      fullHeroList: this.dataTable,
      origin: OriginHero.EDIT,
      hero: ev,
    };
    this._heroService.setHeroData(heroOptions);
    this.ngZone.run(() => {
      this._router.navigateByUrl('edit');
    });
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
                  this.updatedDataTable.emit(this.dataTable);
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
}
