import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import FormFill from './components/FormFill';
import ListData from './components/ListData';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div><App />Error 404: <br /> Page not found</div>,
    children: [
      {
        path: "form",
        element: <FormFill />
      },
      {
        path: "listdata",
        element: <ListData />
      },
      {
        path: "signup",
        element: <SignUp/>
      },
      {
        path: "signin",
        element: <SignIn/>
      },
      {
        path: "signout",
        element: <SignOut/>
      },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
