game.board = {
    game,
    size: 15,
    cells: [],
    create() {
        this.createCells();
    },
    createCells() {
        for(let row = 0; row < this.size; row++) {
            for(let col = 0; col < this.size; col++) {
                this.cells.push(this.createCell(row, col));
            }
        }
    },
    createCell(row, col) {
        const cellSize = this.game.sprites.cell.width + 1;
        const offsetX = (this.game.width - cellSize * this.size) / 2; 
        const offsetY = (this.game.height - cellSize * this.size) / 2;
        return cell = {  
            row,
            col,
            x: offsetX + cellSize * col,
            y: offsetY + cellSize * row,
        };
    },
    createCellObject(type) {
        let cell = this.cells.find((cell) => cell.type === type);
        if(cell) {
            cell.type = false;
        }
        cell = this.getRandomAvailableCell();

        cell.type = type;
    },
    createYummy() {
        this.createCellObject("food");
    },
    isFoodCell(cell) {
        return cell.type === "food";
    },
    createDanger() {
        this.createCellObject("danger");
    },
    isDangerCell(cell) {
        return cell.type === "danger";
    },
    getRandomAvailableCell() {
        let pool = this.cells.filter(cell => !cell.type && !this.game.snake.hasCell(cell));
        let index = game.random(0, pool.length - 1);
        return pool[index];
    },
    getCell(row, col) {
        return this.cells.find((cell) => row === cell.row && col === cell.col);
    },
    render() {
        this.cells.forEach((cell) => {
            this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
            if(cell.type) {
                this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
            }
        }); 
    },
};