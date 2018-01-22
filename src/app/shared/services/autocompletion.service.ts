import { Injectable } from '@angular/core';

@Injectable()
export class AutocompletionService {
  constructor() {}

  getAddress() {
    if (this.address.length >= 3) {
      let predictions = this.http
        .get<any>('http://localhost:8080/api/autocomplete/' + this.address)
        .subscribe(pred => {
          this.predictionsSubject.next(pred);
          console.log(pred);
        });
    }
  }
}
