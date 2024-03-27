const getTransaction = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/request/user/${localStorage.getItem('user-id')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log(json)
        return json;

    } catch (error) {
        console.log(error.message)
    }
}
export default getTransaction;