import { Component, useCallback } from "react";
import axios from "./axios";
import MovieButton from "./movieButton";

export default class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xStart: 0,
            xEnd: 0,
            left: false,
            right: false,
        };
        this.swipeStart = this.swipeStart.bind(this);
        this.swipeEnd = this.swipeEnd.bind(this);
    }
    //IF START - END = NEGATIVE NUMBER (F) => RIGHT
    //IF START - END = POSITIVE NUMBER (T)=> LEFT

    componentDidMount() {
        console.log(
            "Props: ",
            this.props.match.params.media_type,
            this.props.match.params.id
        );
        axios
            .get(
                `/api/movie-info/${this.props.match.params.media_type}/${this.props.match.params.id}`
            )
            .then(({ data }) => {
                this.setState({
                    title: data.movie_data.title,
                    image: `https://image.tmdb.org/t/p/w200${data.movie_data.poster_path}`,
                    overview: data.movie_data.overview,
                    language: data.movie_data.original_language,
                    vote_average: data.movie_data.vote_average,
                    //want original_language, title, vote_average, poster_path, overview
                });
                console.log(this.state);
            });
    }

    swipeStart(event) {
        if (event._reactName == "onDragStart") {
            // console.log("onDragStart", event.screenX);
            this.setState({ xStart: event.screenX });
        } else {
            this.setState({ xStart: event.targetTouches[0].clientX });

            // console.log("TOUCH START", event.targetTouches[0].clientX);
        }
    }

    swipeEnd(event) {
        if (event._reactName == "onDragEnd") {
            this.setState({ xEnd: event.screenX }, () => {
                console.log(this.state.xEnd, "GRACE");
                if (this.state.xStart - this.state.xEnd > 0) {
                    this.setState({ right: false });
                    this.setState({ left: true });
                } else {
                    this.setState({ left: false });
                    this.setState({ right: true });
                }
            });
        } else {
            this.setState({ xEnd: event.changedTouches[0].clientX }, () => {
                console.log(this.state.xEnd, "GRACE");
                if (this.state.xStart - this.state.xEnd > 0) {
                    this.setState({ right: false });
                    this.setState({ left: true });
                } else {
                    this.setState({ left: false });
                    this.setState({ right: true });
                }
            });
        }
    }

    render() {
        return (
            <div className="movie-info">
                {this.state.left && !this.state.right && <h3>LEFT</h3>}
                {this.state.right && !this.state.left && <h3>RIGHT</h3>}

                <h2>{this.state.title}</h2>
                <img
                    src={this.state.image}
                    alt={this.state.title}
                    onTouchStart={this.swipeStart}
                    onDragStart={this.swipeStart}
                    onTouchEnd={this.swipeEnd}
                    onDragEnd={this.swipeEnd}
                />
                <p>{this.state.overview}</p>
                <div id="movie-info-lan-vote-box">
                    <div id="language">
                        Original Language: {this.state.language}
                    </div>
                    <div id="vote-average">
                        Vote Average: {this.state.vote_average}
                    </div>
                </div>
            </div>
        );
    }
}
