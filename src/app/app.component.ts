import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit(){
  buttonClicked: false;
  city1: string '';
  country: string '';
  weatherData: any = null;
  prayerData: any = null;
  astronomyData: any = null;
  populationData: any;
  imageData: any = null;
  date = new Date();
  today = this.date.getDate();

constructor(private _http: Http) {

}

getInfo(){

  // get weather information
  this._http.get('http://api.wunderground.com/api/feabc5ebf607b4bc/conditions/q/'+this.country+'/'+this.city1+'.json')
  .map((res: Response) => res.json())
   .subscribe(data => {
          this.weatherData = data;
          console.log(this.weatherData);
        });

  // get Astronomy data
  this._http.get('http://api.wunderground.com/api/feabc5ebf607b4bc/astronomy/q/'+this.country+'/'+this.city1+'.json')
  .map((res: Response) => res.json())
   .subscribe(data => {
          this.astronomyData = data;
          console.log(this.astronomyData);
        });

  // get population
  this._http.get('https://restcountries.eu/rest/v2/name/'+this.country)
  .map((res: Response) => res.json())
   .subscribe(data => {
          this.populationData = data[0];
          console.log(this.populationData);
        });

  // get prayer information
  this._http.get('http://api.aladhan.com/v1/calendarByCity?city='+this.city1+'&country='+this.country+'&method=2&month='+this.date.getMonth()+1+'&year='+this.date.getFullYear())
  .map((res: Response) => res.json())
    .subscribe(data => {
          this.prayerData = data;
          console.log(this.prayerData);
        });

        this._http.get('https://pixabay.com/api/?key=8217295-33ea6ecffa75d27be994a6686&q='+this.city1+'&image_type=photo&pretty=true&category=country')
        .map((res: Response) => res.json())
          .subscribe(data => {
                this.imageData = data;
                console.log(this.imageData);
              });
  this.buttonClicked = true;
  }

/*  autoType(){
    this._http.get('http://autocomplete.wunderground.com/aq?query='+this.city1)
    .map((res: Response) => res.json())
      .subscribe(data => {
            this.cities = data;
            console.log(this.cities);
          });

  }*/
}
