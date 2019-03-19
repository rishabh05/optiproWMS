import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  constructor(private translate: TranslateService) { }
  
  ngOnInit() {
      alert( this.translate.instant("Username"));
    // this.CommonService.loadConfig();
  }
}
