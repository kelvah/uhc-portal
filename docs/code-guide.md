# Code guidelines

## UI coding

### Component structure

Components should be properly broken down into UI elements responsible for a single goal. The main responsibilities of UI components are to display data and handle user interactions.

Use the following patterns when designing them:
- UI components should be a thin wrapper around data, they should handle local state only when necessary
- Try to flatten the UI state into a basic calculation, deriving data from props and adopting `useState` only if necessary
- Create a new component abstraction when you're nesting conditional logic, or top level if/else statements. Ternaries are reserved for small, easily readable logic
- When complex data manipulation and logic is necessary, make use of custom hooks
- Avoid passing whole objects to components when they only need a few properties. It will help clarify which information the component relies on.
- UI components should not have more than one goal. Whenever possible try to separate data fetching and logic from the presentational layer.
- Avoid `setTimeouts`. They are flaky and usually a _hack_, always provide a comment on _why_ you are using them. This doesn't affect if the "code runs" or not most of the time, but they can introduce subtle bugs that can grow into big issues that aren't obvious until someone goes in and has to spend a lot of time refactoring everything.

### React specific guidelines

- Avoid using `useMemo` for processes that are not computationally expensive
- Functions are memoized with `useCallback` only when necessary:
  * Functions passed as props to child components (to prevent unnecessary re-renders)
  * Functions used as dependencies in `useEffect`, `useMemo`, or other hooks
  * Functions passed to context providers or returned from custom hooks
- Functions are NOT unnecessarily memoized:
  * Simple event handlers that aren't passed as props
  * Functions without dependencies or only used within the same component
- All hook dependencies (`useEffect`, `useMemo`, `useCallback`) use referentially stable variables
- No useEffects that take incoming props and computes them for a local useState – this is useMemo with extra steps
- Always follow the [exhaustive-deps rule](https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps). If you encounter a file where the es-lint rule is ignored, enable it and fix the dependency array. If for any reason the rule has to be skipped you have to provide a comment explaining why.

#### On `useEffect`

Make sure to follow React guidelines on `useEffect`: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

Common cases where useEffect is NOT needed:

* Transforming data for rendering (use variables or useMemo instead)
* Handling user events (use event handlers instead)
* Resetting state when props change (use key prop or calculate during render)
* Updating state based on props/state changes (calculate during render)
* Set default values for input fields

Only use useEffect for:

* Synchronizing with external systems (APIs, DOM, third-party libraries)
* Cleanup that must happen when component unmounts

Avoid putting dependent logic inside `useEffect`, it causes misdirection of what the logic is doing. Choose to explicitly define logic rather than depend on implicit reactive behavior. Chose state machine over multiple `useEffect`/`useState`.

### Avoid Custom Styling

It is tempting to “just add a bit of CSS” for minor tweaks, but this usually indicates we are drifting away from native PatternFly behaviour and should reconsider the approach. If you feel the need to do CSS or applying "styles" or "className" properties to "nudge" or minorly manipulate your UI rendering, you're likely going in the wrong direction.

Using PF utility classes to enforce spacing or to fix layout issues is also considered problematic. Spacing and responsiveness should be handled using layout components (`Stack`, `Flex`, `Grid`, etc.) with a proper configuration. Exceptions can be made but they have to be justified.

Sometimes we find scenarios where PF doesn't quite manage something as we wanted. This is usually related to complex components structures or to components that do not support yet the feature we are trying to implement.
This should be a rare exception, and we should resort to it sparingly. The more we add customizations, the more we have to deal with PF upgrades breaking them.

### TypeScript 

This is a legacy codebase. Not all the code has been migrated to TS. Everytime you encounter JS files, and you change them you are highly encouraged to convert them to TS first. The TS conversion should happen in a separate PR/ticket before further changes are introduced.

Avoid using `any` or [type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions). They are escape hatches, they should be used only when there are no alternatives. Explain _why_ you resorted to them inside PR comments.

### Documenting

Every UI component representing a feature or a reusable UI block should be properly documented. This is crucial for many reasons:
- Allow to easily discover what is already implemented without having to browse the entire application
- Allow to discover all possible statuses a components could be, including error states, without having to resort to elaborate mocking
- Clearly indentify a component interface and its dependencies

We have [a Storybook instance](.docs/contributing.md#storybook) for this purpose. Every new component should be documented with a story.

Writing components with clear responsibilities and dependencies is crucial to make it possible to easily document and test them.

