const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.json().message);
  }
  return response;
};

export default handleErrors;
