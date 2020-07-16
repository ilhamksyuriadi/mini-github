import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesPageComponent } from './repositories-page.component';

describe('RepositoriesPageComponent', () => {
  let component: RepositoriesPageComponent;
  let fixture: ComponentFixture<RepositoriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
