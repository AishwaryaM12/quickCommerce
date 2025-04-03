import React from "react";
import data from "../../data.json";
import IcBlinkit from "../../assets/ic_blinkit.png";
import IcZepto from "../../assets/ic_zepto.png";
import IcSwiggy from "../../assets/ic_swiggy.png";
import icHelp from "../../assets/ic_help.png";
import TableVisualization from "../Components/TableVisualization.jsx";
import LineChartUI from "../Components/LineChartUI.jsx";
import SemiPieChart from "../Components/SemiPieChart.jsx";

const Dashboard = () => {
    return (
        <section className={"dashboard-container"}>
            <div className={"dashboard-header"}>
                <p className={"font-style-14px-500-18px"}>Quick Commerce</p>
                <div className={"d-flex align-items-center justify-content-lg-start gap-2"}>
                    <div className={"sideBar-Top-select-box flex-none"} style={{padding: '8px 16px', height: '40px', borderColor: '#D9D9D9'}}>
                        <i className={"material-icons sideBar-Top-icon-size"}>show_chart</i>
                        <i className={"material-icons margin-left-auto"} style={{color: '#027056'}}>toggle_on</i>
                    </div>
                    <div className={"sideBar-Top-select-box flex-none"} style={{padding: '8px 16px', height: '40px', borderColor: '#D9D9D9'}}>
                        <i className={"material-icons sideBar-Top-icon-size"}>calendar_month</i>
                        <p className={"sideBar-Top-select-box-text"}>Aug 01, 024 - Aug 03, 2024</p>
                        <i className={"material-icons margin-left-auto"}>keyboard_arrow_down</i>
                    </div>
                </div>
            </div>
            <div className={"dashboard-header"} style={{padding: '12px 16px'}}>
                <div className={"d-flex align-items-center justify-content-lg-start gap-2"}>
                    <div className={"dashboard-header-options-container "}>
                        <div className={"dashboard-header-options sideBar-right-dropdown-element-selected"}>
                            <img src={IcBlinkit} alt="Blinkit" width={16} height={16}/>
                            <p className={"sideBar-right-dropdown-element-selected-text font-style-14px-500-20px"}>Blinkit</p>
                        </div>
                        <div className={"dashboard-header-options opacity-30"}>
                            <img src={IcZepto} alt="Blinkit" width={16} height={16}/>
                            <p className={"font-style-14px-500-20px"}>Zepto</p>
                        </div>
                        <div className={"dashboard-header-options opacity-30"}>
                            <img src={IcSwiggy} alt="Blinkit" width={16} height={16}/>
                            <p className={"font-style-14px-500-20px"}>Instamart</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{padding: '24px'}}>
                <div className="row" style={{'row-gap': '48px'}}>
                    {[...(data?.cards || [])].sort((a, b) => a.gridStackProperties.x - b.gridStackProperties.x).map((card) => (
                        <div key={card.id} className={`col-md-${card?.gridStackProperties?.w}`}>
                            <div className={card.visualizationType === "table" ? "table-view" : "item-card"}>
                                {card.visualizationType !== "table" ? <div
                                    className={"item-card-header"}>
                                    <h5 className={"card-title"}>{card.title}</h5>
                                    <img src={icHelp} alt="Help" width={16} height={16}/>
                                </div> : <div className={"item-card-header-table"}>
                                    <div style={{gap: '4px', display: 'flex', flexDirection: 'column'}}>
                                        <h5 className={"table-card-title"}>{card.title}</h5>
                                        <h5 className={"table-card-dsc"}>{card.description}</h5>
                                    </div>
                                    <div className={"filter-box"}>
                                        Filters(1) <i className={"material-icons"}>keyboard_arrow_down</i>
                                    </div>
                                </div>}
                                {card.visualizationType === "linechart" && <LineChartUI card={card}/>}
                                {card.visualizationType === "semipiechart" &&  <SemiPieChart card={card}/>}
                                {card.visualizationType === "table" && <TableVisualization card={card} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
