import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  slides = [
    { imagePath: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-2-revolution-img-4.png', title: 'Slide 1', description: 'Description 1' },
    { imagePath: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-2-revolution-img-4.png', title: 'Slide 2', description: 'Description 2' },
    { imagePath: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-2-revolution-img-4.png', title: 'Slide 3', description: 'Description 3' },
  ];
  currentSlide = 0;
  interval: any;


  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    this.interval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000); // Cambia cada 3 segundos
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
