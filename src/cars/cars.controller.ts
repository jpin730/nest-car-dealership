import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['car1', 'car2', 'car3'];

  @Get()
  getAll(): string[] {
    return this.cars;
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    const car = this.cars[+id];

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }
}
