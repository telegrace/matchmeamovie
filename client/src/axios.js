import axios from "axios";
//every request is given mytoken
var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token",
});

export default instance;

//https://spiced.space/fennel/axios_csrf/
