import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector:    'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls:   [ './entry-form.component.scss' ]
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm                = false;
  entry: Entry                  = new Entry();
  imaskConfigAmount             = {
    mask:               Number,
    scale:              2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  // PRIVATE METHODS

  private setCurrentAction() {
    if (this.route.snapshot.url[ 0 ].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id:          [ null ],
      name:        [ null, [ Validators.required, Validators.minLength(2) ] ],
      description: [ null ],
      type:        [ null, [ Validators.required ] ],
      amount:      [ null, [ Validators.required ] ],
      date:        [ null, [ Validators.required ] ],
      paid:        [ null, [ Validators.required ] ],
      categoryId:  [ null, [ Validators.required ] ]
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry);
        },
        () => this.toastr.error('Problemas de comunicação com servidor', 'Error')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Lançamento';
    } else {
      this.pageTitle = `Editando lançamento: ${this.entry.name || '' }`;
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(entry: Entry) {
    this.toastr.success('Item criado com êxito', 'Sucesso');

    this.router.navigateByUrl('entries', { skipLocationChange: true }).then(
      () => this.router.navigate([ 'entries', entry.id, 'edit' ])
    );
  }

  private actionsForError(error) {
    this.toastr.info('Problemas de comunicação com servidor', 'Error');

    this.submittingForm = false;

    if (error.status === 422) {
      // this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [ 'Falha na comunicação com o servidor.' ];
    }
  }
}