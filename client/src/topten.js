import React from "react";
import axios from "./axios";

export default class TopTen extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    componentDidMount() {
        axios
            .get("/getTopTenList")
            .then(({ data }) => {
                console.log("get user data, ", data);
                // this.setState({
                //     name: data.user.name,
                //     surname: data.user.surname,
                //     imageUrl: data.user.profile_pic,
                //     bio: data.user.bio_info,
                // });
            })
            .catch((err) => {
                console.log("err in axios GET /newReleases: ", err);
            });
    }

    render() {
        return (
            <div id="top-ten">
                <h1> top-ten HI!</h1>
            </div>
        );
    }
}
