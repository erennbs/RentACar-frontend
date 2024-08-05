import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Color } from '../../models/color';
import { Brand } from '../../models/brand';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent {
  colors: Color[];
  brands: Brand[];
  files: File[]

  carAddForm: FormGroup

  constructor(private carService: CarService, private imageService: ImageService, private formBuilder: FormBuilder, 
    private toastrService: ToastrService,
    private brandService: BrandService, 
    private colorService: ColorService
  ) {}

  ngOnInit() {
    this.getBrands();
    this.getColors();
    this.createCarAddForm(); 
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', [Validators.required, Validators.min(1980)]],
      dailyPrice: ['', Validators.required],
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

  addCar() {
    let car = Object.assign({}, this.carAddForm.value);
    if (this.carAddForm.valid) {
      this.carService.addCar(car).subscribe(response => {
        if (response.success) {
          this.toastrService.success("Araç başarıyla eklendi", "Ekleme Başarılı")
          if (this.files.length > 0) {
            this.addImages(response.data.id);
          }
        } else {
          this.toastrService.error(response.message, "Hata");
        }
      })
    } else {
      this.toastrService.error("Alanları doğru şekilde doldurunuz", "Doğrulama Başarısız");
    }
    
    this.carAddForm.reset();
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
    if (event.target.files.length > 5) {
      this.toastrService.error('En fazla 5 resim yüklenebilir. Resimleri tekrar yükleyiniz', 'Hata');
      event.target.value = '';
      return;
    }
    this.files = event.target.files
  }
}
