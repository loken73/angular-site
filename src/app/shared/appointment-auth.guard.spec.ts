import { TestBed, async, inject } from '@angular/core/testing';

import { AppointmentAuthGuard } from './appointment-auth.guard';

describe('AppointmentAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentAuthGuard]
    });
  });

  it('should ...', inject([AppointmentAuthGuard], (guard: AppointmentAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
