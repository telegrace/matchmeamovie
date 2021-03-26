import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";
import Logo from "./logo";
import Carousel from "./carousel";

export default function Welcome() {
    return (
        <>
            <div className="topbar">
                <Logo />
            </div>
            <Carousel />
            <HashRouter>
                <div id="welcome">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </>
    );
}

//https://spiced.space/fennel/social_network_login/
