package morse

// UniqueMorseRepresentations returns number of possible morse codes
func UniqueMorseRepresentations(words []string) int {
    morse := []string{".-","-...","-.-.","-..",".","..-.",
              "--.","....","..",".---","-.-",".-..","--","-.","---",
              ".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--",
              "--.."}
    tf := make(map[string]bool)
    
    for _, word := range words {
        rep := ""
        for _, r := range word {
            c := rune(r)
            i := int(c)-97 // 97 is ascii for a
            rep +=  morse[i]
        }
        tf[rep] = true
    }
    return len(tf)
}

