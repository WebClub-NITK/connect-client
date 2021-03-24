import axios from "axios";
import { SERVER_URL } from "./config";

const baseUrl = `${SERVER_URL}/connect`;

const authLogin = async ({ username, password }) => {
    try {
        const auth = await axios.post(baseUrl + "/login", { "username": username, "password": password });
        return auth.data;
    } catch (e) {
        if (e.response) {
            return e.response.data;
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const signup = async ({ username, password, email }) => {
    try {
        const userInfo = await axios.post(baseUrl + "/signup",
            {
                "username": username,
                "passwordUser": password,
                "email": email
            });
        return userInfo.data;
    } catch (e) {
        if (e.response) {
            return e.response.data;
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const annoSignup = async ({ username, password }) => {
    if (localStorage.getItem("accessToken") === null) {
        return null;
    }
    try {
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
    } catch (e) {
        if (e.response) {
            return e.response.data;
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const RetreiveInfo = async () => {
    const info = await axios.get(baseUrl + "/info");
    return info.data;
}

const search = async ({ query }) => {
    try {
        if (query.id) {
            const user = await axios.get(baseUrl + "/search", { params: { "id": query.id } });
            return user.data;
        } else if (query.username) {
            const user = await axios.get(baseUrl + "/search", { params: { "username": query.username } });
            return user.data;
        }
    } catch(e) {
        if (e.response) {
            return e.response.data;
        }
        return "Encountered an exception! Please try again after sometime!";
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
    try {
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
    } catch(e) {
        if (e.response) {
            return e.response.data;
        }
        return "Encountered an exception! Please try again after sometime!";
    }
}

const updatepass = async({password,token}) => {
    console.log(token,password)
    axios.post(baseUrl + "/updatepass",{"password": password,"token": token});
}

const forgotpass = async({username}) => {
    return axios.post(baseUrl + "/forgotpass",{"username":username});
}

export {
    authLogin,
    signup,
    annoSignup,
    RetreiveInfo,
    search,
    leaderboard,
    updateProfile,
    updatepass,
    forgotpass
}