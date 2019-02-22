import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Feedback } from '../shared/feedback';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.restangular.all('feedback').post(feedback);
  }
}
