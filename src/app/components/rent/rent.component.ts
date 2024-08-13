import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../models/payment';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

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

  paymentForm: FormGroup;
  rentalForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private rentalService: RentalService, private toastrService: ToastrService,
    private paymentService: PaymentService, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.carId = params["carId"]
        this.customerId = this.authService.getUserId();
    }
    this.createRentalForm();
    this.createPaymentForm();
  })
}

  createPaymentForm () {
    this.paymentForm = this.formBuilder.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.required],
    })
  }

  createRentalForm () {
    this.rentalForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      userId: [this.customerId, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required,],
    })
  }

  handleSubmit() {
    let rental: Rental = Object.assign({}, this.rentalForm.value)
    let payment: Payment = Object.assign({}, this.paymentForm.value)

    this.paymentService.makePayment(payment).subscribe(response => {
      if (response.success) {
        this.rentalService.addRental(rental).subscribe(response => {
          if (response.success) {
            this.toastrService.success(response.message);
          }
        }, errorResponse => {
          this.toastrService.error(errorResponse.error.message);
        } )
      } else {
        this.toastrService.error('Ödeme başarısız');
      }
    })
  }

  resetForms() {
    this.rentalForm.reset();
    this.paymentForm.reset();
  }
}
