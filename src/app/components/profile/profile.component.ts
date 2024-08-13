import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDto } from '../../models/userDto';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: UserDto;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getUser(this.authService.getUserId())
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      id: [this.user.id, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required]
    })
  }

  getUser(id: number) {
    this.userService.getById(id).subscribe(response => {
      this.user = response.data;
      this.createUserForm();
    })
  }

  editUser() {
    let user = Object.assign({}, this.userForm.value);
    console.log(user)
    this.userService.editUser(user).subscribe(response => {
      if (response.success) {
        this.toastrService.success(response.message);
      }
    })
  }
}
