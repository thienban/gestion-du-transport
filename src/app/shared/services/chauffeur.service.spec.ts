import { TestBed, inject } from '@angular/core/testing';

import { ChauffeurService } from './chauffeur.service';

describe('ChauffeurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChauffeurService]
    });
  });

  it('should be created', inject([ChauffeurService], (service: ChauffeurService) => {
    expect(service).toBeTruthy();
  }));
});
