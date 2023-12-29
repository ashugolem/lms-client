const GetAlert = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/alert/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        return json.allAlert;

    } catch (error) {
        console.log(error.message)
    }
}
export default GetAlert;