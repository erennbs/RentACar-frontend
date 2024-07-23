import { Component } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  brands: Brand[] = []

  constructor( private brandService: BrandService,) {}

  ngOnInit(): void {
    this.getBrands();
  }
  
  getBrands(): void {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }
}
