package db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"gopkg.in/guregu/null.v3"
)

type InvestmentsDetial struct {
	InvID         int            `json:"InvID"`
	VID           int            `json:"VID"`
	CID           int            `json:"CID"`
	StructureID   string         `json:"Structure_ID"`
	Feeder        string         `json:"Feeder"`
	Blocker       string         `json:"Blocker"`
	InvType       string         `json:"Inv_Type"`
	LPARefDate    sql.NullString `json:"LPA_Ref_Date"`
	SignDate      sql.NullString `json:"Sign_Date"`
	FundedDate    sql.NullString `json:"Funded_Date"`
	DateInv       sql.NullString `json:"Date_Inv"`
	DateEliminate sql.NullString `json:"Date_Eliminate"`
	GrossCapital  float32        `json:"Gross_Capital"`
	ActualCapital float32        `json:"Actual_Capital"`
	NetCapital    float32        `json:"Net_Captial"`
	PmtType       sql.NullString `json:"Pmt_Type"`
	Comments      sql.NullString `json:"Comments"`
	SideLetter    sql.NullString `json:"Side_Letter"`
	VirtusUser    sql.NullString `json:"Virtus_User"`
	EditDate      sql.NullString `json:"Edit_Date"`
}

func GetInvestmentsTbl(w http.ResponseWriter, r *http.Request) {
	queryResult := []InvestmentsDetial{}
	sqlStatement := `SELECT * FROM "tblIDB_Investments"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r InvestmentsDetial
		err := rows.Scan(&r.InvID, &r.VID, &r.CID, &r.StructureID, &r.Feeder, &r.Blocker, &r.InvType, &r.LPARefDate, &r.SignDate, &r.FundedDate, &r.DateInv, &r.DateEliminate, &r.GrossCapital, &r.ActualCapital, &r.NetCapital, &r.PmtType, &r.Comments, &r.SideLetter, &r.VirtusUser, &r.EditDate)
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

type Investments struct {
	InvID         int         `json:"InvID"`
	VID           int         `json:"VID"`
	CID           int         `json:"CID"`
	SID           string      `json:SID"`
	Feeder        string      `json:"Feeder"`
	InvType       string      `json:"Inv_Type"`
	DateInv       string      `json:"Date_Inv"`
	DateEliminate null.String `json:"Date_Eliminate"`
	AccountName   string      `json:"Account_Name"`
	GrossCapital  float32     `json:"Gross_Capital"`
	NetCapital    float32     `json:"Net_Captial"`
}

func GetInvestments(r *http.Request) string {
	queryResult := []Investments{}
	sqlStatement := `SELECT "tblIDB_Investments"."InvID", "tblIDB_Investments"."VID", "tblIDB_Investments"."CID", "tblIDB_Investors"."SID", ` +
		`"tblIDB_Investments"."Feeder", "tblIDB_Investments"."Inv_Type" , "tblIDB_Investments"."Date_Inv",` +
		`"tblIDB_Investments"."Date_Eliminate", "tblIDB_Investors"."Account_Name", ` +
		`"tblIDB_Investments"."Gross_Capital", "tblIDB_Investments"."Net_Capital"` +
		`FROM "tblIDB_Investments" ` +
		`INNER JOIN "tblIDB_Investors"` +
		`ON  "tblIDB_Investments"."VID" = "tblIDB_Investors"."VID"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r Investments
		err := rows.Scan(&r.InvID, &r.VID, &r.CID, &r.SID, &r.Feeder, &r.InvType, &r.DateInv, &r.DateEliminate, &r.AccountName, &r.GrossCapital, &r.NetCapital)
		if err != nil {
			log.Fatal(err)
		}
		//Clean Up Dates
		r.DateInv = r.DateInv[0:10]
		if r.DateEliminate.String != "" {
			r.DateEliminate.String = r.DateEliminate.String[0:10]
		}
		//Creates final string
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}

func GetInvestment(r *http.Request) string {
	vars := mux.Vars(r)
	var i Investments
	sqlStatement := `SELECT "tblIDB_Investments"."InvID", "tblIDB_Investments"."VID", "tblIDB_Investments"."CID", "tblIDB_Investors"."SID", ` +
		`"tblIDB_Investments"."Feeder", "tblIDB_Investments"."Inv_Type" ,  "tblIDB_Investments"."Date_Inv",` +
		`"tblIDB_Investments"."Date_Eliminate", "tblIDB_Investors"."Account_Name", ` +
		`"tblIDB_Investments"."Gross_Capital", "tblIDB_Investments"."Net_Capital"` +
		`FROM "tblIDB_Investments" ` +
		`INNER JOIN "tblIDB_Investors"` +
		`ON  "tblIDB_Investments"."VID" = "tblIDB_Investors"."VID"` +
		`WHERE "InvID" =` + vars["id"]
	err := Db.QueryRow(sqlStatement).Scan(&i.InvID, &i.VID, &i.CID, &i.SID, &i.Feeder, &i.InvType, &i.DateInv, &i.DateEliminate, &i.AccountName, &i.GrossCapital, &i.NetCapital)
	if err != nil {
		log.Fatal(err)
	}
	result, err := json.Marshal(i)
	if err != nil {
		panic(err)
	}
	return string(result)
}

func UpdateInvestmentsInvIDDetail(r *http.Request) {
	fmt.Println("Updated Investor Detail")
	var d Investments
	er := json.NewDecoder(r.Body).Decode(&d)
	fmt.Println(d)
	if er != nil {
		panic(er)
	}
	sqlStatement :=
		`UPDATE "tblIDB_Investments" 
		SET "InvID" = $1, "CID"= $2, "VID"= $3, "Feeder"= $4, 
		"Inv_Type"= $5, "Gross_Capital"= $6,"Net_Capital"= $7,"Date_Inv"= $8,"Date_Eliminate"= $9
		WHERE "InvID" = $1;`
	_, err := Db.Exec(sqlStatement, d.InvID, d.CID, d.VID, d.Feeder, d.InvType, d.GrossCapital, d.NetCapital, d.DateInv, d.DateEliminate)
	if err != nil {
		panic(err)
	}

	sqlStatement2 :=
		`UPDATE "tblIDB_Investors" 
	SET "VID" = $1, "Account_Name"= $2, "SID"= $3 
	WHERE "VID" = $1;`
	_, error := Db.Exec(sqlStatement2, d.VID, d.AccountName, d.SID)
	if error != nil {
		panic(error)
	}
}

// Account_Name: "Alan Knox"
// SID: "661"
// VID: 2751
