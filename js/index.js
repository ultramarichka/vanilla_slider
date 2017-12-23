document.body.onload = demo();

//??how to make opacity in linear-gradient if I set color here
function demo(){
  new Slider(document.body, 100, 1000, 0, 50, '#fbe5f7');
}

function Slider(container, R, max_value, min_value, step, color){
  
  var self = this;
  this.r = R*0.8;
  self.fi0 = -Math.PI/2;
  self.fi = 0 ; 
  this.dh = (R - this.r) + 8; 
  this.container = container;
  self.beingDragged = false;
 
  this.fi_step = 2*Math.PI * step /(max_value - min_value) ;
  this.value1 = -(self.fi-Math.PI)/(2*Math.PI) *(max_value - min_value);

  var r = this.r;
  var dh = this.dh;
  var fi = self.fi;
  var fi0 = self.fi0; 
  var fi_step = self.fi_step;

  this.div_slider = document.createElement("div");
  this.div_slider.id = "slider";
  this.container.appendChild(this.div_slider);

  this.div_oCircle = document.createElement("div");
  this.div_oCircle.id = "outer_circle";
  this.div_oCircle.style.width=2*R+"px";
  this.div_oCircle.style.height=2*R+"px";
  this.div_oCircle.style.borderRadius = R+"px";
  this.div_oCircle.style.background = "#d3d3d3";
  this.div_oCircle.style.opacity = "0.6";
  this.div_slider.appendChild(this.div_oCircle);

  //used cheating variant of "conic-gradient" via linear-gradient https://stackoverflow.com/a/22859559/8325614
  //right half-circle hover
  this.div_oCircleHover = document.createElement("div");
  this.div_oCircleHover.style.width=R+"px";
  this.div_oCircleHover.style.height=2*R+"px";
  this.div_oCircleHover.style.borderRadius = R+"px 0 0 "+R+"px";
  this.div_oCircleHover.style.background = "linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) 100px)";
  this.div_oCircleHover.style.zIndex = "1";
  this.div_oCircle.appendChild(this.div_oCircleHover);
  
  //left half-circle hover
  this.div_oCircleHoverLeft = document.createElement("div");
  this.div_oCircleHoverLeft.style.width=R+"px";
  this.div_oCircleHoverLeft.style.height=2*R+"px";
  this.div_oCircleHoverLeft.style.right=-R+"px";
  this.div_oCircleHoverLeft.style.top=-2*R+"px";
  this.div_oCircleHoverLeft.style.borderRadius = "0 "+R+"px "+R+"px 0";
  this.div_oCircleHoverLeft.style.background = "linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5) )";
  this.div_oCircleHoverLeft.style.position = "relative";
  this.div_oCircleHoverLeft.style.zIndex = "2";
  this.div_oCircle.appendChild(this.div_oCircleHoverLeft);

  //mask
  this.div_iCircle = document.createElement("div");
  this.div_iCircle.id = "inner_circle";
  this.div_iCircle.style.width= 2*r+"px";
  this.div_iCircle.style.height= 2*r+"px";
  this.div_iCircle.style.borderRadius = r+"px";
  this.div_iCircle.style.background = "white";
  this.div_iCircle.style.position = "relative";
  this.div_iCircle.style.left = (R-r)+"px";
  this.div_iCircle.style.top= (R-r)+"px";
  this.div_iCircle.style.zIndex = "3"; 
  this.div_oCircleHover.appendChild(this.div_iCircle);
  // distance to top left corner of div_iCircle from widow origin of coordinates
  // nice approach from here https://stackoverflow.com/a/33347664/8325614
  var x0 = self.div_iCircle.getBoundingClientRect().left;
  var y0 = self.div_iCircle.getBoundingClientRect().top;
 

  this.div_handle = document.createElement("div");
  this.div_handle.id = "handle";
  this.div_handle.style.width= dh+"px";
  this.div_handle.style.height= dh +"px";
  this.div_handle.style.borderRadius = dh/2+"px";
  this.div_handle.style.background = "red";
  this.div_handle.style.border = "1px solid #a8a8a8";
  this.div_handle.style.position = "relative";
  this.div_handle.style.zIndex = "4"; 
  this.div_iCircle.appendChild(this.div_handle);

  this.values = document.createElement("div");
  this.container.appendChild(this.values);

  this.value_1 = document.createElement("div");
  this.value1 = (5*Math.PI/4)/(2*Math.PI) *(max_value - min_value);
  this.valueContent_1 = document.createTextNode(this.value1 + " of smth");
  this.value_1.appendChild(this.valueContent_1);  
  this.container.appendChild(this.value_1);
  
  self.update = function(fi){
    self.div_handle.style.left= r + (r+(R-r)/2)*Math.cos(fi + fi0) - dh/2 +"px";  //x = r*cos(fi); x-coordinate of the #handle
    self.div_handle.style.top= r + (r+(R-r)/2)*Math.sin(fi +fi0) - dh/2 +"px";   //y - coordinate of the #handle
  }
  self.update(5*Math.PI/4);

  function moveHandle(x, y){
    //move handle to the coordinates
    fi = Math.atan2(x - x0 - self.r , (y - y0 - self.r));
    fi = - Math.round(-(fi + Math.PI) / fi_step) * fi_step -Math.PI; 
    self.value1 = -(fi-Math.PI)/(2*Math.PI) *(max_value - min_value);
    console.log(self.value1, "value1");
   
    self.update(-(fi + Math.PI));

    if((fi + Math.PI) < Math.PI){
      self.div_oCircleHoverLeft.style.background = "linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5) )";
      self.div_oCircleHover.style.background = "linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) "+ ((y0 + 2*self.r +(R-r)/2) -y) +"px)";
    }
    if (((fi + Math.PI) > Math.PI) && ((fi + Math.PI) < 2*Math.PI)) {
      self.div_oCircleHover.style.background = "";
      self.div_oCircleHoverLeft.style.background = "linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0) "+ y  +"px)";
    }
  }

  // -----------CALLBACKS--------------------
  function click(e){
    if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if (( e.target !== self.div_oCircle) && (e.target !== self.div_oCircleHover) && (e.target !== self.div_oCircleHoverLeft)) {return;}
    // find mouse coordinates
    var x = e.pageX;
    var y = e.pageY;
    moveHandle(x, y);
  }

  function drag(e){
    if (!e){
      console.log(e);
      e = window.event;} 
    if(!self.beingDragged){return;}
    // find mouse coordinates
    var x = e.pageX;
    var y = e.pageY;
    moveHandle(x, y) 
  } 

  function enableDrag(e){
    self.beingDragged = true;
    window.onmousemove = drag;  
    drag(e);
  } 

  function disableDrag (){
    self.beingDragged = false;
    window.onmousemove = undefined;
  }
  
  //------TOUCH CALLBACKS-------
  function touchStart(e){
    e.preventDefault();
    if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if( e.target !== self.div_oCircle && e.target == self.div_oCircle && e.target !== self.div_oCircleHover && e.target !== self.div_oCircleHoverLeft) return;
    
    var touches = e.changedTouches;      
    // find finger's coordinates
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    moveHandle(x, y);
  }
  
  function touchDrag(e){
    if (!e){ e = window.event;} 
    if(!self.beingDragged){return;}
    // find finger coordinates
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    moveHandle(x, y);
  } 
 
  function enableTouchDrag(e){
    e.preventDefault();
    self.beingDragged = true;
    touchDrag(e);
  }
  function disableTouchDrag(e){
    e.preventDefault();
    self.beingDragged = false;
    self.div_handle.removeEventListener("touchmove", enableTouchDrag, false);
  }
 

  // -----------ATTACH CALLBACKS------------
  
  this.div_oCircle.onclick = click;
  this.div_oCircleHover.onclick = click;
  this.div_oCircleHoverLeft.onclick = click;
  this.div_handle.onmousedown = enableDrag;

  window.onmouseup = disableDrag; 

  this.div_oCircle.addEventListener("touchstart", touchStart, false);
  this.div_handle.addEventListener("touchstart", touchStart, false);

  /*touch events always target the element where that touch STARTED, while mouse events target 
   the element currently under the mouse cursor.

   -> wait until you get a touchstart event and then add touchmove/touchend/touchcancel handlers
   to the target of the touchstart event (and remove them on end/cancel)
   https://www.html5rocks.com/en/mobile/touchandmouse/
  */

}



  

