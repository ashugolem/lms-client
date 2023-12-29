const GetStudentData = async () => {
    try {
        console.log(localStorage.getItem('user-id'))
        const response = await fetch(`${import.meta.env.VITE_HOST}/student/details/${localStorage.getItem('user-id') }`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        return json.student;

    } catch (error) {
        console.log(error.message)
    }
}
export default GetStudentData;