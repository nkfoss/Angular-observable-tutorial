import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs'

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
          if (count > 3) { observer.error(new Error('Count is greater than 3!'))}
          count++;
        }, 1000)
      });

    this.intervalSub = customIntervalObservable.subscribe( data => {
        console.log(data)
      }, error => {
        console.log(error);
        alert(error.message);
      })


    // This is essentially the code above.

    // this.intervalSub = interval(1000).subscribe( 
    //   count => {
    //     console.log(count);
    //   }
    // )
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

}
