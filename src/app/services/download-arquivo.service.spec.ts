import { TestBed } from '@angular/core/testing';

import { DownloadArquivoService } from './download-arquivo.service';

describe('DownloadArquivoService', () => {
  let service: DownloadArquivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadArquivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
