import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { oSubmitPOLots } from '../models/oSubmitPOLots';


@Injectable({
  providedIn: 'root'
})
export class HttpCallServiceService {

  private baseUrl = "http://localhost:57911";
  // private adminUrl = "http://172.16.6.167/OptiAdmin";
  private venderListUrl: string = "/api/GoodReceiptPO/GetVendorList";
  private validateUser: string = "/api/login/ValidateUserLogin";
  private lisenceDataUrl: string = "/api/Login/GetLicenseData";
  private POlistUrl: string = "/api/GoodReceiptPO/GetPOList";
  private PSUrl: string = "/api/Login/GetPSURL";
  private WHS: string = "/api/login/GetWHS";
  private getItemListUrl: string = "/api/GoodReceiptPO/GetItemList";
  private OpenPOLinesurl: string = "/api/GoodReceiptPO/GetOpenPOLines";
  private AutoLotUrl: string = "/api/GoodReceiptPO/GetAutoLot";
  private UOMUrl: string = "/api/GoodReceiptPO/getUOM";
  private RevBinUrl: string = "/api/GoodReceiptPO/GetBinsForReceiptWithReceivingBin";
  private BinExistUrl = "/api/GoodReceiptPO/IsBinExist";
  private SubmitPOUrl = "/api/GoodReceiptPO/SubmitGoodsReceiptPO";
  private VenderExistUrl = "/api/GoodReceiptPO/IsVendorExists";
  private POExistUrl = "/api/GoodReceiptPO/IsPOExists";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getVenderList(): Observable<any> {
    let jObject = {
      GoodsReceiptToken: JSON.stringify([{
        UserId: '',
        CompanyDBId: localStorage.getItem("CompID"), WhseCode: localStorage.getItem("whseId"),
        FuturePO: false, PO: "", GUID: localStorage.getItem("GUID"),
        UsernameForLic: localStorage.getItem("UserId")
      }])
    };
    return this.http.post(this.baseUrl + this.venderListUrl, jObject, this.httpOptions);
  }


  ValidateUserLogin(uname: String, pwd: String): Observable<any> {
    //JSON Obeject Prepared to be send as a param to API
    let jObject = {
      Login: JSON.stringify([{
        User: uname,
        Password: pwd, IsAdmin: "true"
      }])
    };
    return this.http.post(localStorage.getItem("PSURLFORADMIN") + this.validateUser, jObject,
      this.httpOptions);
  }

  getWarehouseList(uname: String, compId: String): Observable<any> {
    //JSON Obeject Prepared to be send as a param to API
    let jObject = {
      CompanyName: JSON.stringify([{
        Username: uname,
        CompanyDBId: compId
      }])
    };
    return this.http.post(localStorage.getItem("PSURLFORADMIN") + this.validateUser, jObject,
      this.httpOptions);
  }

  getLicenseData(compId: string): Observable<any> {

    let jObject = {
      LoginId: localStorage.getItem("UserId"),
      CompanyId: compId
    };
    return this.http.post(this.baseUrl + this.lisenceDataUrl, jObject, this.httpOptions);
  }


  getPOList(futurepo: boolean, vendercode: string, itemcode: string): Observable<any> {
    let jObject = {
      GoodsReceiptToken: JSON.stringify([{
        UserId: itemcode,
        CompanyDBId: localStorage.getItem("CompID"), WhseCode: localStorage.getItem("whseId"),
        ItemCode: '', VendorCode: vendercode,
        FuturePO: futurepo, IsCustom: false, GUID: localStorage.getItem("GUID"),
        UsernameForLic: localStorage.getItem("UserId")
      }])
    };

    return this.http.post(this.baseUrl + this.POlistUrl, jObject, this.httpOptions);
  }


  getPSURL(): Observable<any> {
    let jObject = {
    };
    return this.http.post(this.baseUrl + this.PSUrl, jObject, this.httpOptions);
  }

