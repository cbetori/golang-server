package db

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type InvestmentsCF struct {
	ID        int            `json:"ID"`
	InvID     int            `json:"InvID"`
	CID       string         `json:"CID"`
	Scenario  string         `json:"Scenario"`
	CFID      string         `json:"CFID"`
	CodeName  string         `json:"Code_Name"`
	CFDate    string         `json:"CF_Date"`
	CFAmount  float64        `json:"CF_Amount"`
	TimeStamp sql.NullString `json:"Time_Stamp"`
}

func GetInvestmentInvIDCF(r *http.Request) string {
	vars := mux.Vars(r)
	queryResult := []InvestmentsCF{}
	sqlStatement := `SELECT "tblIDB_Investments_CF"."ID", "tblIDB_Investments_CF"."InvID", "tblIDB_Investments_CF"."CID", "tblIDB_Investments_CF"."Scenario", "tblIDB_Investments_CF"."CFID",` +
		`"tblIDB_Investments_CF_IDs"."Code_Name", "tblIDB_Investments_CF"."CF_Date", "tblIDB_Investments_CF"."CF_Amount", "tblIDB_Investments_CF"."Time_Stamp" ` +
		`FROM "tblIDB_Investments_CF" ` +
		`INNER JOIN  "tblIDB_Investments_CF_IDs" on  "tblIDB_Investments_CF"."CFID" = "tblIDB_Investments_CF_IDs"."CFID" ` +
		`WHERE "tblIDB_Investments_CF"."Scenario" = ` + "'Actual'" + ` AND "tblIDB_Investments_CF"."InvID"=` + vars["id"]
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r InvestmentsCF
		err := rows.Scan(&r.ID, &r.InvID, &r.CID, &r.Scenario, &r.CFID, &r.CodeName, &r.CFDate, &r.CFAmount, &r.TimeStamp)
		if err != nil {
			log.Fatal(err)
		}
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}

