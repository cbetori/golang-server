package db

import (
	"encoding/json"
	"fmt"
	"log"
	"models"
	"net/http"
	"strings"
	"utilities"

	"github.com/buger/jsonparser"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

func GetInvestor2(r *http.Request, path string) string {
	vars := mux.Vars(r)
	id := vars["id"]
	path = strings.ToUpper(path)
	if path == "SID" {
		id = `'` + id + `'`
	}
	var i models.Investor2
	sqlStatement := `SELECT * FROM "tblIDB_Investors" WHERE "` + path + `"=` + id
	err := Db.QueryRow(sqlStatement).Scan(&i.VID, &i.SID, &i.Account_Name)
	if err != nil {
		fmt.Println(sqlStatement)
		panic(err)
	}
	result, err := json.Marshal(i)
	if err != nil {
		panic(err)
	}
	return string(result)
}

func GetInvestment2(r *http.Request, path string) string {
	vars := mux.Vars(r)
	queryResult := []models.Investments2{}
	var sqlStatement string = `Select "InvID", "VID", "CID", "Structure_ID", "Feeder", "Blocker", "Inv_Type", 
	TO_CHAR("Date_Inv", 'mm/dd/yyyy'), TO_CHAR("Date_Eliminate", 'mm/dd/yyyy'), "Gross_Capital", "Net_Capital", 
	CAST("Gross_Capital" as money) as "Gross_Capital_String", CAST("Net_Capital" as money) as "Net_Capital_String" 
	FROM "tblIDB_Investments" WHERE "` + strings.ToUpper(path) + `"=` + vars["id"]
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r models.Investments2
		err := rows.Scan(&r.InvID, &r.VID, &r.CID, &r.Structure_ID, &r.Feeder, &r.Blocker, &r.Inv_Type, &r.Date_Inv, &r.Date_Eliminate, &r.Gross_Capital, &r.Net_Capital, &r.Gross_Capital_String, &r.Net_Capital_String)
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

func GetCashFlows2(res string) string {
	data := []byte(res)
	var vid []int64
	jsonparser.ArrayEach(data, func(value []byte, dataType jsonparser.ValueType, offset int, err error) {
		temp, _ := jsonparser.GetInt(value, "InvID")
		vid = append(vid, temp)
	})
	temp := utilities.ArrayToString(vid, ",")
	fmt.Println(temp)
	queryResult := []models.InvestmentsCF2{}
	sqlStatement :=
		`SELECT "InvID", "CID", "Scenario", "CFID", TO_CHAR("CF_Date", 'mm/dd/yyyy'), "CF_Amount", 
	TRIM(TO_CHAR("CF_Amount", '999,999,999.99')) as "CF_Amount_String", 
	TO_CHAR("Time_Stamp", 'dd/mm/yyyy') as "Time_Stamp", "ID" 
	FROM "tblIDB_Investments_CF" WHERE "InvID" IN(` + temp + `)`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r models.InvestmentsCF2
		err := rows.Scan(&r.InvID, &r.CID, &r.Scenario, &r.CFID, &r.CF_Date, &r.CF_Amount, &r.CF_Amount_String, &r.Time_Stamp, &r.ID)
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
