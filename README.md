# Couchsurfing assignment

## Instructions

- Create a new repo on github.com and push the exercise once complete
- Please complete the following without leveraging code interpreter, copilot, etc.. to complete the key parts of the exercise. We want to see your style coming through.
- Complete the exercise in whatever language you feel most comfortable in
- Please limit the scope to the ask as much as possible and no more than 2 hours.
- Reply to the email once complete with the link to the repo within 3 business days. Feel free to include notes regarding decisions, challenges faced, and any other relevant information in your email

**Create a webapp using NextJS that does the following:**

- The main page list the names of users, which come from an API call to a NextJS API route.
- The data for the users can be seeded from mock data, files, or any other mock. A database is not necessary.
- The user can click a user to go to a new page which shows that user's detailed profile.
- The profile information should come from API endpoints that are served from the NextJS app.
  **Optionally (if you have time):**

- User should have an attribute that describes its relationship to other users (think friends)
- The profile page shows a list of their friends. Each friend can be clicked on to take the user to that profile.

## Notes

### 1. \[data] from an API call to a NextJS API route.

The following two requirements required using API from NextJS API route

- The main page list the names of users, which **come from an API call to a NextJS API route**.
- The profile information should come from **API endpoints that are served from the NextJS app.**

I felt it would have been more idomatic nextjs to fetch these on the server using the `fetchUsers` and `fetchUserById` from `src/repository/users/index.ts` but I stuck to the requirements, which impacted me elsewhere, see notes below.

### 2. Use of client side components

When attempting to meet the requirements in [1](#1-data-from-an-api-call-to-a-nextjs-api-route) I ran into issues doing builds (`npx run build`). In retrospect I may have been able to use my `fetchUsers` api in `getStaticProps` but I instead defaulted to using client side components. This in turn broke my suspense boundaries in `src/app/page.tsx`, I left it in for reference, though actually loading screen is in component.

PROS:

- Simplest way to meet aforementioned requirements
- No need to revalidate `/`
- Avoid `code smell` of calling nextjs api from server component

CONS:

- Lost Suspense boundary/fetching which took away most of the reason I wanted to load data from `UserList` (I believe this could have been mitigated, but I moved elsewhere).
- I'm not taking advantage of any caching
- More network calls

### 3. Loading

I would have liked to have spent time to build skeletons for my components, but I burned more cycles than I would have liked figuring out how to meet requirements in [1](#1-data-from-an-api-call-to-a-nextjs-api-route). My loading states aren't good...

### 4. Dependencies

I chose to not use any component UI libraries as it is something I would confer with team on as they are generally "hefty".

When I started going down the path of using more client side components I opted to add `swr` to ease data fetching.

I added `"@faker-js/faker"` which I used to generate fake users.

All other dependencies came from my next js build

```sh
npx create-next-app@latest --use-pnpm
✔ What is your project named? … couchsurfing-exercise
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes

```

### Build output

```sh
Route (app)                              Size     First Load JS
┌ ○ /                                    769 B           119 kB
├ ○ /_not-found                          979 B           106 kB
├ ƒ /api/users                           138 B           105 kB
├ ƒ /api/users/[id]                      138 B           105 kB
└ ƒ /users/[id]                          932 B           119 kB
+ First Load JS shared by all            105 kB
  ├ chunks/59-ebb7f81c43febb4d.js        50.4 kB
  ├ chunks/aec749e8-d5c8514aeb420e6e.js  53 kB
  └ other shared chunks (total)          1.9 kB
```

## App Details

### Data

I created a set of fake data for use which can be found at `src/seed`.
Friends are denormalized with redundant data to ease fetching with no db. In relational db I would use a join, in NoSQL I probably would de-normalize in this way unless it was determined name consistency was a priority.

```ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  short: string;
  bio: string;
  avatar: string;
  friends: { id: number; firstName: string; lastName: string }[];
}
```

### Landing Page

A list of 10 users are listed, for selection a a "friend". The page always starts with first 10 users in data set, but a user can hit the "Find more" button to get 10 new random "friends" to pick from.

### User Details Page

Additional information is provided about the user. If the user has friends, they can be linked to from bottom.

### APIs

The APIs can use some love as well.

### Strture

```sh
├── app
│   ├── api # api routes
│   │   └── users
│   │       ├── [id]
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── error.tsx # a simple error boundary
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx # landing page
│   └── users
│       └── [id]
│           └── page.tsx # /users/:id - user details
├── components
│   └── users
│       ├── user-details.tsx
│       ├── user-list-item.tsx
│       └── user-list.tsx
├── entities # this is my domain/entites, just a definition of a user
│   └── user.ts
├── repository # this is my data access, it kind of skirts boundary of service/repo but I just combined for small project
│   └── users
│       └── index.ts
└── seed # this was tooling, and initial commit of people, I might have benefited from moving people.json to repo or /data or the like
    ├── index.js
    └── people.json

```
