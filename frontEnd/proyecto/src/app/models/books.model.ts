export class Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: number;
  imagePath: string;

  constructor(
    _id: string = '',
    title: string = '',
    author: string = '',
    genre: string = '',
    publicationDate: number = 0,
    imagePath: string = '' 
  ) {
    this._id = _id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publicationDate = publicationDate;
    this.imagePath = imagePath;
  }
}
