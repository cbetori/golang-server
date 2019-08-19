package db

import (
	"database/sql"
	"encoding/json"
	"fmt"
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

func GetInvestmentInvIDCF(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, string(result))
}

func GetInvestmentsInvIDCFDistro(w http.ResponseWriter, r *http.Request) {
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
	fmt.Fprintf(w, string(result))
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
