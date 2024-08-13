import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../models/payment';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
  carId: number;
  customerId: number;
  availableDate: Date;

  constructor(private activatedRoute: ActivatedRoute, private rentalService: RentalService, private toastrService: ToastrService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carId = params["carId"]
        this.customerId = 1;
        this.getAvailableDate(this.carId);
    }
  })
}

  paymentForm = new FormGroup({
    cardholderName: new FormControl(''),
    cardNumber: new FormControl(''),
    expirationDate: new FormControl(''),
    securityCode: new FormControl(''),
    rentDate: new FormControl(''),
    returnDate: new FormControl('')
  })

  getAvailableDate(carId: number) {
    this.rentalService.getAvailableDate(carId).subscribe(response => {
      this.availableDate = new Date(response.data);
      console.log(response);
    })
  }

  handleSubmit() {
    if (new Date(this.paymentForm.value.rentDate!) < this.availableDate) {
      this.toastrService.error("Lütfen uygun bir tarih seçiniz.", "Hatalı Tarih");
      return;
    }

    let payment : Payment = {
      cardholderName: this.paymentForm.value.cardholderName!,
      cardNumber: this.paymentForm.value.cardNumber!,
      expirationDate: this.paymentForm.value.expirationDate!,
      securityCode: this.paymentForm.value.securityCode!,
      rentDate: this.paymentForm.value.rentDate!,
      returnDate: this.paymentForm.value.returnDate!,
      customerId: 1,
      carId: this.carId,
    }

    let rental: Rental = {
      carId: this.carId,
      customerId: this.customerId,
      rentDate: this.paymentForm.value.rentDate!,
      returnDate: this.paymentForm.value.returnDate!
    }
    
    this.paymentService.makePayment(payment).subscribe(response => {
      if (response.success) {
        this.rentalService.addRental(rental, payment).subscribe(response => {
          if (response.success) {
            this.toastrService.success(response.message);
            
          } else {
            this.toastrService.error(response.message);
          }
        })
      } else {
        this.toastrService.error('Ödeme başarısız');
      }
    })
    
  }
}
