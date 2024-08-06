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

    this.cars.push(newCar);

    return structuredClone(newCar);
  }

  update(id: UUID, updateCarDto: UpdateCarDto): ICar {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    this.cars[index] = { ...this.cars[index], ...updateCarDto };

    return structuredClone(this.cars[index]);
  }

  delete(id: UUID): ICar {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return this.cars.splice(index, 1).at(0) as ICar;
  }
}
