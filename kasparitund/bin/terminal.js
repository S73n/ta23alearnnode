function write(message) {
    process.stdout.write(message);
};

const ESC = '\x1B';
write(ESC + '[34m');
write(ESC + '[42m');
write('Hello TA23A');
write(ESC + '[0m');

for(let i = 0; i<256; i++){
    write(ESC + `[48;5;${i}m`); write(' '); write(ESC + '[0m');
}

for(let i = 0; i<256; i++){
    write(ESC + `[48;2;${i};0;0m`); write(' '); write(ESC + '[0m');
}

for(let i = 0; i<256; i++){
    write(ESC + `[48;2;0;${i};0m`); write(' '); write(ESC + '[0m');
}

for(let i = 0; i<256; i++){
    write(ESC + `[48;2;0;0;${i}m`); write(' '); write(ESC + '[0m');
}
