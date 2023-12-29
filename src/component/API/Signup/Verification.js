import Decode from "../../JWT/Decode";

const CreateUser = async (auth) =>{
    const response = await fetch(`${import.meta.env.VITE_HOST}/user/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: auth.name, email: auth.email, phone: auth.phone, password: auth.password, role: auth.role }),
    });
    const json = await response.json();
    if (json.success) {
        localStorage.clear();
        localStorage.setItem('auth-token', json.authToken)
    }
    const responseStudent = await fetch(`${import.meta.env.VITE_HOST}/student/${Decode().user.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: auth.name, admissionNo: auth.admissionNo, course: auth.course, branch: auth.branch, semester: auth.semester }),
    });
    const jsonStudent = await responseStudent.json();
    return jsonStudent;
}

export default CreateUser;