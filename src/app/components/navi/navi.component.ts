import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenPayloadModel } from '../../models/tokenPayloadModel';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {
  logedIn: boolean;
  payload: TokenPayloadModel | undefined;

  constructor(private authService: AuthService, private localStorageService: LocalStorageService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.logedIn = true;
      this.payload = this.authService.getUserClaims(); 
    } else {
      this.logedIn = false;
    }
  }

  checkIfAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.localStorageService.delete('token');
    this.logedIn = false;
    this.router.navigateByUrl('/login');
  }
}
