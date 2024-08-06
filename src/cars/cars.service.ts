import { Injectable, NotFoundException } from '@nestjs/common';

import { ICar } from './cars.interface';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    { id: 1, brand: 'Toyota', model: 'Corolla' },
    { id: 2, brand: 'Toyota', model: 'Yaris' },
    { id: 3, brand: 'Toyota', model: 'Camry' },
  ];

  private nextId = 4;

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

  create(car: Omit<ICar, 'id'>): ICar {
    const newCar = { id: this.nextId++, ...car };

    this.cars.push(newCar);

    return structuredClone(newCar);
  }

  update(id: number, car: Partial<ICar>): ICar {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    delete car.id;

    this.cars[index] = { ...this.cars[index], ...car };

    return structuredClone(this.cars[index]);
  }

  delete(id: number): void {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    this.cars.splice(index, 1);
  }
}
