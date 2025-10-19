import axios, { AxiosError, type AxiosInstance } from "axios";

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!rawBaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_BASE_URL environment variable. Please define it in your environment before making API requests."
  );
}

const sanitizedBaseUrl = rawBaseUrl.replace(/^@/, "").replace(/\/+$/, "");

if (!sanitizedBaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_BASE_URL resolved to an empty string after sanitization. Ensure the variable contains a valid URL."
  );
}

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(
    message: string,
    options?: { status?: number; details?: unknown; cause?: unknown }
  ) {
    super(message, { cause: options?.cause });
    this.name = "ApiError";
    this.status = options?.status;
    this.details = options?.details;
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    return normalizeAxiosError(error);
  }

  return new ApiError("Unexpected error while performing API request", {
    cause: error,
  });
};

const normalizeAxiosError = (error: AxiosError): ApiError => {
  const status = error.response?.status;
  const details = error.response?.data ?? error.toJSON?.() ?? null;
  const messageFromServer =
    (typeof details === "object" &&
      details !== null &&
      "message" in details &&
      details.message) ||
    (typeof details === "object" &&
      details !== null &&
      "error" in details &&
      details.error);

  const fallbackMessage = status
    ? `Request failed with status ${status}`
    : "Request failed";

  const message =
    typeof messageFromServer === "string" && messageFromServer.trim().length > 0
      ? messageFromServer
      : fallbackMessage;

  return new ApiError(message, {
    status,
    details,
    cause: error,
  });
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: sanitizedBaseUrl,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error))
);
