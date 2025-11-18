import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacaoCanecasComponent } from './comparacao-canecas.component';

describe('ComparacaoCanecasComponent', () => {
  let component: ComparacaoCanecasComponent;
  let fixture: ComponentFixture<ComparacaoCanecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparacaoCanecasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparacaoCanecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
