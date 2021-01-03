import React from "react";
import {Container} from "rsuite";
import {Switch, Route, Redirect} from "react-router-dom";
import {Scrollbars} from "react-custom-scrollbars";
import "react-perfect-scrollbar/dist/css/styles.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import FilterPage from "./pages/FilterPage/filterpage";
import NewsPage from "./pages/NewsPage/newspage";
import AboutPage from "./pages/AboutPage/aboutpage";
import ContactPage from "./pages/ContactPage/contactpage";
import AccountPage from "./pages/AccountPage/accountpage";
import ServicePage from "./pages/ServicePage/servicepage";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isServiceMode: false,
        };
    }

    render() {
        const {isServiceMode} = this.state;

        return (
            <div>
                {isServiceMode && <ServicePage/>}
                {!isServiceMode && (
                    <Scrollbars autoHeight autoHeightMin="100vh">
                        <Container className="main-content">
                            <Header/>
                            <Switch>
                                <Route path="/news" component={NewsPage}/>
                                <Route path="/about" component={AboutPage}/>
                                <Route path="/contacts" component={ContactPage}/>
                                <Route path="/account" component={AccountPage}/>
                                <Route path="/service" component={ServicePage}/>
                                <Route exact path="/" component={FilterPage}/>
                                <Redirect to="/"/>
                            </Switch>
                            <Footer/>
                        </Container>
                    </Scrollbars>
                )}
            </div>
        );
    }
}

export default App;
