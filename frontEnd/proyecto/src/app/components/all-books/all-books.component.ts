import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/books.model';
import { BooksService } from 'src/app/services/books.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, tap } from 'rxjs';
import { BookDataService } from 'src/app/services/book-data.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  cols: number = 4;
  rowHeight: string = '650px';
  btnStyle: string = 'btn-style';
  btnSecondary: string[] = ['btn-style', 'btn-style--secondary'];
  total: number = 0;
  limit: number = 10;
  offset: number = 0;
  currentPage: number = 0;
  title: string = '';

  listAllBooks: any[] = [];
  filterForm!: FormGroup

  constructor(
    private _booksService: BooksService,
    private toastr: ToastrService,
    private router: Router,
    private bookDataService: BookDataService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this._booksService.getAllBooks(this.title, this.limit, this.offset).pipe(
    ).subscribe({
      next: (data) => {
        this.listAllBooks = data.response

      },
      error: (error) => {
        this.toastr.error('No se puede obtener los libros:', error);
      }
    });
  }

  async filterBooks(): Promise<void> {
    const title = this.filterForm.get('title')?.value || '';
    const offset = this.currentPage * this.limit;
    try {
      const response = await firstValueFrom(this._booksService.getAllBooks(title, this.limit, offset));
      this.total = response.total;
      this.listAllBooks = response.books;
    } catch (error) {
      console.error(error);
    }
  }

  deleteBook(id: string): void {
    this._booksService.deleteBook(id).pipe(
      tap(response => {
        this.listAllBooks = this.listAllBooks.filter((book: { _id: string; }) => book._id !== id);
      })
    ).subscribe({
      next: response => {
        this.toastr.success('El libro seleccionado fue eliminado correctamente.');
      },
      error: error => {
        this.toastr.error('Error eliminando el libro', error);
      }
    });
  }

  editBook(book: any) {
    this.bookDataService.setBook(book );
    localStorage.setItem('bookData', JSON.stringify(book));
    this.router.navigate(['/edit-book', book._id]);
  }

  ifDeleteBook(id: string): void {
    const book = this.listAllBooks.find((b: { _id: string; }) => b._id === id)
    if (book) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '250px',
        data: { tag: 'Delete', title: 'Eliminar libro', content: `¿Está seguro que desea eliminar "${book.title}" del registro de libros?` }
      });

      dialogRef.afterClosed().subscribe(result => {
       if (result) {
          this.deleteBook(id);
        }
      });
    }
  }

    // Función para obtener la URL de la imagen
    getImageUrl(imagePath: string): string {
      const baseUrl = 'http://localhost:3000/uploads/';
      const filename = this.extractFilename(imagePath);
      return baseUrl + filename;
    }

    onPageChanged(event: any): void {
      this.currentPage = event.pageIndex;
      this.limit = event.pageSize;
      this.getBooks();
    }
  

    private extractFilename(path: string): string {
      if (!path) {
        return '';
      }
      const parts = path.split(/[\\/]/);
      return parts[parts.length - 1];
    }
}
