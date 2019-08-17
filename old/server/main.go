package main

import (
	"app"
	"controllers"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()
	router.Use(app.JwtAuthentication) //attach JWT auth middleware

	port := os.Getenv("PORT") //Get port from .env file, we did not specify any port so this should return an empty string when tested locally
	if port == "" {
		port = "8000" //localhost
	}
	router.HandleFunc("/", controllers.Homepage).Methods("GET")
	// router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	// router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	fmt.Println(port)

	err := http.ListenAndServe(":"+port, router) //Launch the app, visit localhost:8000/api
	if err != nil {
		fmt.Print(err)
	}
}

// package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"log"
// 	"net/http"

// 	"github.com/gorilla/mux"
// )

// // Article - Our struct for all articles
// type Article struct {
// 	Id      string `json:"Id"`
// 	Title   string `json:"Title"`
// 	Desc    string `json:"desc"`
// 	Content string `json:"content"`
// }

// var Articles []Article

// func homePage(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Welcome to the HomePage!")
// 	fmt.Println("Endpoint Hit: homePage")
// }

// func returnAllArticles(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Endpoint Hit: returnAllArticles")
// 	json.NewEncoder(w).Encode(Articles)
// }

// func returnSingleArticle(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	key := vars["id"]

// 	for _, article := range Articles {
// 		if article.Id == key {
// 			json.NewEncoder(w).Encode(article)
// 		}
// 	}
// }

// func createNewArticle(w http.ResponseWriter, r *http.Request) {
// 	// get the body of our POST request
// 	// unmarshal this into a new Article struct
// 	// append this to our Articles array.
// 	reqBody, _ := ioutil.ReadAll(r.Body)
// 	var article Article
// 	json.Unmarshal(reqBody, &article)
// 	// update our global Articles array to include
// 	// our new Article
// 	Articles = append(Articles, article)

// 	json.NewEncoder(w).Encode(article)
// }

// func deleteArticle(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	id := vars["id"]

// 	for index, article := range Articles {
// 		if article.Id == id {
// 			Articles = append(Articles[:index], Articles[index+1:]...)
// 		}
// 	}

// }

// func handleRequests() {
// 	myRouter := mux.NewRouter().StrictSlash(true)
// 	myRouter.HandleFunc("/", homePage)
// 	myRouter.HandleFunc("/articles", returnAllArticles)
// 	myRouter.HandleFunc("/article", createNewArticle).Methods("POST")
// 	myRouter.HandleFunc("/article/{id}", deleteArticle).Methods("DELETE")
// 	myRouter.HandleFunc("/article/{id}", returnSingleArticle)
// 	log.Fatal(http.ListenAndServe(":5500", myRouter))
// }

// func main() {
// 	Articles = []Article{
// 		Article{Id: "1", Title: "Hello", Desc: "Article Description", Content: "Article Content"},
// 		Article{Id: "2", Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
// 	}
// 	handleRequests()
// }

// package main

// import (
// 	"database/sql"
// 	"fmt"
// 	"log"

// 	_ "github.com/lib/pq"
// )

// var (
// 	db *sql.DB
// )

// const (
// 	host     = "localhost"
// 	port     = 6432
// 	user     = "postgres"
// 	password = "betori12"
// 	dbname   = "virtus"
// )

// func main() {
// 	dbConnection()
// 	getQuery()
// }

// func dbConnection() {
// 	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
// 		"password=%s dbname=%s sslmode=disable",
// 		host, port, user, password, dbname)
// 	db, err := sql.Open("postgres", psqlInfo)
// 	if err != nil {
// 		panic(err)
// 	}
// 	err = db.Ping()
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println("Successfully connected!")
// }

// func getQuery() {
// 	var (
// 		funds string
// 	)
// 	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
// 		"password=%s dbname=%s sslmode=disable",
// 		host, port, user, password, dbname)
// 	db, err := sql.Open("postgres", psqlInfo)
// 	sqlStatement := `SELECT "Fund_ID" FROM "tblIDB_Funds"`
// 	fmt.Println(db)
// 	rows, err := db.Query(sqlStatement)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		err := rows.Scan(&funds)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		fmt.Println(funds)
// 	}
// }
