---
path: "/react-router"
title: "React Router"
order: "5A"
section: "React Capabilities"
description: "One component should do one thing. Brian shows you how to break down bigger components into smaller components."
---

> In previous versions of this course, I've taught various versions of [React Router][rr] as well as [Reach Router][reach]. It's all written by the same folks (same great people behind [Remix][remix]) but suffice to say it's a bit of a moving target. It's great software and you'll be well served by any of them. This course uses React Router v5 but aware React Router v6 is coming soon or maybe even be out by the time you read this. Reach Router is being folded back into React Router.

React Router is by far the most popular client side router in the React community. It is mature, being used by big companies, and battle tested at large scales. It also has a lot of really cool capabilities, some of which we'll examine here.

What we want to do now is to add a second page to our application: a Details page where you can out more about each animal.

Let's quickly make a second page so we can switch between the two. Make file called Details.js.

```javascript
const Details = () => {
  return <h2>hi!</h2>;
};

export default Details;
```

Now the Results page is its own component. This makes it easy to bring in the router to be able to switch pages. Run `npm install react-router-dom@5.2.0`.

Now we have two pages and the router available. Let's go make it ready to switch between the two. In `App.js`:

```javascript
// at top
import { BrowserRouter as Router, Route } from "react-router-dom";
import Details from "./Details";

// replace <SearchParams />
<Router>
  <Route path="/details/:id">
    <Details />
  </Route>
  <Route path="/">
    <SearchParams />
  </Route>
</Router>;
```

Now we have the router working (but still have an issue)! Try navigating to http://localhost:1234/ and then to http://localhost:1234/details/1. Both should work … sort of!

- React Router has a ton of features that we're not going to explain here. The docs do a great job.
- The `:id` part is a variable. In `http://localhost:1234/details/1`, `1` would be the variable.
- The killer feature of React Router is that it's really accessible. It manages things like focus so you don't have to. Pretty great.

On the Details page, notice that both pages render. It has to do with how React Router does routes.

- React Router will render all components that the path match.
- React Router does partial matches. The URL `/teachers/jem/young` will match the paths `/`, `/teachers`, `/teachers/jem` and `/teachers/jem/young`. It will not match `/young`, `/jem/young`, or `/teachers/young`.

So let's make it match only one path with a component called Switch.

```javascript
// replace react-router-dom import
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// replace jsx
<div>
  <Router>
    <h1>Adopt Me!</h1>
    <Switch>
      <Route path="/details/:id">
        <Details />
      </Route>
      <Route path="/">
        <SearchParams />
      </Route>
    </Switch>
  </Router>
</div>;
```

Now notice it only renders one page at a time.

So now let's make the two pages link to each other. Go to Pet.js.

```javascript
// at top
import { Link } from "react-router-dom";

// change wrapping <a>
<Link to={`/details/${id}`} className="pet">
  […]
</Link>;
```

Why did we change this? Didn't the `<a>` work? It did but with a flaw: every link you clicked would end up in the browser navigating to a whole new page which means React would totally reload your entire app all over again. With `<Link>` it can intercept this and just handle that all client-side. Much faster and a better user experience.

Now each result is a link to a details page! And that id is being passed as a prop to Details. Try replacing the return of Details with:

```javascript
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  return <h2>{id}</h2>;
};

export default Details;
```

The `useParams` hook is how you get params from React Router. It used to be through the props but now they prefer this API.

Let's make the Adopt Me! header clickable too.

```javascript
// import Link too
import { Router, Link } from "react-router-dom";

// replace h1
<header>
  <Link to="/">Adopt Me!</Link>
</header>;
```

Now if you click the header, it'll take you back to the Results page. Cool. Now let's round out the Details page.

> 🏁 [Click here to see the state of the project up until now: 08-react-router][step]

[rr]: https://reacttraining.com/react-router/
[reach]: https://reach.tech/router/
[rf]: https://twitter.com/ryanflorence
[step]: https://github.com/btholt/citr-v6-project/tree/master/08-react-router
[remix]: https://remix.run
