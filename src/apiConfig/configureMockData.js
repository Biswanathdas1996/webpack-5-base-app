export const mockResponse = (url, method) => {
  switch ((url, method)) {
    case ("/users", "GET"):
      return "user_mock.json";
    case ("/users", "POST"):
      return "user_mock.json";
    default:
    // code block
  }
};
