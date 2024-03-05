const GetFineApi = async () => {
    const response = await fetch(`${import.meta.env.VITE_HOST}/fine/`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let json = await response.json();
    if(json.fine){
        return json;
    }
    else{
        return { fine: { finePerDay: 0, deadline: 0 } }
    }
}

export default GetFineApi;