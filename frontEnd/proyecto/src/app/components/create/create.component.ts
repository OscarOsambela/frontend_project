import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BookDataService } from 'src/app/services/book-data.service';
import { BooksService } from 'src/app/services/books.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  bookForm!: FormGroup;
  isFormSubmitted = false;
  pageTitle: string = '';
  book: any;
  selectedFile: File | null = null;
  
  constructor(
    private fb: FormBuilder,
    private _booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private bookDataService: BookDataService
  ) { }

  ngOnInit(): void {
    this.bookListForm()
    const storedBook = localStorage.getItem('bookData');
    if (this.route.snapshot.url[0].path === 'edit-book') {
      this.pageTitle = 'Editar';
      if (storedBook) {
        this.book = JSON.parse(storedBook);
        this.bookForm.patchValue(this.book);
      } else {
        this.book = this.bookDataService.getBook();
        if (this.book) {
          this.bookForm.patchValue(this.book);
        }
      }
    } else {
      this.pageTitle = 'Agregar';
      this.book = {};
    }

  }

  bookListForm() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s.,!-?¡¿&()]+$')]],
      author: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s.,!-?¡¿&()]+$')]],
      genre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s.,!-?¡¿&()]+$')]],
      publicationDate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    const book = this.bookDataService.getBook()
    if (book) {
      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationDate: book.publicationDate
      })
    }
  }
  
  async onSubmit(): Promise<void> {
    this.isFormSubmitted = true;
    if (this.bookForm.valid) {
      try {
        const formData = new FormData();
        formData.append('title', this.bookForm.get('title')?.value || '');
        formData.append('author', this.bookForm.get('author')?.value || '');
        formData.append('genre', this.bookForm.get('genre')?.value || '');
        formData.append('publicationDate', this.bookForm.get('publicationDate')?.value || '');
  
        if (this.selectedFile) {
          formData.append('image', this.selectedFile, this.selectedFile.name);
        }
  
        if (this.pageTitle === 'Editar') {
          const bookId = this.book._id;
          const response = await firstValueFrom(this._booksService.updateBook(bookId, formData));
          console.log('Libro editado:', response);
        } else {
          const response = await firstValueFrom(this._booksService.addBook(formData));
          console.log('Libro agregado:', response);
          this.clearStoredBook();
          this.bookForm.reset();
        }
        this.router.navigate(['/books']);
      } catch (error) {
        console.error(this.pageTitle === 'Editar Libro' ? 'Error al actualizar libro:' : 'Error agregando el libro:', error);
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
  }

  clearStoredBook() {
    localStorage.removeItem('bookData');
  }

  private navigateBack(): void {
    this.router.navigate(['/']);
  }

  get buttonDisabled(): boolean {
    return !this.bookForm.valid;
  }
  
  }

