import axios, { AxiosResponse } from "axios";
import { BASE_URL, USE_MOCK } from "../config";
import { mockResponse } from "../utils/mockMapper";

const api = axios.create({
  baseURL: BASE_URL,
});

interface ApiResponse<T> {
  data: T;
}

const mockContext = (require as any).context(
  "../apiConfig/Mock",
  true,
  /\.ts$/
);

const getMockData = async <T>(url: string, method: string): Promise<T> => {
  const mockFile = mockResponse(url, method);
  const mockData = await mockContext(`./${mockFile}`);
  return mockData?.default as T;
};

export const get = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  if (USE_MOCK) {
    return getMockData<T>(url, "GET");
  } else {
    try {
      const response: AxiosResponse<T> = await api.get(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  if (USE_MOCK) {
    return getMockData<T>(url, "POST");
  } else {
    try {
      const response: AxiosResponse<T> = await api.post(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  if (USE_MOCK) {
    return getMockData<T>(url, "PUT");
  } else {
    try {
      const response: AxiosResponse<T> = await api.put(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
};

export const del = async <T>(url: string): Promise<T> => {
  if (USE_MOCK) {
    return getMockData<T>(url, "DELETE");
  } else {
    try {
      const response: AxiosResponse<T> = await api.delete(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
};
