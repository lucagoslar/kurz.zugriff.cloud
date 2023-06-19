# kurz.zugriff.cloud

🔗 URL shortener at the Edge.

Licensed under the EUPL v1.2.

## Developing

Make sure to create a copy of `.env.example` with the name `.env` and adapt it to your requirements before running the application.

```bash
# install dependencies
npm i

# apply db migrations to db
npx prisma migrate dev

# seed the database (flags '--no-flush' and '--no-seed' available)
npm run seed --

# run storybook
npm run storybook

# or run the development server
npm run dev
```

## Building

Using [`@zugriff/adapter-sveltekit`](https://www.npmjs.com/package/@zugriff/adapter-sveltekit), this project is configured to operate on zugriff.
