---
title: "Managing State in Class Components"
path: "/managing-state-in-class-components"
order: "5D"
section: "React Capabilities"
description: "Class components work a little different from hooks in terms of marshalling state. Brian teaches you how to manage your state using setState and life cycle methods."
---

Okay, so on this page, notice first we have a loading indicator (this one isn't nice looking but you could put some effort into it if you wanted.) This is a good idea while you're waiting for data to load.

Let's make a nice photo carousel of the pictures for the animal now. Make a new file called Carousel.js:

```javascript
import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
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

> 🏁 [Click here to see the state of the project up until now: 09-managing-state-in-class-components][step]

[step]: https://github.com/btholt/citr-v6-project/tree/master/09-managing-state-in-class-components
[babel]: https://babeljs.io/
