
function initializeWebGL(canvasId) {
    const canvas = document.getElementById(canvasId);
    const gl = canvas.getContext("webgl2");
    return gl;
}

function initShaders(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    return program;
}

function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}

function createBuffer(gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
}

function drawShape(gl, program, buffer, colorBuffer, count, mode, pointSize, lineWidth) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set color attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const colorLocation = gl.getAttribLocation(program, "a_color");
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

    // Set point size (iii. Part)
    const pointSizeLocation = gl.getUniformLocation(program, "u_pointSize");
    gl.uniform1f(pointSizeLocation, pointSize);

    // Set line width if the mode is LINES (iv. Part)
    if (mode === gl.LINES || mode === gl.LINE_LOOP || mode === gl.LINE_STRIP) {
        gl.lineWidth(lineWidth);
    }
    
    gl.drawArrays(mode, 0, count);
}

function main() {
    const gl = initializeWebGL("webgl-canvas");
    if (!gl) return;

    gl.clearColor(0.78, 0.64, 0.78, 1.0); // Set background color
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    const vertexShaderSource = `#version 300 es
        in vec2 a_position;
        in vec4 a_color;
        uniform float u_pointSize;
        out vec4 v_color;

        void main() {
            gl_PointSize = u_pointSize; 
            gl_Position = vec4(a_position, 0.0, 1.0); 
            v_color = a_color; 
        }
    `;
    const fragmentShaderSource = `#version 300 es
        precision mediump float;
        in vec4 v_color;
        out vec4 fragColor;

        void main() {
            fragColor = v_color; 
        }
    `;

    const program = initShaders(gl, vertexShaderSource, fragmentShaderSource);

    // Triangle data 
    const triangleVertices = [
         0.0,  0.3,  
        -0.3, -0.3,   
         0.3, -0.3    
    ];
    const triangleColors = [
        0.5, 0.0, 0.5, 1.0,  
        0.5, 0.0, 0.5, 1.0,  
        0.5, 0.0, 0.5, 1.0    
    ];
    const triangleBuffer = createBuffer(gl, triangleVertices);
    const triangleColorBuffer = createBuffer(gl, triangleColors);
    drawShape(gl, program, triangleBuffer, triangleColorBuffer, 3, gl.TRIANGLES, 10.0);

    // Thin lines data 
    const thinLineVertices = [
        // Left eye of the face
        -0.4,  0.3,
        -0.4, 0.8,
        // Right eye of the face
        0.4,  0.3,
        0.4, 0.8
    ];
    const thinLineColors = [
        0.0, 0.0, 1.0, 1.0, // Blue color
        0.0, 0.0, 1.0, 1.0, // Blue color

        0.0, 0.0, 1.0, 1.0, // Blue color
        0.0, 0.0, 1.0, 1.0 // Blue color
    ];
    const thinLineBuffer = createBuffer(gl, thinLineVertices); // Create buffer for thin line vertices (even though it is not thin)
    const thinLineColorBuffer = createBuffer(gl, thinLineColors); // Create buffer for thin line colors (even though it is not thin)
    drawShape(gl, program, thinLineBuffer, thinLineColorBuffer, 4, gl.LINES, 10.0, 0.5); // Thin line with width 0.5 (iv. Part)

    const thickLineVertices = [
        // Left part of the mouth
        -0.2, -0.7,
        0.2, -0.7,
        // Middle part of the mouth
        -0.2, -0.7,
        -0.4, -0.6,
        // Right part of the mouth
        0.2, -0.7,
        0.4, -0.6
    ];
    const thickLineColors = [
        1.0, 0.0, 0.0, 1.0, // Red color
        1.0, 0.0, 0.0, 1.0, // Red color

        1.0, 0.0, 0.0, 1.0, // Red color
        1.0, 0.0, 0.0, 1.0, // Red color

        1.0, 0.0, 0.0, 1.0, // Red color
        1.0, 0.0, 0.0, 1.0 // Red color
    ];
    const thickLineBuffer = createBuffer(gl, thickLineVertices); // Create buffer for thick line vertices (even though it is not thick)
    const thickLineColorBuffer = createBuffer(gl, thickLineColors); // Create buffer for thick line colors (even though it is not thick)
    drawShape(gl, program, thickLineBuffer, thickLineColorBuffer, 6, gl.LINES, 10.0, 1.0); // Thick line with width 1.0 (iv. Part)

    /* We tried to change line with size, but it did not work
       We also tried these but result did not change:
       drawShape(gl, program, thinLineBuffer, thinLineColorBuffer, 2, gl.LINES, 10.0, 0.1);
       drawShape(gl, program, thinLineBuffer, thinLineColorBuffer, 2, gl.LINES, 10.0, 0.8);
       drawShape(gl, program, thinLineBuffer, thinLineColorBuffer, 2, gl.LINES, 10.0, 100.0);

       We tried this on Windows 11 and RTX3070 GPU.
    */

    // Top point data 
    const topPointVertex = [
         0.0,  0.3
    ];
    const topPointColor = [
        0.6, 0.8, 1.0, 1.0  
    ];
    const topPointBuffer = createBuffer(gl, topPointVertex);
    const topPointColorBuffer = createBuffer(gl, topPointColor);
    drawShape(gl, program, topPointBuffer, topPointColorBuffer, 1, gl.POINTS, 15.0); // Point with size 15.0 (iii. Part)

    // Bottom points data 
    const bottomPointsVertices = [
        -0.3, -0.3,  
         0.3, -0.3   
    ];
    const bottomPointsColors = [
        0.6, 0.8, 1.0, 1.0,  
        0.6, 0.8, 1.0, 1.0   
    ];
    const bottomPointsBuffer = createBuffer(gl, bottomPointsVertices);
    const bottomPointsColorBuffer = createBuffer(gl, bottomPointsColors);
    drawShape(gl, program, bottomPointsBuffer, bottomPointsColorBuffer, 2, gl.POINTS, 10.0); // Points with size 10.0 (iii. Part)
}

main();