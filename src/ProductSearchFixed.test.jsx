import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { ProductSearchFixed } from "./ProductSearchFixed";

describe("ProductSearchFixed (5 Core Interview Test Cases)", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  // TEST CASE 1: Debouncing prevents intermediate requests
  it("Test 1: Debounce cancels previous timers and only triggers one fetch after typing settles", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [{ id: "1", title: "iPhone 15" }] }),
    });
    global.fetch = fetchMock;

    render(<ProductSearchFixed category="phones" />);
    const input = screen.getByLabelText(/search query/i);

    // Rapid typing without waiting for full debounce (300ms)
    fireEvent.change(input, { target: { value: "p" } });
    await new Promise((r) => setTimeout(r, 60));

    fireEvent.change(input, { target: { value: "ph" } });
    await new Promise((r) => setTimeout(r, 60));

    fireEvent.change(input, { target: { value: "pho" } });
    await new Promise((r) => setTimeout(r, 60));

    fireEvent.change(input, { target: { value: "phone" } });

    // Should not have fetched yet
    expect(fetchMock).not.toHaveBeenCalled();

    // Wait past the 300ms debounce threshold
    await waitFor(
      () => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/products?q=phone&category=phones",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );

    expect(await screen.findByText("iPhone 15")).toBeInTheDocument();
  });

  // TEST CASE 2: Category prop change cancels in-flight query and re-fetches with new category
  it("Test 2: Category prop change aborts in-flight request and queries new category", async () => {
    let capturedSignal1;

    const fetchMock = vi.fn()
      .mockImplementationOnce((url, options) => {
        capturedSignal1 = options.signal;
        // Keep this request pending
        return new Promise(() => {});
      })
      .mockImplementationOnce((url, options) => {
        return Promise.resolve({
          ok: true,
          json: async () => ({ products: [{ id: "2", title: "Sony WH-1000XM5" }] }),
        });
      });

    global.fetch = fetchMock;

    const { rerender } = render(<ProductSearchFixed category="phones" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "headphone" } });

    // Wait until the first fetch triggers
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    expect(capturedSignal1.aborted).toBe(false);

    // User switches category while first request is pending
    rerender(<ProductSearchFixed category="audio" />);

    // First request must be aborted immediately
    expect(capturedSignal1.aborted).toBe(true);

    // Wait for the second fetch to trigger and resolve
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/products?q=headphone&category=audio",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );

    expect(await screen.findByText("Sony WH-1000XM5")).toBeInTheDocument();
  });

  // TEST CASE 3: HTTP 4xx/5xx error handling displays message instead of silent failure
  it("Test 3: Handles HTTP non-200 error (e.g. 500) and displays error message", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    });

    render(<ProductSearchFixed category="laptops" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "macbook" } });

    const errorAlert = await screen.findByRole("alert");
    expect(errorAlert).toHaveTextContent("Request failed with status 500");
  });

  // TEST CASE 4: New query clears previous error and loading state resets cleanly
  it("Test 4: Subsequent query clears previous error and shows fresh results", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: "Not found" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ products: [{ id: "9", title: "MacBook Pro" }] }),
      });

    global.fetch = fetchMock;

    render(<ProductSearchFixed category="laptops" />);
    const input = screen.getByLabelText(/search query/i);

    // First query fails
    fireEvent.change(input, { target: { value: "broken" } });
    expect(await screen.findByRole("alert")).toBeInTheDocument();

    // Next query immediately clears error even before response arrives
    fireEvent.change(input, { target: { value: "macbook" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    expect(await screen.findByText("MacBook Pro")).toBeInTheDocument();
  });

  // TEST CASE 5: Unmount during pending request cleans up timer and aborts request cleanly
  it("Test 5: Unmounting cancels pending timer and aborts active fetch without memory leaks", async () => {
    let capturedSignal;
    global.fetch = vi.fn().mockImplementation((url, options) => {
      capturedSignal = options.signal;
      return new Promise(() => {});
    });

    const { unmount } = render(<ProductSearchFixed category="phones" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "pixel" } });

    await waitFor(() => {
      expect(fetchMockOrSignal()).toBeTruthy();
    });

    function fetchMockOrSignal() {
      return capturedSignal;
    }

    expect(capturedSignal.aborted).toBe(false);

    unmount();

    expect(capturedSignal.aborted).toBe(true);
  });
});
