# DYNAMIC ROUTES

## CATCH-ALL ROUTES

- can catch all paths by adding three dots (...) inside brackets:
- pages/posts/[...id].js matches /posts/a, /posts/b, /posts/c, etc
- if you do this in getStaticPaths, you MUST return an array of values of id keys:

```
return [
{
params: {
// Statically Generates /posts/a/b/c
id: ['a', 'b', 'c'],
},
},
//...
];
```

- params.id will be an array inside getStaticProps:

```
export async function getStaticProps({ params }) {
// params.id will be like ['a', 'b', 'c']
}
```

## ROUTER

- to access Next router, import useRouter hook from next/router

## 404 PAGES

- to create a custom 404 page, create pages/404.js
- this file is statically generated at build time

```
export default function Custom404() {
return <h1>404 - Page Not Found</h1>;
}
```

## FALLBACK: FALSE

- any paths not returned by getStaticPaths will result in a 404 page.

## FALLBACK: TRUE

- paths returned from getStaticPaths will be rendered to HTML at build time
- paths not generated at build time will NOT result in a 404 page
- instead, Next will serve a "fallback" version of hte page
- in the background, Next will statically generate the requested path
- subsequent requests will serve the generated page (just like other pages pre-rendered at build time)

## FALLBACK: BLOCKING

- new paths will be server-side rendered with getStaticProps
- and cached for future requests so it only happens once per path

# API ROUTES

## Do Not Fetch an API Route from getStaticProps or getStaticPaths

- Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).
- getStaticProps and getStaticPaths run only on the server-side and will never run on the client-side

### HANDLING INPUT FORMS

- create a form on your page and have it send a POST request to your API Route
- write code to directly save it to your database
- API Route code will not be part of your client bundle, so you can safely write server-side code

```
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```
