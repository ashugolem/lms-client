const CreateRequest = async (user, book) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/request/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user: user.toString(), book: book.toString(), type:"Lent"})
        });
        const json = await response.json();
        return json;

    } catch (error) {
        console.log(error.message)
    }
}
export default CreateRequest;