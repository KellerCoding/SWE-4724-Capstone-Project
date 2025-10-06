import "./ScorecardIndividual.css";
import hospitalData from "../data/testData.json";

export function ScorecardIndividual({ hospitalKey = "Emory Hospital" }) {
  const hospital = hospitalData[hospitalKey];
  if (!hospital) {
    return <div className="ScorecardIndividual">Hospital not found.</div>;
  }

  const info = hospital.hospitalInfo;

  return (
    <div className="ScorecardIndividual">
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
      <div className="hospital-content">
        <div className={"left"}>
            <div className={"left"}>
                <h3>About</h3>
                    <button>
                        <h6>Address</h6>
                    </button>
                    <button>
                        <h6>City</h6>
                    </button>
                    <button>
                        <h6>County</h6>
                    </button>
                <h3>Individual Scorecard</h3>
                    <button>
                        <h6>Beds Available</h6>
                    </button>
                    <button>
                        <h7>Services Available</h7>
                    </button>
                    <button>
                        <h6>Address</h6>
                    </button>
                    </div>
        </div>

        {/* Main */}
        <main className="hospital-main">
          <div className="branding">
            <div>
              <p><strong>Overall Score:</strong> (no data yet)</p>
              <p><strong>Grade:</strong> (no data yet)</p>
            </div>
          </div>

          <div className="score-section">
            <p>No score breakdown available — please extend JSON with categories.</p>
          </div>
        </main>
      </div>
    </div>
  );

}