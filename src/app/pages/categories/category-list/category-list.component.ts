import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { element } from 'protractor';

@Component({
  selector:    'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls:   [ './category-list.component.scss' ]
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar lista')
    );
  }

  deleteCategory(category) {
    const mustDelete = confirm(`Deseja deletar item ${category.id}?`);
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        _ => this.categories = this.categories.filter(element => element !== category),
        _ => alert('error ao excluir')
      );
    }
  }

}
