### 'Built-in' observables

#### user.component.ts

Angular has some native observables that it will handle on it's own. One of them is when you
subscribe to route parameters. You do not need to unsubscribe from these.

### Custom observables

#### home.component.ts

Some observables are not handled by Angular. You can see our 'interval' observable has a subscription.
This is handled when the component is destroyed. Using the browsers console, you can see the log
statements as our observable emits values. When we navigate AWAY from the home component, these emissions
cease. 