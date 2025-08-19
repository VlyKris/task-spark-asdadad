import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { Landing } from "@/pages/Landing";
import { TodoApp } from "@/pages/TodoApp";
import { ProtectedPage } from "@/lib/protected-page";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/app",
    element: (
      <ProtectedPage>
        <TodoApp />
      </ProtectedPage>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <ConvexAuthProvider client={convex}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </ConvexAuthProvider>
    </ConvexProvider>
  </React.StrictMode>
);