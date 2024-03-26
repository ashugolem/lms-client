const AddUserForAdmin = async (user) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/user/admin-create-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({...user, password: "123456", status: "Approved"})
        });
        const json = await response.json();        
        return json;

    } catch (error) {
        console.log("Error - ", error.message)
    }
}
export default AddUserForAdmin;