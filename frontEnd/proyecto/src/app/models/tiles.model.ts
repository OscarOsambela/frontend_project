export class Tile {
  text: string;
  cols: number;
  rows: number;
  color: string;
  formControlName: string | null;
  label: string;
  errorMessage: string | null;
  isFileInput?: boolean;

constructor(
  text: string = '',
  cols: number = 0,
  rows: number = 0,
  color: string = '',
  formControlName: string | null,
  label: string = '',
  errorMessage: string | null,
  isFileInput?: boolean,
){
  this.text = text,
  this.cols = cols,
  this.rows = rows,
  this.color = color,
  this.formControlName = formControlName,
  this.label = label,
  this.errorMessage = errorMessage,
  this.isFileInput = isFileInput
}

}

