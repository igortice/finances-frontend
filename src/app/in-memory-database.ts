import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos conta da casa' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, Parque, Praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de salário' },
      { id: 5, name: 'Freelas', description: 'Trabalho como frelancer' }
    ];

    const entries: Entry[] = [
      {
        id:          1,
        name:        'Gás de Cozinha',
        categoryId:  categories[ 0 ].id,
        category:    categories[ 0 ],
        paid:        true,
        date:        '14/10/2018',
        amount:      '70,69',
        type:        'expense',
        description: 'apenas uma descrição'
      } as Entry,
      {
        id:          2,
        name:        'Plano Saúde',
        categoryId:  categories[ 1 ].id,
        category:    categories[ 1 ],
        paid:        true,
        date:        '16/10/2018',
        amount:      '430,00',
        type:        'expense',
        description: 'plano multiplan unimed fortaleza'
      } as Entry,
      {
        id:          3,
        name:        'Croco Beach',
        categoryId:  categories[ 2 ].id,
        category:    categories[ 2 ],
        paid:        false,
        date:        '16/10/2018',
        amount:      '110,00',
        type:        'expense',
        description: 'feriado na praia com família'
      } as Entry,
      {
        id:          4,
        name:        'Recebimento 13 + Salario',
        categoryId:  categories[ 3 ].id,
        category:    categories[ 3 ],
        paid:        true,
        date:        '05/10/2018',
        amount:      '7700,00',
        type:        'renevue',
        description: 'recebimento proventos'
      } as Entry
    ];

    return { categories, entries };
  }
}
