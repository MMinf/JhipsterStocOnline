import { IDealer } from 'app/shared/model/dealer.model';

export interface IStoc {
  id?: number;
  hTROCARNO?: number;
  rESDEALERID?: number;
  aNFABRICATIECIV?: number;
  tIPAUTOVEHICUL?: string;
  cODCULOAREEXTERIOR?: string;
  dESCCULOAREEXTERIOR?: string;
  vOPSEAMETALIZATA?: string;
  cULOAREINTERIOR?: string;
  oBSERVATII?: string;
  lOCATIE?: string;
  oMOLOGAREIND?: string;
  lUNASOSIREINTARA?: string;
  rEZERVATA?: string;
  dATAEXPIRAREREZ?: string;
  dealer?: IDealer;
}

export const defaultValue: Readonly<IStoc> = {};
