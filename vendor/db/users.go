package db

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Ids      int    `json:"ids"`
	Username string `json:"username"`
}

type Credentials struct {
	Password string `json:"password"`
}

func CheckUser(r *http.Request) string {
	vars := mux.Vars(r)
	user := vars["username"]
	pass := vars["password"]
	var i Credentials
	sqlStatement := `SELECT password ` +
		`FROM tblusers ` +
		`WHERE username = '` + user + `'`
	err := Db.QueryRow(sqlStatement).Scan(&i.Password)
	if err != nil {
		return "False"
	}
	match := CheckPasswordHash(pass, i.Password)
	if match != false {
		fmt.Println(user)
		return GetUser(user)
	}
	return "False"
}

func GetUser(user string) string {
	var i User
	sqlStatement := `SELECT ids, username ` +
		`FROM tblusers ` +
		`WHERE username = '` + user + `'`
	err := Db.QueryRow(sqlStatement).Scan(&i.Ids, &i.Username)
	if err != nil {
		return "False"
	}
	result, err := json.Marshal(i)
	if err != nil {
		panic(err)
	}
	return string(result)
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 4)
	return string(bytes), err
}

func CheckPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		log.Println(password)
		log.Println(err)
		return false
	}

	return true
}
