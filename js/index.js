let game = {
    canvas: null,
    ctx: null, 
    board: null,
    width: 0,
    height: 0,
    score: 0,
    dimensions: {
        max: {
            width: 640,
            heint: 360,
        },
        min: {
            width: 300,
            height: 300,
        },
    },
    sprites: {
        background: null,
        cell: null,
        body: null,
        food: null,
        head: null,
        danger: null,
    },
    random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    },
    start() {
        this.init();
        
        this.preload(() => {
            this.run();
        });
    },
    init() {
        this.canvas = document.getElementById('myPlayground');
        this.ctx = this.canvas.getContext('2d');  
        this.initDimentions();
        this.setTextFonts();
    },
    setTextFonts() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "#fff";
    },
    initDimentions() {
        let data = {
            maxWidth: this.dimensions.max.width,
            maxHeight: this.dimensions.max.heint,
            minWidth: this.dimensions.min.width,
            minHeight: this.dimensions.min.height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        };

        if (data.windowWidth / data.windowHeight > data.maxWidth / data.maxHeight) {
            this.fitWidth(data);
        } else {
            this.fitHeight(data);
        }
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },
    fitWidth(data) {
        this.height = Math.round(this.width * data.windowHeight / data.windowWidth);
        this.height = Math.min(this.height, data.maxHeight);
        this.height = Math.max(this.height, data.minHeight); 
        
        this.width = Math.round(data.windowWidth * this.height / data.windowHeight);
        this.canvas.style.width = "100%";
    },
    fitHeight(data) {
        this.width = Math.round(data.windowWidth * data.maxHeight / data.windowHeight);
        this.width = Math.min(this.width, data.maxWidth);
        this.width = Math.max(this.width, data.minWidth);

        this.height = Math.round(this.width * data.windowHeight / data.windowWidth);
        this.canvas.style.height = "100%";
    },
    preload(callback) {        
        let loaded = 0;
        let required = Object.entries(this.sprites).length;
        const onAssetLoad = () => {
            ++loaded;
            if(loaded >= required) {
                callback()
            }
        };
        for(let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `assets/${key}.png`;    
            this.sprites[key].addEventListener("load", onAssetLoad);
        }
        
    },
    createGameObjects() {
        this.board.create();    
        this.snake.create();
        this.board.createYummy();
        this.board.createDanger();

        window.addEventListener("keydown", (e) => {
            this.snake.startMoving(e.keyCode);
        })
    },
    render() {
        window.requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            this.ctx.drawImage(this.sprites.background, ((this.width - this.sprites.background.width) / 2), ((this.height - this.sprites.background.height) / 2));
            this.board.render();
            this.snake.render();
           
            this.ctx.fillText(`Score: ${this.score}`, 30, 30);
        });
    },
    update() {
        this.render();
        this.snake.move();
    },
    run() { 
        this.createGameObjects();
        this.gameInterval = setInterval(() => {
            this.update();
        }, 300); 

        this.dangerInterval = setInterval(() => {
            if(this.snake.isMoving) {
                this.board.createDanger();
            }
        }, 3000); 
    },
    end() {
        clearInterval(this.gameInterval);
        clearInterval(this.dangerInterval);
        alert("The End");
        window.location.reload();
    },
    onSnakeEat() {
        ++this.score;  
    },
};

game.start()


