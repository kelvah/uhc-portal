# Code guidelines

## React coding

### Avoid Custom Styling

It is tempting to “just add a bit of CSS” for minor tweaks, but this usually indicates we are drifting away from native PatternFly behaviour and should reconsider the approach. If you feel the need to do CSS or applying "styles" or "className" properties to "nudge" or minorly manipulate your UI rendering, you're likely going in the wrong direction.

Using PF utility classes to enforce spacing or to fix layout issues is also considered problematic. Spacing and responsiveness should be handled using layout components (Stack, Flex, Grid, etc.) with a proper configuration.

There are rare exceptions to break from this rule.

Sometimes we find scenarios where PF doesn't quite manage something as we wanted. This is usually related to complex components structures or to components that do not support yet the feature we are trying to implement. 
This should be a rare exception, and we should resort to it sparingly. The more we add customizations, the more we have to deal with PF upgrades breaking them.

### Component structure

Components should be properly broken down into UI elements responsible for a single goal. The main responsibilities of UI components are to display data and handle user interactions.
Use the following patterns when designing them:
- UI components should be a thin wrapper around data, they should handle local state only when necessary
- consider if you can flatten the UI state into a basic calculation, deriving data from props and adopting useState only if necessary
- choose to create a new component abstraction when you're nesting conditional logic, or top level if/else statements. Ternaries are reserved for small, easily readable logic
- when complex data manipulation and logic is necessary, make use of custom hooks
- avoid passing objects to components that only need a few properties 
- setTimeouts are flaky and usually a _hack_, always provide a comment on _why_ you are using them. regardless the fact that the "code runs" or not, most of the time they can introduce subtle bugs that grobig issues that aren't obvious until someone goes in and has to spend a lot of time refactoring everything


- avoid using useMemo for processes that are not computationally expensive
Functions are memoized with useCallback only when necessary:
* Functions passed as props to child components (to prevent unnecessary re-renders)
* Functions used as dependencies in useEffect, useMemo, or other hooks
* Functions passed to context providers or returned from custom hooks

Functions are NOT unnecessarily memoized:
* Simple event handlers (onClick, onChange) that aren't passed as props
* Functions without dependencies or only used within the same component

All hook dependencies (useEffect, useMemo, useCallback) use referentially stable variables

No useEffects that take incoming props and computes them for a local useState – this is useMemo with extra steps



### On useEffect

Before using useEffect read: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

Common cases where useEffect is NOT needed:

* Transforming data for rendering (use variables or useMemo instead)
* Handling user events (use event handlers instead)
* Resetting state when props change (use key prop or calculate during render)
* Updating state based on props/state changes (calculate during render)

Only use useEffect for:

* Synchronizing with external systems (APIs, DOM, third-party libraries)
* Cleanup that must happen when component unmounts

All hook dependencies (useEffect, useMemo, useCallback) use referentially stable variables

No useEffects that take incoming props and computes them for a local useState – this is useMemo with extra steps



### other things

Uls are a _thin_ wrapper over data, you should avoid using local state (like usestate unless you have to, and it's independent of the business logic
- even then, consider if you can flatten the ui state into a basic calculation. useState is only necessary if it's truly reactive
- choose state machines over multiple useStates, makes the code harder to reason about
- choose to create a new component abstraction when you're nesting conditional logic, or top level if/else statements. ternaries are reserved for small, easily readable logic
- avoid putting dependent logic in useEffects, it causes misdirection of what the logic is going. choose to explicitly define logic rather than depend on implicit reactive behavior
- setTimeouts are flaky and usually a _hack_. provide a comment on _why_
  this doesn't affect if the "code runs" or not, most of the time, but you can introduce subtle bugs that pile up into big issues that aren't obvious until someone goes in and has to spend a lot of time refactoring everything (edited)