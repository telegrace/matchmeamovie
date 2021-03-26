import React from "react";
import axios from "./axios";

export default class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    // componentDidMount() {
    //     axios
    //         .get("/newReleases")
    //         .then(({ data }) => {
    //             console.log("get user data, ", data.user);
    //             // this.setState({
    //             //     name: data.user.name,
    //             //     surname: data.user.surname,
    //             //     imageUrl: data.user.profile_pic,
    //             //     bio: data.user.bio_info,
    //             // });
    //         })
    //         .catch((err) => {
    //             console.log("err in axios GET /newReleases: ", err);
    //         });
    // }

    render() {
        return (
            <div id="carousel">
                <h1> carousel HI!</h1>
            </div>
        );
    }
}
