import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { CreateHeroDto } from './dto/createHero.dto';
import { HeroService } from './hero.service';

@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  async create(@Body() data: CreateHeroDto) {
    const newHero = await this.heroService.createHero(data);
    return newHero;
  }

  @Get()
  async getAll() {
    const heroes = await this.heroService.getHeroes();
    return heroes;
  }

  @Get(':id')
  async getForId(@Param('id') id: string) {
    const hero = await this.heroService.getHero(Number(id));
    return hero;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateHeroDto) {
    const hero = await this.heroService.updateHero(Number(id), data);
    return hero;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const hero = await this.heroService.deleteHero(Number(id));
    return hero;
  }
}
