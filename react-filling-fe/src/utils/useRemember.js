// Utility function to set the remember me status and username
export const setRememberMeData = (status, username) => {
  localStorage.setItem('rememberMeStatus', status ? 'true' : 'false');
  localStorage.setItem('username', username);
};

// Utility function to get the remember me status and username
export const getRememberMeData = () => {
  const rememberMeStatus = localStorage.getItem('rememberMeStatus');
  const username = localStorage.getItem('username');
  return {
    rememberMeStatus: rememberMeStatus === 'true',
    username: username || '',
  };
};

// Utility function to clear the remember me status and username
export const clearRememberMeData = () => {
  localStorage.removeItem('rememberMeStatus');
  localStorage.removeItem('username');
};