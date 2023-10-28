import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  isCategory = false;

  category: Category = new Category();
  categoryList$: Observable<Category[]>;


  private readonly auth = inject(AuthService);
  private readonly categoryService = inject(CategoryService);
  ngOnInit(): void {
    this.auth.user$.subscribe(res => {
      this.category.userId = res?.sub ?? '';
      this.fetchCategory()
    })
  }

  fetchCategory() {
    this.categoryList$ = this.categoryService.getCategoriesByUserId(this.category.userId)
  }
  userByCategoryId(index: number, category: Category) {
    return category._id;
  }

  showDialog() {
    this.isCategory = true
  }

  onSubmit(form: NgForm) {
    this.isCategory = false;
    this.categoryService.createCategories(this.category).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchCategory();
      }, error: (err) => {
        console.log(err);
      }
    })
    form.resetForm();

  }
}
