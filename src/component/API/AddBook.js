const AddBook = async (book) =>{
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/book/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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