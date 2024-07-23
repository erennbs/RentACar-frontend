import { Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

export const routes: Routes = [
    {path: "", component: CarsComponent},
    {path: "cars", component: CarsComponent},
    {path: "cars/brand/:brandId", component: CarsComponent},
    {path: "cars/color/:colorId", component: CarsComponent},
    {path: "cars/:carId", component: CarDetailsComponent}
];
