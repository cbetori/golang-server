package controller

import (
	"db"
	"fmt"
	"net/http"
	"strings"
)

//USERS

func wrapString(x string) string {
	x = `"` + x + `"`
	return x
}

func InvestorHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.Split(r.URL.Path, "/")
	fmt.Println("Path Check ", path[2])
	x := db.GetInvestor2(r, path[2])
	var res string
	if path[2] == "vid" {
		y := db.GetInvestment2(r, path[2])
		z := db.GetCashFlows2(y)
		res = "{" + wrapString("investor") + ":" + x + "," + wrapString("investment") + ":" + y + "," + wrapString("cashflow") + ":" + z + "}"
	} else {
		res = "{" + wrapString("investor") + ":" + x + "}"
	}

	fmt.Fprintf(w, res)
}

//api/login
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	x := db.CheckUser(r)
	fmt.Fprintf(w, x)
}

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

//api/cf/totals/funds
func CFTotalsFundsHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetCFTotalsFunds(r)
	fmt.Fprintf(w, x)
}

//INVESTMENTS
//api/investments
func InvestmentsHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetInvestments(r)
	fmt.Fprintf(w, x)
}

//api/investments/{id}
func InvestmentHandler(w http.ResponseWriter, r *http.Request) {
	x := "" + `"` + "details" + `"` + ":[" + db.GetInvestment(r) + "]"
	y := "" + `"` + "cashflows" + `"` + ":" + db.GetInvestmentInvIDCF(r) + ""
	z := "[{" + x + "," + y + "}]"
	fmt.Fprintf(w, string(z))
}

//api/cf/invid/{id}
func CashflowInvidHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetInvestmentInvIDCF(r)
	fmt.Fprintf(w, x)
}

//api/cf/distro/invid
func CashflowInvidDistrosHandler(w http.ResponseWriter, r *http.Request) {
	x := db.GetInvestmentsInvIDCFDistro(r)
	fmt.Fprintf(w, x)
}

func CashflowInvidUpdater(w http.ResponseWriter, r *http.Request) {
	db.UpdateInvestmentsInvIDCF(r)
}

func DetailInvidUpdater(w http.ResponseWriter, r *http.Request) {
	db.UpdateInvestmentsInvIDDetail(r)
}

//api/cf/invid/distros/{id}          db.CashflowInvidDistrosHandler          GET
//api/cf/invid/feess/{id}            db.CashflowInvidFeesHandler             GET
//api/cf/invid/capital/{id}          db.CashflowInvidCapitalHandler          GET
//api/funds/{id}
//func FundHandler
//db.FundsSummaryHandler
//api/fundssummary/{id}
//db.FundSummaryHandler
//api/investmentsdetail              db.InvestmentsDetailHandler             GET         Might be unecessary
//api/investors                      db.GetInvestments                       GET         Retrieves investor information
//api/investors/invid/{id}           db.GetInvestmentAll                     GET         Not used
//api/cf/invid						CashflowInvidsHandler
//api/cf/invid/distros               db.CashflowInvidsDistrosHandler         GET
//api/cf/invid/fees                  db.CashflowInvidsFeesHandler            GET
//api/cf/invid/capital               db.CashflowInvidsCapitalHandler         GET
//api/cf/invid/{id}                  db.CashflowInvidHandler                 GET         Retrieves all cashflows related to investment ID
