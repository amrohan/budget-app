import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/models/category';

@Pipe({
  name: 'categoryIdToName'
})
export class CategoryIdToNamePipe implements PipeTransform {

  transform(categoryId: string, categories: Category[]): string {
    const category = categories.find(category => category._id === categoryId);
    return category ? category.categoryName : '';
  }

}
