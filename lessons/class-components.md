---
title: "Class Components"
path: "/class-components"
order: "5B"
section: "React Capabilities"
description: "While many components are written with hooks, the older API of class-based components are still around and still useful. Brian shows you when and how to use the class components API."
---

This class has been showing you the latest APIs for React: hooks. Going forward, these sorts of components will be the default way of writing React going forward. However, the class API still has its uses and isn't going anywhere anytime soon. In this section we're going to go through and learn the basics of it since there's still a lot class code out in the wild and the new API can't do _everything_ the old one can, so it's still useful in some cases.

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
      `https://pet-api-v2.azurewebsites.net/api/pets?id=${this.props.match.params.id}`
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

The constructor is annoying. We can use something called class properties to make it a lot nicer and easier to ready. Class properties are a new part of JavaScript so we need Parcel transform the code when Parcel transpiles our code. Luckily our config will do that by itself so no further changes are needed (previously we did need to.)

Since we're going to take ahold of our own Babel configuration, we need to take over _all of it_. Parcel won't do it for us anymore. So install the following:

```bash
npm i -D @babel/plugin-proposal-class-properties@7.13.0 @babel/preset-env@7.13.5 @babel/eslint-parser@7.13.4
```

Now make a file called `.babelrc` with the following:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-env"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

Babel's core concept is a plugin. Every one sort of a transformation it can perform is encapsulated into a plugin. Here we're including one explicitly: transform-class-properties. Then we're including a _preset_ as well. A preset is just a group of plugins, grouped together for convenience. `env` is a particularly good one you should expect to normally use.
This will allow us too to make ESLint play nice too (Prettier handles this automatically.) Add one line to the top level of your `.eslintrc.json`:

```json
{
  …
  "parser": "@babel/eslint-parser",
  …
}
```

Now with this, we can modify Details to be as so:

```javascript
// replace constructor
state = { loading: true };
```

Loads easier to read, right?

Okay, so on this page, notice first we have a loading indicator (this one isn't nice looking but you could put some effort into it if you wanted.) This is a good idea while you're waiting for data to load.

Let's make a nice photo carousel of the pictures for the animal now. Make a new file called Carousel.js:

```javascript
import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["https://petapiv2.blob.core.windows.net/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
```

Add the Carousel component to the Detail page.

```javascript
// import at top
import Carousel from "./Carousel";

// at top of Details function
const { animal, breed, city, state, description, name, images } = this.state;

// first component inside div.details
<Carousel images={images} />;
```

- defaultProps does exactly what it sounds like: it allows you to set props that a component has by default if they're not furnished by parent. That way we don't have to do detection logic and can just assume they're always there.

Let's make it so we can react to someone changing the photo on the carousel.

```javascript
// add event listener
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };

// above img
// eslint-disable-next-line

// add to img
onClick={this.handleIndexClick}
data-index={index}
```

- This is how you handle events in React class components. If it was keyboard handler, you'd do an onChange or onKeyUp, etc. handler.
- Notice that the handleIndexClick function is an arrow function. This is because we need the `this` in `handleIndexClick` to be the correct `this`. An arrow function assures that because it will be the scope of where it was defined. This is common with how to deal with event handlers with class components.
- The data attribute comes back as a string. We want it to be a number, hence the `+`.
- We're doing bad accessibility stuff. But this makes it a lot simpler for learning for now. But don't do this in production.

> 🏁 [Click here to see the state of the project up until now: 09-class-components][step]

[babel]: https://babeljs.io/
[step]: https://github.com/btholt/citr-v6-project/tree/master/09-class-components
