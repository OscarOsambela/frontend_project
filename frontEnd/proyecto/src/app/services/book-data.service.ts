import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  private book: any;

  constructor() { }

  setBook(book: any) {
    this.book = book;
  }

  getBook() {
    return this.book;
  }
}
