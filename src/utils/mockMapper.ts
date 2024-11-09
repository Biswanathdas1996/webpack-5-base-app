import { mockFileMapping } from "../apiConfig/configureMockData";

interface MockFileMapping {
  url: string;
  method: string;
  mockFile: any;
}

export const mockResponse = (url: string, method: string): any | null => {
  console.log("_____RESPONSE_FROM_MOCK_____");
  const file = mockFileMapping?.find(
    (data: MockFileMapping) => data?.url === url && data?.method === method
  );
  if (file?.mockFile) {
    return file?.mockFile;
  } else {
    console.log("____Mock file not found___");
    return null;
  }
};
