import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('cars');
      return
    }
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  register() {
    if(this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success('Başarıyla Kayıt olundu')
          localStorage.setItem('token', response.data.token)
        }
      }, responseError => {
        this.toastrService.error(responseError.error.message);
      })
    } else {
        this.toastrService.error('Şifre en az 8 karakterden oluşmalı', 'Doğrulama Hatası');
    }

  }
}
