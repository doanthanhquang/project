import { IBaseRecord } from '@/types/model';

export interface IQuotation extends IBaseRecord {
  apply_date?: string | Date;
  note?: string;
}
