import { Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { CarDetails } from '../../models/carDetails';
import { ToastrService } from 'ngx-toastr';
import { ImagePathPipe } from '../../pipes/image-path.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ImagePathPipe],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  images: Image[];
  currentCar: CarDetails;
  currentImagePath: string;
  dataLoaded: boolean = false;

  constructor(private imageService: ImageService, private carService: CarService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getImagesByCarId(params["carId"]);
        this.getCarById(params["carId"]);
      }
    })
  }

  getCarById(carId: number) {
    this.carService.getDetailsById(carId).subscribe(response => {
      this.currentCar = response.data;
      this.currentImagePath = response.data.imagePath;
      this.dataLoaded = true;
    })
  }

  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe(response => {
      this.images = response.data;
    })
  }

  setCurrentImage(imagePath: string) {
    this.currentImagePath = imagePath;
  }

  deleteCar() {
    this.imageService.deleteByCarId(this.currentCar.id).subscribe(response => {
      if (response.success) {
        this.carService.deleteCar(this.currentCar.id).subscribe(response => {
          if (response.success) {
            this.toastrService.success('Araç başarıyla silindi', 'Silme Başarılı');
            this.router.navigateByUrl('cars')
          } else {
            this.toastrService.error('Araç silinirken bir hata oluştu', 'Silme Başarısız');
          }
        })  
      }
    })
  }

  checkIfAdmin() {
    return this.authService.isAdmin();
  }
}
