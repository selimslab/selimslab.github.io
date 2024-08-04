package main

import (
	"net/http"
	"net/url"
	"io/ioutil"
	"errors"
)

func Main(args map[string]interface{}) map[string]interface{} {
	_, err := visit(args)
	if err != nil {
		return map[string]interface{}{"error": err.Error()}
	}
	return map[string]interface{}{"result": "ok"}
}

func visit(args map[string]interface{}) (string, error) {
	path, ok := args["path"].(string)
	if !ok {
		return "", errors.New("Invalid URL")
	}

    apiURL, err := url.Parse(apiBase)
    if err != nil {
        return "", err
    }

	queryParams := url.Values{}
    queryParams.Add("apikey", apiKey)
    queryParams.Add("path", path)
	// if d, ok := args["duration"].(int); ok && d > 0 {
	// 	queryParams.Add("duration", strconv.Itoa(d))
	// }
	apiURL.RawQuery = queryParams.Encode()

	resp, err := http.Get(apiURL.String())
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
