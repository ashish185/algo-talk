1. Setup command
```js
npx create-react-app .
npm start
```
2. packages:
```js
    "bootstrap": "^5.3.1",
    "codemirror": "^5.65.15",
    "react": "^18.2.0",
    "react-avatar": "^5.0.3",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "socket.io-client": "^4.7.2",
    "uuid": "^9.0.0",
```
3. Setup the router
```html
    1. <BrowserRouter><App><BrowserRouter>
    2. <Routes><Route path='/' element={<HomePage/> }> : Mistake I called HomePage directly not like <HomePage/>

```
4. Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

5. In server package.json why are we using nodemon?
Ans: Nodemon helps to run js file continuosly for continuous changes.

6. .env file is created
Ans:REACT_APP_SERVER_URL, it should start with REACT_APP. when this is changed you need to restart server


