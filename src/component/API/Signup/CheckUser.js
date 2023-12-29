const CheckUser = async (auth) => {
    if (auth.password === auth.password_repeat) {
        const response = await fetch(`${import.meta.env.VITE_HOST}/user/get-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: auth.email }),
        });
        const json = await response.json();
        if(json.success){
            return 'exists'
        }
        return 'not-exists'
    }
    else {
        return 'no-match';
    }

}

export default CheckUser;