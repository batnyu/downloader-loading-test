import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPageComponent } from './loading-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent;
  let fixture: ComponentFixture<LoadingPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ LoadingPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
