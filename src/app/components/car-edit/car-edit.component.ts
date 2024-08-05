import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ImageService } from '../../services/image.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { Brand } from '../../models/brand';
import { Car } from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../../models/image';
import { ImagePathPipe } from '../../pipes/image-path.pipe';

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImagePathPipe],
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.css'
})
export class CarEditComponent {
  car: Car;
  colors: Color[];
  brands: Brand[];
  images: Image[];
  files: File[]

  carEditForm: FormGroup;

  constructor(private carService: CarService, private imageService: ImageService, private formBuilder: FormBuilder, 
    private toastrService: ToastrService,
    private brandService: BrandService, 
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCar(params['carId']);
        this.getImages(params['carId']);
      }
    })
  }

  createCarEditForm() {
    this.carEditForm = this.formBuilder.group({
      description: [this.car.description, Validators.required],
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.car.modelYear, [Validators.required, Validators.min(1980)]],
      dailyPrice: [this.car.dailyPrice, Validators.required],
    })
  }

  getBrands () {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors () {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getImages(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe(response => {
      this.images = response.data;
    })
  }

  getCar(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      if (response.success) {
        this.car = response.data;
        this.createCarEditForm(); 
      }
    })
  }

  editCar() {
    let carUpdated: Car = Object.assign({}, this.carEditForm.value);
    carUpdated.id = this.car.id;
    this.carService.updateCar(carUpdated).subscribe(reponse => {
      if (reponse.success) {
        this.addImages(this.car.id);
        this.toastrService.success('Araç başarıyla güncellendi', 'Güncelleme Başarılı');
      } else {
        this.toastrService.success('Araç güncellenirken bir hata oluştu', 'Güncelleme Başarısız');
      }
    });
  }

  deleteImage(imageId: number) {
    this.imageService.deleteImage(imageId).subscribe(response => {
      if (response.success) {
        let idx = this.images.findIndex(p => p.id == imageId);
        this.images.splice(idx, 1);
        this.toastrService.success('Fotoğraf başarıyla silindi', 'Silme başarılı');
      }
    })
  }

  addImages(carId: number) {
    for (let i = 0; i < this.files.length; i++) {
      this.imageService.addImage(carId, this.files[i]).subscribe(response => {
        if (!response.success) {
          this.toastrService.error('Resim yüklenirken bir sorun oluştu', 'Hata');
          console.log(response.message)
        }
      })
    }
  }

  onChange(event: any) {
    if (event.target.files.length > 5 - this.images.length) {
      this.toastrService.error('En fazla 5 resim yüklenebilir. Resimleri tekrar yükleyiniz', 'Hata');
      event.target.value = '';
      return;
    }
    this.files = event.target.files
  }
}
