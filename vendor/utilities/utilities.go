package utilities

import (
	"fmt"
	"strings"
)

func ArrayToString(a []int64, delim string) string {
	return strings.Trim(strings.Replace(fmt.Sprint(a), " ", delim, -1), "[]")
}

func HandleNull(rec string) string {
	if rec != "" {
		rec = rec[0:10]
	}
	return rec
}
