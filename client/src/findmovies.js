// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// //using hooks
// export default function FindMovies() {
//     const [searchTerm, setSearchTerm] = useState();
//     const [resultUsers, setResultUsers] = useState();
//     const [newestUsers, setNewestUsers] = useState();

//     useEffect(function () {
//         axios.get("/api/movie").then(({ data }) => {
//             setNewestUsers(data.user);
//         });
//     }, []);

//     useEffect(
//         function () {
//             axios.get("/api/movie" + searchTerm).then(({ data }) => {
//                 setResultUsers(data.user);
//             });
//         },
//         [searchTerm]
//     );

//     // function ResultsUser({ searchTerm }) {
//     //    const [resultUsers, setResultUsers] = useState();
//     //     useEffect(() => {
//     //         let abort;
//     //         (async () => {
//     //             const { data } = await axios.get("/find-user/" + searchTerm);
//     //             if (!abort) {
//     //                 setResultsUsers(data.user);
//     //             }
//     //         })();
//     //         return () => {
//     //             abort = true;
//     //         };
//     //     }, [searchTerm]);
//     //     /* ... */
//     // }

//     function changeHandler({ target }) {
//         setSearchTerm(target.value);
//         //console.log(target.value);
//     }

//     return (
//         <div className="find-people">
//             <div className="find-people-search">
//                 What movies do you wanna see?
//                 <input defaultValue="" onChange={changeHandler}></input>
//             </div>
//             {newestUsers && !searchTerm && <h2>Newest Members</h2>}
//             {resultUsers && searchTerm && <h2>Results</h2>}

//             <div id="find-people-results">
//                 {newestUsers &&
//                     !searchTerm &&
//                     newestUsers.map(function (user) {
//                         return (
//                             <div key={user.id}>
//                                 <Link to={`/user/${user.id}`}>
//                                     <img src={user.profile_pic} />
//                                 </Link>
//                                 <Link to={`/user/${user.id}`}>
//                                     {user.name} {user.surname}
//                                 </Link>
//                             </div>
//                         );
//                     })}
//                 {resultUsers &&
//                     resultUsers.map(function (user) {
//                         return (
//                             <div key={user.id}>
//                                 <Link to={`/user/${user.id}`}>
//                                     <img src={user.profile_pic} />
//                                 </Link>
//                                 <Link to={`/user/${user.id}`}>
//                                     {user.name} {user.surname}
//                                 </Link>
//                             </div>
//                         );
//                     })}
//             </div>
//         </div>
//     );
// }
