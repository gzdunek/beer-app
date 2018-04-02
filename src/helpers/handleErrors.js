const handleErrors = response =>
  (response.ok ? response : response.json().then(err => Promise.reject(err)));

export default handleErrors;
