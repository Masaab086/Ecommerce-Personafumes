export const handleAxiosResponseError = (
  err: any,
  originalMessage: boolean = false
) => {
  if (err.response && err.response.data && err.response.data) {
    return err.response.data.message;
  }
  return originalMessage ? err.message : "Something went wrong";
};
