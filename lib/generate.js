const opcodes = require('./opcodes');
const { PUSH1, DUP1, CODECOPY, RETURN } = opcodes;

const bytes = (i) => {
    let s = i.toString(16);
    if(s.length % 2 == 1) s = "0" + s;
    let arr = [];
    for(let i = 0; i < s.length; i += 2)
        arr.push(parseInt(s[i] + s[i + 1], 16));
    return arr;
}

const generate = (data) => {
    data = [...data];
    const lengthBytes = bytes(data.length);

    if(lengthBytes.length > 32)
        throw new Error("data length too big");

    return "0x" + ([
        /* PUSH1, 0x60,
        PUSH1, 0x40,
        MSTORE, // runs mstore(p, v), storing the "free memory pointer" (not needed) */
        opcodes["PUSH" + lengthBytes.length], ...lengthBytes,
        DUP1, // duplicates on stack length specified above
        PUSH1, 0x0a + lengthBytes.length, // push (length of this function + length of input size)
        PUSH1, 0x0,
        CODECOPY, // run codecopy to load bytes to memory
        PUSH1, 0x0,
        RETURN, // return memory as contract code,
        ...data, // append data bytes
    ].map(elem => {
        elem = elem.toString(16);
        if(elem.length == 1) elem = "0" + elem;
        return elem;
    }).join(''));
}

module.exports = generate;