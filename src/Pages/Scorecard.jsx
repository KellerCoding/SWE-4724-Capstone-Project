import "./Scorecard.css"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import alphaData from "../data/alphaTestData.json"
import testData from "../data/testData.json"
import star from "../assets/Images/ratingStar.png"
import dullStar from "../assets/Images/ratingStarGrey.png"
import { Link } from "react-router-dom"

export function Scorecard(){
     const navigate = useNavigate()
     const [sortByName, setSortByName] = useState(false)
     const [sortByGrade, setSortByGrade] = useState(false)
     const [sortByCounty, setSortByCounty] = useState(false)
     const [currentPage, setCurrentPage] = useState(1)
     const itemsPerPage = 30


    const mergedHospitalData = useMemo(() => {
      const normalizedAlpha = alphaData && alphaData.default ? alphaData.default : alphaData;
      const normalizedTest = testData && testData.default ? testData.default : testData;
      return { ...normalizedTest, ...normalizedAlpha }
    }, [])

      const renderStars = (value) => {
        const num = Number(value);
        const filled = (value === null || value === undefined || value === "NA" || Number.isNaN(num))
          ? 0
          : Math.max(0, Math.min(5, Math.round(num)));
        const stars = [];
        for (let i = 0; i < 5; i++) {
          const src = i < filled ? star : dullStar;
          stars.push(<img key={i} src={src} alt={i < filled ? "star" : "dull"} className={"ratingStar"} />);
        }
        return <div className={"starRow"}>{stars}</div>;
      };

      const getOverallGrade = (entry, hospitalKey) => {
        try {
          if (testData && testData[hospitalKey] && testData[hospitalKey].finalScore && typeof testData[hospitalKey].finalScore.Grade_Final !== 'undefined') {
            return testData[hospitalKey].finalScore.Grade_Final;
          }
        } catch (e) {
            console.error("Error accessing testData for hospitalKey:", hospitalKey, e);
        }

        if (!entry) return null;
        return entry?.finalScore?.Grade_Final ?? entry?.healthcareAccess?.Grade_Final ?? entry?.finalGrade ?? null;
      }

    const flattenHospital = ([id, entry]) => {
      const info = entry.hospitalInfo || {}
      const ft = entry.financialTransparency || {}
      const cb = entry.commBenefitSpending || {}
      const ha = entry.healthcareAffordability || {}
      const access = entry.healthcareAccess || {}

      return {
        id,
        name: info.name || "",
        city: info.city || "",
        county: info.county || "",
        bedSize: info.bedSize || "",
        areaType: info.areaType || "",
        financialTransparency_Transparency: ft.Transparency ?? "",
        financialTransparency_fiscalHealth: ft.fiscalHealth ?? "",
        financialTransparency_endowmentHoldings: ft.endowmentHoldings ?? "",
        financialTransparency_grade: ft.gradeFinancialTransparency ?? "",
        commBenefit_CB_Spending_Score: cb.CB_Spending_Score ?? "",
        commBenefit_QCB_Spending_Score: cb.QCB_Spending_Score ?? "",
        commBenefit_grade: cb.Grade_Comm_Benefit_Spending ?? "",
        affordability_Financial_Burden: ha.Financial_Burden ?? "",
        affordability_Charity_Care_Policies: ha.Charity_Care_Policies ?? "",
        affordability_Medical_Debt_Policies: ha.Medical_Debt_Policies ?? "",
        affordability_grade: ha.Grade_Healthcare_Affordability ?? "",
        access_Demographic_Alignment: access.Demographic_Alignment ?? "",
        access_MIUR_score: access.MIUR_score ?? "",
        access_LIUR_score: access.LIUR_score ?? "",
        access_Pay_Equity: access.Pay_Equity ?? "",
        access_grade: access.Grade_Healthcare_Access ?? "",
        finalGrade: access.Grade_Final ?? "",
      }
    }

    const toCSV = (arr) => {
      if (!arr || arr.length === 0) return ''
      const keys = Object.keys(arr[0])
      const escape = (val) => {
        if (val === null || val === undefined) return ''
        const s = String(val)
        if (s.includes('"') || s.includes(',') || s.includes('\n')) {
          return '"' + s.replace(/"/g, '""') + '"'
        }
        return s
      }
      const header = keys.join(',')
      const rows = arr.map(obj => keys.map(k => escape(obj[k])).join(','))
      return [header, ...rows].join('\r\n')
    }

    const exportCSV = () => {
      const dataArray = Object.entries(mergedHospitalData).map(flattenHospital)
      const csvString = toCSV(dataArray)
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'hospitals.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }

    const hospitalViewClick = (hospitalId) => {
         navigate(`/hospital-score/${hospitalId}`)
     }

     const handleHospitalNameSort = () => {
        setSortByName(!sortByName)
        setSortByGrade(false)
        setSortByCounty(false)
        setCurrentPage(1)
     }

     const handleGradeSort = () => {
         setSortByGrade(!sortByGrade)
         setSortByName(false)
         setSortByCounty(false)
         setCurrentPage(1)
     }

     const handleCountySort = () => {
         setSortByCounty(!sortByCounty)
         setSortByName(false)
         setSortByGrade(false)
         setCurrentPage(1)
     }

    const sortedHospitalData = useMemo(() => {
        const entries = Object.entries(mergedHospitalData)

        if (sortByName) {
            return [...entries].sort(([, a], [, b]) => {
                return (a.hospitalInfo?.name || '').localeCompare(b.hospitalInfo?.name || '')
            })
        }

        if (sortByGrade) {
                return [...entries].sort(([keyA, a], [keyB, b]) => {
                const ga = Number(getOverallGrade(a, keyA))
                const gb = Number(getOverallGrade(b, keyB))
                const na = Number.isFinite(ga) ? ga : -1
                const nb = Number.isFinite(gb) ? gb : -1
                return nb - na
            })
        }

        if (sortByCounty) {
            return [...entries].sort(([, a], [, b]) => {
                return (a.hospitalInfo?.county || '').localeCompare(b.hospitalInfo?.county || '')
            })
        }

        return entries
    }, [sortByName, sortByGrade, sortByCounty, mergedHospitalData])

    const totalPages = Math.ceil(sortedHospitalData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = sortedHospitalData.slice(startIndex, endIndex)
    
    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
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
                        <button
                            onClick={handleGradeSort}
                            className={sortByGrade ? "active-sort" : ""}
                        >
                            <h6>Grade / Score {sortByGrade ? "(High-Low)" : ""}</h6>
                        </button>
                        <button
                            onClick={handleCountySort}
                            className={sortByCounty ? "active-sort" : ""}
                        >
                            <h6>County {sortByCounty ? "(A-Z)" : ""}</h6>
                        </button>
                    </div>
                    <div className={"export-buttons"}>
                        <h5>Export</h5>
                        <button onClick={exportCSV} className={"export-btn csv"} aria-label="Download CSV">Download Excel Document</button>
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
                             const info = (data && data.hospitalInfo) ? data.hospitalInfo : {};
                             const globalIndex = startIndex + index;
                             const gradeToShow = getOverallGrade(data, hospitalName);
                             return (
                                  <tr key={hospitalName}>
                                      <td className={"numRow"}>{globalIndex + 1}</td>
                                      <td>
                                          <span className={"Hospital"}>{info.name}</span>
                                          <br />
                                          {info.city}
                                      </td>
                                      <td className={"Grade"}>
                                         {renderStars(gradeToShow)}
                                      </td>
                                      <td>
                                          <button onClick={() => hospitalViewClick(hospitalName)} className={"viewButton"}>View</button>
                                      </td>
                                  </tr>
                              )
                         })}
                 </tbody>
                    </table>

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
