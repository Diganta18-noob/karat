import React, { lazy, Suspense } from "react";

// This supplied approach is correct if Dashboard has a default export.
const Dashboard = lazy(() => import("./Dashboard"));

export default function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Dashboard />
    </Suspense>
  );
}
