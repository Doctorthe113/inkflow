import { React, useState } from "react";
import { Switch } from "antd";
import "./user-page.css";

export default function UserPage() {
    let configs = localStorage.getItem("config");
    configs = JSON.parse(configs);
    const [caseCheck, setCaseCheck] = useState(configs.caseCheck);
    const [punctuation, setPunctuation] = useState(configs.punctuation);
    const [theme, setTheme] = useState(configs.theme);

    const handleSave = () => {
        let config = JSON.stringify({
            theme: theme,
            punctuation: punctuation,
            caseCheck: caseCheck,
        });
        localStorage.setItem("config", config);
        document.body.className = theme;
    };

    localStorage.getItem("config");
    return (
        <div className="user-page">
            <h2 className="page-title">Settings</h2>
            <div className="settings-option">
                <div className="settings-option-text">
                    <h3 className="blocked-text">Case sensitive</h3>
                    <h4 className="blocked-text">
                        Disables or enables case sensitivity.
                    </h4>
                </div>
                <Switch
                    className="toggle-button"
                    defaultChecked={caseCheck}
                    handleBg="#11111b"
                    onClick={() => setCaseCheck(!caseCheck)}
                >
                </Switch>
            </div>
            <div className="settings-option">
                <div className="settings-option-text">
                    <h3 className="blocked-text">Puncuation</h3>
                    <h4 className="blocked-text">
                        Disables or enables checking for punctuation.
                    </h4>
                </div>
                <Switch
                    className="toggle-button"
                    defaultChecked={punctuation}
                    onClick={() => setPunctuation(!punctuation)}
                >
                </Switch>
            </div>
            {
                /* <div className='settings-option'>
                <div className='settings-option-text'>
                    <h3 className='blocked-text'>Caret style</h3>
                    <h4 className='blocked-text'>Select the style of your caret.</h4>
                </div>
                <input type='checkbox' className='toggle-button' />
            </div> */
            }
            <div className="themes-option">
                <div className="settings-option-text">
                    <h3 className="blocked-text">Theme</h3>
                    <h4 className="blocked-text">
                        Select your favorite color palette.
                    </h4>
                    {/* prettier-ignore */}
                    <div className="theme-selector">
                        <button
                            className="catppuccin-theme theme-selector-btn"
                            onClick={() => setTheme("catppuccin-mocha")}
                        >
                            Catppuccin
                        </button>
                        <button
                            className="voc-theme theme-selector-btn"
                            onClick={() => setTheme("voc")}
                        >
                            Voc
                        </button>
                        <button
                            className="retro-theme theme-selector-btn"
                            onClick={() => setTheme("retro-80s")}
                        >
                            Retro 80's
                        </button>
                        <button
                            className="coffee-theme theme-selector-btn"
                            onClick={() => setTheme("coffee")}
                        >
                            Coffee
                        </button>
                    </div>
                </div>
            </div>

            <button className="save-button" onClick={() => handleSave()}>
                SAVE
            </button>
        </div>
    );
}
