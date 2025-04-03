import React from "react";
import perforaImg from '../../assets/perfora-img.png';
import boatImg from '../../assets/boat.png';
import mamaEImg from '../../assets/mama-earth.png';
import icHome from '../../assets/ic_home.png';
import icChannels from '../../assets/ic_channels.png';
import icHelp from '../../assets/ic_help.png';
import icSettings from '../../assets/ic_settings.png';
import icUsers from '../../assets/ic_users.png';
import icCreatives from '../../assets/ic_creatives.png';

const SideBar = () => {
    return (
        <section className={"sideBar-container"}>
            <div className={"sideBar-Top-container"}>
                <img src={perforaImg} alt="Perfora Logo" className={"logo-img logo-img-active"}/>
                <div className={"sideBar-Top-select-box"}>
                    <div className={"sideBar-Top-select-box-img"}>
                        SS
                    </div>
                    <p className={"sideBar-Top-select-box-text"}>Some_brand</p>
                    <i className={"material-icons sideBar-Top-icon-size margin-left-auto"}>unfold_more</i>
                </div>
                <i className={"material-icons sideBar-Top-icon-size "}>keyboard_double_arrow_left</i>
            </div>
            <div className={"sideBar-Bottom-container"}>
                <div className={"sideBar-left"}>
                    <div className={"sideBar-left-inside"}>
                        <img src={mamaEImg} alt="Mama Logo" className={"logo-img"}/>
                        <img src={boatImg} alt="Boat Logo" className={"logo-img"}/>
                        <div className={"logo-img logo-border-dark d-flex justify-content-center align-items-center"}>
                            <i className={"material-icons logo-add-ic"}>add</i>
                        </div>
                    </div>
                    <div className={"sideBar-left-inside margin-bottom-25 flex-gap-18px"}>
                        <img src={icUsers} alt="Users" className={"icon-size"}/>
                        <div className={"sideBar-left-bottom-purple-text"}>SS</div>
                    </div>
                </div>
                <div className={"sideBar-right"}>
                    <div className={"sideBar-right-inside-container"}>
                        <div className={"sideBar-right-inside-element"}>
                        <img src={icHome} alt="Home" className={"icon-size"}/>
                            <p className={"sideBar-right-inside-text"}>Overview</p>
                        </div>
                        <div className={"sideBar-right-dropdown-container"}>
                            <div className={"sideBar-right-inside-element"}>
                                <img src={icChannels} alt="Channels" className={"icon-size"}/>
                                <p className={"sideBar-right-inside-text"}>Channels</p>
                                <i className={"material-icons"}>keyboard_arrow_down</i>
                            </div>
                            <div className={"sideBar-right-dropdown-container padding-left-16"}>
                                <div className={"sideBar-right-dropdown-element"}>
                                    <p className={"sideBar-right-inside-text font-weight-400"}>Meta Ads</p>
                                </div>
                                <div className={"sideBar-right-dropdown-element"}>
                                    <p className={"sideBar-right-inside-text font-weight-400"}>Google Ads</p>
                                </div>
                                <div
                                    className={"sideBar-right-dropdown-element sideBar-right-dropdown-element-selected"}>
                                    <p className={"sideBar-right-inside-text sideBar-right-dropdown-element-selected-text"}>Quick
                                        Commerce</p>
                                </div>
                            </div>
                        </div>
                        <div className={"sideBar-right-inside-element"}>
                            <img src={icCreatives} alt="Creatives" className={"icon-size"}/>
                            <p className={"sideBar-right-inside-text"}>Creatives</p>
                        </div>
                    </div>
                    <div className={"sideBar-right-inside-container"}>
                        <div className={"sideBar-right-inside-element"}>
                            <img src={icHelp} alt="Help" className={"icon-size"}/>
                            <p className={"sideBar-right-inside-text"}>Help</p>
                        </div>
                        <div className={"sideBar-right-inside-element"}>
                            <img src={icSettings} alt="Settings" className={"icon-size"}/>
                            <p className={"sideBar-right-inside-text"}>Settings</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SideBar;
