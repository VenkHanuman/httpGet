import { IMaterialMySuffix } from 'app/entities/material-my-suffix/material-my-suffix.model';

export interface IICTrayPlasticMySuffix {
  id?: number;
  brandName?: string | null;
  material?: IMaterialMySuffix | null;
}

export class ICTrayPlasticMySuffix implements IICTrayPlasticMySuffix {
  constructor(public id?: number, public brandName?: string | null, public material?: IMaterialMySuffix | null) {}
}

export function getICTrayPlasticMySuffixIdentifier(iCTrayPlastic: IICTrayPlasticMySuffix): number | undefined {
  return iCTrayPlastic.id;
}
