import { Injectable } from '@angular/core';
import { DishService } from './dish.service';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';

import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PromotionService
{
  constructor() {}
  
  getPromotions(): /*Promise*/Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
    /*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });*/
  }

  getPromotion(id: number): /*Promise*/Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(2000));
    /*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
    });*/
  }

  getFeaturedPromotion(): /*Promise*/Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    /*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });*/
  }
}
