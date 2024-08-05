import { Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { RentComponent } from './components/rent/rent.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';

export const routes: Routes = [
    {path: "", component: CarsComponent},
    {path: "cars", component: CarsComponent},
    {path: "cars/add", component: CarAddComponent},
    {path: "cars/brand/:brandId", component: CarsComponent},
    {path: "cars/color/:colorId", component: CarsComponent},
    {path: "cars/:carId", component: CarDetailsComponent},
    {path: "cars/:carId/edit", component: CarEditComponent},
    {path: "cars/:carId/rent", component: RentComponent},
    {path: "brands", component: BrandsComponent},
    {path: "colors", component: ColorsComponent}
];
