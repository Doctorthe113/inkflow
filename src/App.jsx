import { useEffect, useState } from "react";
import HomePage from "./components/home-page";
import TypePage from "./components/type-page";
import UserPage from "./components/user-page";
import "./App.css";
import "./assets/themes.css";

import { IcRoundHome } from "./icons/home";
import { IcBaselineKeyboard } from "./icons/keyboard";
import { IcBaselineRefresh } from "./icons/refresh";
import { IcBaselinePerson } from "./icons/user";

function App() {
    const [page, setPage] = useState("home");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const refresh = () => {
        let prevPage = page;
        setPage("none");
        setTimeout(() => {
            setPage(prevPage);
        }, 100);
    };

    const handlePage = (p) => {
        let navButton = document.getElementById(`${p}-button`);
        let otherButton = document.getElementsByClassName("nav-button");
        for (let i = 0; i < otherButton.length; i++) {
            otherButton[i].style.backgroundColor = "transparent";
            otherButton[i].style.borderColor = "transparent";
            otherButton[i].style.color = "var(--accent-color)";
        }
        // changed the background and border color of nav buttons
        navButton.style.backgroundColor = "var(--navbutton-bg)";
        navButton.style.borderColor =
            "var(--accent-color) var(--accent-color) var(--background-color) var(--accent-color)";
        navButton.style.color = "var(--navbutton-color)";

        // sets the page
        setPage(p);
    };

    // handles the theme
    const handleConfigs = (config) => {
        let configs = JSON.parse(config);
        let theme = configs.theme;
        document.body.className = theme;
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        // checks if there is a config
        let config = localStorage.getItem("config");
        if (config) {
            handleConfigs(config);
        } else {
            config = JSON.stringify({
                theme: "catppuccin-mocha",
                punctuation: true,
                caseCheck: true,
            });
            localStorage.setItem("config", config);
        }

        // sets the background and border color of home button at the start
        let homeButton = document.getElementById("home-button");
        homeButton.style.backgroundColor = "var(--navbutton-bg)";
        homeButton.style.borderColor =
            "var(--accent-color) var(--accent-color) var(--background-color) var(--accent-color)";
        homeButton.style.color = "var(--navbutton-color)";

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // checks if the window is too small
    if (windowWidth < 800 || windowHeight <= 500) {
        alert("Window is too small. Please use a larger screen.");
        return null;
    }

    return (
        <>
            <div className="app">
                <div className="navbar">
                    {/* prettier-ignore */}
                    <a href="/" className="inkflow-logo">
                        inkFlow.io
                    </a>
                    {/* prettier-ignore */}
                    <div className="nav-buttons">
                        <button onClick={() => refresh()}>
                            <IcBaselineRefresh className="icons" />
                        </button>
                        <button
                            id="home-button"
                            className="nav-button"
                            onClick={() => handlePage("home")}
                        >
                            <IcRoundHome className="icons" />
                        </button>
                        <button
                            id="type-button"
                            className="nav-button"
                            onClick={() => handlePage("type")}
                        >
                            <IcBaselineKeyboard className="icons" />
                        </button>
                        <button
                            id="user-button"
                            className="nav-button"
                            onClick={() => handlePage("user")}
                        >
                            <IcBaselinePerson className="icons" />
                        </button>
                    </div>
                </div>
                <hr />
                <div className="pages">
                    {page == "home" ? <HomePage /> : null}
                    {page == "type" ? <TypePage /> : null}
                    {page == "user" ? <UserPage /> : null}
                </div>
            </div>
        </>
    );
}

export default App;
