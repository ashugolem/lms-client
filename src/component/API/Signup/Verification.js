const CreateUser = async (auth) =>{
    const response = await fetch(`${import.meta.env.VITE_HOST}/user/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: auth.name, 
            email: auth.email, 
            phone: auth.phone, 
            password: auth.password, 
            role: auth.role, 
            admissionNo: auth.admissionNo ,
            course: auth.course,
            branch: auth.branch,
            semester: auth.semester
        }),
    });
    const json = await response.json();
    if (json.success) {
        localStorage.clear();
        localStorage.setItem('auth-token', json.authToken)
        localStorage.setItem('user-id', json.id)
    }
    return json
}

export default CreateUser;