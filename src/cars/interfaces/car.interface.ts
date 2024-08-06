import { UUID } from 'crypto';

export interface ICar {
  id: UUID;
  brand: string;
  model: string;
}
