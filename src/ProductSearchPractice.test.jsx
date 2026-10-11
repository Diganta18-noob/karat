import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { ProductSearchPractice } from "./ProductSearchPractice";

describe("ProductSearchPractice (Test Your Own Implementation)", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("Test 1: Debounce cancels previous timers and only triggers one fetch after typing settles", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [{ id: "1", title: "iPhone 15" }] }),
    });
    global.fetch = fetchMock;

    render(<ProductSearchPractice category="phones" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "p" } });
    await new Promise((r) => setTimeout(r, 60));
    fireEvent.change(input, { target: { value: "ph" } });
    await new Promise((r) => setTimeout(r, 60));
    fireEvent.change(input, { target: { value: "phone" } });

    expect(fetchMock).not.toHaveBeenCalled();

    await waitFor(
      () => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );

    expect(await screen.findByText("iPhone 15")).toBeInTheDocument();
  });

  it("Test 2: Category prop change aborts in-flight request and queries new category", async () => {
    let capturedSignal1;
    const fetchMock = vi.fn()
      .mockImplementationOnce((url, options) => {
        capturedSignal1 = options.signal;
        return new Promise(() => {});
      })
      .mockImplementationOnce((url, options) => {
        return Promise.resolve({
          ok: true,
          json: async () => ({ products: [{ id: "2", title: "Sony WH-1000XM5" }] }),
        });
      });

    global.fetch = fetchMock;

    const { rerender } = render(<ProductSearchPractice category="phones" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "headphone" } });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    expect(capturedSignal1.aborted).toBe(false);

    rerender(<ProductSearchPractice category="audio" />);

    expect(capturedSignal1.aborted).toBe(true);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByText("Sony WH-1000XM5")).toBeInTheDocument();
  });

  it("Test 3: Handles HTTP non-200 error (e.g. 500) and displays error message", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    });

    render(<ProductSearchPractice category="laptops" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "macbook" } });

    const errorAlert = await screen.findByRole("alert");
    expect(errorAlert).toBeInTheDocument();
  });

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

    render(<ProductSearchPractice category="laptops" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "broken" } });
    expect(await screen.findByRole("alert")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "macbook" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    expect(await screen.findByText("MacBook Pro")).toBeInTheDocument();
  });

  it("Test 5: Unmounting cancels pending timer and aborts active fetch without memory leaks", async () => {
    let capturedSignal;
    global.fetch = vi.fn().mockImplementation((url, options) => {
      capturedSignal = options.signal;
      return new Promise(() => {});
    });

    const { unmount } = render(<ProductSearchPractice category="phones" />);
    const input = screen.getByLabelText(/search query/i);

    fireEvent.change(input, { target: { value: "pixel" } });

    await waitFor(() => {
      expect(capturedSignal).toBeDefined();
    });

    expect(capturedSignal.aborted).toBe(false);

    unmount();

    expect(capturedSignal.aborted).toBe(true);
  });
});
