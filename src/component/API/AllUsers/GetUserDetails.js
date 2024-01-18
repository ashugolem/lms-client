const AllUser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/user/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        return json.users;

    } catch (error) {
        console.log(error.message)
    }
}
export default AllUser;