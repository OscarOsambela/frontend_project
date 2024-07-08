import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSetFixedImage]'
})
export class SetFixedImageDirective implements OnInit{

  @Input() width: string | undefined;
  @Input() height: string | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setFixedSize();
  }

   private setFixedSize(): void {
    if (this.width) {
      this.renderer.setStyle(this.el.nativeElement, 'width', this.width);
    }
    if (this.height) {
      this.renderer.setStyle(this.el.nativeElement, 'height', this.height);
    }
    this.renderer.setStyle(this.el.nativeElement, 'object-fit', 'cover');
  }
}
