import { Component } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Brand } from '../../models/brand';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  brands: Brand[];
  brandAddForm: FormGroup
  brandEditForm: FormGroup

  editingBrand: Brand = {id: -1, name: ''};

  constructor(private brandService: BrandService, private toastrService: ToastrService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getBrands();
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }
  
  createBrandEditForm() {
    this.brandEditForm = this.formBuilder.group({
      id: [this.editingBrand.id, Validators.required],
      name: [this.editingBrand.name, Validators.required]
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  addBrand() {
    this.deactivateBrandEditing();
    let brand = Object.assign({}, this.brandAddForm.value);
    if (this.brandAddForm.valid) {
      this.brandService.addBrand(brand).subscribe(response => {
        if (response.success) {
          brand.id = response.data.id;
          this.brands.push(brand);
          this.toastrService.success(`"${brand.name}" eklendi`, "Marka Eklendi");
        } else {
          this.toastrService.error("Bir hata oluştu", "Marka Eklenemedi");
        }
      })
    } else {
      this.toastrService.error("Marka ismini boş bırakmayınız", "Doğrulama Hatası");
    }
    this.brandAddForm.setValue({name: ''})
  }

  deleteBrand(brandId: number) {
    this.deactivateBrandEditing();
    this.brandService.deleteBrand(brandId).subscribe(response => {
      if (response.success) {
        let index = this.brands.findIndex(brand => brand.id === brandId);
        let deletedBrand = this.brands.splice(index)[0];
        this.toastrService.success(`"${deletedBrand.name}" silindi`, "Marka Silindi");
      } else {
        this.toastrService.error("Kayıtlı araçların markası silinemez.", "Marka Silinemedi");
      }
    })
  }

  editBrand(brand: Brand) {
    let brandUpdated = Object.assign({}, this.brandEditForm.value);
    brandUpdated.id = this.editingBrand.id;
    if (this.brandEditForm.valid) {
      this.brandService.updateBrand(brandUpdated).subscribe(response => {
        if (response.success) {
          this.toastrService.success(`"${brand.name}" güncellendi`, "Marka Güncellendi");
          brand.name = brandUpdated.name;
        }
      })
    } else {
      this.toastrService.error("Marka ismini boş bırakmayınız", "Doğrulama Hatası");
    }
    this.deactivateBrandEditing();
  }

  activateBrandEditing(brand: Brand) {
    this.editingBrand = brand;
    this.createBrandEditForm();
  }

  deactivateBrandEditing() {
    this.editingBrand = {id: -1, name: ''};
  }
}
