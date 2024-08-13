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

export const routes: Routes = [
    {path: "", component: CarsComponent},
    {path: "cars", component: CarsComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "cars/add", component: CarAddComponent, canActivate: [authGuard]},
    {path: "cars/brand/:brandId", component: CarsComponent},
    {path: "cars/color/:colorId", component: CarsComponent},
    {path: "cars/:carId", component: CarDetailsComponent},
    {path: "cars/:carId/edit", component: CarEditComponent},
    {path: "cars/:carId/rent", component: RentComponent, canActivate: [authGuard]},
    {path: "brands", component: BrandsComponent},
    {path: "colors", component: ColorsComponent}
];
