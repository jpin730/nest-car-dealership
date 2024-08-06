import { Injectable, NotFoundException } from '@nestjs/common';

import { ICar } from './cars.interface';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Toyota', model: 'Yaris' },
    { id: 3, brand: 'Toyota', model: 'Camry' },
  ];

  getAll(): ICar[] {
    return structuredClone(this.cars);
  }

  getById(id: number): ICar {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return structuredClone(car);
  }
}
