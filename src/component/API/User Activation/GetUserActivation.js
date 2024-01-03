const AllActivationRequests = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/activation-request/`, {
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

