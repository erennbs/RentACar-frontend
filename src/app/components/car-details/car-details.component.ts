import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  images: Image[];
  currentCar: Car;
  dataLoaded: boolean = false;

  constructor(private imageService: ImageService, private carService: CarService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getImagesByCarId(params["carId"]);
        this.getCarById(params["carId"]);
      }
    })
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.currentCar = response.data;
      this.dataLoaded = true;
    })
  }

  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe(response => {
      this.images = response.data;
    })
  }
}
