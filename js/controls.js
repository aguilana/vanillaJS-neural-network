class Controls {
    constructor(controlType) {
        // set the default values for the controls to false (not pressed) when the object is created
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        switch (controlType) {
            case "KEYS":
                // add event listeners for the keydown and keyup events with # notation to make them private
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.up = true;
                break
        }
    }

    // add event listeners for the keydown and keyup events
    #addKeyboardListeners() {
        // add event listeners for the keydown and keyup events
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.up = true;
                    break;
                case "ArrowDown":
                    this.down = true;
                    break;
            }
            // console.table(this)
        }
        );

        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.up = false;
                    break;
                case "ArrowDown":
                    this.down = false;
                    break;
            }
            // console.table(this)

        }
        );

    }
}

export default Controls;