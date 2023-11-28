import { TestBed } from '@angular/core/testing';

import { LogRequestInterceptor } from './log-request.interceptor';

describe('LogRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogRequestInterceptor = TestBed.inject(LogRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
