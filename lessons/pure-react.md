---
path: "/pure-react"
title: "Pure React"
order: "2A"
section: "No Frills React"
description: "Brian teaches React without any frills: just you, some JavaScript, and the browser. No build step."
---

Let's start by writing pure React. No compile step. No JSX. No Babel. No Webpack or Parcel. Just some JavaScript on a page.

Let's start your project. Create your project directory. I'm going to call mine `adopt-me` since we're going to be building a pet adoption app throughout this course. Create an index.html and put it into a `src/` directory inside of your project folder. In index.html put:

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./style.css">
  <title>Adopt Me</title>
</head>

<body>
  <div id="root">not rendered</div>
  <script src="https://unpkg.com/react@17.0.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js"></script>
  <script>
    // Your code is going to go here
  </script>
</body>

</html>
```

> What's new between React 16 and React 17? Nothing! No new features were added. It was a "stepping stone" version that allows sites to upgrade React versions gradually. Previously only one copy of React could run on a page at a time and with v17 more than one can. [See more here][react17].

Now open this file in your browser. On Mac, hit ⌘ (command) + O in your favorite browser, and on Windows and Linux hit CTRL + O to open the Open prompt. Navigate to wherever you saved the file and open it. You should see a line of text saying "not rendered".

- Pretty standard HTML5 document. If this is confusing, I teach another course called [Intro to Web Dev][webdev] that can help you out.
- We're adding a root div. We'll render our React app here in a sec. It doesn't _have_ to be called root, just a common practice.
- We have two script tags.
  - The first is the React library. This library is the interface of how to interact with React; all the methods (except one) will be via this library. It contains no way of rendering itself though; it's just the API.
  - The second library is the rendering layer. Since we're rendering to the browser, we're using React DOM. There are other React libraries like React Native, React 360 (formerly React VR), A-Frame React, React Blessed, and others. You need both script tags. The order is not important.
- The last script tag is where we're going to put our code. You don't typically do this but I wanted to start as simple as possible. This script tag must come _after_ the other two.

> Let's add some style! [Click here][style] to get the stylesheet for this course. If you follow along with the course and use the same class names, the styles will be applied for you automatically. This isn't a course on CSS so I make no assertion it's any good!

In the last script tag, put the following.

```javascript
const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Adopt Me!")
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

This is about the simplest React app you can build.

- The first thing we do is make our own component, App. React is all about making components. And then taking those components and making more components out of those.
- There are two types of components, function components and class components. This is a function component. We'll see class components shortly.
- A function component _must_ return markup (which is what `React.createElement` generates.)
- These component render functions _have_ to be fast. This function is going to be called a lot. It's a hot code path.
- Inside of the render function, you cannot modify any sort of state. Put in functional terms, this function must be pure. You don't know how or when the function will be called so it can't modify any ambient state.
- `React.createElement` creates one _instance_ of some component. If you pass it a _string_, it will create a DOM tag with that as the string. We used `h1` and `div`, those tags are output to the DOM. If we put `x-some-custom-element`, it'll output that (so web components are possible too.)
- The second empty object (you can put `null` too) is attributes we're passing to the tag or component. Whatever we put in this will be output to the element (like id or style.)
- `ReactDOM.render` is what takes our rendered `App` component and puts in the DOM (in our case we're putting it in the `root` element.)
- Notice we're using `React.createElement` with `App` as a parameter to `ReactDOM.render`. We need an _instance_ of `App` to render out. `App` is a class of components and we need to render one instance of a class. That's what `React.createElement` does: it makes an instance of a class.

[webdev]: https://frontendmasters.com/courses/web-development-v2/
[logo]: https://raw.githubusercontent.com/btholt/react-redux-workshop/master/src/adopt-me.png
[react17]: https://reactjs.org/blog/2020/10/20/react-v17.html
[style]: https://raw.githubusercontent.com/btholt/citr-v6-project/master/01-no-frills-react/src/style.css
