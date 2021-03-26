import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//using hooks
export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();
    const [newestUsers, setNewestUsers] = useState();

    useEffect(function () {
        axios.get("/users/most-recent").then(({ data }) => {
            setNewestUsers(data.user);
        });
    }, []);

    useEffect(
        function () {
            axios.get("/find-user/" + searchTerm).then(({ data }) => {
                setResultUsers(data.user);
            });
        },
        [searchTerm]
    );

    // function ResultsUser({ searchTerm }) {
    //    const [resultUsers, setResultUsers] = useState();
    //     useEffect(() => {
    //         let abort;
    //         (async () => {
    //             const { data } = await axios.get("/find-user/" + searchTerm);
    //             if (!abort) {
    //                 setResultsUsers(data.user);
    //             }
    //         })();
    //         return () => {
    //             abort = true;
    //         };
    //     }, [searchTerm]);
    //     /* ... */
    // }

    function changeHandler({ target }) {
        setSearchTerm(target.value);
        //console.log(target.value);
    }

    return (
        <div className="find-people">
            <p>LOOKING FOR SOMEONE?</p>
            <input defaultValue="" onChange={changeHandler}></input>
            {newestUsers && !searchTerm && <h2>Newest Members</h2>}

            {newestUsers &&
                !searchTerm &&
                newestUsers.map(function (user) {
                    return (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.profile_pic} />
                            </Link>
                            <p>
                                {user.name}, {user.surname}
                            </p>
                        </div>
                    );
                })}
            {resultUsers && searchTerm && <h2>Results</h2>}
            {resultUsers &&
                resultUsers.map(function (user) {
                    return (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.profile_pic} />
                            </Link>
                            <p>
                                {user.name}, {user.surname}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}
