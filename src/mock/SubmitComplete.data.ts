import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SubmitLayoutResponse } from '../service/@vo/SubmitLayoutResponse';

@Injectable({
  providedIn: 'root'
})
export class MockData {
  private data: SubmitLayoutResponse = {
    "layout": null,
    "mail": {
      "body": "Dear\r\n服務一點訣：one boy-執編，已交版",
      "subject": "服務一點訣：one boy-執編_已交版",
      "to_users": [
        {
          "user_account": "commonwealth\\xms1",
          "user_email": "elanhung@awt-system.com.tw",
          "user_id": "E039FB57-77A2-46C7-A881-2E35140D7930",
          "user_name": "xms1"
        },
        {
          "user_account": "commonwealth\\xms2",
          "user_email": "elanhung@awt-system.com.tw",
          "user_id": "CB5E1905-7F9E-455F-958A-1DE7F6C285EC",
          "user_name": "xms2"
        },
        {
          "user_account": "commonwealth\\xms6",
          "user_email": "elanhung@awt-system.com.tw",
          "user_id": "D5AA2E01-2A32-4D08-85D9-893E00D558F0",
          "user_name": "xms6"
        }
      ]
    }
  };

  LayoutSubmitCompleted(){
    return of(this.data);
  }
}
