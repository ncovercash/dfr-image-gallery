This project is created to serve as an image gallery for the Dutch Fork High School Cross Country team. Associated backend API endpoints are not included in this repository.

## Getting Started

First, run the development server:

```bash
yarn start
```

Then, open [http://localhost:3000/Gallery](http://localhost:3000/Gallery) with your browser to see the result.

## Deployment

The build application (`yarn build`) expects to run in a php-nginx environment with an environment variable `ADMIN_PASSWORD`.  It also expects `images.json`, `pending.json`, and `img/` to be writable in the webroot.
