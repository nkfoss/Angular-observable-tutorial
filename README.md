### 'Built-in' observables

#### user.component.ts

Angular has some native observables that it will handle on it's own. One of them is when you
subscribe to route parameters. You do not need to unsubscribe from these.

### Custom observables

#### home.component.ts
IntervalSub (commented out): Some observables are not handled by Angular. You can see our 'interval' observable has a subscription. This is handled when the component is destroyed. Using the browsers console, you can see the log statements as our observable emits values. When we navigate AWAY from the home component, these emissions cease. 

The actual code has a real custom observable. First we define the observable and call the create method. Create takes a function (in our case, an anonymous function), and rxjs automatically passes an arugment to it (and that argument is an 'observer').

The observer is the part that is interested in being informed about new data, errors, or the completion of the observable. We must tell the observer about these things as it listens. Here, we again use the setInterval method. Inside it, we say observer.next() to EMIT A NEW VALUE. Notice we defined 'count' in the beginning of the anonymous function. We called observer.next(count) and then incremented count. 

Finally, we subscribe to the observable.