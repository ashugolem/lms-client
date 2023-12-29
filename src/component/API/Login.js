const LoginApi = async (auth) => {
    const response = await fetch(`${import.meta.env.VITE_HOST}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...auth }),
      });
      const json = await response.json();
      return json
}

export default LoginApi;