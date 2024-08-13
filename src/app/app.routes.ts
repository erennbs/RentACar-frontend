import { Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { RentComponent } from './components/rent/rent.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RentalService } from './services/rental.service';
import { RentalsComponent } from './components/rentals/rentals.component';

export const routes: Routes = [
    {path: "", component: CarsComponent},
    {path: "cars", component: CarsComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
    {path: "cars/add", component: CarAddComponent, canActivate: [authGuard]},
    {path: "cars/brand/:brandId", component: CarsComponent},
    {path: "cars/color/:colorId", component: CarsComponent},
    {path: "cars/:carId", component: CarDetailsComponent},
    {path: "cars/:carId/edit", component: CarEditComponent, canActivate: [adminGuard]},
    {path: "cars/:carId/rent", component: RentComponent, canActivate: [authGuard]},
    {path: "brands", component: BrandsComponent, canActivate: [adminGuard]},
    {path: "colors", component: ColorsComponent, canActivate: [adminGuard]},
    {path: "rentals", component: RentalsComponent, canActivate: [adminGuard]}
];
