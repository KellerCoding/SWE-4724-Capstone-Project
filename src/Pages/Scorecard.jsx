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
                <div className={"filter"}>

                </div>
            </div>

        </div>
    )
}