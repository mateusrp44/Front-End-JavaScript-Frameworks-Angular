import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { flyInOut, expand } from '../animations/app.animation';

import { from } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;
  selectedDish: Dish;
  errMess: string;

  constructor(
    private dishservice: DishService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishes()/*Promise -> then*//*Observable->*/.subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
