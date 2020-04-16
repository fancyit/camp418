function checkLines(player, grid) {    
    let row;
    let col; 
    for (let i = 0; i < grid.length; i++) {
        row = true;
        col = true;
        for (let j = 0; j < grid.length; j++) {
            row = row && (grid[i][j] === player);
            col = col && (grid[j][i] === player);
        }
        if (row || col) break;
    }
    return (row || col);
}
function checkDiags(player, grid) {
    let forward = true;
    let backward = true;
    for (let i = 0; i < grid.length; i++) {
        forward = forward && (grid[i][i] === player);
        backward = backward && (grid[i][grid.length - 1 - i] === player);
    }
    return (forward || backward);
}
module.exports = {
    checkLines,
    checkDiags,
};
