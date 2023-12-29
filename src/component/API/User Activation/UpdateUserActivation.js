const UpdateUserActivation = async (status, id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/activation-request/${id.toString()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isactiontaken: true }),
        });
        const json = await response.json();
        const responseUser = await fetch(`${import.meta.env.VITE_HOST}/user/${json.user}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });
        const jsonUser = await responseUser.json();
        return jsonUser

    } catch (error) {
        console.log(error.message)
    }
}
export default UpdateUserActivation;