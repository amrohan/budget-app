export class Category {
    _id: string;
    userId: string;
    categoryName: string
}
// Omit _id and userId
export class CategoryWithoutId {
    categoryName: string;
}