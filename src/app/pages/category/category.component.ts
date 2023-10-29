import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  isCategory = false;
  isCardOpen: boolean = false
  cardItems: MenuItem[] | undefined;
  clickedItemId: string;
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

  onCardClick(_id: string) {
    this.isCardOpen = !this.isCardOpen;

    if (_id) {
      this.category._id = _id;
      this.categoryService.getCategoryById(_id).subscribe({
        next: (res) => {
          this.category = res
        }, error: (err) => {
          console.log(err);
        }
      })
    }

  }

  updateCategory(form: NgForm) {
    const { _id, ...category } = this.category;

    this.categoryService.updateCategoryById(_id, category).subscribe({
      next: (res) => {
        this.isCardOpen = !this.isCardOpen
        this.fetchCategory();
        form.resetForm();
      },
      error: (err) => {
        this.isCardOpen = !this.isCardOpen
        console.log(err);

      }
    })
  }

  deleteCategory() {
    this.categoryService.deleteCategoryById(this.category._id).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchCategory();
        this.isCardOpen = !this.isCardOpen
      },
      error: (err) => {
        this.isCardOpen = !this.isCardOpen
      }
    })

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
