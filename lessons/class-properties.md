---
title: "Class Properties"
path: "/class-properties"
order: "5C"
section: "React Capabilities"
description: "Using constructors to set initial state for class components is verbose and can be done better. Brian teaches you to use the new feature in JavaScript, class properties, to make your code easy to read."
---

The constructor is annoying. We can use something called class properties to make it a lot nicer and easier to read. Class properties are a new part of JavaScript so we need Parcel transform the code when Parcel transpiles our code. Luckily our config will do that by itself so no further changes are needed (previously we did need to.)

Since we're going to take ahold of our own Babel configuration, we need to take over _all of it_. Parcel won't do it for us anymore. So install the following:

```bash
npm i -D @babel/plugin-proposal-class-properties@7.13.0 @babel/preset-env@7.13.5 @babel/eslint-parser@7.13.4
```

Now modify your `.babelrc` with the following:

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
