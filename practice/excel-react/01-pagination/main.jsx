import React, { Component, lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../style.css";
function RequestError() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const showError = (event) => setMessage(event.reason?.message || event.message || "Request failed. Check the browser Console.");
    window.addEventListener("unhandledrejection", showError);
    window.addEventListener("error", showError);
    return () => {
      window.removeEventListener("unhandledrejection", showError);
      window.removeEventListener("error", showError);
    };
  }, []);
  return message ? <pre role="alert">Error: {message}{"\n"}Check App.jsx and the browser Console (F12).</pre> : null;
}
class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return <pre>{this.state.error.message}{"\n"}Repair App.jsx, save, and reload.</pre>;
    return this.props.children;
  }
}
const solution = new URLSearchParams(window.location.search).get("solution") === "1";
const Exercise = lazy(() => solution ? import("./Solution.jsx") : import("./App.jsx"));
createRoot(document.getElementById("root")).render(
  <main>
    <h1>Product pagination</h1>
    <p>Excel: React JS!F2 · {solution ? "Answer" : "Your practice"}</p>
    <p>Read QUESTION.md and edit App.jsx.</p>
    <nav><a href="/">Practice</a> · <a href="/?solution=1">Show answer</a></nav>
    <p>Save App.jsx to update. Press F12 → Console for logs and errors.</p>
    <RequestError />
    <hr />
    <ErrorBoundary><Suspense fallback={<p>Loading...</p>}><Exercise /></Suspense></ErrorBoundary>
  </main>
);
