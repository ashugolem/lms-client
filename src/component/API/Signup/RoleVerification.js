const CreateRoleBasedUser = async (auth, role, id) => {
    if (role === "Teacher") {
        const responseTeacher = await fetch(`${import.meta.env.VITE_HOST}/teacher/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: auth.name, eid: auth.eid, designation: auth.designation, dob: auth.dob }),
        });
        const jsonTeacher = await responseTeacher.json();
        return jsonTeacher
    }

    else if (role === "Student") {
        const responseStudent = await fetch(`${import.meta.env.VITE_HOST}/student/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: auth.name, admissionNo: auth.admissionNo, course: auth.course, branch: auth.branch, semester: auth.semester }),
        });
        const jsonStudent = await responseStudent.json();
        console.log(jsonStudent)
        return jsonStudent;
    }
    else {
        return {
            error: "Please enter role"
        }
    }

}

export default CreateRoleBasedUser;