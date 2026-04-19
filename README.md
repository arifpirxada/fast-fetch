# data-dash

A lightweight, fully-typed, Axios-like HTTP client built natively on the generic `fetch` API.

It gives you the familiar syntax and convenience of Axios, with zero external dependencies and a tiny footprint.

## Features

- **Axios-like syntax**: `client.get()`, `client.post()`, etc.
- **TypeScript First**: Generics for type-safe responses out of the box.
- **Built on `fetch`**: Uses the native Fetch API for optimal performance.
- **Uniform Error Handling**: No more `try/catch` wrapping for every request—errors and HTTP statuses are consistently returned.
- **Query Parameters**: Automatically encodes objects into URL query parameters.

## Installation

```bash
npm install data-dash
```

## Quick Start

```typescript
import { createClient } from "data-dash";

// 1. Initialize the client
const client = createClient({
  baseUrl: "https://jsonplaceholder.typicode.com",
  headers: {
    "Authorization": "Bearer YOUR_TOKEN" // optional default headers
  }
});

// 2. Define your expected response type
interface User {
  id: number;
  name: string;
}

async function fetchUsers() {
  // 3. Make a request!
  const { data, status, error } = await client.get<User[]>("/users");

  if (error) {
    console.error(`Error ${status}:`, error);
    return;
  }

  console.log("Users:", data);
}
```

## API Reference

### `createClient(config: ClientConf)`
Creates a new HTTP client instance.

**`ClientConf` Options:**
- `baseUrl` *(string)*: The base URL for all requests.
- `headers` *(Record<string, string>)*: Optional. Default headers to include in every request.
- `timeout` *(number)*: Optional. Timeout in milliseconds (reserved for future implementation).

### Client Methods

All HTTP methods return a Promise resolving to an object:
`Promise<{ data: T | null; status: number; error: string | null }>`

- `data`: The parsed JSON response of generic type `T`. `null` if the request fails.
- `status`: The HTTP status code of the response.
- `error`: The error message if the response is not `ok`, otherwise `null`.

#### `client.get<T>(url, options?)`
#### `client.delete<T>(url, options?)`
```typescript
const { data, error } = await client.get<User>("/users/1", {
  params: { _limit: "5" }, // Appends ?_limit=5
  headers: { "X-Custom-Header": "value" },
  baseUrl: "https://another-api.com" // Overrides instance baseUrl
});
```

#### `client.post<T>(url, body, options?)`
#### `client.put<T>(url, body, options?)`
#### `client.patch<T>(url, body, options?)`
```typescript
const newUser = { name: "Alice", job: "Developer" };

const { data, status } = await client.post<User>("/users", newUser);
```

**`Options` object:**
- `headers`: Headers specific to this request.
- `params`: Query parameters object (e.g., `{ search: "test" }` becomes `?search=test`).
- `baseUrl`: Overrides the default base URL for this specific request.

## License

ISC License
