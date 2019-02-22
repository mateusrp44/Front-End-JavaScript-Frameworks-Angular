import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { RestangularConfigFactory } from '../shared/restConfig';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PromotionService
{
  constructor(/*private http: HttpClient,*/ private restangular: Restangular) {}

  getPromotions(): /*Promise*/Observable<Promotion[]> {
    /*Restangular*/ return this.restangular.all('promotions').getList().pipe(catchError(error => error));
    /*HTTP*/ //return this.http.get<Promotion[]>(baseURL + 'promotions');
    /*Observable*/ //return of(PROMOTIONS).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });*/
  }

  getPromotion(id: number): /*Promise*/Observable<Promotion> {
    /*Restangular*/ return this.restangular.one('promotions', id).get().pipe(catchError(error => error));
    /*HTTP*/ //return this.http.get<Promotion>(baseURL + 'promotions/' + id);
    /*Observable*/ //return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
    });*/
  }

  getFeaturedPromotion(): /*Promise*/Observable<Promotion> {
    /*Restangular*/ return this.restangular.all('promotions').getList({featured: true}).pipe(map(promotions => promotions[0])).pipe(catchError(error => error));
    /*HTTP*/ //return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
    /*Observable*/ //return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });*/
  }
}
