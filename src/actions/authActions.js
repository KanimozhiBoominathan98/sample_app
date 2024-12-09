export const loginRequest = () => ({
    type: 'LOGIN_REQUEST',
  });
  
  export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  // Thunk action for async login
  export const login = (email, password) => {
    return async (dispatch) => {
      dispatch(loginRequest());
      try {
        // Replace this with your API request to login
        const response = await fakeLoginApi(email, password);
        dispatch(loginSuccess(response.user));
      } catch (error) {
        dispatch(loginFailure('Invalid credentials'));
      }
    };
  };
  
  // Fake API function for demonstration purposes
  const fakeLoginApi = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@domain.com' && password === 'password123') {
          resolve({ user: { name: 'John Doe', email } });
        } else {
          reject('Invalid credentials');
        }
      }, 1000);
    });
  };
  