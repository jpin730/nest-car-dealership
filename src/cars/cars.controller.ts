import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ICar } from './cars.interface';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  private cars = ['car1', 'car2', 'car3'];

  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAll(): ICar[] {
    return this.carsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): ICar {
    return this.carsService.getById(id);
  }
}
