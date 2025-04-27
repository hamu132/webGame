class ClickManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.clickHandlers = [];
        this.canvas.addEventListener("click", (e) => {
            for (const h of this.clickHandlers) {
                h(e);
            }
        });
    }
    addClickHandler(handler) {
        this.clickHandlers.push(handler);
        //console.log(handler);
    }
}

export {ClickManager};