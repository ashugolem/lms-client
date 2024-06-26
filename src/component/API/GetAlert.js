const GetAlert = async (end) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/alert/${end}`, {
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
export default GetAlert;