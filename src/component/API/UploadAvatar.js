import axios from "axios";

const UploadAvatarAPI = async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_HOST}/user/upload-avatar/${localStorage.getItem('user-id')}`,
        formData,
        {
            headers: {"Content-Type": "multipart/form-data"}
        },
    );
    return response
}

export default UploadAvatarAPI;