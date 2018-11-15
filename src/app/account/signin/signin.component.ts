import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { HttpCallServiceService } from '../../services/http-call-service.service';
import { ValidateUser } from '../../models/ValidateUser';
import { LicenseData } from '../../models/LicenseData';
import { WHS } from '../../models/WHS';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  showLoader: boolean = false;
  isError: boolean = false;

  invalidCredentialMsg: string = "";
  userNotExist: boolean = false;

  // Cookie
  userName: string;
  password: string;
  isRemember: boolean = false;

  // Captcha
  randomstring = '';
  capchaText: string;
  invalidCapcha: boolean = false;

  isCompleteLoginVisible: boolean = false;
  userDetails: ValidateUser[];
  licenseData: LicenseData[];
  selectedItem: string = "hello";
  whsList: WHS[];
  defaultWHS = { OPTM_WHSE: "Select Warehouse", BPLid: 0 };
  public companyName: Array<string>;
  // public selectedWHS: WHS = { OPTM_WHSE: "Select Warehouse", BPLid: 0 };

  constructor(private router: Router, private httpcallservice: HttpCallServiceService) { }

  @ViewChild('myCanvas') myCanvas;

  ngOnInit() {

    // Get cookie start
    if (this.getCookie('cookieEmail') != '' && this.getCookie('cookiePassword') != '') {
      this.userName = this.getCookie('cookieEmail');
      this.password = this.getCookie('cookiePassword');
      this.isRemember = true;
    } else {
      this.userName = '';
      this.password = '';
    }

    // Apply classes on Body
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-login");
    element.classList.add("opti_account-module");

    this.httpcallservice.getPSURL().subscribe(
      data => {
        localStorage.setItem("PSURLFORADMIN", data);
      },
      error => {
        alert("get PSURL Failed");
      }
    );
    localStorage.setItem("WHS", "Select Warehouse");
  }

  public setWarehouseList() {
    
    // debugger
    this.httpcallservice.getWHS().subscribe(
      data => {
        this.whsList = data.Table;
      },
      error => {
        alert("get setWarehouseList Failed");
      }
    );
  }

  /**
   * function for get cookie data
   * @param cname 
   */

  public getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
   * Function for set cookie data
   * @param cname 
   * @param cvalue 
   * @param exdays 
   */
  public setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /**
   * Function for login
   */
  public async login() {
    if(this.userName == "" || this.password == ""){
      alert("username or password cannot be blank");
      return;
    }
    this.showLoader = true;
    if (!this.isCompleteLoginVisible) {
      this.httpcallservice.ValidateUserLogin(this.userName, this.password).subscribe(
        data => {
          this.userDetails = data.Table;
          localStorage.setItem("UserId", this.userName);
          this.handleValidationUserSuccessResponse();
        },
        error => {
          this.showLoader = false;
          alert("Login Failed");
        }
      );
    } else {
      debugger
      if (localStorage.getItem("WHS") == 'Select Warehouse') {
        this.showLoader = false;
        alert("Please Select Warehouse!");
        return;
      }
      this.httpcallservice.getLicenseData().subscribe(
        data => {
          this.licenseData = data;
          this.handleLicenseDataSuccessResponse();
        },
        error => {
          this.showLoader = false;
          alert("license Failed");
        }
      );
    }

  }

  private handleValidationUserSuccessResponse() {
    this.showLoader = false;
    if (this.userDetails[0].OPTM_ACTIVE == 0) {
      // show msg
      return;
    }
    document.getElementById("connectbtn").innerText = "Login";
    this.isCompleteLoginVisible = true;
    if (this.userDetails.length > 1) {

    } else {
      localStorage.setItem("CompID", this.userDetails[0].OPTM_COMPID);
      this.companyName = [this.userDetails[0].OPTM_COMPID];
      this.selectedItem = this.companyName[0];
    }
  }

  private handleLicenseDataSuccessResponse() {
    debugger
    this.showLoader = false;
    if (this.licenseData.length > 1) {
      if (this.licenseData[1].ErrMessage == "" || this.licenseData[1].ErrMessage == null) {
        if (this.licenseData[0].Message == "True") {
          localStorage.setItem("GUID", this.licenseData[1].GUID);
          localStorage.setItem("CompID", this.userDetails[0].OPTM_COMPID);
          // code for remember me
          if (this.isRemember == true) {
            this.setCookie('cookieEmail', this.userName, 365);
            this.setCookie('cookiePassword', this.password, 365);
          } else {
            this.setCookie('cookieEmail', "", 365);
            this.setCookie('cookiePassword', "", 365);
          }
          this.router.navigateByUrl('home/dashboard');
        } else {
          alert(this.licenseData[0].Message + " " + this.licenseData[0].Token);
        }
      } else {
        alert(this.licenseData[1].ErrMessage);
      }
    } else {
      alert(this.licenseData[0].ErrMessage);
    }
  }

  public OnOptionChange(value: WHS) {
    localStorage.setItem("WHS", value.OPTM_WHSE);
  }

  public OnCompanySelectionChange(value: string) {
    localStorage.setItem("CompID", value);
  }
}
