import "./Scorecard.css"
import hospitalData from "../data/testData.json"
import star from "../assets/Images/ratingStar.png"
import dullStar from "../assets/Images/ratingStarGrey.png"

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
                                <th className={"th0"}>Rank</th>
                                <th className={"th1"}>Hospital</th>
                                <th className={"th2"}>Grade</th>
                                <th className={"th3"}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.entries(hospitalData).map(([hospitalName, data], index) => {
                            
                            const info = data.hospitalInfo;
                            return(
                                <tr key={hospitalName}>
                                        <td className={"numRow"}>{index + 1}</td>
                                        <td>
                                            <span className={"Hospital"}>{info.name}</span>
                                            <br />
                                            {info.city}
                                        </td>
                                        <td className={"Grade"}>
                                            <img src={star} alt="A" className={"ratingStar"}/>
                                            <img src={star} alt="" className={"ratingStar"}/>
                                            <img src={star} alt="" className={"ratingStar"}/>
                                            <img src={star} alt="" className={"ratingStar"}/>
                                            <img src={star} alt="" className={"ratingStar"}/>
                                        </td>
                                        {/* <td className={"Grade"}>A</td> */}
                                        <td>
                                            <button className={"viewButton"}>View</button>
                                        </td>
                                    </tr>
                            );
                        })}
                        </tbody>
                    </table>
                        
                    {/*Previous, 1, 2, 3... Next*/}

                </div>
            </div>

        </div>
    )
}