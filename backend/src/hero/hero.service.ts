import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateHeroDto } from './dto/createHero.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  async createHero(heroData: CreateHeroDto) {
    try {
      const newHero = await this.prisma.hero.create({
        data: heroData,
      });

      return newHero;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new ConflictException(
            `The hero with this value of ${e.meta?.target} already exists.`,
          );
        }
      }

      console.error('Error when creating a hero:', e);
      throw new InternalServerErrorException(
        'The hero creation operation could not be completed.',
      );
    }
  }

  async getHeroes() {
    try {
      const heroes = await this.prisma.hero.findMany();
      return heroes;
    } catch (e) {
      if (e instanceof HttpException) throw e;
      console.error('Error when fetching a heroes:', e);
      throw new InternalServerErrorException(
        'The heroes retrieval operation could not be completed.',
      );
    }
  }

  async getHero(id: number) {
    try {
      const hero = await this.prisma.hero.findUnique({ where: { id } });
      if (!hero) throw new NotFoundException(`Hero with ID ${id} not found.`);
      return hero;
    } catch (e) {
      if (e instanceof HttpException) throw e;
      console.error('Error when fetching a hero:', e);
      throw new InternalServerErrorException(
        'The hero retrieval operation could not be completed.',
      );
    }
  }
}
