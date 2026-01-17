import "./Scorecard.css"
import { useNavigate } from "react-router-dom"
import { useState, useMemo, useEffect, useRef } from "react"
// import hospitalData from "../data/testData.json"
import hospitalData from "../data/finalData.json"
import star from "../assets/Images/ratingStar.png"
import dullStar from "../assets/Images/ratingStarGrey.png"
import { Link } from "react-router-dom"

export function Scorecard(){
    const navigate = useNavigate()
    // Sort states: null = not sorted, true = ascending, false = descending
    const [sortByName, setSortByName] = useState(null) // null, true (A-Z), false (Z-A)
    const [sortByGrade, setSortByGrade] = useState(null) // null, true (Low-High), false (High-Low)
    const [sortByCounty, setSortByCounty] = useState(null) // null, true (A-Z), false (Z-A)
    const [sortBySystem, setSortBySystem] = useState(null) // null, true (A-Z), false (Z-A)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedCounty, setSelectedCounty] = useState("")
    const [showCityDropdown, setShowCityDropdown] = useState(false)
    const [showCountyDropdown, setShowCountyDropdown] = useState(false)
    const [cityFilterSearch, setCityFilterSearch] = useState("")
    const [countyFilterSearch, setCountyFilterSearch] = useState("")
    const itemsPerPage = 30
    const cityDropdownRef = useRef(null)
    const countyDropdownRef = useRef(null)
    
    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
                setShowCityDropdown(false)
            }
            if (countyDropdownRef.current && !countyDropdownRef.current.contains(event.target)) {
                setShowCountyDropdown(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    
    const hospitalViewClick = (hospitalId) => {
        navigate(`/hospital-score/${hospitalId}`) 
    }
    
    const handleHospitalNameSort = () => {
        if (sortByName === null) {
            setSortByName(true) // First click: ascending (A-Z)
        } else if (sortByName === true) {
            setSortByName(false) // Second click: descending (Z-A)
        } else {
            setSortByName(null) // Third click: no sort
        }
        setSortByGrade(null)
        setSortByCounty(null)
        setSortBySystem(null)
        setCurrentPage(1)
    }

    const handleHospitalSystemSort = () => {
        if (sortBySystem === null) {
            setSortBySystem(true) // First click: ascending (A-Z)
        } else if (sortBySystem === true) {
            setSortBySystem(false) // Second click: descending (Z-A)
        } else {
            setSortBySystem(null) // Third click: no sort
        }
        setSortByName(null)
        setSortByGrade(null)
        setSortByCounty(null)
        setCurrentPage(1)
    }
    
    const handleGradeSort = () => {
        if (sortByGrade === null) {
            setSortByGrade(false) // First click: descending (High-Low)
        } else if (sortByGrade === false) {
            setSortByGrade(true) // Second click: ascending (Low-High)
        } else {
            setSortByGrade(null) // Third click: no sort
        }
        setSortByName(null)
        setSortByCounty(null)
        setSortBySystem(null)
        setCurrentPage(1)
    }
    
    const handleCountySort = () => {
        if (sortByCounty === null) {
            setSortByCounty(true) // First click: ascending (A-Z)
        } else if (sortByCounty === true) {
            setSortByCounty(false) // Second click: descending (Z-A)
        } else {
            setSortByCounty(null) // Third click: no sort
        }
        setSortByName(null)
        setSortByGrade(null)
        setSortBySystem(null)
        setCurrentPage(1)
    }
    
    // Get unique cities and counties for filter dropdowns
    const uniqueCities = useMemo(() => {
        const cities = new Set()
        Object.values(hospitalData).forEach(data => {
            if (data.hospitalInfo?.city) {
                cities.add(data.hospitalInfo.city)
            }
        })
        return Array.from(cities).sort()
    }, [])
    
    const uniqueCounties = useMemo(() => {
        const counties = new Set()
        Object.values(hospitalData).forEach(data => {
            if (data.hospitalInfo?.county) {
                counties.add(data.hospitalInfo.county)
            }
        })
        return Array.from(counties).sort()
    }, [])
    
    // Filter cities and counties based on search within dropdowns
    const filteredCities = useMemo(() => {
        if (!cityFilterSearch.trim()) return uniqueCities
        return uniqueCities.filter(city => 
            city.toLowerCase().includes(cityFilterSearch.toLowerCase())
        )
    }, [uniqueCities, cityFilterSearch])
    
    const filteredCounties = useMemo(() => {
        if (!countyFilterSearch.trim()) return uniqueCounties
        return uniqueCounties.filter(county => 
            county.toLowerCase().includes(countyFilterSearch.toLowerCase())
        )
    }, [uniqueCounties, countyFilterSearch])
    
    // Filter and sort hospital data based on current state
    const filteredAndSortedHospitalData = useMemo(() => {
        let entries = Object.entries(hospitalData)
        
        // Apply search filter
        if (searchQuery.trim()) {
            entries = entries.filter(([, data]) => {
                const name = data.hospitalInfo?.name?.toLowerCase() || ""
                return name.includes(searchQuery.toLowerCase())
            })
        }
        
        // Apply city filter
        if (selectedCity) {
            entries = entries.filter(([, data]) => {
                return data.hospitalInfo?.city === selectedCity
            })
        }
        
        // Apply county filter
        if (selectedCounty) {
            entries = entries.filter(([, data]) => {
                return data.hospitalInfo?.county === selectedCounty
            })
        }
        
        // Apply sorting
        if (sortByName !== null) {
            entries = entries.sort(([, a], [, b]) => {
                const comparison = a.hospitalInfo.name.localeCompare(b.hospitalInfo.name)
                return sortByName ? comparison : -comparison // true = ascending, false = descending
            })
        } else if (sortBySystem !== null) {
            entries = entries.sort(([, a], [, b]) => {
                // Get system name, treating "0", null, undefined, or "N/A" as empty string for sorting
                const systemA = a.hospitalInfo?.systemName || ""
                const systemB = b.hospitalInfo?.systemName || ""
                const systemNameA = (systemA === "0" || systemA === "N/A" || !systemA) ? "" : systemA
                const systemNameB = (systemB === "0" || systemB === "N/A" || !systemB) ? "" : systemB
                const comparison = systemNameA.localeCompare(systemNameB)
                return sortBySystem ? comparison : -comparison // true = ascending, false = descending
            })
        } else if (sortByGrade !== null) {
            entries = entries.sort(([, a], [, b]) => {
                const gradeA = a.finalScore?.Grade_Final ?? 0
                const gradeB = b.finalScore?.Grade_Final ?? 0
                return sortByGrade ? gradeA - gradeB : gradeB - gradeA // true = ascending (Low-High), false = descending (High-Low)
            })
        } else if (sortByCounty !== null) {
            entries = entries.sort(([, a], [, b]) => {
                const countyA = a.hospitalInfo?.county || ""
                const countyB = b.hospitalInfo?.county || ""
                const comparison = countyA.localeCompare(countyB)
                return sortByCounty ? comparison : -comparison // true = ascending, false = descending
            })
        }
        
        return entries
    }, [searchQuery, selectedCity, selectedCounty, sortByName, sortByGrade, sortByCounty, sortBySystem])
    
    // Reset to page 1 when filters or sorting change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCity, selectedCounty, sortByName, sortByGrade, sortByCounty, sortBySystem])
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredAndSortedHospitalData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = filteredAndSortedHospitalData.slice(startIndex, endIndex)
    
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
                <h1><strong>Georgia Hospital Accountability Scorecard</strong></h1>
                <hr/>
            </div>
            <div className={"objective"}>
                <p>Using data nonprofit hospitals must publicly report under a new law, Georgia Watch and community partners developed a methodology to score hospitals' performance across a range of factors.</p>
                <p>By translating complex financial data into actionable insights, the Scorecard will support a more sustainable healthcare marketplace that better serves patients, employers, and communities across Georgia while also allowing us to better understand the challenges nonprofit hospitals face.</p>
                {filteredAndSortedHospitalData.length > 0 && (
                    <p className="result-count">
                        Showing {filteredAndSortedHospitalData.length} hospital{filteredAndSortedHospitalData.length !== 1 ? 's' : ''}
                        {(selectedCity || selectedCounty || searchQuery) && ' (filtered)'}
                    </p>
                )}
            </div>
            <div className={"search-box"}>
                <input
                    type="text"
                    placeholder="Search hospitals by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="map-comparison">
                <Link to="/comparison">
                    <button>
                        <h6>Compare Hospitals</h6>
                    </button>
                </Link>
                <Link to="/georgia-map">
                    <button>
                        <h6>See Map</h6>
                    </button>
                </Link>
            </div>
            <div className={"container"}>
                <div className={"left"}>
                    <div className={"filter"}>
                        <h5>Filter By</h5>
                        <div className="filter-dropdown-container" ref={cityDropdownRef}>
                            <button 
                                onClick={() => {
                                    setShowCityDropdown(!showCityDropdown)
                                    setShowCountyDropdown(false)
                                }}
                                className={selectedCity ? "active-filter" : ""}
                            >
                                <h6>City {selectedCity ? `(${selectedCity})` : ""}</h6>
                            </button>
                            {showCityDropdown && (
                                <div className="filter-dropdown">
                                    <div className="filter-search-container">
                                        <input
                                            type="text"
                                            placeholder="Search cities..."
                                            value={cityFilterSearch}
                                            onChange={(e) => setCityFilterSearch(e.target.value)}
                                            className="filter-search-input"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <div className="filter-options-list">
                                        <button 
                                            className={`filter-option ${!selectedCity ? "selected" : ""}`}
                                            onClick={() => {
                                                setSelectedCity("")
                                                setShowCityDropdown(false)
                                                setCityFilterSearch("")
                                            }}
                                        >
                                            <h6>All Cities ({uniqueCities.length})</h6>
                                        </button>
                                        {filteredCities.length > 0 ? (
                                            filteredCities.map(city => (
                                                <button
                                                    key={city}
                                                    className={`filter-option ${selectedCity === city ? "selected" : ""}`}
                                                    onClick={() => {
                                                        setSelectedCity(city)
                                                        setShowCityDropdown(false)
                                                        setCityFilterSearch("")
                                                    }}
                                                >
                                                    <h6>{city}</h6>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="filter-no-results">
                                                <h6>No cities found</h6>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="filter-dropdown-container" ref={countyDropdownRef}>
                            <button 
                                onClick={() => {
                                    setShowCountyDropdown(!showCountyDropdown)
                                    setShowCityDropdown(false)
                                }}
                                className={selectedCounty ? "active-filter" : ""}
                            >
                                <h6>County {selectedCounty ? `(${selectedCounty})` : ""}</h6>
                            </button>
                            {showCountyDropdown && (
                                <div className="filter-dropdown">
                                    <div className="filter-search-container">
                                        <input
                                            type="text"
                                            placeholder="Search counties..."
                                            value={countyFilterSearch}
                                            onChange={(e) => setCountyFilterSearch(e.target.value)}
                                            className="filter-search-input"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <div className="filter-options-list">
                                        <button 
                                            className={`filter-option ${!selectedCounty ? "selected" : ""}`}
                                            onClick={() => {
                                                setSelectedCounty("")
                                                setShowCountyDropdown(false)
                                                setCountyFilterSearch("")
                                            }}
                                        >
                                            <h6>All Counties ({uniqueCounties.length})</h6>
                                        </button>
                                        {filteredCounties.length > 0 ? (
                                            filteredCounties.map(county => (
                                                <button
                                                    key={county}
                                                    className={`filter-option ${selectedCounty === county ? "selected" : ""}`}
                                                    onClick={() => {
                                                        setSelectedCounty(county)
                                                        setShowCountyDropdown(false)
                                                        setCountyFilterSearch("")
                                                    }}
                                                >
                                                    <h6>{county}</h6>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="filter-no-results">
                                                <h6>No counties found</h6>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {(selectedCity || selectedCounty) && (
                            <div className="active-filters">
                                {selectedCity && (
                                    <span className="filter-chip">
                                        City: {selectedCity}
                                        <button 
                                            className="filter-chip-remove"
                                            onClick={() => setSelectedCity("")}
                                            aria-label="Remove city filter"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {selectedCounty && (
                                    <span className="filter-chip">
                                        County: {selectedCounty}
                                        <button 
                                            className="filter-chip-remove"
                                            onClick={() => setSelectedCounty("")}
                                            aria-label="Remove county filter"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                <button 
                                    className="clear-filters"
                                    onClick={() => {
                                        setSelectedCity("")
                                        setSelectedCounty("")
                                    }}
                                >
                                    <h6>Clear All Filters</h6>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={"sort"}>
                        <h5>Sort By</h5>
                        <button 
                            onClick={handleHospitalNameSort}
                            className={sortByName !== null ? "active-sort" : ""}
                        >
                            <h6>
                                Hospital Name 
                                {sortByName === true && " ↑ (A-Z)"}
                                {sortByName === false && " ↓ (Z-A)"}
                            </h6>
                        </button>
                        <button 
                            onClick={handleHospitalSystemSort}
                            className={sortBySystem !== null ? "active-sort" : ""}
                        >
                            <h6>
                                Hospital System 
                                {sortBySystem === true && " ↑ (A-Z)"}
                                {sortBySystem === false && " ↓ (Z-A)"}
                            </h6>
                        </button>
                        <button
                            onClick={handleGradeSort}
                            className={sortByGrade !== null ? "active-sort" : ""}
                        >
                            <h6>
                                Score
                                {sortByGrade === false && " ↓ (High-Low)"}
                                {sortByGrade === true && " ↑ (Low-High)"}
                            </h6>
                        </button>

                        {/* <button
                            onClick={handleCountySort}
                            className={sortByCounty !== null ? "active-sort" : ""}
                        >
                            <h6>
                                County 
                                {sortByCounty === true && " ↑ (A-Z)"}
                                {sortByCounty === false && " ↓ (Z-A)"}
                            </h6>
                        </button> */}
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
                                            {(() => {
                                                const grade = data.finalScore?.Grade_Final ?? 0
                                                const stars = []
                                                for (let i = 0; i < 5; i++) {
                                                    stars.push(
                                                        <img 
                                                            key={i} 
                                                            src={i < grade ? star : dullStar} 
                                                            alt={i < grade ? "star" : "dull"} 
                                                            className={"ratingStar"}
                                                        />
                                                    )
                                                }
                                                return stars
                                            })()}
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