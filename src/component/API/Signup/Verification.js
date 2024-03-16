import Decode from "../../JWT/Decode";

const CreateUser = async (auth, role) =>{
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
    if(role = "Teacher"){
        const responseTeacher = await fetch(`${import.meta.env.VITE_HOST}/teacher/${Decode().user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: auth.name, eid: auth.eid, designation: auth.designation, dob: auth.dob}),
        });
        const jsonTeacher = await responseTeacher.json();
        return jsonTeacher
    }

    else if(role = "Student"){
        const responseStudent = await fetch(`${import.meta.env.VITE_HOST}/student/${Decode().user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: auth.name, admissionNo: auth.admissionNo, course: auth.course, dob: auth.dob, branch: auth.branch, semester: auth.semester }),
        });
        const jsonStudent = await responseStudent.json();
        return jsonStudent;
    }
    else{
        return {
            error : "Please enter role"
        }
    }
    
}

export default CreateUser;