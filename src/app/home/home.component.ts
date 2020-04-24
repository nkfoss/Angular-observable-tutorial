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

    // This is essentially the same as the commented out code below.
    const customIntervalObservable = Observable.create( observer => {
        let count = 0;
        setInterval( () => {
          observer.next(count);
          count++;
        }, 1000)
      });

    this.intervalSub = customIntervalObservable.subscribe( data => {
        console.log(data)
      });


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
