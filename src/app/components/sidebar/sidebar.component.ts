import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrandsComponent } from "../brands/brands.component";
import { ColorsComponent } from "../colors/colors.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, BrandsComponent, ColorsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
