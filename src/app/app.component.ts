import { Component } from '@angular/core';
import { DataService } from "./modules/services/data.service";

interface Dog {
  name: string;
  url: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Canine Picture Getter";
  dog: string;
  dogs: string[] = [];
  filteredDogs: any[];
  selectedDog: Dog;
  image: any = "";
  imageTitle: string = "";
  errorMessage: boolean;
  test: string = "Help";

  constructor(public data: DataService) {
    this.getDogs();
  }

  getDogs() {
    this.data.getListofDogs().then((data: any[]) => {
      for (let x in data) {
        if (data[x].length <= 1){
          this.dogs.push(x);
        } 
        else {
          //More than one type with this name
          for (let subType in data[x]) {
            let type = x + " - " + data[x][subType];
            this.dogs.push(type);
          }
        }
      }
    });
  }

  filterDogs(event) {
    this.filteredDogs = [];
    for (let i = 0; i < this.dogs.length; i++) {
      let dog1 = this.dogs[i];
      if (dog1.toLowerCase().includes(event.query.toLocaleLowerCase())) {
        this.filteredDogs.push(dog1);
      }
    }
  }

  getPic(dog?: string) {
    this.filteredDogs = [];
    this.data.fetchPic(dog).then((data: any) => {
      if (data.hasOwnProperty("err")) {
        this.errorMessage = true;
      } else {
        this.errorMessage = false;
        this.image = data;
        this.imageTitle = data
          .toString()
          .split("https://images.dog.ceo/breeds/")[1]
          .split("/")[0]
          .toUpperCase();
        this.dog = this.imageTitle.toLocaleLowerCase();
      }
    }).catch(e =>console.log(e));
  }
}
