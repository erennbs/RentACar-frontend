import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  cars: Car[] = []

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private imageService: ImageService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else {
        this.getCars();
      }
    })

  }

  getCars(): void {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
    });
  }

  getCarImage(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe(response => {
      return response.data[0].imagePath;
    })
  }
}
