import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryWithoutId } from 'src/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly http = inject(HttpClient)
  private readonly baseUrl = environment.backend.ApiUrl
  headers = new HttpHeaders().set(
    "Authorization",
    "Bearer " + environment.backend.AuthToken
  )
  getCategoriesByUserId(userId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/user/${userId}`, { headers: this.headers })
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${categoryId}`, { headers: this.headers })
  }

  createCategories(model: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, model, { headers: this.headers })
  }

  updateCategoryById(id: string, category: CategoryWithoutId): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, category, { headers: this.headers })
  }

  deleteCategoryById(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/categories/${categoryId}`, { headers: this.headers })
  }

}
