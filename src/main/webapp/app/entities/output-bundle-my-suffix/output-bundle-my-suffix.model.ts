export interface IOutputBundleMySuffix {
  id?: number;
  total?: number | null;
  totalOfDisposableWaste?: number | null;
}

export class OutputBundleMySuffix implements IOutputBundleMySuffix {
  constructor(public id?: number, public total?: number | null, public totalOfDisposableWaste?: number | null) {}
}

export function getOutputBundleMySuffixIdentifier(outputBundle: IOutputBundleMySuffix): number | undefined {
  return outputBundle.id;
}
