import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { CreateComponent } from './components/create/create.component';
import { AllBooksComponent } from './components/all-books/all-books.component';

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'create-book', component: CreateComponent},
  {path: 'edit-book/:id', component: CreateComponent},
  {path: 'all', component: AllBooksComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
