import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription, firstValueFrom, map, startWith, tap } from 'rxjs';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/books.model';
import { Router } from '@angular/router';
import { BookDataService } from 'src/app/services/book-data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookDescriptionComponent } from '../book-description/book-description.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy  {
  @ViewChild('slider', { static: false }) slider!: ElementRef<HTMLDivElement>;


  isDisabled: boolean = true;
  listBooks: Book[] = []
  genres: string[] = [];
  authors: string[] = [];
  titles: string[] = [];
  publicationDates: number[] = [];
  filteredAuthors!: Observable<string[]>;
  filteredTitles!: Observable<string[]>;
  filterForm!: FormGroup;
  total: number = 0;
  limit: number = 0;
  currentPage: number = 0;
  btnStyle: string = 'btn-style';
  btnSecondary: string[] = ['btn-style', 'btn-style--secondary'];
  buttonView: string = 'button-view';
//show books
  loading: boolean = true;
  listShowBooks: any[] = [];
  

  yearRanges = [
    { value: 'All', label: 'Todos' },
    { value: '1000-1799', label: 'Antes de 1799' },
    { value: '1800-1850', label: 'De 1800 al 1850' },
    { value: '1851-1899', label: 'De 1851 a 1899' },
    { value: '1900-1950', label: 'De 1900 al 1950' },
    { value: '1951-2000', label: 'De 1951 a 2000' },
    { value: '2001-2010', label: 'De 2000 a 2010' },
    { value: '2010-3000', label: 'De 2011 hasta hoy' }
  ];

  private subscription: Subscription = new Subscription();
  filteredBooks: any[] = [];

  constructor(
    private _booksService: BooksService,
    private router: Router,
    private bookDataService: BookDataService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.filterForm = this.fb.group({
      genre: ['All'],
      author: [''],
      title: [''],
      publicationDate: ['All']
    });

    const authorControl = this.filterForm.get('author');
    if (authorControl) {
      this.filteredAuthors = authorControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterAuthors(value || ''))
      );
    }

    const titleControl = this.filterForm.get('title');
    if (titleControl) {
      this.filteredTitles = titleControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterTitles(value || ''))
      );
    this.filteredTitles.subscribe(value => console.log('Filtered Titles:', value));
    }
   }

   ngOnInit(): void {
    this.getBooks()
    this.fetchGenres()
    this.fetchAuthors()
    this.fetchTitles()
  }

  clearText(controlName: string): void {
    if (controlName === 'genre') {
      this.filterForm.get('genre')?.setValue('All') ||
      this.filterForm.get('publicationDate')?.setValue('All');
    } else {
      this.filterForm.get(controlName)?.setValue('');
    }
    this.filterBooks();
  }

  filterByGenre(genre: string) {
    // Llama al servicio para obtener los libros filtrados por género
    this._booksService.getBooksBySearch(genre, '', '', 0, 10, 0).subscribe(
      (data) => {
        this.listBooks = data.books; // Actualiza la lista de libros filtrados
        console.log('Libros filtrados por género:', this.listBooks);
      },
      (error) => {
        console.error('Error al obtener libros filtrados por género:', error);
      }
    );
  }

  getBooks() {
    this._booksService.getBooks().pipe(
    ).subscribe({
      next: (data) => {
        this.listBooks = data
      },
      error: (error) => {
        this.toastr.error('No se puede obtener los libros:', error);
      }
    });
  }

  async fetchGenres(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this._booksService.getBooks());
      if (response && response.books) {
        this.listBooks = response.books as Book[];
        this.genres = response.genres as string[];
        this.total = response.total
        this.limit = response.limit
      } else {
        this.toastr.error('Respuesta no válida de getBooks:', response);
      }
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }


  async fetchAuthors(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this._booksService.getBooks());
      if (response && response.books) {
        this.listBooks = response.books as Book[];
        this.authors = response.authors as string[];
        this.total = response.total
        this.limit = response.limit
      } else {
        this.toastr.error('Respuesta no válida de getBooks:', response);
      }
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }

  async fetchTitles(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this._booksService.getBooks());
      if (response && response.books) {
        this.listBooks = response.books as Book[];
        this.titles = response.titles as string[];
        this.total = response.total
        this.limit = response.limit
      } else {
        this.toastr.error('Respuesta no válida de getBooks:', response);
      }
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  }

  editBook(book: any) {
    this.bookDataService.setBook(book );
    localStorage.setItem('bookData', JSON.stringify(book));
    this.router.navigate(['/edit-book', book._id]);
  }


  deleteBook(id: string): void {
    this._booksService.deleteBook(id).pipe(
      tap(response => {
        this.listBooks = this.listBooks.filter(book => book._id !== id);
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

  async filterBooks(): Promise<void> {
    const genre = this.filterForm.get('genre')?.value || '';
    const author = this.filterForm.get('author')?.value || '';
    const title = this.filterForm.get('title')?.value || '';
    const publicationDate = this.filterForm.get('publicationDate')?.value || '';
    const offset = this.currentPage * this.limit;
    try {
      const response = await firstValueFrom(this._booksService.getBooksBySearch(genre, author, title, publicationDate, this.limit, offset));
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
        }
      });
    }
  }

  openDialog(book: any) {
    if (book) {
      console.log(book?.fragment)
      const dialogWidth = book?.fragment ? '1250px' : '400px';
      const dialogRef = this.dialog.open(ModalComponent, {
        width: dialogWidth,
        data: { tag: 'Description', book }      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  private extractFilename(path: string): string {
    if (!path) {
      return '';
    }
    const parts = path.split(/[\\/]/);
    return parts[parts.length - 1];
  }

  private _filterAuthors(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.authors.filter(author => author.toLowerCase().includes(filterValue));
  }

  private _filterTitles(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titles.filter(title => title.toLowerCase().includes(filterValue));
  }

//#region show books
currentIndex = 0;
itemsToShow = 4;

ngAfterViewInit(): void {
  console.log('ViewChild initialized:', this.slider); 
  this.updateItemsToShow();
  window.addEventListener('resize', this.updateItemsToShow.bind(this));
}


@HostListener('window:resize', [])
onResize(): void {
  this.updateItemsToShow();
}

updateItemsToShow(): void {
  const width = window.innerWidth;
  console.log(width);
  if (width >= 1024) {
    this.itemsToShow = 4;
  } else if (width >= 600) {
    this.itemsToShow = 2;
  } else {
    this.itemsToShow = 1;
  }

  if (this.slider) {
    this.updateSlidePosition();
  } else {
    console.warn('Slider element is not defined yet.');
  }
}

updateSlidePosition(): void {
  if (this.slider) {
    const translateX = -this.currentIndex * (100 / this.itemsToShow);
    console.log(this.slider);
    this.slider.nativeElement.style.transform = `translateX(${translateX}%)`;
  } else {
    console.error('Slider element is not defined.');
  }
}

next(): void {
  if (this.currentIndex + this.itemsToShow < this.listBooks.length) {
    this.currentIndex += this.itemsToShow;
    this.updateSlidePosition();
  }
}

prev(): void {
  if (this.currentIndex > 0) {
    this.currentIndex -= this.itemsToShow;
    this.updateSlidePosition();
  }
}

getShowBooks(): void {
  this._booksService.getShowBooks().pipe(
  ).subscribe({
    next: (data) => {
      this.listShowBooks = data;
      console.log('this.listBooks', this.listBooks);
      this.loading = false;
    },
    error: (error) => {
      this.toastr.error('No se puede obtener los libros:', error);
    }
  });
}
//#endregion show books

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
