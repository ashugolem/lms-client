import Decode from "../../JWT/Decode";

const ActivationRequest = async (role) =>{
    const response = await fetch(`${import.meta.env.VITE_HOST}/activation-request`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({  user: Decode().user.id , type: role}),
    });
    const json = await response.json();
    if (json.success) {
        return true
    }
}
export default ActivationRequest;