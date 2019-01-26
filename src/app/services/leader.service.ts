import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  [x: string]: any;
  constructor() { }

  leader: Leader[];

getLeaders(): Promise<Leader[]> {
  return Promise.resolve(LEADERS);
}

  getLeader(id: number):Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
