import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Windstorm', description: 'this is a description 1' },
      { id: 2, name: 'Bombasto', description: 'this is a description 2' },
      { id: 3, name: 'Magneta', description: 'this is a description 3' },
      { id: 4, name: 'Tornado', description: 'this is a description 4' }
    ];

    return { categories };
  }
}