func GetInvestmentsInvIDCFDistro(r *http.Request) string {
	queryResult := []InvestmentsCF{}
	sqlStatement :=
		`SELECT "tblIDB_Investments_CF"."ID", "tblIDB_Investments_CF"."InvID","tblIDB_Investments_CF"."CID", "tblIDB_Investments_CF"."Scenario", "tblIDB_Investments_CF"."CFID"` +
			`, "tblIDB_Investments_CF_IDs"."Code_Name", "tblIDB_Investments_CF"."CF_Date", "tblIDB_Investments_CF"."CF_Amount", "tblIDB_Investments_CF"."Time_Stamp" ` +
			`FROM "tblIDB_Investments_CF" ` +
			`INNER JOIN  "tblIDB_Investments_CF_IDs" on  "tblIDB_Investments_CF"."CFID" = "tblIDB_Investments_CF_IDs"."CFID" ` +
			`WHERE  "tblIDB_Investments_CF_IDs"."Code_Type"=` + "'Distro'" + `AND  "tblIDB_Investments_CF"."Scenario" =` + "'Actual'"
	rows, err := Db.Query(sqlStatement)
	if err != nil {
	}
	defer rows.Close()
	for rows.Next() {
		var r InvestmentsCF
		err := rows.Scan(&r.ID, &r.InvID, &r.CID, &r.Scenario, &r.CFID, &r.CodeName, &r.CFDate, &r.CFAmount, &r.TimeStamp)
		if err != nil {
			log.Fatal(err)
		}
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}

type CFTotalsFund struct {
	Gross      float32 `json:"Gross_Total`
	Special    float32 `json:"Special_Total`
	Composite  float32 `json:"Composite_Total`
	Tax        float32 `json:"Tax_Total`
	Management float32 `json:"Management_Total`
	Servicing  float32 `json:"Servicing_Total`
}

func GetCFTotalsFund(r *http.Request) string {
	queryResult := []CFTotalsFund{}
	sqlStatement :=
		`SELECT SUM(CASE WHEN "CFID" = ` + "'G'" + ` THEN "tblIDB_Investments_CF"."CF_Amount" END) Gross_Total, ` +
			`SUM(CASE WHEN "CFID" = ` + "'S'" + ` THEN "tblIDB_Investments_CF"."CF_Amount" END) Special_Total, ` +
			`SUM(CASE WHEN "CFID" = ` + "'Q'" + ` THEN "tblIDB_Investments_CF"."CF_Amount" END) Composite_Total, ` +
			`SUM(CASE WHEN "CFID" = ` + "'Y'" + ` THEN "tblIDB_Investments_CF"."CF_Amount" END) Tax_Total, ` +
			`SUM(CASE WHEN "CFID" = ` + "'M'" + ` THEN "tblIDB_Investments_CF"."CF_Amount" END) Mangement_Total, ` +
			`SUM(CASE WHEN "CFID" = ` + "'V'" + ` THEN "tblIDB_Investments_CF"."CF_Amount" END) Servicing_Total ` +
			`FROM "tblIDB_Investments_CF" `

	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r CFTotalsFund
		err := rows.Scan(&r.Gross, &r.Special, &r.Composite, &r.Tax, &r.Management, &r.Servicing)
		if err != nil {
			log.Fatal(err)
		}
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}

type CFTotalsMonthly struct {
	Scenario string  `json:"Scenario"`
	CFID     string  `json:"CFID"`
	CodeName string  `json:"Code_Name"`
	CFDate   string  `json:"CF_Date"`
	CFAmount float64 `json:"CF_Amount"`
}

func GetCFTotalsMonthly(r *http.Request) string {
	queryResult := []CFTotalsMonthly{}
	sqlStatement :=
		`SELECT "Scenario", a."CFID","Code_Name", "CF_Date",SUM("CF_Amount") AS CF_Amount ` +
			`FROM "tblIDB_Investments_CF" AS "a"` +
			`INNER JOIN "tblIDB_Investments_CF_IDs" AS "b" ON a."CFID" = b."CFID"` +
			`WHERE "Scenario"=` + "'Actual'" +
			`GROUP BY "CF_Date", a."CFID", "Scenario", "Code_Name"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r CFTotalsMonthly
		err := rows.Scan(&r.Scenario, &r.CFID, &r.CodeName, &r.CFDate, &r.CFAmount)
		if err != nil {
			log.Fatal(err)
		}
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}

type CFTotalsFunds struct {
	Scenario string  `json:"Scenario"`
	CFID     string  `json:"CFID"`
	CodeName string  `json:"Code_Name"`
	CFAmount float64 `json:"CF_Amount"`
	FundID   string  `json:"Fund_ID"`
}

func GetCFTotalsFunds(r *http.Request) string {
	queryResult := []CFTotalsFunds{}
	sqlStatement :=
		`SELECT "Scenario", a."CFID","Code_Name",SUM("CF_Amount") AS CF_Amount, "Fund_ID" ` +
			`FROM "tblIDB_Investments_CF" AS "a"` +
			`INNER JOIN "tblIDB_Investments_CF_IDs" AS "b" ON a."CFID" = b."CFID" ` +
			`INNER JOIN "tblIDB_Investments" as C ON a."CID" = c."CID"` +
			`INNER JOIN "tblIDB_Funds" as D ON c."Feeder" = d."Feeder" ` +
			`WHERE "Scenario"=` + "'Actual'" +
			`GROUP BY a."CFID", "Scenario", "Code_Name", "Fund_ID"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r CFTotalsFunds
		err := rows.Scan(&r.Scenario, &r.CFID, &r.CodeName, &r.CFAmount, &r.FundID)
		if err != nil {
			log.Fatal(err)
		}
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}

// type Investments struct {
// 	InvID         int            `json:"InvID"`
// 	VID           int            `json:"VID"`
// 	CID           int            `json:"CID"`
// 	SID           string         `json:SID"`
// 	Feeder        string         `json:"Feeder"`
// 	InvType       string         `json:"Inv_Type"`
// 	DateInv       sql.NullString `json:"Date_Inv"`
// 	DateEliminate sql.NullString `json:"Date_Eliminate"`
// 	AccountName   string         `json:"Account_Name"`
// 	GrossCapital  float32        `json:"Gross_Capital"`
// 	NetCaptial    float32        `json:"Net_Captial"`
// }

// func GetInvestments(w http.ResponseWriter, r *http.Request) {
// 	queryResult := []Investments{}
// 	sqlStatement := `SELECT "tblIDB_Investments"."InvID", "tblIDB_Investments"."VID", "tblIDB_Investments"."CID", "tblIDB_Investors"."SID", ` +
// 		`"tblIDB_Investments"."Feeder", "tblIDB_Investments"."Inv_Type" ,  "tblIDB_Investments"."Date_Inv",` +
// 		`"tblIDB_Investments"."Date_Eliminate", "tblIDB_Investors"."Account_Name", ` +
// 		`"tblIDB_Investments"."Gross_Capital", "tblIDB_Investments"."Net_Capital"` +
// 		`FROM "tblIDB_Investments" ` +
// 		`INNER JOIN "tblIDB_Investors"` +
// 		`ON  "tblIDB_Investments"."VID" = "tblIDB_Investors"."VID"`
// 	rows, err := Db.Query(sqlStatement)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		var r Investments
// 		err := rows.Scan(&r.InvID, &r.VID, &r.CID, &r.SID, &r.Feeder, &r.InvType, &r.DateInv, &r.DateEliminate, &r.AccountName, &r.GrossCapital, &r.NetCaptial)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		queryResult = append(queryResult, r)
// 	}
// 	result, err := json.Marshal(queryResult)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Fprintf(w, string(result))
// }

// func GetInvestment(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	queryResult := []Investments{}
// 	sqlStatement := `SELECT "tblIDB_Investments"."InvID", "tblIDB_Investments"."VID", "tblIDB_Investments"."CID", "tblIDB_Investors"."SID", ` +
// 		`"tblIDB_Investments"."Feeder", "tblIDB_Investments"."Inv_Type" ,  "tblIDB_Investments"."Date_Inv",` +
// 		`"tblIDB_Investments"."Date_Eliminate", "tblIDB_Investors"."Account_Name", ` +
// 		`"tblIDB_Investments"."Gross_Capital", "tblIDB_Investments"."Net_Capital"` +
// 		`FROM "tblIDB_Investments" ` +
// 		`INNER JOIN "tblIDB_Investors"` +
// 		`ON  "tblIDB_Investments"."VID" = "tblIDB_Investors"."VID"` +
// 		`WHERE "InvID" =` + vars["id"]
// 	rows, err := Db.Query(sqlStatement)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		var r Investments
// 		err := rows.Scan(&r.InvID, &r.VID, &r.CID, &r.SID, &r.Feeder, &r.InvType, &r.DateInv, &r.DateEliminate, &r.AccountName, &r.GrossCapital, &r.NetCaptial)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		queryResult = append(queryResult, r)
// 	}
// 	result, err := json.Marshal(queryResult)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Fprintf(w, string(result))
// }
