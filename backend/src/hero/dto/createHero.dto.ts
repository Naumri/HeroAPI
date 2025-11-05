export type CreateHeroDto = {
  name: string;
  alias: string;
  power: string;
  teamId?: number;
  isVillain: boolean;
  origin?: string;
  universeId?: number;
};
