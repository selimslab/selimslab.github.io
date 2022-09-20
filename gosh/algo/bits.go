func reverseBits(num uint32) uint32 {
    /*
    Input: 00000010100101000001111010011100
    Output: 00111001011110000010100101000000
    */
    res := uint32(0)
    power := uint32(31)
    for num != 0 {
        res += (num & 1) << power
        num = num >> 1
        power -= 1
    }
    return res
}