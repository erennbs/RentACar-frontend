import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath',
  standalone: true
})
export class ImagePathPipe implements PipeTransform {

  transform(imagePath: string): string {
    return `https://localhost:44321/uploads/${imagePath}`;
  }

}
