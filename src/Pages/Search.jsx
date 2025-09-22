import "./Search.css"

export function Search(){

    function PageButtons() {
        return(
            <>
                <button>
                    About
                </button>
                <button>
                    Resources
                </button>
                <button>
                    News
                </button>
                <button>
                    Events
                </button>
                <button>
                    Contact
                </button>
                <button className={"Donate"}>
                    Donate
                </button>
            </>
        )
    }
    return(
        <>
            <div className={"SearchHead"}>
                <h1>Georgia Watch</h1>

                <div className={"buttonset"}>
                    <PageButtons/>
                </div>
            </div>
        </>
    )
}
