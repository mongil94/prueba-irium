import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Hero } from 'src/app/interfaces/heroes/hero.interface';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  templateUrl: 'new-edit-hero.component.html',
})
export class NewEditHeroComponent {
  constructor(private _heroService: HeroService, private _router: Router) {}

  private _heroCreated: Hero;

  public newEditHeroForm = new FormGroup({
    heroName: new FormControl('', { nonNullable: true }),
    humanName: new FormControl('', { nonNullable: true }),
    age: new FormControl('', { nonNullable: true }),
  });

  public cancel() {
    this._router.navigateByUrl('/');
  }

  public createHero() {
    console.log(this.newEditHeroForm.getRawValue());

    this._heroService
      .createHero(this.newEditHeroForm.getRawValue())
      .pipe(first())
      .subscribe((response) => {
        this._heroCreated = response.heroCreated;
      });
  }
}
