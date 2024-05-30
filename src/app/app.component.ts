import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private _translateService: TranslateService) {
    _translateService.setDefaultLang('es');
    _translateService.use('es');
  }
  private _destroy$: Subject<void> = new Subject<void>();

  public title = '';

  private _setDataTranslate() {
    const literal = ['MAIN.TITLE'];
    this._translateService
      .stream([...literal])
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response) => {
          this.title = response[literal[0]];
        },
      });
  }

  ngOnInit(): void {
    this._setDataTranslate();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
