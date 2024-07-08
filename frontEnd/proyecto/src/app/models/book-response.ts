import { Book } from "./books.model";

export class BookResponse {
  error: boolean;
  total: number;
  page: number;
  limit: number;
  genres: string[];
  authors: string[];
  titles: string[];
  publicationDates: number[];
  books: Book[];

  constructor(
    error: boolean = false,
    total: number = 0,
    page: number = 0,
    limit: number = 0,
    genres: string[] = [],
    authors: string[] = [],
    titles: string[] = [],
    publicationDates: number[] = [],
    books: Book[] = []
  ) {
    this.error = error;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.genres = genres;
    this.authors = authors;
    this.titles = titles;
    this.publicationDates = publicationDates;
    this.books = books;
  }
}
