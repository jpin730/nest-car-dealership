import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

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

  @Post()
  // change response code
  @HttpCode(201)
  create(@Body() car: Omit<ICar, 'id'>): ICar {
    return this.carsService.create(car);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() car: Partial<ICar>,
  ): ICar {
    return this.carsService.update(id, car);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.carsService.delete(id);
  }
}
