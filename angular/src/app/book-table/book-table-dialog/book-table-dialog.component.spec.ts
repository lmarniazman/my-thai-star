import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CovalentCoreModule } from '@covalent/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTableDialogComponent } from './book-table-dialog.component';

describe('BookTableDialogComponent', () => {
  let component: BookTableDialogComponent;
  let fixture: ComponentFixture<BookTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableDialogComponent ],
      imports: [
        CovalentCoreModule.forRoot(),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
