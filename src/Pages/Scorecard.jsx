import "./Scorecard.css"

export function Scorecard(){
    return (
        <div className="Scorecard">
            <div className={"banner"}>
                <h1><strong>Hospital Accountability Scorecard</strong></h1>
                <hr/>
            </div>
            <div className={"objective"}>
                <p>Use this guide to jump start your research, explore avenues of advocacy you may be unfamiliar with,
                    and connect with organizations working in your community.</p>
            </div>
            <div className={"search-box"}>
                {/* Implement Search Box as seen
                    - As long as div is here, shadowed rectangle will appear on web page*/}
            </div>
            <div className={"container"}>
                <div className={"left"}>
                    <div className={"filter"}>
                        <h5>Filter By</h5>
                        <button>
                            <h6>City</h6>
                        </button>
                        <button>
                            <h6>County</h6>
                        </button>
                    </div>
                    <div className={"sort"}>
                        <h5>Sort By</h5>
                        <button>
                            <h6>Hospital Name</h6>
                        </button>
                        <button>
                            <h6>Grade / Score</h6>
                        </button>
                        <button>
                            <h6>County</h6>
                        </button>
                    </div>
                </div>
                <div className={"right"}>
                    <table className={"table"}>
                        <thead className={"thead"}>
                            <tr>
                                <th className={"th0"}></th>
                                <th className={"th1"}>Hospital</th>
                                <th className={"th2"}>Grade</th>
                                <th className={"th3"}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={"numRow"}>1</td>
                                <td><span className={"Hospital"}>Emory Hospital</span><br />Atlanta</td>
                                <td className={"Grade"}>A</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>2</td>
                                <td><span className={"Hospital"}>Emory St. Joseph's</span><br />Atlanta</td>
                                <td className={"Grade"}>A</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>3</td>
                                <td><span className={"Hospital"}>North Georgia Medical</span><br />Gainesville</td>
                                <td className={"Grade"}>A</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>4</td>
                                <td><span className={"Hospital"}>Piedmont Atlanta</span><br />Atlanta</td>
                                <td className={"Grade"}>A</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>5</td>
                                <td><span className={"Hospital"}>Emory University Midtown</span><br />Atlanta</td>
                                <td className={"Grade"}>A</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>6</td>
                                <td><span className={"Hospital"}>Wellstar Kennestone</span><br />Marietta</td>
                                <td className={"Grade"}>A</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>7</td>
                                <td><span className={"Hospital"}>Piedmont Athens Regional</span><br />Athens</td>
                                <td className={"Grade"}>B</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>8</td>
                                <td><span className={"Hospital"}>Northside Hospital Forsyth</span><br />Cumming</td>
                                <td className={"Grade"}>B</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                            <tr>
                                <td className={"numRow"}>9</td>
                                <td><span className={"Hospital"}>Piedmont Fayette</span><br />Fayetville</td>
                                <td className={"Grade"}>B</td>
                                <td><button className={"viewButton"}>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                    {/*Previous, 1, 2, 3... Next*/}

                </div>
            </div>

        </div>
    )
}