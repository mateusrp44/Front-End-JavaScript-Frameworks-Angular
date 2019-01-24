import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';

import { from } from 'rxjs';

import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;
  selectedDish: Dish;
  constructor(private dishservice: DishService) {}
  ngOnInit() {
  this.dishes = this.dishservice.getDishes();
  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
