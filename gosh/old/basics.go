if val, ok := dict["foo"]; ok {
	// ok
  }
  
  append([]int{1,2}, []int{3,4}...)
  // [1 2 3 4]
  
  
  if _, err := os.Stat("/path/to/whatever"); os.IsNotExist(err) {
	// path/to/whatever does not exist
}