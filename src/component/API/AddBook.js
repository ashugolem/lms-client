const AddBook = async (book) =>{
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/book/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({...book, total:book.stock}),
        });
        const json = await response.json();
        return json;

    } catch (error) {
        console.log(error.message)
    }
}

export default AddBook;