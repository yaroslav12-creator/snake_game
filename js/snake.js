game.snake = {
    game,
    cells: [],
    isMoving: false,
    direction: false,
    directions: {
        up: {
            row: -1,
            col: 0,
            angle: 0,
        },
        down: {
            row: 1,
            col: 0,
            angle: 180,
        },
        left: {
            row: 0,
            col: -1,
            angle: 270,
        },
        right: {
            row: 0,
            col: 1,
            angle: 90,
        },
    },
    create() {
        let startCells = [
            { row: 7, col: 7 },
            { row: 8, col: 7 },
        ];
        this.direction = this.directions.up;

        for(let startCell of startCells) { 
            this.cells.push(this.game.board.getCell(startCell.row, startCell.col));
        }
    },
    renderHead() {
        const head = this.cells[0];

        const halfSize = this.game.sprites.head.width / 2;

        this.game.ctx.save();

        this.game.ctx.translate(head.x, head.y);
        this.game.ctx.translate(halfSize, halfSize);

        let degree = this.direction.angle;
        this.game.ctx.rotate(degree * Math.PI / 180);

        this.game.ctx.drawImage(this.game.sprites.head, -halfSize, -halfSize);

        return this.game.ctx.restore();
    },
    renderBody() {
        for(let i = 1; i < this.cells.length; ++i) {
            this.game.ctx.drawImage(this.game.sprites.body, this.cells[i].x, this.cells[i].y);
        }
    },
    render() {
        this.renderHead();
        this.renderBody();  
    },
    startMoving(keyCode) {
        switch(keyCode) {
            case 38:
                this.direction = this.directions.up;
                break;
            case 37:
                this.direction = this.directions.left;
                break;
            case 39: 
                this.direction = this.directions.right;
                break;
            case 40: 
                this.direction = this.directions.down;
                break;
        }

        this.isMoving = true;
    },
    move() {
        if(!this.isMoving) {
            return;
        }
 
        let cell = this.getNextCell();
        // End the game 
        if(!cell || this.hasCell(cell) || this.game.board.isDangerCell(cell)) {
            this.game.end();
        }
        if(cell) {
            this.cells.unshift(cell);   
            
            if(!this.game.board.isFoodCell(cell)) {
                this.cells.pop();
            } else {
                this.game.onSnakeEat();
                this.game.board.createYummy();
            }
        }
    },
    hasCell(cell) {
        return this.cells.find(p => p === cell);
    },
    getNextCell() {
        let head = this.cells[0];

        const row = head.row + this.direction.row;
        const col = head.col + this.direction.col;

        return this.game.board.getCell(row, col);
    },
};