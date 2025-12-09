import "./Scorecard.css"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
// import hospitalData from "../data/testData.json"
import hospitalData from "../data/alphaTestData.json"
import star from "../assets/Images/ratingStar.png"
import dullStar from "../assets/Images/ratingStarGrey.png"
import { Link } from "react-router-dom"

export function Scorecard(){
    const navigate = useNavigate()
    const [sortByName, setSortByName] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 30
    
    const hospitalViewClick = (hospitalId) => {
        navigate(`/hospital-score/${hospitalId}`) 
    }
    
    const handleHospitalNameSort = () => {
        setSortByName(!sortByName)
        setCurrentPage(1) // Reset to first page when sorting changes
    }
    
    // Sort hospital data based on current sort state
    const sortedHospitalData = useMemo(() => {
        const entries = Object.entries(hospitalData)
        
        if (sortByName) {
            return entries.sort(([, a], [, b]) => {
                return a.hospitalInfo.name.localeCompare(b.hospitalInfo.name)
            })
        }
        
        // Return original order
        return entries
    }, [sortByName])
    
    // Calculate pagination
    const totalPages = Math.ceil(sortedHospitalData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = sortedHospitalData.slice(startIndex, endIndex)
    
    const handlePageChange = (page) => {
        setCurrentPage(page)
        // Scroll to top of table when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Show first page, current page range, and last page
            if (currentPage <= 3) {
                // Near the beginning
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                // In the middle
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }
        
        return pages
    }

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
            <div className="map-comparison">
                <Link to="/comparison">
                <button>
                            <h6>Compare Hospitals</h6>
                        </button>
                </Link>
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
                        <button 
                            onClick={handleHospitalNameSort}
                            className={sortByName ? "active-sort" : ""}
                        >
                            <h6>Hospital Name {sortByName ? "(A-Z)" : ""}</h6>
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
                        {paginatedData.map(([hospitalName, data], index) => {
                            
                            const info = data.hospitalInfo;
                            const globalIndex = startIndex + index; // Calculate global rank
                            return(
                                <tr key={hospitalName}>
                                        <td className={"numRow"}>{globalIndex + 1}</td>
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
                                            <button onClick={() => hospitalViewClick(hospitalName)} className={"viewButton"}>View</button>
                                        </td>
                                    </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            
                            <div className="pagination-numbers">
                                {getPageNumbers().map((page, index) => {
                                    if (page === '...') {
                                        return <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                                    }
                                    return (
                                        <button
                                            key={page}
                                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                })}
                            </div>
                            
                            <button 
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}