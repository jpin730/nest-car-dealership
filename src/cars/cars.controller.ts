import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UUID } from 'crypto';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { ICar } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAll(): ICar[] {
    return this.carsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: UUID): ICar {
    return this.carsService.getById(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCarDto: CreateCarDto): ICar {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateCarDto: UpdateCarDto,
  ): ICar {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): ICar {
    return this.carsService.delete(id);
  }
}
