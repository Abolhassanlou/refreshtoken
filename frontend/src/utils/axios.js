api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        const expirationTime = localStorage.getItem('access_token_expiration');
        if (expirationTime) {
          const now = Date.now();
          if (now >= parseInt(expirationTime)) {
            // Token has expired, proceed with refresh
            // ... refresh token logic
          } else {
            //Token is not expired, but the original request is not retried.
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token_expiration');
            router.push('/login');
            return Promise.reject(error);
          }
        } else {
          //Expiration time not found, log out.
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('access_token_expiration');
          router.push('/login');
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );