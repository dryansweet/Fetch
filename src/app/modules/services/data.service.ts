import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';
import { isRegExp } from 'util';
import { rejects } from 'assert';
// import { errorHandler } from "@angular/platform-browser/src/browser";

@Injectable({
  providedIn: "root"
})

export class DataService {
  constructor(public http: HttpClient) { }
  public test() {
    return "A'llo Darlin";
  }

  public getListofDogs() {
    return new Promise(resolve => {
      this.http
        .get("https://dog.ceo/api/breeds/list/all")
        .subscribe((res: any) => resolve(res.message), err => this.errorHandler(err));
    });
  }

  //returns 1 image path of requested dog
  public fetchPic(dog?: string) {
    return new Promise((resolve, reject) => {
      if (!dog) {
        this.http
          .get("https://dog.ceo/api/breeds/image/random")
          .subscribe(
            (res: any) => {
              resolve(res.message)
            },
            err => {
              resolve({ "err": "Ooops something went wrong....Please verify that you are able to visit 'https://dog.ceo/dog-api/documentation/breed'" })
              this.errorHandler(err)
            }
          );
      } else {
        dog = dog.replace(/\s/g, '').replace("-","/")
        let request = "https://dog.ceo/api/breed/" + dog + "/images";
        this.http
          .get(request)
          .subscribe((res: any) => {
            if (res.message) {
              let max = res.message.length
              let num = Math.floor(Math.random() * (max - 1) + 0)
              resolve(res.message[num])
            } else resolve("Unexpected response")
          }, err => {
            resolve({ "err": "Ooops something went wrong....Please verify that you are able to visit 'https://dog.ceo/dog-api/documentation/breed'" })
            this.errorHandler(err)
          })
      }
    });
  }

  errorHandler(err: Error) {
    // This is would be an ideal spot to run an analytics and gracefully handle failures. 
    // My best guess as to why you're seeing this is that 
    // 1) the OpenAPI is down 
    // 2) Your internet filter isn't allowing it or 
    // 3) You're not connected to the internet
    console.error(err)
  }
}