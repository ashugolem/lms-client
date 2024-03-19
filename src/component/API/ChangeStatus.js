const ChangeStatus = async (status, id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/request/${id.toString()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status }),
        });
        const json = await response.json();
        return json;

    } catch (error) {
        console.log(error.message)
    }
}
export default ChangeStatus;