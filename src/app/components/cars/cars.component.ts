import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CarDetails } from '../../models/carDetails';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { FiltersComponent } from "../filters/filters.component";
import { ImagePathPipe } from '../../pipes/image-path.pipe';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterLink, FiltersComponent, ImagePathPipe],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  @ViewChild('filters') filtersComponent: FiltersComponent;

  cars: CarDetails[] = []
  dataLoaded: boolean;

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
      this.dataLoaded = true;
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

  filterCars() {
    // this.cars = [] 
    
    this.carService.getCarsFiltered({"brand": this.filtersComponent.selectedBrand, "color": this.filtersComponent.selectedColor}).subscribe(response => {
      this.cars = response.data;
    })
  }

  resetFilters() {
    this.filtersComponent.selectedBrand = "";
    this.filtersComponent.selectedColor = "";

    this.getCars();
  }
}
