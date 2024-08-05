import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent {
  colors: Color[];
  colorAddForm: FormGroup
  colorEditForm: FormGroup

  editingColor: Color = {id: -1, name: ''};

  constructor(private colorService: ColorService, private toastrService: ToastrService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getColor();
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }
  
  createColorEditForm() {
    this.colorEditForm = this.formBuilder.group({
      id: [this.editingColor.id, Validators.required],
      name: [this.editingColor.name, Validators.required]
    })
  }

  getColor() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  addColor() {
    this.deactivateColorEditing();
    let color = Object.assign({}, this.colorAddForm.value);
    if (this.colorAddForm.valid) {
      this.colorService.addColor(color).subscribe(response => {
        if (response.success) {
          color.id = response.data.id;
          this.colors.push(color);
          this.toastrService.success(`"${color.name}" eklendi`, "Renk Eklendi");
        } else {
          this.toastrService.error("Bir hata oluştu", "Renk Eklenemedi");
        }
      })
    } else {
      this.toastrService.error("Renk ismini boş bırakmayınız", "Doğrulama Hatası");
    }
    this.colorAddForm.setValue({name: ''})
  }

  deleteColor(colorId: number) {
    this.deactivateColorEditing();
    this.colorService.deleteColor(colorId).subscribe(response => {
      if (response.success) {
        let index = this.colors.findIndex(brand => brand.id === colorId);
        let deletedBrand = this.colors.splice(index)[0];
        this.toastrService.success(`"${deletedBrand.name}" silindi`, "Marka Silindi");
      } else {
        this.toastrService.error("Kayıtlı araçların markası silinemez.", "Marka Silinemedi");
      }
    })
  }

  editColor(color: Color) {
    let colorUpdated = Object.assign({}, this.colorEditForm.value);
    colorUpdated.id = this.editingColor.id;
    if (this.colorEditForm.valid) {
      this.colorService.updateColor(colorUpdated).subscribe(response => {
        if (response.success) {
          this.toastrService.success(`"${color.name}" güncellendi`, "Renk Güncellendi");
          color.name = colorUpdated.name;
        }
      })
    } else {
      this.toastrService.error("Renk ismini boş bırakmayınız", "Doğrulama Hatası");
    }
    this.deactivateColorEditing();
  }

  activateColorEditing(color: Color) {
    this.editingColor = color;
    this.createColorEditForm();
  }

  deactivateColorEditing() {
    this.editingColor = {id: -1, name: ''};
  }
}

