import { IMaterialOutputMySuffix } from 'app/entities/material-output-my-suffix/material-output-my-suffix.model';

export interface IDestinationMySuffix {
  id?: number;
  name?: string | null;
  materialOutput?: IMaterialOutputMySuffix | null;
}

export class DestinationMySuffix implements IDestinationMySuffix {
  constructor(public id?: number, public name?: string | null, public materialOutput?: IMaterialOutputMySuffix | null) {}
}

export function getDestinationMySuffixIdentifier(destination: IDestinationMySuffix): number | undefined {
  return destination.id;
}
