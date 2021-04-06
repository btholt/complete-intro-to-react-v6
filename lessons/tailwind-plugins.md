---
title: "Tailwind Plugins"
path: "/tailwind-plugins"
order: "10C"
section: "TailwindCSS"
description: ""
---

Our inputs look really gross. We could write our own components (basically reusable CSS classes, what a novel idea) but we're just going to use the good ones that Tailwind provides out of the box.

Run `npm install -D @tailwindcss/forms@0.2.1`.

Put this into your tailwind.config.js

```javascript
// replace plugins
plugins: [require("@tailwindcss/forms")],
```

This will apply a bunch of default styles for all of our basic form elements. Tailwind has a pretty great plugin ecosystem. One of my favorites is the aspect-ratio one. CSS doesn't currently have a backwards compatible way of doing aspect ratios (e.g. keep this image in a square ratio) and this plugin makes a primitive that you can use like that. Super cool.

Notice our location input still looks bad. With this plugin they (probably wisely) require you to add `type="text"` to the the input so they can have a good selector for it. So please go add that now to your text input.

Let's finish making SearchParams looks nice.

To each of the selects and inputs, add `className="w-60"` so they have a nice uniform width.

To the breed selector, we want it to be grayed out when it's not available to use. However the PostCSS 7 version of Tailwind doesn't work with the `disabled:<style>` class (new versions do.) So add this to your tailwind.config.js config.

```javascript
//replace variants
variants: {
  opacity: ({ after }) => after(["disabled"]),
},
```

This will allow our specific use case. Again, don't dig too much into this because once Parcel 2 lands or you whenever you're using PostCSS 8 this isn't a big deal.

Now add `className="w-60 disabled:opacity-50"` to the breed `<select>`.

Replace the button with:

```javascript
<button
  className="rounded px-6 py-2 color text-white hover:opacity-50 border-none"
  style={{ backgroundColor: theme }}
>
  Submit
</button>
```

Nothing surprising there.
