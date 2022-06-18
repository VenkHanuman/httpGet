import dayjs from 'dayjs/esm';

export interface IGRNLotMySuffix {
  id?: number;
  grnCode?: string | null;
  collectionDate?: dayjs.Dayjs | null;
  vehicleNumber?: string | null;
  srcOfMaterials?: string | null;
  totalWeight?: number | null;
}

export class GRNLotMySuffix implements IGRNLotMySuffix {
  constructor(
    public id?: number,
    public grnCode?: string | null,
    public collectionDate?: dayjs.Dayjs | null,
    public vehicleNumber?: string | null,
    public srcOfMaterials?: string | null,
    public totalWeight?: number | null
  ) {}
}

export function getGRNLotMySuffixIdentifier(gRNLot: IGRNLotMySuffix): number | undefined {
  return gRNLot.id;
}
