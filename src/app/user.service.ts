import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs'


@Injectable({providedIn: 'root'}) // this is quicker than adding to the appmodule
export class UserService{
    activatedEmitter = new Subject<boolean>();
}