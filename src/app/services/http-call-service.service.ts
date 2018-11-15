import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpCallServiceService {

  private baseUrl = "http://localhost:57911";
  // private adminUrl = "http://172.16.6.167/OptiAdmin";
  private venderListUrl: string = "/api/GoodReceiptPO/GetVendorList";
  private validateUser: string = "/api/login/ValidateUserLogin";
  private licenseDataUrl: string = "/api/Login/GetLicenseData";
  private POlistUrl: string = "/api/GoodReceiptPO/GetPOList";
  private PSUrl: string = "/api/Login/GetPSURL";
  private WHS: string = "/api/login/GetWHS";


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
        UsernameForLic: 'vishal'
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

  getLicenseData(): Observable<any> {
    let jObject = {
      LoginId: localStorage.getItem("UserId"),
      CompanyId: localStorage.getItem("CompID")
    };
    return this.http.post(this.baseUrl + this.licenseDataUrl, jObject, this.httpOptions);
  }


  getPOList(vendercode: string): Observable<any> {
    let jObject = {
      GoodsReceiptToken: JSON.stringify([{
        UserId: '',
        CompanyDBId: localStorage.getItem("CompID"), WhseCode: localStorage.getItem("whseId"),
        ItemCode: '', VendorCode: "RJ-V",
        FuturePO: false, IsCustom: false, GUID: localStorage.getItem("GUID"),
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
}
