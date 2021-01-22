import axios from "axios";

const baseUrl = "http://localhost:3001/connect";

const authLogin = async ({username, password}) => {
    const auth = await axios.post(baseUrl + "/login", {"username": username, "password": password});
    return auth.data;
}

const signup = async({username, password, annoUsername, annoPassword, name, ptype, semester, branch, email}) => {
    const userInfo = await axios.post(baseUrl + "/signup",
     {"username": username,
      "passwordUser": password,
      "passwordAnnoUser": annoPassword,
      "annoUser": annoUsername,
      "name": name, "ProgrammeType": ptype, "branch": branch, "semester": semester, "email": email});
      console.log(userInfo.data);
      return userInfo.data;
}

const RetreiveInfo = async() => {
    const info = await axios.get(baseUrl + "/info");
    return info.data;
}

const search = async ({ query }) => {
    if (query.id) {
        const user = await axios.get(baseUrl + "/search", {params: { "id": query.id }});
        return user.data;
    } else if (query.username) {
        const user = await axios.get(baseUrl + "/search", {params: { "username": query.username }});
        return user.data;
    }
}

const leaderboard = async () => {
    const users = await axios.get(baseUrl + "/leaderboard");
    return users.data;
}

export {
    authLogin,
    signup,
    RetreiveInfo,
    search,
    leaderboard
}