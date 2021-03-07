import axios from "axios";
import { SERVER_URL } from "./config";

const baseUrl = `${SERVER_URL}/connect`;

const authLogin = async ({ username, password }) => {
    const auth = await axios.post(baseUrl + "/login", { "username": username, "password": password });
    return auth.data;
}

const signup = async ({ username, password, email }) => {
    const userInfo = await axios.post(baseUrl + "/signup",
        {
            "username": username,
            "passwordUser": password,
            "email": email
        });
    return userInfo.data;
}

const annoSignup = async ({ username, password }) => {
    if (localStorage.getItem("accessToken") === null) {
        return null;
    }
    const userInfo = await axios.post(baseUrl + "/createAnnoUser",
        {
            "username": username,
            "passwordUser": password
        }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    return userInfo.data;
}

const RetreiveInfo = async () => {
    const info = await axios.get(baseUrl + "/info");
    return info.data;
}

const search = async ({ query }) => {
    if (query.id) {
        const user = await axios.get(baseUrl + "/search", { params: { "id": query.id } });
        return user.data;
    } else if (query.username) {
        const user = await axios.get(baseUrl + "/search", { params: { "username": query.username } });
        return user.data;
    }
}

const leaderboard = async () => {
    const users = await axios.get(baseUrl + "/leaderboard");
    return users.data;
}

const updateProfile = async ({ email, name, ptype, branch, semester }) => {
    if (localStorage.getItem("accessToken") === null) {
        return null;
    }
    const response = await axios.post(baseUrl + "/updateProfile", {
        "email": email,
        "name": name,
        "ptype": ptype,
        "branch": branch,
        "semester": semester
    }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
    return response;
}

export {
    authLogin,
    signup,
    annoSignup,
    RetreiveInfo,
    search,
    leaderboard,
    updateProfile
}