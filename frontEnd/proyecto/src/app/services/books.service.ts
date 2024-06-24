import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url: string = 'http://localhost:3000/books'

  constructor( private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url)
  }

  // getBooksByGenre(genre: string): Observable<Book[]> {
  //   return this.http.get<{ books: Book[] }>(`${this.url}?genre=${genre}`).pipe(
  //     map(response => response.books)
  //   );
  // }

  getBooksByGenre(genre: string, limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}`, {
      params: {
        genre: genre,
        limit: limit.toString(),
        offset: offset.toString()
      }
    });
  }

  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/genres`);
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
