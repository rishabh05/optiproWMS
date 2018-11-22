import { UOM } from "./UOM";

export interface POReceiptLots{
    CardCode: string;
    DOCENTRY: number;
    FACTOR: number;
    ITEMCODE: string;
    ITEMNAME: string;
    LINENUM: number;
    OPENQTY: number;
    QCREQUIRED: string;
    ROWNUM: number;
    RPTQTY: number;
    SHIPDATE: string;
    TOTALQTYINVUOM: number;
    TRACKING: string;
    TargetBin: any;
    TargetWhs: any;
    UOM: string;
    WHSE: string;
    UOMList: UOM[];
}