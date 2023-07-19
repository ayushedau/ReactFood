import React, { Children, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Shimmer from "./components/Shimmer";
import Cart from "./components/Cart";
import Error from "./components/Error";
import RestrauntMenu from "./components/RestrauntMenu";
import {createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";

const InstaMart = lazy(()=>import("./components/InstaMart"));

const AppLayout = () =>(
    <Provider store={store}>
        <Header/>
        <Outlet/>
        <Footer/>
    </Provider>
);
const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<Body/>,
            },
            {
                path:"/about",
                element:<About/>,
            },
            {
                path:"/contact",
                element:<Contact/>,
            },
            {
                path:"/restraunt/:id",
                element:<RestrauntMenu/>,
            },
            {
                path:"/cart",
                element:<Cart/>,
            },
            {
                path:"/instamart",
                element:(
                    <Suspense fallback={<Shimmer />}>
                        <InstaMart/>
                    </Suspense>
                ),
            },
        ],
    },
])

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);