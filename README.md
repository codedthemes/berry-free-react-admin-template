# [React Berry Dashboard](https://appseed.us/product/react-node-js-berry-dashboard) 

**Berry** is a creative **React Dashboard** build using the Material-UI. It is meant to be the best User Experience with highly customizable feature-riched pages. It is a complete game-changer React Dashboard Template with an easy and intuitive responsive design as on retina screens or laptops. The product comes with a simple JWT authentication flow: login/register/logout. 

<br />

> Features

- Modern aesthetics UI design - Designed by [CodedThemes](https://codedthemes.com/)
- React, Redux, Redux-persist
- Authentication: JWT Login/Register/Logout
- Full-stack ready using **[Node JS API Server](https://github.com/app-generator/api-server-nodejs)** (open-source project)
  - Features: Typescript / SQLite / TypeORM / Joy (validation) / Passport library - `passport-jwt` strategy.

<br />

> Links

- [React Node JS Berry](https://appseed.us/product/react-node-js-berry-dashboard) - product page
- [React Node JS Berry](https://react-node-js-berry-dashboard.appseed-srv1.com/) - LIVE Demo
- Support via **Github** (issues tracker) and [Discord](https://appseed.us/support) - LIVE Assistance 

<br />

## Want more? Go PRO!

PRO versions include **Premium [React Kits](https://appseed.us/apps/react)**, Lifetime updates and **24/7 LIVE Support** (via [Discord](https://discord.gg/fZC6hup))

| [Fullstack React Material Dashboard](https://appseed.us/full-stack/react-material-dashboard) | [React Node JS Datta PRO](https://appseed.us/product/react-node-js-datta-able-pro) | [React Node JS Material Kit](https://appseed.us/product/react-node-js-material-kit-pro) |
| --- | --- | --- |
| [![Fullstack React Material Dashboard](https://user-images.githubusercontent.com/51070104/128878037-50da7a12-787d-455d-933a-30b2957e2896.png)](https://appseed.us/full-stack/react-material-dashboard) | [![React Node JS Datta PRO](https://user-images.githubusercontent.com/51070104/126295682-6e89cdd8-455f-4f44-bb3c-0302d02c34a2.png)](https://appseed.us/product/react-node-js-datta-able-pro) | [![React Node JS Material KIT](https://user-images.githubusercontent.com/51070104/128535389-a09c68c2-02ec-4eb9-bad9-6bafcee85b10.png)](https://appseed.us/product/react-node-js-material-kit-pro)

<br /> 

![React Nodejs Berry - Open-source full-stack seed project crafted by CodedThemes and AppSeed.](https://user-images.githubusercontent.com/51070104/124934742-aa392300-e00d-11eb-83bf-28d8b8704ec8.png)

<br >

> **Note**: This product can be used with other API Servers for a complete fullstack experience. **ALL API servers use an unified interface**

- [Django API Server](https://github.com/app-generator/api-server-django) - open-source product
- [Flask API Server](https://github.com/app-generator/api-server-flask) - open-source product
- [Node JS API Server](https://github.com/app-generator/api-server-nodejs) - open-source product / Typescript / SQLite / TypeORM / Joy for validation
- [Node JS API Server PRO](https://github.com/app-generator/api-server-nodejs-pro) - **commercial product**
    - Typescript / SQLite / TypeORM / Joy Validation / Docker
    - Typescript / MongoDB / Mongoose / Joy Validation / Docker (separate branch, same project)

<br />

## How to use it

To use the product Node JS (>= 12.x) is required and GIT to clone/download the project from the public repository.

**Step #1** - Clone the project

```bash
$ git clone https://github.com/app-generator/react-berry-dashboard.git
$ cd react-berry-dashboard
```

<br >

**Step #2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

<br />

**Step #3** - Start in development mode

```bash
$ npm run start 
// OR
$ yarn start
```

<br />

## Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register. 

**API Server URL** - `src/config/constant.js` 

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:5000/api/'  // <-- The magic line
};
```

<br />

**API Server Descriptor** - POSTMAN Collection

The API Server signature is provided by the [Unified API Definition](https://docs.appseed.us/boilerplate-code/api-unified-definition)

- [API POSTMAN Collection](https://github.com/app-generator/api-server-unified/blob/main/api.postman_collection.json) - can be used to mock (simulate) the backend server or code a new one in your preferred framework. 

<br />

## Node JS API Server

The product is also open-source and is already configured to work with Berry Dashboard Template - product features:

- Typescript / Node js / Express server
- JWT authentication (`passport-jwt` strategy)
- Persistence: SQLite 

> Links

- [Node JS API](https://github.com/app-generator/api-server-nodejs) - source code
- [Node JS API](https://appseed.us/boilerplate-code/nodejs-starter) - product page

<br />

![Node JS API - Open-source API server built on top of Express Nodejs Framework.](https://user-images.githubusercontent.com/51070104/124934824-c210a700-e00d-11eb-9d01-e05bd8bfb608.png)

<br />

### Compile the API Server

**Step #1** - Clone the project

```bash
$ git clone https://github.com/app-generator/api-server-nodejs.git
$ cd api-server-nodejs
```

**Step #2** - Install dependencies via NPM or Yarn

```bash
$ npm i
// OR
$ yarn
```

**Step #3** - Run the SQLite migration via TypeORM

```
$ yarn typeorm migration:run
```

**Step #4** - Start the API server (development mode)

```bash
$ npm dev
// OR
$ yarn dev
```

The API server will start using the `PORT` specified in `.env` file (default 5000).

<br /> 

---
[React Node JS Berry](https://appseed.us/product/react-node-js-berry-dashboard) - Provided by [CodedThemes](https://codedthemes.com/) and **AppSeed [App Generator](https://appseed.us/app-generator)**.
