import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    {
      id: '1',
      title: 'Samosa',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Samosachutney.jpg/280px-Samosachutney.jpg',
      ingredients: ['Potato', 'Maida', 'Peas']
    },
    {
      id: '2',
      title: 'Kachori',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kachori_the_favourite_north_Indian_breakfast.JPG/250px-Kachori_the_favourite_north_Indian_breakfast.JPG',
      ingredients: ['Gram Flour', 'Moong Dal']
    }
  ]

  getAllRecipes(){
    return this.recipes
  }
  getRecipeById(recipeId: any){
    return this.recipes.find(r => recipeId === r.id)
  }
  constructor() { }
}
