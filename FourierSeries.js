// Canvas dimensions
const CANVAS_WIDTH = window.innerWidth ;
const CANVAS_HEIGHT = window.innerHeight - 4;

// Base radius
const BASE_RADIUS = CANVAS_WIDTH / 10;

// Amount of pixels where the sinusoid should be drawn
const SIGNAL_LOCATION_OFFSET = 300;

// Amount of circles 
const N = 5;

// Variables used at runtime 
let time = 0;
let wave = []

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
    // Set background color
    background(0);

    // Define radius and initial values 
    let x = 0;
    let y = 0;

    // Determine center of circle
    translate(CANVAS_WIDTH / 4, CANVAS_HEIGHT / 2);

    for(let i = 0; i < N; i++) 
    {
        // Save the previous x and y
        let prevx = x;
        let prevy = y;

        // Calculate the new dimensions and coordinates
        let n = i * 2 + 1;
        let radius = BASE_RADIUS * (4 / (n * PI));

        x += radius * cos(n * time);
        y += radius * sin(n * time);

        // Create a new circle around the previous coordinates
        noFill();
        stroke(127);
        circle(prevx, prevy, radius * 2);

        // Create the dot that loops over the new circle
        fill(255);
        circle(x, y, 10);

        // Draw a line from the previous circle to this circle
        line(prevx, prevy, x, y);
    }

    // Put the newly calculated height of the sine in the beginning of the wave array
    wave.unshift(y);

    // Draw a line from the circles to the place where the wave is drawn
    line(x, y, SIGNAL_LOCATION_OFFSET, y);

    // Draw the wave on the left side of the canvas
    noFill();
    stroke(255);
    beginShape();

    for(let i = 0; i < wave.length; i++)
    {
        vertex(SIGNAL_LOCATION_OFFSET + i, wave[i]);
    }

    endShape();

    // If we've got more data than fits in our canvas, we can forgot them
    if(wave.length > CANVAS_WIDTH - SIGNAL_LOCATION_OFFSET) 
    {
        wave.pop();
    }

    // Lets go counterclock wise 
    time -= 0.01
}