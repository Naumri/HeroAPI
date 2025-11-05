import { Body, Controller, Post } from '@nestjs/common';
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
}
