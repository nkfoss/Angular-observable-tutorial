### 'Built-in' observables

#### user.component.ts

Angular has some native observables that it will handle on it's own. One of them is when you
subscribe to route parameters. You do not need to unsubscribe from these.

### Custom observables
#### home.component.ts

##### IntervalSub (commented out): 
Some observables are not handled by Angular. You can see our 'interval' observable has a subscription. This is handled when the component is destroyed. Using the browsers console, you can see the log statements as our observable emits values. When we navigate AWAY from the home component, these emissions cease. 

##### CustomIntervalObservable: 
The actual code has a real custom observable. First we define the observable and call the create method. Create takes a function (in our case, an anonymous function), and rxjs automatically passes an arugment to it (and that argument is an 'observer').

The observer is the part that is interested in being informed about new data, errors, or the completion of the observable. We must tell the observer about these things as it listens. Here, we again use the setInterval method. Inside it, we say observer.next() to EMIT A NEW VALUE. Notice we defined 'count' in the beginning of the anonymous function. We called observer.next(count) and then incremented count. 

Finally, we subscribe to the observable.

### Error handling

There a commented out if-statement that checks the count. If you look at the browser console, you'll see the error get thrown. And then observable stops. This is an important behavior. We can also see how the error is handled. This is outline in the code where we subscribe to the observable. At this point, the observable is 'cancelled' and we do NOT need to unsubscribe.

### Completion handling

There is also a function after the error handling function, and this is called when the observable is completed. Notice that it receives no arugments... this is because a completion doesn't pass any.
Once our observable is complete, unsubscribing is unnecessary (though it's okay/safer to do it).

### Operators
Observers get data from observables via a subscription. But sometimes we might want NOT want the raw data. Maybe we want to transform it somehow. We can use built-in operators between the observable and the subscription. We can use piping for that...

```javascript
this.intervalSub = customIntervalObservable.pipe( map( (data: number) => {
      return data - 2;        
    }))
```

Here, we see the piping is performed in our subscription definition. We are just decrementing 'data' by 2, so the print statements reflect that (though the actual count still is governing our completion condition). Pipe takes an operator (we used 'map'), and it has no limit on how many it takes. There are many rxjs operators you can use, see the documentation.

### Subjects
These are the preferred replacement for event emitting in most cases. Here, we use subject to pass data between components through services. Our user component has a button that calls onActivate. This triggers a change in the userService's Subject object called 'activatedEmitter'. You can see we are calling 'next' (just like observables).

In the app component, there is already a subscription to the userService's subject. When a change happens, then the app component KNOWS the user component's 'activated' button was pressed. As always, we unsubscribe in OnDestroy.