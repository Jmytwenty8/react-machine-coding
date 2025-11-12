import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./home";
import About from "./about";
import { Settings } from "lucide-react";

export default function Index() {

    const Layout = () => (
        <div className="flex items-center justify-center h-screen flex-col gap-30">
            <nav>
                <a href="/">Home</a> | {" "}
                <a href="/about">About</a> | {" "}
                <a href="/settings">Settings</a>
            </nav>
            <Outlet />
        </div>
    );

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About /> },
                { path: "settings", element: <Settings /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}