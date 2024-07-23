import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent {
  colors: Color[] = []

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }
  
  getColors(): void {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
}
