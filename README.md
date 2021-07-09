# [React Nodejs Berry](https://appseed.us/product/react-node-js-berry-dashboard) 

**Berry** is a creative free **React Dashboard** build using the Material-UI. It is meant to be the best User Experience with highly customizable feature-riched pages. It is a complete game-changer React Dashboard Template with easy and intuitive responsive design as on retina screens or laptops. The product comes with a simple JWT authentication flow: login/register/logout. 

<br />

> Features

- Modern aesthetics UI design - Designed by [CodedThemes](https://codedthemes.com/)
- Material-UI components
- React, Redux, Redux-persist
- Authentication: JWT Login/Register/Logout
- (Optional) - can be used with a [Node JS API server](https://github.com/app-generator/api-server-nodejs) for a complete full-stack experience 

<br />

> Links

- [React Nodejs Berry](https://appseed.us/product/react-node-js-berry-dashboard) - product page
- [React Nodejs Berry](https://react-node-js-berry-dashboard.appseed-srv1.com/) - LIVE Demo (UI only)
- [Node JS API](https://github.com/app-generator/api-server-nodejs) - the backend server 
- Support via **Github** (issues tracker) and [Discord](https://appseed.us/support) - LIVE Assistance 

<br >

![React Nodejs Berry - Open-source full-stack seed project crafted by CodedThemes and AppSeed.](https://user-images.githubusercontent.com/51070104/124934742-aa392300-e00d-11eb-83bf-28d8b8704ec8.png)

<br />

## How to use it

To use the product Node JS (>= 12.x) is required and GIT to clone/download the project from the public repository.

**Step #1** - Clone the project

```bash
$ git clone https://github.com/app-generator/react-berry-admin-template.git
$ cd react-berry-admin-template
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

**API Server URL** - `src/config.js` 

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:5000/api/'  // <-- The magic line
};
```

<br />

**API Server Descriptor** - POSTMAN Collection

The API Server definition is provided by the [Nodejs API Server](https://github.com/app-generator/api-server-nodejs)

- [API POSTMAN Collection](https://github.com/app-generator/api-server-nodejs/blob/master/media/api.postman_collection.json) - can be used to mock (simulate) the backend server or code a new one in your preferred framework. 

<br />

## Node JS API Server

The product is also open-source and cis already configured to work with Berry Dashboard Template - product features:

- Nodejs / Express server
- JWT authentication (`passport-jwt` strategy)
- Persistence: MongoDB 

> Links

- [Node JS API](https://github.com/app-generator/api-server-nodejs) - source code
- [Node JS API](https://appseed.us/boilerplate-code) - product page

<br />

![Node JS API - Open-source API server built on top of Express Nodejs Framework.](https://user-images.githubusercontent.com/51070104/124934824-c210a700-e00d-11eb-9d01-e05bd8bfb608.png)

<br />

---
[React Nodejs Berry](https://appseed.us/product/react-node-js-berry-dashboard) - Provided by [CodedThemes](https://codedthemes.com/) and **AppSeed [App Generator](https://appseed.us/app-generator)**.