  getWHS(compId: string): Observable<any> {
    let jObject = {
      CompanyName: JSON.stringify([{
        Username: localStorage.getItem("UserId"),
        CompanyDBId: compId
      }])
    };
    return this.http.post(localStorage.getItem("PSURLFORADMIN") + this.WHS, jObject,
      this.httpOptions);
  }

  getItemList(futurepo: boolean, vendercode: string, po: string): Observable<any> {
    let jObject = {
      GoodsReceiptToken: JSON.stringify([{
        UserId: '',
        CompanyDBId: localStorage.getItem("CompID"), WhseCode: localStorage.getItem("whseId"),
        VendorCode: vendercode,
        FuturePO: futurepo, PO: po
      }])
    };
    return this.http.post(this.baseUrl + this.getItemListUrl, jObject, this.httpOptions);
  }


  GetOpenPOLines(futurepo: boolean, itemCode: string, po: string): Observable<any> {
    let jObject = {
      GoodsReceiptToken: JSON.stringify([{
        UserId: '',
        CompanyDBId: localStorage.getItem("CompID"),
        DOCNUM: po,
        ItemCode: itemCode,
        WhsCode: localStorage.getItem("whseId"),
        FuturePO: futurepo
      }])
    };
    return this.http.post(this.baseUrl + this.OpenPOLinesurl, jObject, this.httpOptions);
  }

  getAutoLot(itemCode: string): Observable<any> {
    let jObject = {
      GoodsReceiptToken: JSON.stringify([{
        UserId: '',
        CompanyDBId: localStorage.getItem("CompID"),
        ItemCode: itemCode
      }])
    };
    return this.http.post(this.baseUrl + this.AutoLotUrl, jObject, this.httpOptions);
  }

  getUOMs(itemCode: string): Observable<any> {
    let jObject = {
      ItemKey: JSON.stringify([{
        CompanyDBId: localStorage.getItem("CompID"),
        ItemCode: itemCode
      }])
    };
    return this.http.post(this.baseUrl + this.UOMUrl, jObject, this.httpOptions);
  }

  getRevBins(QCrequired: string): Observable<any> {
    var jObject = {
      WhsCode: JSON.stringify([{
        CompanyDBId: localStorage.getItem("CompID"), ItemCode: '',
        WhsCode: localStorage.getItem("whseId"), QCRequired: QCrequired,
        PageId: "GRPO"
      }])
    };
    return this.http.post(this.baseUrl + this.RevBinUrl, jObject, this.httpOptions);
  }

  IsBinExist(binCode: string): Observable<any> {
    var jObject = {
      WhsCode: JSON.stringify([{
        CompanyDBId: localStorage.getItem("CompID"),
        BinCode: binCode, ItemCode: '', WhsCode: localStorage.getItem("whseId")
      }])
    };
    return this.http.post(this.baseUrl + this.BinExistUrl, jObject, this.httpOptions);
  }


  SubmitGoodsReceiptPO(oSubmitPOLots: oSubmitPOLots): Observable<any> {
    var jObject = { GoodsReceiptToken: JSON.stringify(oSubmitPOLots) };
    debugger
    return this.http.post(this.baseUrl + this.SubmitPOUrl, jObject, this.httpOptions);
  }

  IsVenderExist(venderCode: string): Observable<any> {
    var jObject = {
      VendorCode: JSON.stringify([{
        UserId: '', CompanyDBId: localStorage.getItem("CompID"),
        VendorCode: venderCode
      }])
    };
    return this.http.post(this.baseUrl + this.VenderExistUrl, jObject, this.httpOptions);
  }

  IsPOExist(poCode: string, cardCode: string): Observable<any> {
    var jObject = {
      POCode: JSON.stringify([{
        UserId: '', CompanyDBId: localStorage.getItem("CompID"),
        POCode: poCode,
        CardCode: cardCode
      }])
    };
    return this.http.post(this.baseUrl + this.VenderExistUrl, jObject, this.httpOptions);
  }

}
