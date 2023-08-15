export const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage , 'handle error')
       return errorMessage
    } else {
      return "An error occurred."
    }
  };