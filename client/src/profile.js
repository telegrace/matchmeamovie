import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

//The Profile component will contain two other components: the existing ProfilePic component, a new BioEditor component
//Follow uploader
//shows bio o

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioEditorIsVisible: false,
        };
        console.log("props in Profile: ", this.props);
    }

    componentDidMount() {
        console.log("Profile mounted!");
        // get axios to get bio info< -- no this can be passed down from the parent
    }

    methodInAppBio(draftBio) {
        this.props.methodInAppBio(draftBio);
    }

    handleEdit() {
        console.log("handleEdit");
        //this should be toggling
    }

    toggleBioEditor() {
        this.setState({
            bioEditorIsVisible: !this.state.bioEditorIsVisible,
        });
    }

    render() {
        return (
            <div id="profile">
                <h2>
                    Hi {this.props.name}, {this.props.surname}
                </h2>
                <ProfilePic
                    imageUrl={this.props.imageUrl}
                    toggleUploader={() => this.props.toggleUploader()}
                />

                <h3>{this.props.bio}</h3>
                {this.props.bio && !this.state.bioEditorIsVisible && (
                    <button onClick={() => this.toggleBioEditor()}>EDIT</button>
                )}
                {!this.props.bio && !this.state.bioEditorIsVisible && (
                    <div>
                        <h2>Add your bio.</h2>
                        <button onClick={() => this.toggleBioEditor()}>
                            ADD
                        </button>
                    </div>
                )}
                {this.state.bioEditorIsVisible && (
                    <BioEditor
                        methodInAppBio={(draftBio) =>
                            this.methodInAppBio(draftBio)
                        }
                        bio={this.props.bio}
                        toggleBioEditor={() => this.toggleBioEditor()}
                    />
                )}
                {this.state.bioEditorIsVisible && (
                    <button onClick={() => this.toggleBioEditor()}>
                        CLOSE
                    </button>
                )}
            </div>
        );
    }
}

//use if block
