import { Component } from "react";
import axios from "./axios.js";

//this app to edit and save the bio

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioDraft: this.props.bio,
        };
        this.handleSaveClick = this.handleSaveClick.bind(this);
        console.log("props in BioEditor: ", props);
    }

    componentDidMount() {
        //console.log("bioEditor mounted!");
    }

    methodInAppBio(draftBio) {
        console.log("GRACE running methodInAppBio in profile");

        this.props.methodInAppBio(draftBio);
    }

    handleSaveClick() {
        console.log("GRACE handleSaveClick sending info", this.state);
        axios
            .post("/savebio", this.state)
            .then(({ data }) => {
                if (data) {
                    //passing props here
                    this.methodInAppBio(data.bio);
                } else {
                    console.log("data fail");
                    this.setState({
                        error: true,
                    });
                }
                // this.setState({
                //     imageUrl: data.image.profile_pic,
                // });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("err in axios POST /upload: ", err);
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        //console.log("this.state after setState: ", this.state);
    }
    render() {
        return (
            <div className="bio-editor">
                <h3>Edit your bio.</h3>
                <textarea
                    name="bioDraft"
                    onChange={(e) => this.handleChange(e)}
                    defaultValue={this.props.bio}
                />
                <br></br>
                <button onClick={() => this.handleSaveClick()}>SAVE</button>
            </div>
        );
    }
}

<textarea />;
