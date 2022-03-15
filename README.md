# Kirayo
The purpose of the project is to provide a platform for the masses to exchange their
products on a rental basis. They can rent out the useless stuff to earn some extra cash
and can also rent the things they need for temporary use to save some more money.

We provide a web application for this purpose which serves both kinds of people i.e.
renter and rentee. There will be a single interface that will tackle both sides of the
application according to the user’s choice.

## Motivation
The thinking behind this idea comes from the mind of a typical middle-class man. As we
know very well Pakistanis have a relatively low purchasing power parity as inhabitants of
a third-world country. Investing money on products that are only needed temporarily is
not economically beneficial. Renting items, from bungalows to vehicles, is always a way
to avoid these types of troubles. But in this digital age, there is a lack of such platforms
which provide one and all items for rent.

## Scope
The emphasis of the project is to make a culture of renting nontraditional and
unconventional things. This will provide a SPA that has features like registration with or
without Google (Gmail), email verification, login, searching, exploring and browsing
different categories and most importantly the mechanism to upload an ad of their things
and on the other hand reserve things of other users to take them on rent. Email
notification is also available to both users i.e. the one who took an item on rent and the
one whose item is reserved. Presently, we are just connecting two users via our
platform.

---
## Tech Stack
MongoDB | an open-source NoSQL database.

Express | a JS backend web framework.

React | a JS frontend library.

Node.js | a JS runtime environment.

Material-UI | a React component library by Google based on its Material design system.

JWT | JSON web tokens used for authorization.

Jade | a Node.js default template engine for Express used for Forget password feature.

Axios | a JS library for making HTTP requests.

SendGrid | an email delivery service that provides Email API.

And more …

## Setup

Clone the project

```bash
  git clone https://github.com/Sumair2000/Kirayo
```

Install npm packages in root folder

```bash
  npm install
```

Go to the frontend directory

```bash
  cd frontend
  npm install
```

### Setting environmental variable

Create a file ```.env``` in root directory and initialize all the variables

```
PORT=5000
JWT_SECRET=
MONGO_LOCAL_CONN_URL=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

SENDGRID_API_KEY=
FROM_EMAIL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SECRET=

```

Finally you are good to go by running the following command in a root directory

```bash
  npm run dev
```

