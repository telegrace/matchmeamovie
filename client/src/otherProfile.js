import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friendButton";

//The first component we want to be able to replace Profile with will be a new one called OtherProfile.
//It will show the profile information of users other than the logged in user.
//Because the information it shows does not belong to the person who views it, it will not provide any way to edit anything.

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //console.log("recipient_id", this.props.match.params.id);
    }
    componentDidMount() {
        console.log("Props: ", this.props.match);
        axios
            .get("/api/user/" + this.props.match.params.id)
            .then(({ data }) => {
                if (!data.success) {
                    this.props.history.push("/");
                }
                this.setState({
                    name: data.user.name,
                    surname: data.user.surname,
                    imageUrl: data.user.profile_pic,
                    bio: data.user.bio_info,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log(
                    "err in axios get/user: " + this.props.match.params.id,
                    err
                );
            });
    }

    render() {
        return (
            <div className="other-profile">
                <img src={this.state.imageUrl} />
                <h2>
                    {this.state.name}, {this.state.surname}
                </h2>
                <h3>{this.state.bio}</h3>
                <FriendButton recipient_id={this.props.match.params.id} />
            </div>
        );
    }
}
