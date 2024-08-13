import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RentalDetails } from '../../models/rentalDetails';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent {
  rentals : RentalDetails[];

  constructor(private rentalService: RentalService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.getRentalDetails();
  }

  getRentalDetails() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
    })
  }

  deleteRental(id: number) {
    this.rentalService.deleteRental(id).subscribe(response => {
      if (response.success) {
        let idx = this.rentals.findIndex(r => r.id == id);
        this.rentals.splice(idx, 1);
        this.toastrService.success(response.message);
      }
    })
  }
}
