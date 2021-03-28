import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./uploader";
import Logo from "./logo";
import TopTen from "./topTen";
import OtherProfile from "./otherProfile";
import FindPeople from "./findPeople";
import FindMovies from "./findMovies";
import Friends from "./friends";
import Chat from "./chat";

//bio_info is for SQL only !

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        // console.log("App mounted");
        // when we have the info from the server, add it to the state of the component (i.e. setState)
        axios
            .get("/api/user")
            .then(({ data }) => {
                //console.log("get user data, ", data.user);
                this.setState({
                    name: data.user.name,
                    surname: data.user.surname,
                    imageUrl: data.user.profile_pic,
                    bio: data.user.bio_info,
                });
            })
            .catch((err) => {
                console.log("err in axios GET /api/user: ", err);
            });
    }

    componentDidUpdate() {
        //console.log("Component did update");
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInAppImage(uploaderArg) {
        //console.log( "methodInAppImage in App! and my argument is: ", uploaderArg);
        this.setState({
            imageUrl: uploaderArg,
        });
    }

    methodInAppBio(draftBio) {
        // console.log(
        //     "methodInAppBio running in App!!! and my argument is: ",
        //     draftBio
        // );
        this.setState({
            bio: draftBio,
        });
    }

    logout() {
        axios
            .get("/logout")
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("err in axios GET /logout: ", err);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="app">
                    <div className="topbar">
                        <Logo />
                        <ProfilePic
                            imageUrl={this.state.imageUrl}
                            toggleUploader={() => this.toggleUploader()}
                            position="right-corner"
                        />
                    </div>
                    <div id="ticker-box">
                        <TopTen />
                    </div>
                    <div className="nav-menu">
                        <Link to="/movies">FIND MOVIES</Link>
                        <br></br>
                        <Link to="/users">FIND PEOPLE</Link>
                        <br></br>
                        <Link to="/">MY PROFILE</Link>
                        <br></br>
                        <Link to="/get-friendslist/">FRIENDS</Link>
                        <br></br>
                        <Link to="/chat/">CHAT</Link>
                        <br></br>
                        <button onClick={() => this.logout()}>LOGOUT</button>
                    </div>
                    <br></br>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            toggleUploader={() => this.toggleUploader()}
                            methodInAppImage={(uploaderArg) =>
                                this.methodInAppImage(uploaderArg)
                            }
                            imageUrl={this.state.imageUrl}
                        />
                    )}
                    <div id="main-container">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    imageUrl={this.state.imageUrl}
                                    toggleUploader={() => this.toggleUploader()}
                                    name={this.state.name}
                                    surname={this.state.surname}
                                    bio={this.state.bio}
                                    methodInAppBio={(draftBio) =>
                                        this.methodInAppBio(draftBio)
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/users/"
                            render={(props) => <FindPeople />}
                        />
                        <Route path="/get-friendslist/" component={Friends} />
                        <Route path="/movies/" component={FindMovies} />

                        <Route path="/chat/" component={Chat} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
