import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';

import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { ICar } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    { id: crypto.randomUUID(), brand: 'Toyota', model: 'Corolla' },
    { id: crypto.randomUUID(), brand: 'Toyota', model: 'Yaris' },
    { id: crypto.randomUUID(), brand: 'Toyota', model: 'Camry' },
  ];

  getAll(): ICar[] {
    return structuredClone(this.cars);
  }

  getById(id: UUID): ICar {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return structuredClone(car);
  }

  create(createCarDto: CreateCarDto): ICar {
    const newCar = { id: crypto.randomUUID(), ...createCarDto };

    this.cars = [...this.cars, newCar];

    return structuredClone(newCar);
  }

  update(id: UUID, updateCarDto: UpdateCarDto): ICar {
    const updatedCar = this.getById(id);

    Object.assign(updatedCar, updateCarDto);

    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));

    return structuredClone(updatedCar);
  }

  delete(id: UUID): ICar {
    const deletedCar = this.getById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return structuredClone(deletedCar);
  }
}
