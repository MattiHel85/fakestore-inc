export interface Category {
    id: number;
    name: string;
    image: string;
  }

  export interface CategoryState {
    categories: Category[]
    loading: boolean
    error: string | null
}