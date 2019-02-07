import { Component, OnInit, Input, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

  @Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss'],
    animations: [
      visibility(),
      expand()
    ]
  })

export class DishdetailComponent implements OnInit {

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createAdditionalCommentForm();
    }

    additionalCommentForm: FormGroup;
    additionalComment: Comment;

    formErrors = {
      'author': '',
      'rating': '',
      'comment': ''
    };

    validationMessages = {
      'author': {
        'required': 'Author name is required.',
        'minlength': 'Author name must be more than 2 characters long',
        'maxlength': 'Author name cannot be more than 25 character long'
      },
      'comment': {
        'required': 'Comment is required',
        'minlength': 'Comment must be at least 2 characters long',
        'maxlength': 'Comment cannot be more than 25 character long'
      }
    };

    @Input()

    dish: Dish;
    dishcopy = null;
    dishIds: number[];
    prev: number;
    next: number;
    errMess: string;
    visibility = 'shown'

    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })).subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; }, errmess => { this.dish = null; this.errMess = <any>errmess; });
    }

    goBack(): void {
      this.location.back();
    }

    createAdditionalCommentForm() {
      this.additionalCommentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        rating: '',
        comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
      });
      console.log(this.additionalCommentForm);

      this.additionalCommentForm.valueChanges.subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set form validation messages
    }

    onValueChanged(data?: any) {
      if (!this.additionalCommentForm) { return; }
      const form = this.additionalCommentForm;

      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    setPrevNext(dishId: number) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
      console.log(this.next, this.prev);
    }

    onSubmit() {
    this.additionalComment = this.additionalCommentForm.value;
    this.additionalComment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.additionalComment);
    this.dishcopy.save().subscribe(dish => { this.dish = dish; console.log(this.dish); });
    console.log(this.additionalComment);
    this.additionalCommentForm.reset({
      author: '',
      rating: '',
      comment: ''
    });
  }
}
