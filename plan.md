1. Done - Make an html structure: container -> div#slider ->div#inner_circle, div#outer_circle, div#icon_circle,
   div#values, div#val_1, ...
2. DOne - Make circles in css,
3. Add js
   - add coordinates dependency for #handle

   ? how to make not clickable space(corners of the rectangle) in a div#slider but not in the circle
   * What events are we going to listen to
   ** Slider on click => Immediate update
   ** Handle on Mousedown => Activate updates <= This may be necessary - I don't know
   ** Handle on Drag => Calculate the angle and update accordingly <= This one is necessary
   *** How to recieve mouse coordinates during dragging?
   ** Handle on release => Deactivate updates <= May be unncessary
   
   * How to update?
   ** Must be changes in some css values of the handle div
   *** Is it position?
   *** Is it transform?
   *** Ignore handle rotation for now - it is round anyway,nobody will notice
  
4. Fix bugs
5. Add style: colors, lines etc
6. Refactor to create all DOM elements with a single JS function call
7. Maybe: refactor into a class.
8. Centralize #slider
9. Compatibilities w/other browsers (ex., -webkit-border-radius: 80px; ...)

