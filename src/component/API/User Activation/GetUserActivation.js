const AllActivationRequests = async (end) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/activation-request/${end}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        return json;

    } catch (error) {
        console.log(error.message)
    }
}
export default AllActivationRequests; 

