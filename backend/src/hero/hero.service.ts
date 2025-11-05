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

  async updateHero(id: number, heroData: CreateHeroDto) {
    try {
      const hero = await this.prisma.hero.update({
        where: { id },
        data: heroData,
      });
      return hero;
    } catch (e) {
      if (e instanceof HttpException) throw e;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025')
          throw new NotFoundException(`Hero with ID ${id} not found.`);
        if (e.code === 'P2002')
          throw new ConflictException(
            `The hero update failed: value of ${e.meta?.target} already exists.`,
          );
      }

      console.error('Error when updating a hero:', e);
      throw new InternalServerErrorException(
        'The hero update operation could not be completed.',
      );
    }
  }

  async deleteHero(id: number) {
    try {
      const hero = await this.prisma.hero.delete({ where: { id } });
      return hero;
    } catch (e) {
      if (e instanceof HttpException) throw e;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025')
          throw new NotFoundException(`Hero with ID ${id} not found.`);
        if (e.code === 'P2003')
          throw new ConflictException(
            `Hero with ID ${id} cannot be deleted due to associated records.`,
          );
      }
      console.error('Error when deleting a hero:', e);
      throw new InternalServerErrorException(
        'The hero delete operation could not be completed.',
      );
    }
  }
}
