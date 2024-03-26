const ChangePasswordAPI = async (password) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/user/change-password/${localStorage.getItem("user-id")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({ password })
        });
        const json = await response.json();
        return json;

    } catch (error) {
        console.log("Error - ", error.message)
    }
}
export default ChangePasswordAPI;