import { IDealer } from 'app/shared/model/dealer.model';

export interface IPortofoliu {
  id?: number;
  hTROCARNO?: number;
  dEALER?: string;
  dATAREZSAUFACTURA?: string;
  dATAEXPIRARE?: string;
  rESDEALERID?: number;
  tIPLINIE?: string;
  lOCATIE?: string;
  lUNAPRODUCTIE?: string;
  lUNASOSIREINTARA?: string;
  cODMODEL?: string;
  tIPAUTOVEHICUL?: string;
  cODCULOAREEXT?: string;
  cULOAREEXTERIOR?: string;
  cULOAREIntegerERIOR?: string;
  oBSERVATII?: string;
  nUMECLIENT?: string;
  nUMEVANZATOR?: string;
  vIN?: string;
  eNGINENO?: string;
  aNFABRICATIECFCIV?: number;
  oMOLOGAREINDIVIDUALA?: string;
  pRETLISTA?: number;
  dISCOUNTSTANDARD?: number;
  dISCOUNTSUPLIMENTAR?: number;
  tRUSALEGISLATIVA?: number;
  pRETFINAL?: number;
  aVANSPLATIT?: number;
  rESTDEPLATA?: number;
  cUSTOMERTRXID?: number;
  rEZCUSTID?: string;
  sOLDCUSTID?: number;
  pROFORMA?: boolean;
  tRANSPORT?: boolean;
  dealer?: IDealer;
}

export const defaultValue: Readonly<IPortofoliu> = {
  pROFORMA: false,
  tRANSPORT: false
};
