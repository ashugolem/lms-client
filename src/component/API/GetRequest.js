const GetRequest = async (end) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/request/${end}`, {
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
export default GetRequest;