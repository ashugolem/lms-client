const IssueBook = async (user, role, id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST}/issue/${id.toString() }`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user, role }),
        });
        const json = await response.json();
        console.log(json)

    } catch (error) {
        console.log(error.message)
    }
}
export default IssueBook;