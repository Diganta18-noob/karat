// Simulated in-memory product database
const CATALOG = [
  { id: "p1", title: "Apple iPhone 15 Pro", category: "phones" },
  { id: "p2", title: "Samsung Galaxy S24 Ultra", category: "phones" },
  { id: "p3", title: "Google Pixel 8", category: "phones" },
  { id: "p4", title: "OnePlus 12", category: "phones" },
  { id: "p5", title: "Sony WH-1000XM5 Headphones", category: "audio" },
  { id: "p6", title: "Apple AirPods Pro 2", category: "audio" },
  { id: "p7", title: "Bose QuietComfort Ultra", category: "audio" },
  { id: "p8", title: "Dell XPS 15 Laptop", category: "laptops" },
  { id: "p9", title: "Apple MacBook Pro 16", category: "laptops" },
  { id: "p10", title: "Lenovo ThinkPad X1 Carbon", category: "laptops" },
  { id: "p11", title: "Logitech MX Master 3S Mouse", category: "accessories" },
  { id: "p12", title: "Keychron Q1 Pro Mechanical Keyboard", category: "accessories" },
];

export const mockFetchConfig = {
  latencyMs: 350,
  shouldFail: false,
  failureStatus: 500,
  failureMessage: "Internal Server Error (Simulated 500)",
  // When true, we simulate race condition by delaying responses matching certain queries
  artificialDelays: {},
};

export const requestLog = [];

export function clearRequestLog() {
  requestLog.length = 0;
}

/**
 * Intercepts `fetch` calls to /api/products and simulates latency, abort signal, and error states.
 */
export function setupMockFetch() {
  const originalFetch = window.fetch;

  window.fetch = async (url, options = {}) => {
    const urlObj = new URL(url, window.location.origin);

    if (urlObj.pathname !== "/api/products") {
      return originalFetch(url, options);
    }

    const q = (urlObj.searchParams.get("q") || "").toLowerCase().trim();
    const category = (urlObj.searchParams.get("category") || "").toLowerCase().trim();
    const signal = options?.signal;

    const logEntry = {
      id: Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
      q,
      category,
      status: "pending",
    };
    requestLog.push(logEntry);

    const extraDelay = mockFetchConfig.artificialDelays[q] ?? 0;
    const totalLatency = mockFetchConfig.latencyMs + extraDelay;

    return new Promise((resolve, reject) => {
      let timerId;

      const onAbort = () => {
        clearTimeout(timerId);
        logEntry.status = "aborted";
        const abortError = new DOMException("The user aborted a request.", "AbortError");
        reject(abortError);
      };

      if (signal?.aborted) {
        onAbort();
        return;
      }

      signal?.addEventListener("abort", onAbort);

      timerId = setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);

        if (mockFetchConfig.shouldFail) {
          logEntry.status = `error ${mockFetchConfig.failureStatus}`;
          resolve({
            ok: false,
            status: mockFetchConfig.failureStatus,
            statusText: mockFetchConfig.failureMessage,
            json: async () => ({ error: mockFetchConfig.failureMessage }),
          });
          return;
        }

        const filtered = CATALOG.filter((p) => {
          const matchesCategory = !category || p.category.toLowerCase() === category;
          const matchesQuery = !q || p.title.toLowerCase().includes(q);
          return matchesCategory && matchesQuery;
        });

        logEntry.status = "completed";
        logEntry.resultsCount = filtered.length;

        resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          json: async () => ({ products: filtered }),
        });
      }, totalLatency);
    });
  };

  return () => {
    window.fetch = originalFetch;
  };
}
