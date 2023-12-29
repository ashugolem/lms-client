const GetRequest = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/request/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        return json.allRequests;
        
    } catch (error) {
        console.log(error.message)
    }
}
export default GetRequest;