

export function initDraw(canvas: HTMLCanvasElement) {

    // ctx stands for context
    const ctx = canvas.getContext("2d");

    if(!ctx) return;

    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log(e.clientX);
        console.log(e.clientY);
    });
    
    canvas.addEventListener("mousemove", (e) => {
        if(clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(256, 256, 256, 1)";
            ctx.strokeRect(startX, startY, width, height);
        }
    });

}