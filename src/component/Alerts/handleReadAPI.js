const handleRead = async (setModalVisible, _id) => {
    try {
        setModalVisible(true);
        const response = await fetch(`${import.meta.env.VITE_HOST}/request/${_id.toString()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ seen: true }),
        });
        const json = await response.json();
        return json
    } catch (error) {
        console.log(error.message)
    }
}
export default handleRead;