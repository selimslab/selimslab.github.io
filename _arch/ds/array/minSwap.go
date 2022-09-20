package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
    "sort"
)

// Complete the minimumSwaps function below.
func minimumSwaps(arr []int32) int32 {
    var swaps int32 = 0 
    
    pos := make(map[int32]int) 
    for i, val := range arr{
        pos[val] = i 
    }
    
    sorted := make([]int32, len(arr))
    copy(sorted, arr[:])
    sort.Slice(sorted, func(i, j int) bool { return sorted[i] < sorted[j]})

    for i, val := range arr{
        expected := sorted[i]
        if  expected != val{
            to_swap_idx := pos[expected]
            arr[i], arr[to_swap_idx] = expected, val
            pos[val], pos[expected] = to_swap_idx, i 
            swaps++
            fmt.Println(val, expected)
        }
    }
    
    return swaps
    
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 1024 * 1024)

    stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 1024 * 1024)

    nTemp, err := strconv.ParseInt(readLine(reader), 10, 64)
    checkError(err)
    n := int32(nTemp)

    arrTemp := strings.Split(readLine(reader), " ")

    var arr []int32

    for i := 0; i < int(n); i++ {
        arrItemTemp, err := strconv.ParseInt(arrTemp[i], 10, 64)
        checkError(err)
        arrItem := int32(arrItemTemp)
        arr = append(arr, arrItem)
    }

    res := minimumSwaps(arr)

    fmt.Fprintf(writer, "%d\n", res)

    writer.Flush()
}

func readLine(reader *bufio.Reader) string {
    str, _, err := reader.ReadLine()
    if err == io.EOF {
        return ""
    }

    return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}
