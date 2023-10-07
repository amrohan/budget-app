import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userCategory } from 'src/models/usercategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  isCategory = false;

  category: userCategory = new userCategory();

  showDialog() {
    this.isCategory = true
  }

  onSubmit(form: NgForm) {
    console.log("🚀 ~ file: accounts.component.ts:20 ~ AccountsComponent ~ onSubmit ~ form:", form.value)
    this.isCategory = false;
    form.resetForm();

  }
}
