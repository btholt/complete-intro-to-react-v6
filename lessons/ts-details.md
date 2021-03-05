---
title: "Details"
path: "/ts-details"
order: "13C"
section: "TypeScript"
description: "Brian quickly converts Details.tsx"
---

Let's go fix another file. Details.tsx. Before we get into the file, make a new file called `APIResponsesTypes.ts`. In there put

```typescript
export interface Pet {
  id: number;
  name: string;
  animal: "dog" | "cat" | "bird" | "reptile" | "rabbit";
  description: string;
  breed: string;
  images: string[];
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}
```

This allows us to resuse these response types anywhere we reference the API responses and have an enforceable shape that TypeScript knows what to do with.

Onto Details. Rename it Details.tsx

```tsx
// imports
import { withRouter, RouteComponentProps } from "react-router-dom";
import { PetAPIResponse } from "./APIResponsesTypes";

class Details extends Component<RouteComponentProps<{ id: string }>> { … }

// add public to methods

// replace state
state = {
  loading: true,
  showModal: false,
  animal: "",
  breed: "",
  city: "",
  state: "",
  description: "",
  name: "",
  images: [] as string[],
};

// inside componentDidMount
const json = (await res.json()) as PetAPIResponse;

// add href to toggleModal
adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

// error boundary
export default function DetailsErrorBoundary(
  props: RouteComponentProps<{ id: string }>
): JSX.Element {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
```

- We need to tell TypeScript what props each component expects. Now when you import that component elsewhere, TS will make sure the consumer passes all the right props in.
- We need to use React Router's RouteComponentProps params because the ID param will come from the router, not directly from the consumer.
- We have to give all state a default setting. This prevents errors on the initial render and it gives TypeScript the ability to infer all your types.
- It can't tell what type photos is so we tell it's an array of strings from the pet library.
- We had to add `.href` to the end of location. Technically that API expect a Location object but it just works with a string. With TS we need to be a bit more adherent to the spec so we'll do it the correct by setting `.href`.
- TS still won't be happy because our other pages haven't been typed yet. We're getting there.

> 🏁 [Click here to see the state of the project up until now: typescript-2][step]

[step]: https://github.com/btholt/citr-v6-project/tree/master/typescript-2
