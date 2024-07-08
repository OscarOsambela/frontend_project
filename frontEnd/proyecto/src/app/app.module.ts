import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { BooksComponent } from './components/books/books.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from './shared/shared-module';
import { ToastrModule } from 'ngx-toastr';
import { SetFixedImageDirective } from './directives/set-fixed-image.directive';

//mat angulat
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/header/header.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ShowBooksComponent } from './components/show-books/show-books.component';
@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CreateComponent,
    SetFixedImageDirective,
    HeaderComponent,
    CarrouselComponent,
    AllBooksComponent,
    LoadingComponent,
    ShowBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatGridListModule,
    SharedModule,
    MatAutocompleteModule,
    ToastrModule.forRoot(), 
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatRippleModule,
    MatProgressBarModule,
    MatSortModule,
    MatMenuModule,
    MatDatepickerModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
