export type HeroDto = {
  id: Number;
  name: String;
  alias: String;
  power: String;
  teamId: Number;
  isVillain: Boolean;
  origin?: String;
  universeId?: Number;
  createdAt: Date;
  updatedAt: Date;
};
