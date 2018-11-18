import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports:      [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    ToastrModule.forRoot()
  ],
  exports:      [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ]
})
export class CoreModule {}
