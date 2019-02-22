import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { RestangularConfigFactory } from '../shared/restConfig';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor(/*private http: HttpClient,*/ private restangular: Restangular) {}

  getLeaders(): /*Promise*/Observable<Leader[]> {
    /*Restangular*/ return this.restangular.all('leaders').getList();
    /*HTTP*/ //return this.http.get<Leader[]>(baseURL + 'leaders');
    /*Observable*/ //return of(LEADERS).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      //Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS), 2000);
    });*/
  }

  getLeader(id: number):/*Promise*/Observable<Leader> {
    /*Restangular*/ return this.restangular.one('leadeers', id).get();
    /*HTTP*/ //return this.http.get<Leader>(baseURL + 'leaders/' + id);
    /*Observable*/ //return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    /*Promise*//*return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });*/
  }

  getFeaturedLeader(): /*Promise*/Observable<Leader> {
    /*Restangular*/ return this.restangular.all('leaders').getList({featured: true}).pipe(map(leaders => leaders[0])).pipe(catchError(error => error));
    /*HTTP*/ //return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]));
    /*Observable*/ //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    /*Promise*//*return  new Promise(resolve => {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });*/
  }
}
