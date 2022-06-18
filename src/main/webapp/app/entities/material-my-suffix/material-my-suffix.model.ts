import { IICTrayPlasticMySuffix } from 'app/entities/ic-tray-plastic-my-suffix/ic-tray-plastic-my-suffix.model';
import { MaterialType } from 'app/entities/enumerations/material-type.model';

export interface IMaterialMySuffix {
  id?: number;
  typeOfMaterial?: MaterialType | null;
  subTotalWeight?: number | null;
  icTrayPlastics?: IICTrayPlasticMySuffix[] | null;
}

export class MaterialMySuffix implements IMaterialMySuffix {
  constructor(
    public id?: number,
    public typeOfMaterial?: MaterialType | null,
    public subTotalWeight?: number | null,
    public icTrayPlastics?: IICTrayPlasticMySuffix[] | null
  ) {}
}

export function getMaterialMySuffixIdentifier(material: IMaterialMySuffix): number | undefined {
  return material.id;
}
