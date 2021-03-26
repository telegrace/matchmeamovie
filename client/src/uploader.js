import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            imageUrl: "",
            file: null,
        };
        this.handleUploadClick = this.handleUploadClick.bind(this);
        // console.log("props in Uploader: ", props);
    }

    componentDidMount() {
        //console.log("uploader mounted!");
    }

    methodInAppImage(imageUrl) {
        // console.log('running method in uploader');
        this.props.methodInAppImage(imageUrl);
    }

    handleUploadClick() {
        const formData = new FormData();
        formData.append("file", this.state.file);
        console.log(this.props.imageUrl);
        // if (this.props.imageUrl !== "default.png") {
        //     axios.post("/delete-profile-pic", { file: this.props.imageUrl });
        // }
        axios
            .post("/upload", formData, this.state)
            .then(({ data }) => {
                if (data) {
                    //passing props here
                    this.methodInAppImage(data.image);
                } else {
                    console.log("data fail");
                    this.setState({
                        error: true,
                    });
                }
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
            [e.target.name]: e.target.files[0],
        });
    }
    render() {
        return (
            <div className="uploader">
                <h2>Upload a profile pic.</h2>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => this.handleChange(e)}
                />
                {this.state.error && (
                    <p className="error">Something went wrong :( </p>
                )}

                <button onClick={() => this.handleUploadClick()}>UPLOAD</button>
            </div>
        );
    }
}
