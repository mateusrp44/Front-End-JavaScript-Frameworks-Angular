import { Injectable } from '@angular/core';

import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PromotionService
{
  constructor() {}

  getPromotions(): /*Promise*/Observable<Promotion[]> {
    /*Observable*/return of(PROMOTIONS).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });*/
  }

  getPromotion(id: number): /*Promise*/Observable<Promotion> {
    /*Observable*/return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
    });*/
  }

  getFeaturedPromotion(): /*Promise*/Observable<Promotion> {
    /*Observable*/return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });*/
  }
}
