import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, firstValueFrom, tap } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/books.model';
import { Router } from '@angular/router';
import { BookDataService } from 'src/app/services/book-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy  {
  isDisabled: boolean = true;
  listBooks: Book[] = []
  genres: string[] = [];
  filterForm!: FormGroup;
  total: number = 0;
  limit: number = 2;
  currentPage: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(
    private _booksService: BooksService,
    private router: Router,
    private bookDataService: BookDataService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      genre: ['All']
    });
   }

  ngOnInit(): void {
    this.getBooks()
    this.fetchGenres()
  }

  getBooks() {
    this._booksService.getBooks().pipe(
    ).subscribe({
      next: (data) => {
        this.listBooks = data
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
      }
    });
  }

  async fetchGenres(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this._booksService.getBooks());
      if (response && response.books) {
        console.log(response)
        this.listBooks = response.books as Book[];
        this.genres = response.genres as string[];
        this.total = response.total
        this.limit = response.limit
        console.log('Libros cargados:', this.listBooks);
        console.log('Géneros disponibles:', this.genres);
        console.log('Géneros disponibles:', this.total);
        console.log('Géneros disponibles:', this.limit);
      } else {
        console.error('Respuesta no válida de getBooks:', response);
      }
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }

  editBook(book: any) {
    console.log(book)
    this.bookDataService.setBook(book);
    localStorage.setItem('bookData', JSON.stringify(book));
    this.router.navigate(['/edit-book', book._id]);
  }


  deleteBook(id: string): void {
    this._booksService.deleteBook(id).pipe(
      tap(response => {
        console.log('Libro eliminado', response);
        this.listBooks = this.listBooks.filter(book => book._id !== id);
      })
    ).subscribe({
      next: response => {
        console.log('Eliminación completada', response);
      },
      error: error => {
        console.error('Error eliminando el libro', error);
      }
    });
  }

  async filterBooks(): Promise<void> {
    const genre = this.filterForm.get('genre')?.value || '';
    const offset = this.currentPage * this.limit;

    try {
      const response = await firstValueFrom(this._booksService.getBooksByGenre(genre, this.limit, offset));
      this.total = response.total;
      this.listBooks = response.books;
    } catch (error) {
      console.error(error);
    }
  }

  // Función para obtener la URL de la imagen
  getImageUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000/uploads/';
    const filename = this.extractFilename(imagePath);
    return baseUrl + filename;
  }

  private extractFilename(path: string): string {
    if (!path) {
      return '';
    }
    const parts = path.split(/[\\/]/);
    return parts[parts.length - 1];
  }

  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex;
    this.limit = event.pageSize;
    this.filterBooks();
  }

  ifDeleteBook(id: string): void {
    const book = this.listBooks.find(b => b._id === id)
    if (book) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '250px',
        data: { tag: 'Delete', title: 'Eliminar libro', content: `¿Está seguro que desea eliminar "${book.title}" del registro de libros?` }
      });

      dialogRef.afterClosed().subscribe(result => {
       if (result) {
          this.deleteBook(id);
          alert('El libro ha sido eliminado.');
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
