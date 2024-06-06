import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subject, first, takeUntil } from 'rxjs';
import { OriginHero } from 'src/app/enums/origin-hero.enum';
import { CreateHeroForm } from 'src/app/interfaces/heroes/createHero-form.interface';
import { HeroOptions } from 'src/app/interfaces/heroes/hero-edited-created.interface';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'create-edit-form',
  templateUrl: 'create-edit-form.component.html',
  styleUrls: ['create-edit-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class CreateEditFormComponent implements OnInit, OnDestroy {
  constructor(private _heroService: HeroService) {}

  private _destroy$: Subject<void> = new Subject<void>();
  private _heroData: HeroOptions;
  private _isAllowRecord = false;

  public titleComponent: string;
  public buttonPrimary: string;
  public createEditForm = new FormGroup({
    heroName: new FormControl('', { nonNullable: true }),
    humanName: new FormControl('', { nonNullable: true }),
    age: new FormControl('', { nonNullable: true }),
  });

  @Output() outputForm: EventEmitter<CreateHeroForm> = new EventEmitter();
  @Output() outputIsAllowRecord: EventEmitter<boolean> = new EventEmitter();

  private _getHeroData() {
    this._heroService.heroData$.pipe(first()).subscribe({
      next: (result) => {
        this._heroData = result;
      },
    });
  }

  ngOnInit(): void {
    this._getHeroData();
    if (this._heroData.origin === OriginHero.EDIT) {
      this.createEditForm.patchValue({
        heroName: this._heroData.hero.heroName,
        humanName: this._heroData.hero.humanName,
        age: this._heroData.hero.age,
      });
      this._isAllowRecord = true;
      this.outputIsAllowRecord.emit(this._isAllowRecord);
    }
    this.createEditForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe({
      next: () => {
        const heroName = this.createEditForm.get('heroName')?.value;
        const humanName = this.createEditForm.get('humanName')?.value;
        const age = this.createEditForm.get('age')?.value;
        this._isAllowRecord = !!(heroName && humanName && age);
        this.outputForm.emit(this.createEditForm.getRawValue());
        this.outputIsAllowRecord.emit(this._isAllowRecord);
      },
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
