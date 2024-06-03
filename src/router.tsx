import { createBrowserRouter } from "react-router-dom";
import NotFound from "@pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/auth/forgot-password",
    lazy: async () => ({
      Component: (await import("@pages/ForgotPassword")).default,
    }),
  },
  {
    path: "/auth/signin",
    lazy: async () => ({
      Component: (await import("@pages/LogIn")).default,
    }),
  },
  {
    path: "/auth/signup",
    lazy: async () => ({
      Component: (await import("@pages/SignUp")).default,
    }),
  },
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("@components/AppShell");
      return { Component: AppShell.default };
    },
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("@pages/Home")).default,
        }),
      },
      {
        path: "*",
        lazy: async () => ({
          Component: (await import("@pages/NotFound")).default,
        }),
      },
      {
        path: "/forbidden",
        lazy: async () => ({
          Component: (await import("@pages/Forbidden")).default,
        }),
      },
      {
        path: "ourteam",
        lazy: async () => ({
          Component: (await import("@pages/OurTeam")).default,
        }),
      },
      {
        path: "/rating/:id",
        lazy: async () => ({
          Component: (await import("@pages/RatingDosen")).default,
        }),
      },
      {
        path: "/dosens",
        lazy: async () => ({
          Component: (await import("@pages/Dosens")).default,
        }),
      },
    ],
  },
  {
    path: "/dashboard",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/Dashboard")).default,
    }),
  },
  {
    path: "/dashboard/account/:id",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/Account")).default,
    }),
  },
  {
    path: "/dashboard/kalender",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/Calendar")).default,
    }),
  },
  {
    path: "/dashboard/dosen/lihat-dosen",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/Dosen")).default,
    }),
  },
  {
    path: "/dashboard/dosen/tambah-dosen",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/TambahDosen")).default,
    }),
  },
  {
    path: "/dashboard/dosen/detail-dosen/:id",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/DetailDosen")).default,
    }),
  },
  {
    path: "/dashboard/dosen/edit-dosen/:id",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/EditDosen")).default,
    }),
  },
  {
    path: "/dashboard/manajemen-users",
    lazy: async () => ({
      Component: (await import("@pages/dashboard/Users")).default,
    }),
  },
]);

export default router;
