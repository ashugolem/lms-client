 const CreateFine = async (finePerDay, deadline) => {
    const response = await fetch(`${import.meta.env.VITE_HOST}/fine/${localStorage.getItem('user-id')}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ finePerDay, deadline })
    });
    const json = await response.json();
    return json;
}

export default CreateFine;