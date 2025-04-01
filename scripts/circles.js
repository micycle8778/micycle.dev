function randomNumber(start, end) {
    return start + (Math.random() * (end - start));
}

function lerp(start, end, t) {
    t = Math.min(1., Math.max(0., t));
    return start + t * (end - start);
}

const canvas = document.getElementById("pfp-canvas");
const ctx = canvas.getContext("2d");

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.initialX = x;
        this.initialY = y;

        this.neighbors = [];
    }

    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    transformedX() {
        return canvas.width * this.x;
        // return lerp(pointRadius * 2, canvas.width - pointRadius * 2, this.x);
    }

    transformedY() {
        return canvas.height * this.y;
        // return lerp(pointRadius * 2, canvas.height - pointRadius * 2, this.y);
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
    }
}

const json = '[{"x":0.8984375,"y":0.2684049079754601},{"x":0.9359375,"y":0.4003067484662577},{"x":0.9659375,"y":0.549079754601227},{"x":0.9239583333333333,"y":0.7868098159509203},{"x":0.8833333333333333,"y":0.5782208588957055},{"x":0.759375,"y":0.41411042944785276},{"x":0.8010416666666667,"y":0.8006134969325154},{"x":0.7739583333333333,"y":0.5966257668711656},{"x":0.6338541666666667,"y":0.38650306748466257},{"x":0.70625,"y":0.6088957055214724},{"x":0.671875,"y":0.8496932515337423},{"x":0.17083333333333334,"y":0.31901840490797545},{"x":0.020833333333333332,"y":0.3880368098159509},{"x":0.2552083333333333,"y":0.348159509202454},{"x":0.365625,"y":0.4432515337423313},{"x":0.19635416666666666,"y":0.4785276073619632},{"x":0.027604166666666666,"y":0.7346625766871165},{"x":0.128125,"y":0.6395705521472392},{"x":0.12083333333333333,"y":0.8190184049079755},{"x":0.378125,"y":0.6733128834355828},{"x":0.290625,"y":0.602760736196319},{"x":0.2984375,"y":0.8604294478527608}]'
const pointRadius = 25;
const points = [new Point(.5, .5)];

// parse json
for (const obj of JSON.parse(json)) {
    points.push(new Point(obj.x, obj.y));
}

// create neighbors
for (let idx = 0; idx < points.length; idx++) {
    const p = points[idx];
    const sorted = points.toSorted((p1, p2) => {
        if (p1.equals(p)) return 1;
        if (p2.equals(p)) return -1;
        return p1.distance(p) - p2.distance(p);
    })

    p.neighbors.push(sorted[0]);
    p.neighbors.push(sorted[1]);
    if (idx == 0) {
        p.neighbors.push(sorted[2]);
        p.neighbors.push(sorted[3]);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#121212";
    ctx.strokeStyle = "#ffc";
    ctx.lineWidth = 3;

    for (const point of points) {
        for (const n of point.neighbors) {
            ctx.beginPath();
            ctx.moveTo(point.transformedX(), point.transformedY());
            ctx.lineTo(n.transformedX(), n.transformedY());
            ctx.stroke();
            ctx.closePath();
        }
    }

    for (const point of points) {
        const dist = point.distance(new Point(.5, .5));
        const radius = lerp(1.5, .25, dist) * 0.0299;

        ctx.beginPath()
        ctx.arc(
            point.transformedX(),
            point.transformedY(),
            radius * canvas.height,
            0,
            2 * Math.PI
        );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

let intervalId = -1;
const observer = new ResizeObserver(() => {
    canvas.width = canvas.offsetWidth * 2.;
    canvas.height = canvas.offsetHeight * 2.;

    draw();
});

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
observer.observe(canvas);

let flag = false;
let lastX = 0;
let lastY = 0;
document.body.addEventListener("mousemove", e => {
    if (flag) {
        const dX = (e.clientX - lastX) / canvas.width;
        const dY = (e.clientY - lastY) / canvas.height;

        for (const point of points) {
            const dist = point.distance(new Point(.5, .5));
            const mul = lerp(.02, .0, dist);
            point.x += dX * mul;
            point.y += dY * mul;
        }

        points[0].x = .5;
        points[0].y = .5;

        draw();
    }

    lastX = e.clientX;
    lastY = e.clientY;
    flag = true;
    // console.log(`Screen X/Y: ${e.screenX}, ${e.screenY}; Client X/Y: ${e.clientX}, ${e.clientY}; `)
});

onresize = () => {
    console.log("resize");
    for (const point of points) {
        point.reset();
    }
}

// circle tool

// canvas.addEventListener("contextmenu", e => {
//     const mousePos = new Point(e.offsetX / canvas.width, e.offsetY / canvas.height);
//     e.preventDefault();
//     // sort points descending from mouse pos
//     points.sort((p1, p2) => {
//         const dist1 = p1.distance(mousePos);
//         const dist2 = p2.distance(mousePos);
//         return dist2 - dist1;
//     });
//
//     points.pop(); // remove closest point
//     draw();
// });
//
// canvas.addEventListener("click", e => {
//     if (e.button == 0) {
//         const point = new Point(e.offsetX / canvas.width, e.offsetY / canvas.height);
//         points.push(point);
//         draw();
//     }
// });
//
// function dumpCircles() {
//     console.log(JSON.stringify(points.map(p => { 
//         p.neighbors = undefined;
//         return p; 
//     })));
// }
