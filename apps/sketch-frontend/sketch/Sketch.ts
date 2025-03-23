import { getExistingShapes } from "./existingShapes";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "pencil",
    points: {
        x: number,
        y: number
    }[]
} | {
    type: "line",
    x: number,
    y: number,
    pointX: number,
    pointY: number
};

type Tool = "circle" | "rect" | "pencil" | "line";

export class Sketch {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool | null = null;
    private currentPoints: { x: number, y: number }[] = [];

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    private async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
    
            if(message.type === "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape);
                this.clearCanvas();
            }
    
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.existingShapes.map((shape) => {
            if(shape.type === "rect") {
                this.rect(shape.x, shape.y, shape.width, shape.height, true, "white");

            } else if(shape.type === "circle") {
                this.circle(shape.x, shape.y, shape.width, shape.height, true, "white");

            } else if(shape.type === "line") {
                this.line(shape.x, shape.y, shape.pointX, shape.pointY, "white");

            } else if (shape.type === "pencil") {
                this.pencil(shape.points, "white");
            }
        })
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);

        this.canvas.addEventListener("mouseup", this.mouseUpHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }

    destroy() {
        this.canvas.removeEventListener('mousedown', this.mouseDownHandler);

        this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
        
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    }

    private mouseDownHandler = (e: MouseEvent) => {
        this.clicked = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        if (this.selectedTool === "pencil") {
            this.existingShapes.push({
                type: "pencil",
                points: [{ x: e.clientX, y: e.clientY }]
            });
        }
    }

    private mouseUpHandler = (e: MouseEvent) => {
        this.clicked = false;

        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        const pointX = e.clientX;
        const pointY = e.clientY;

        // const selectedTool = this.selectedTool;

        let shape: Shape | null = null;

        if(this.selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            };
        } else if(this.selectedTool === "circle") {
            shape = {
                type: "circle",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        } else if(this.selectedTool === "line") {
            shape = {
                type: "line",
                x: this.startX,
                y: this.startY,
                pointX,
                pointY
            }
        } else if(this.selectedTool === "pencil") {
            const currentShape = this.existingShapes[this.existingShapes.length - 1];
            console.log(currentShape);
            this.socket.send(JSON.stringify({
                type: "chat",
                roomId: this.roomId,
                message: JSON.stringify({
                    type: currentShape.type,
                    points: [...(currentShape as { type: "pencil"; points: { x: number; y: number }[] }).points]
                })
            }))
        }

        if(!shape) return;

        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            roomId: this.roomId,
            message: JSON.stringify(shape)
        }));
        // this.clearCanvas();
    }

    private mouseMoveHandler = (e: MouseEvent) => {
        if(!this.clicked) return;

        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        this.clearCanvas();
        this.ctx.strokeStyle = "white";
        const selectedTool = this.selectedTool;
        // console.log(selectedTool);

        if(this.selectedTool === "rect") {
            this.rect(this.startX, this.startY, width, height, true, "white");

        } else if(this.selectedTool === "circle") {
            this.circle(this.startX, this.startY, width, height, true, "white");

        } else if(this.selectedTool === "pencil") {
            const currentShape = this.existingShapes[this.existingShapes.length - 1] as Shape;

            // console.log(currentShape);
            (currentShape as { type: "pencil"; points: { x: number; y: number }[] }).points.push({ x: e.clientX, y: e.clientY });
            console.log((currentShape as { type: "pencil"; points: { x: number; y: number }[] }));
            this.pencil((currentShape as { type: "pencil", points: { x: number; y: number }[] }).points, "white");

        } else if(this.selectedTool === "line") {
            this.line(this.startX, this.startY, e.clientX, e.clientY, "white");

        }

    }

    private mouseMoveHandler2 = (e: MouseEvent) => {
        if(!this.clicked) return;

        if(this.selectedTool === "pencil") {

            const currentShape = this.existingShapes[this.existingShapes.length - 1] as Shape;
            (currentShape as { type: "pencil", points: { x: number, y: number }[] }).points.push({ x:e.clientX, y: e.clientY });
            this.pencil((currentShape as { type: "pencil", points: { x: number, y: number }[] }).points, "white");

        } else {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;

            const pointX = e.clientX;
            const pointY = e.clientY;

            this.clearCanvas();
            const selectedTool = this.selectedTool;

            if(selectedTool === "rect") {
                this.rect(this.startX, this.startY, width, height, true, "white");

            } else if(selectedTool === "circle") {
                this.circle(this.startX, this.startY, width, height, true, "white");

            } else if(selectedTool === "line") {
                this.line(this.startX, this.startY, pointX, pointY, "white");

            } else if(selectedTool === "pencil") {
                const currentShape = this.existingShapes[this.existingShapes.length - 1] as Shape;
                console.log(currentShape);
                (currentShape as { type: "pencil"; points: { x: number; y: number }[] }).points.push({ x: e.clientX, y: e.clientY });
                this.pencil((currentShape as { type: "pencil", points: { x: number; y: number }[] }).points, "white");
            }
        }
    }

    // add colors, and stroke width in future
    private rect(x: number, y: number, width: number, height: number, stroke: boolean, color: string) {
        stroke ? this.ctx.strokeStyle = color : this.ctx.fillStyle = color;
        this.ctx.strokeRect(x, y, width, height);
    }

    private circle(x: number, y: number, width: number, height: number, stroke: boolean, color: string) {

        const endX = x + width;
        const endY = y + height;

        const minX = Math.min(x, endX);
        const minY = Math.min(y, endY);

        // width/height will become negative if we move the cursor to the left/up, that's why we are taking Math.abs()
        const centerX = minX + Math.abs(width) / 2;
        const centerY = minY + Math.abs(height) / 2;

        const radiusX = Math.abs(width) / 2;
        const radiusY = Math.abs(height) / 2;


        // stroke ? this.ctx.strokeStyle = color : this.ctx.fillStyle = color;

        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);

        if(stroke) {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fill()
        }
        this.ctx.closePath();
        // stroke ? this.ctx.stroke() : this.ctx.fill();
        
    }

    private pencil(points: { x: number, y: number }[], color: string) {

        this.ctx.beginPath();
        
        this.ctx.moveTo(points[0].x, points[0].y);

        // for(let i=0; i < points.length; i++) {
        //     this.ctx.lineTo(points[i].x, points[i].y);
        // }
        points.forEach((point) => this.ctx.lineTo(point.x, point.y));

        this.ctx.strokeStyle = color;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    private line(x: number, y: number, pointX: number, pointY: number, color: string) {
        
        this.ctx.beginPath();
        
        this.ctx.moveTo(x, y);

        this.ctx.lineTo(pointX, pointY);

        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    

}