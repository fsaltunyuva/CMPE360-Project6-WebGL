# CMPE360 Computer Graphics

## Project 6 - Hello WebGL

### Step 1: Install a Web Server

Although many WebGL functionalities work without a web server, some tasks (e.g. reading a 
texture file) requires a web server running locally on your computer. If you have already worked 
with web servers, or use a Python environment, you may already have a web server installed 
on your computer. But there are many easy-to-use web servers that you may use. One example 
is XAMPP. 

### Step 2: Read the JavaScript / WebGL Tutorial 
[This website](http://learnwebgl.brown37.net/index.html) contains an introductory tutorial on 
JavaScript and Web programming (including HTML, DOM, events).  

In this step, read the Section 1 (“The Big Picture”), Section 2 (“Tools and Languages”), and 
Section 3 (“Model Data”). Section 3 is basically a review of what we discussed in the context 
of ray tracing, but it contains many useful information about how WebGL represent them.

### Step 3: Write a simple WebGL application
In this step, our goal is to get comfortable drawing with vertex buffers, uniforms and shaders 
by:
- drawing several things with separate draw commands 
- using different primitives  
- changing default line and point sizes  
- changing colors on the fly 

For this step, we will use the lab sheet at the following web page as the starting point: 
- [Points, Primitives and 2D Art](https://www.labs.cs.uregina.ca/315/WebGL2/Lab2/)
- [HTML Template](https://www.labs.cs.uregina.ca/315/WebGL2/Lab1/#HTML_TEMPLATE)
- [JavaScript Template](https://www.labs.cs.uregina.ca/315/WebGL2/Lab1/#JS_TEMPLATE)

1) **Draw a picture** that contains at least three of the various OpenGL 
primitives. It should look very different from any in-lab demonstrations. 
    - must use POINTS 
    - must use at least one line type: either LINES, LINE_STRIP, or LINE_LOOP (not 
including the line loop in the instructions above) 
    - must use at least one polygon type: either TRIANGLES, TRIANGLE_STRIP, or 
TRIANGLE_FAN (not including any geometry used as an in-lab demo)

2) **Use at least 3 different colors.** Do this with a uniform shader variable or a 
vertex color array input. 

3) **Use at least two point sizes.** A uniform must be set up to allow you to set the 
point size from JavaScript.

4) **Write code that would draw at least two different line sizes.** Tell us in a 
JavaScript comment whether or not it worked, and on what OS+graphics card 
combination. 

5) **Artistic impression** - your drawing should resemble something and reflect 
some effort. 

> [!TIP]
>  The circle function shown in the lab notes can easily be modified to create points for arbitrarily sized and centered circles. Using different sides arguments you can draw triangles, squares, pentagons, hexagons, etc. You can learn the size of the array you get back with its .length member. You can create a same size colour array with a loop. You can concatenate it with other arrays to add it to your array buffers. Its points should work well with both LINE_LOOP and TRIANGLE_FAN. TRIANGLES might produce a neat effect too... 
