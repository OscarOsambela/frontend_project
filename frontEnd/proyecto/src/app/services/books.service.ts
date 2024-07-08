import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/books.model';
import { BookResponse } from '../models/book-response';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url: string = 'http://localhost:3000/books'

  constructor( private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url)
  }

  getShowBooks(): Observable<Book[]> {
    return this.http.get<BookResponse>(this.url).pipe(
      map(response => response.books)
    );
  }

  getAllBooks(title: string, limit: number, offset: number): Observable<any> {
    const params: any = { limit: limit.toString(), offset: offset.toString() }
    if (title) {
      params.title = title;
      params.limit = limit.toString(),
      params.offset = offset.toString()
    }
    return this.http.get<any>(`${this.url}/all`, { params });
  }

  getBooksBySearch(genre: string, author: string, title: string, publicationDate: number, limit: number, offset: number): Observable<any> {
    const params: any = { limit: limit.toString(), offset: offset.toString() };
    if (genre) {
      params.genre = genre,
      params.limit = limit.toString(),
      params.offset = offset.toString()
    }
    if (author) {
      params.author = author;
      params.limit = limit.toString(),
      params.offset = offset.toString()
    }
    if (title) {
      params.title = title;
      params.limit = limit.toString(),
      params.offset = offset.toString()
    }
    if (publicationDate) {
      params.publicationDate = publicationDate;
      params.limit = limit.toString(),
      params.offset = offset.toString()
    }
    return this.http.get<any>(`${this.url}`, { params });
  }


  addBook(book: FormData): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }

  updateBook(bookId: string, book: FormData): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${bookId}`, book);
  }

  deleteBook(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
