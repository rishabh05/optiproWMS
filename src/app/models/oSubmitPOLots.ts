import { POReceiptLots } from "./POReceiptLots";
import { POReceiptLotDetails } from "./POReceiptLotDetails";
import { LastSerialNumber } from "./LastSerialNumber";
import { UDF } from "./UDF";

export class oSubmitPOLots{
    POReceiptLots: POReceiptLots[];
    POReceiptLotDetails: POReceiptLotDetails[];
    UDF: UDF[];
    LastSerialNumber: LastSerialNumber[];
}