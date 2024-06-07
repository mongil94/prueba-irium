import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CreateEditFormComponent } from './create-edit-form.component';
import { provideHttpClient } from '@angular/common/http';
import { HERO_DATA_EDIT } from '../../mocks/index';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const heroServiceMock = {
  heroData$: of(HERO_DATA_EDIT),
};

describe('Create Edit Form Component', () => {
  let component: CreateEditFormComponent;
  let fixture: ComponentFixture<CreateEditFormComponent>;
  let service: HeroService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        CreateEditFormComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        provideHttpClient(),
        { provide: HeroService, useValue: heroServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFormComponent);
    service = TestBed.inject(HeroService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
