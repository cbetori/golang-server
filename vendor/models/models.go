package models

import (
	"gopkg.in/guregu/null.v3"

	_ "github.com/lib/pq"
)

// Potential data structures
// investor : VID, SID,
// investment : InvID, CID, VID
// cashflows : InvID, CID

// {
// 	investor{},
// 	investments{},
// 	cashflows{}
// }

// {
// 	investor:{
// 		detail:{},
// 		investments{
// 			cashflows:{}
// 		},

// 	}
// }

type Investor2 struct {
	VID          int    `json:"VID"`
	SID          string `json:"SID"`
	Account_Name string `json:"Account_Name"`
	// FidelityID   string `json:"FidelityID"`
	// Name2        string `json:"Name2"`
	// Name3        string `json:"Name3"`
	// Address1     string `json:"Address1"`
	// Address2     string `json:"Address2"`
	// City         string `json:"City"`
	// State        string `json:"State"`
	// Country      string `json:"Country"`
	// Zip_Code     string `json:"Zip_Code"`
	// Email        string `json:"Email"`
	// SSN          string `json:"SSN"`
	// TaxID        string `json:"TaxID"`
}

type Investments2 struct {
	InvID                int         `json:"InvID"`
	VID                  int         `json:"VID"`
	CID                  int         `json:"CID"`
	Structure_ID         string      `json:"Structure_ID"`
	Feeder               string      `json:"Feeder"`
	Blocker              string      `json:"Blocker"`
	Inv_Type             string      `json:"Inv_Type"`
	Funded_Date          string      `json:"Funded_Date"`
	Date_Inv             string      `json:"Date_Inv"`
	Date_Eliminate       null.String `json:"Date_Eliminate"`
	Gross_Capital        float32     `json:"Gross_Capital"`
	Net_Capital          float32     `json:"Net_Capital"`
	Gross_Capital_String string      `json:"Date_Eliminate_String"`
	Net_Capital_String   string      `json:"Net_Capital_String"`
	// LPA_Ref_Date   sql.NullString `json:"LPA_Ref_Date"`
	// Sign_Date      sql.NullString `json:"Sign_Date"`
	// Actual_Capital float32        `json:"Actual_Capital"`
	// Pmt_Type       string         `json:"Pmt_Type"`
	// Comments       string         `json:"Comments"`
	// Side_Letter    string         `json:"Side_Letter"`
	// Virtus_User    string         `json:"Virtus_User"`
	// Edit_Date      string         `json:"Edit_Date"`
}

type InvestmentsCF2 struct {
	InvID            int         `json:"InvID"`
	CID              int         `json:"CID"`
	Scenario         string      `json:"Scenario"`
	CFID             string      `json:"CFID"`
	CF_Date          string      `json:"CF_Date"`
	CF_Amount        float32     `json:"CF_Amount"`
	CF_Amount_String string      `json:"CF_Amount_String"`
	Time_Stamp       null.String `json:"Time_Stamp"`
	ID               int         `json:"ID"`
}
