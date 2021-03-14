---
title: "Class Components"
path: "/class-components"
order: "5B"
section: "React Capabilities"
description: "While many components are written with hooks, the older API of class-based components are still around and still useful. Brian shows you when and how to use the class components API."
---

This class has been showing you the latest APIs for React: hooks. Going forward, these sorts of components will be the default way of writing React. However, the class API still has its uses and isn't going anywhere anytime soon. In this section we're going to go through and learn the basics of it since there's still a lot class code out in the wild and the new API can't do _everything_ the old one can, so it's still useful in some cases.

Let's go make Details.js as a class.

```javascript
// replace Details.js
import { Component } from "react";
import { withRouter } from "react-router-dom";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  render() {
    console.log(this.state);

    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
```

- Every class component extends `React.Component`. Every class component must have a render method that returns some sort of JSX / markup / call to `React.createElement`.
- Not every component needs to have a constructor. Many don't. I'll show you momentarily how you nearly never need to have one. In this case we need it to instantiate the state object (which we'll use instead of `useState`.) If you have a constructor, you _have_ to do the `super(props)` to make sure that the props are passed up to React so React can keep track of them.
- `componentDidMount` is a function that's called after the first rendering is completed. This pretty similar to a `useEffect` call that only calls the first time. This is typically where you want to do data fetching. It doesn't have to be async; we just made it async here to make the data fetching easy.
- Notice instead of getting props via parameters and state via `useState` we're getting it from the instance variables `this.state` and `this.props`. This is how it works with class components. Neither one will you mutate directly.
  - `this.state` is the mutable state of the component (like useState). You'll use `this.setState` to mutate it (don't modify it directly.)
  - `this.props` comes from the parent component, similar to parameter given to the render functions that we pull props out of.
- `withRouter()` is called a higher order component and is a bit of an advance concept. Basically we're composing functionality into our component via react-router. Think of `useParams`: it mixes in functionality from react-router by calling a hook. This is how you get that custom hook behavior of mixing in library functionality with class components. Redux does this too, but otherwise it's not overly common.

## Other lifecycle methods

This class doesn't cover all the lifecycle methods but you can imagine having different timings for different capabilities of a component can be useful. For example, if you have a set of props that come in and you need to filter those props before you display them, you can use `getDerivedStateFromProps`. Or if you need to react to your component being removed from the DOM (like if you're subscribing to an API and you need to dispose of the subscription) you can use `componentWillUnmount`.

There are lots more you can check out in [the React docs here][docs].

[docs]: https://reactjs.org/docs/react-component.html
