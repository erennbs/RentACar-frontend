import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output('filterCars') filterCars: EventEmitter<any> = new EventEmitter()
  @Output('resetFilters') resetFilters: EventEmitter<any> = new EventEmitter()

  brands: Brand[] = []
  selectedBrand: string = "";

  colors: Color[] = [];
  selectedColor: string = "";

  constructor( private brandService: BrandService, private colorService: ColorService) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(): void {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  handleFilter() {
    this.filterCars.emit();
  }

  handleReset() {
    this.resetFilters.emit();
  }
}
