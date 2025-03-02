import { IBaseRecord } from '@/types/model';

export interface IProduct extends IBaseRecord {
  material?: string;
  name?: string;
  description?: string;
  price?: number;
}
