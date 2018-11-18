import { Component, OnInit } from '@angular/core';

import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector:    'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls:   [ './entry-list.component.scss' ]
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a, b) => b.id - a.id),
      error => alert('Erro ao carregar lista')
    );
  }

  deleteEntry(entry) {
    const mustDelete = confirm(`Deseja deletar item ${entry.id}?`);
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        _ => this.entries = this.entries.filter(element => element !== entry),
        _ => alert('error ao excluir')
      );
    }
  }

}
