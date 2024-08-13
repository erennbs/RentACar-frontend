import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService,
    private router: Router, private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('cars');
      return
    }
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        if (response.success) {
          this.localStorageService.add('token', response.data.token);
          window.location.reload();
        }
      }, responseError => {
        this.toastrService.error(responseError.error.message, 'Hata');
      })
    } else {
      this.toastrService.error('Alanları doldurunuz');
    }
  }

}
