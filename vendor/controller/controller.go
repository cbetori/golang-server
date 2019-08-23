package controller

import (
	"db"
	"fmt"
	"net/http"
)

//FUNDS
//api/funds
func FundsHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetFunds(r)
	fmt.Fprintf(w, x)
}

//api/fundstotals
func FundsTotalsHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetFundsCapitalTotals(r)

	fmt.Fprintf(w, x)
}

//CASHFLOWS
//api/cf/totals
func CFTotalsHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetCFTotalsFund(r)
	fmt.Fprintf(w, x)
}

//api/cf/totals/monthly
func CFTotalsMonthHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetCFTotalsMonthly(r)
	fmt.Fprintf(w, x)
}

//api/funds/{id}
//func FundHandler
//db.FundsSummaryHandler
//api/fundssummary/{id}
//db.FundSummaryHandler

//INVESTMENTS
//api/investments
func InvestmentsHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetInvestments(r)
	fmt.Fprintf(w, x)
}

//api/investments/{id}
func InvestmentHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetInvestment(r)
	fmt.Fprintf(w, x)
}

//api/investmentsdetail              db.InvestmentsDetailHandler             GET         Might be unecessary

//api/investors                      db.GetInvestments                       GET         Retrieves investor information
//api/investors/invid/{id}           db.GetInvestmentAll                     GET         Not used

//api/cf/invid                       db.CashflowInvidsHandler
//api/cf/invid/distros               db.CashflowInvidsDistrosHandler         GET
//api/cf/invid/fees                  db.CashflowInvidsFeesHandler            GET
//api/cf/invid/capital               db.CashflowInvidsCapitalHandler         GET
//api/cf/invid/{id}                  db.CashflowInvidHandler                 GET         Retrieves all cashflows related to investment ID
//api/cf/invid/distros/{id}          db.CashflowInvidDistrosHandler          GET
//api/cf/invid/feess/{id}            db.CashflowInvidFeesHandler             GET
//api/cf/invid/capital/{id}          db.CashflowInvidCapitalHandler          GET
