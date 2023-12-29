const CreateAlert = async (id, stock, reference, bookName) =>{
    const message = `A new stock of Book - ${bookName} is added to library`;
    const user =  localStorage.getItem('user-id');
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/alert/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, book: id.toString(), stock, reference, message }),
        });
        const json = await response.json();
        console.log(json)

    } catch (error) {
        console.log(error.message)
    }

}
export default CreateAlert;