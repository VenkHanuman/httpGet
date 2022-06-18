export interface IDisposedWasteMySuffix {
  id?: number;
  subTotal?: number | null;
}

export class DisposedWasteMySuffix implements IDisposedWasteMySuffix {
  constructor(public id?: number, public subTotal?: number | null) {}
}

export function getDisposedWasteMySuffixIdentifier(disposedWaste: IDisposedWasteMySuffix): number | undefined {
  return disposedWaste.id;
}
