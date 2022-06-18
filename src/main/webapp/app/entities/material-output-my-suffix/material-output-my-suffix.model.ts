import { IDestinationMySuffix } from 'app/entities/destination-my-suffix/destination-my-suffix.model';
import { MaterialType } from 'app/entities/enumerations/material-type.model';

export interface IMaterialOutputMySuffix {
  id?: number;
  typeOfMatrial?: MaterialType | null;
  subTotal?: number | null;
  destinations?: IDestinationMySuffix[] | null;
}

export class MaterialOutputMySuffix implements IMaterialOutputMySuffix {
  constructor(
    public id?: number,
    public typeOfMatrial?: MaterialType | null,
    public subTotal?: number | null,
    public destinations?: IDestinationMySuffix[] | null
  ) {}
}

export function getMaterialOutputMySuffixIdentifier(materialOutput: IMaterialOutputMySuffix): number | undefined {
  return materialOutput.id;
}
