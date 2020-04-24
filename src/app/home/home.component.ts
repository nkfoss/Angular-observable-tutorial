import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalSub: Subscription;

  constructor() { }

  ngOnInit() {

    
    const customIntervalObservable = Observable.create( observer => {
        let count = 0;
        setInterval( () => {
          observer.next(count);
          if (count == 2) { observer.complete(); }
          // if (count > 3) { observer.error(new Error('Count is greater than 3!'))}
          count++;
        }, 1000)
      });

    this.intervalSub = customIntervalObservable.pipe( map( (data: number) => {
      return data - 2;        // our pipe decrements data by 2
    })).subscribe( data => {  //data handling function
        console.log(data)
      }, error => {               // Error handling function
        console.log(error);
        alert(error.message);
      }, () => {                 // completion handling function (NEVER gets passed an argument)
        console.log("We are completed!")
      });

    // This is essentially the code above.

    // this.intervalSub = interval(1000).subscribe( 
    //   count => {
    //     console.log(count);
    //   }
    // )

    customIntervalObservable.pipe( map( (data: number) => {
      return data - 2;
    }))

  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

}
