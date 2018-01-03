document.body.onload = demo();

//??how to make opacity in linear-gradient if I set color here
//not-rgb notation is not supported in safari https://css-tricks.com/thing-know-gradients-transparent-black/
function demo(){
  var valueContainer = document.createElement("div");
  document.body.appendChild(valueContainer);

  var sliderContainer = document.createElement("div");
  var styles = "width: 400px; height: 400px; background: yellow";
  sliderContainer.setAttribute("style",styles);
  document.body.appendChild(sliderContainer);

  var options = { container: sliderContainer,
                   R: 100,
                   max_value: 800,
                   min_value: 0,
                   step: 1,
                   color: "green",
                   valueContainer: valueContainer,
                   zIndex: 1
  };

  new Slider(options);
 
  options.R = 70;
  options.zIndex = 2;
  
  new Slider(options);
}


function Slider(options){

  var R = options.R;
  var self = this;
  this.r = R*0.8;
  self.fi0 = Math.PI/2; //at fi = fi0 : psi = 0;
  self.fi = 0 ; 
  var dir = 1; //direction of psi: "+1" - clockwise, "-1" - anticlockwise
  this.dh = (R - this.r) + 8; //#handle size
  this.container = options.container;
  self.beingDragged = false;
 
  var max_value = options.max_value ;
  var min_value = options.min_value ;
  var step = options.step;
  this.psi_step = 2*Math.PI * step /(max_value - min_value) ;
  var a = (max_value - min_value)/(2*Math.PI);
  var b = min_value;

  var r = this.r;
  var dh = this.dh;
  var fi = self.fi;
  var fi0 = self.fi0; 
  var psi_step = self.psi_step;

  //if valueContainer is not set -> create and set it to 'default'
  if(options.valueContainer){
    var valueContainer = options.valueContainer;
  } else {
    var valueContainer = document.createElement("div");
    this.container.appendChild(valueContainer);
  }
  

  this.div_slider = document.createElement("div");
  this.sliderStyles = "position: absolute; "
                    + "z-index: " + options.zIndex +"; "
                    + "top: 50%; "
                    + "left: 50%; "
                    +  "margin-right: -50%; "
                    + "transform: translate(-50%, -50%); "
                    + "-moz-transform: translate(-50%, -50%); ";
                   // + "margin: 0 auto; ";
  self.div_slider.setAttribute('style', self.sliderStyles); 
  this.container.appendChild(this.div_slider);

  this.div_oCircle = document.createElement("div");
  self.oCircleStyles  = "width: " + (2*R) +"px; "
                      + "height: " + (2*R) +"px; "
                      + "border-radius:" + R +"px; "
                      + "background: #d3d3d3; "
                      + "position: relative; "
                      + "z-index: 1; ";
  self.div_oCircle.setAttribute('style', self.oCircleStyles); 
  this.div_slider.appendChild(this.div_oCircle);

  //used cheating variant of "conic-gradient" via linear-gradient https://stackoverflow.com/a/22859559/8325614
  //right half-circle hover
  this.div_oCircleHover = document.createElement("div");
  self.oCircleHoverStyles  = "width: " + R +"px; "
                      + "height: " + (2*R) +"px; "
                      + "border-radius: " + R+"px 0 0 "+R+"px; "
                      + "-moz-background: linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) 100px); "
                      + "-webkit-background: linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) 100px); "
                      + "-o-background: linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) 100px); "
                      + "-ms-background: linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) 100px); "
                      + "z-index: 2; ";
  self.div_oCircleHover.setAttribute('style', self.oCircleHoverStyles); 
  this.div_oCircle.appendChild(this.div_oCircleHover);
  
  //right half-circle hover
  this.div_oCircleHoverRight = document.createElement("div");
  self.oCircleHoverRightStyles  = "width: " + R +"px; "
                      + "height: " + (2*R) +"px; "
                      + "right: " +(-R)+"px; "
                      + "top: " +(-2*R)+"px; "
                      + "border-radius: 0 "+R+"px "+R+"px 0; "
                      + "-moz-background: linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5)); "
                      + "-webkit-background: linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5)); "
                      + "-o-background: linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5)); "
                      + "-ms-background: linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5)); "
                      + "position: relative; "
                      + "z-index: 3; ";
  self.div_oCircleHoverRight.setAttribute('style', self.oCircleHoverRightStyles); 
  this.div_oCircle.appendChild(this.div_oCircleHoverRight);

  //mask
  self.div_iCircle = document.createElement("div");
  self.iCircleStyles  = "width: " + (2*r) +"px; "
                      + "height: " + (2*r) +"px; "
                      + "border-radius:" + r +"px; "
                      + "background: white; "
                      + "left: " +(R-r)+"px; "
                      + "top: " +(R-r)+"px; "
                      + "position: relative; "
                      + "z-index: 4; ";
  self.div_iCircle.setAttribute('style', self.iCircleStyles); 
  this.div_oCircleHover.appendChild(this.div_iCircle);
  // distance to top left corner of div_iCircle from widow origin of coordinates
  // nice approach from here https://stackoverflow.com/a/33347664/8325614
 

  this.div_handle = document.createElement("div");
  self.handleStyles  = "width:" + dh+"px; "
                      + "height:" + dh +"px; "
                      + "border-radius:" + dh/2+"px; "
                      + "background: red; "
                      + "border: 1px solid #a8a8a8; "
                      + "position: relative; "
                      + "z-index: 5; ";
  self.div_handle.setAttribute('style', self.handleStyles); 
  this.div_iCircle.appendChild(this.div_handle);
 
  this.value = document.createElement("div");
  this.initValue = fromPsiToValue(fiToPsi(fi0));
  this.valueTextNode = document.createTextNode("$" + this.initValue);
  valueContainer.appendChild(this.valueTextNode);  

  //style - draw lines
  //used https://stackoverflow.com/a/5912283/8325614
  function createLineElement(x, y, length, angle) {
    self.line = document.createElement("div");
    var styles = 'border: 1px solid black; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; '
               + 'zIndex: 1';
    self.line.setAttribute('style', styles); 
    self.div_oCircle.appendChild(self.line); 
    return self.line;
  } 
  function drawLines(){
    for (var i = 0; i<40; i++ ){
      var angle = i* 2* Math.PI/40;
      createLineElement(0, R, 2*R, angle);
    }
  }
  drawLines();


  self.update = function(fi){
    var styles = self.handleStyles 
                + 'left: ' + (r + (r+(R-r)/2)*Math.cos(fi) - dh/2) +"px; "   
                + 'top: ' + (r - (r+(R-r)/2)*Math.sin(fi) - dh/2) +"px; "; 
       
    self.div_handle.setAttribute('style', styles);
  }
  self.update(Math.PI/2);

  function fiToPsi(fi){   
  /**
   * linear transform from fi [-pi, pi] to psi[0, 2pi] - set origin and direction (anti)clockwise
   */ 
    var psi = 0;
    if (dir > 0){
      if(fi0 < fi && fi <= Math.PI){
        psi = -dir*fi + dir*fi0 + 2*Math.PI;           
      } 
      if(-Math.PI <= fi && fi <= fi0){
        psi = -dir*fi + dir*fi0;
      }     
    }
    if (dir < 0){
      if(-Math.PI<= fi && fi<=fi0){
        psi = -dir*fi + dir*fi0+2*Math.PI;
      }   
      if(fi0<fi && fi<=Math.PI){
        psi = -dir*fi + dir*fi0;
      }     
    }
    return psi; 
  }

  
  function fromPsiToValue(psi){
    return Math.round((a*psi +b)/step)*step;  
  }
  function fromValueToPsi(value){
    return (value - b)/a;   
  }

  function moveHandle(x, y){
    var x0 = self.div_iCircle.getBoundingClientRect().left;
    var y0 = self.div_iCircle.getBoundingClientRect().top;
    //move handle to the coordinates
    fi = Math.atan2(-(y - y0 - self.r), x - x0 - self.r );
    
    var psi = fiToPsi(fi);
    psi = (Math.round(psi/psi_step))*psi_step;
    self.value = fromPsiToValue(psi);
    
    self.valueTextNode.nodeValue = "$"+ self.value ;
    self.update(fi);

    /*
    if( -Math.PI/2 <fi < Math.PI/2){
      self.div_oCircleHoverRight.style.background = "-moz-linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.5) )";
      self.div_oCircleHover.style.background = "-moz-linear-gradient(0deg, rgb(0,255,0,0.5), rgb(0,255,0,0) "+ y -(y0 + 2*self.r +(R-r)/2) +"px)";
    }
    if (-Math.PI < fi < -Math.PI/2 ||  Math.PI > fi > Math.PI/2) {
      self.div_oCircleHover.style.background = "";
      self.div_oCircleHoverRight.style.background = "-moz-linear-gradient(180deg, rgb(0,255,0,1), rgb(0,255,0,0.4) "+ y  +"px, transparent " + y0 +R-r+"px)";
    }*/
  }

  // -----------CALLBACKS--------------------
  function click(e){
    if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if (( e.target !== self.div_oCircle) && (e.target !== self.div_oCircleHover) && (e.target !== self.div_oCircleHoverRight)) {return;}
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
    moveHandle(x, y); 
  } 

  function enableDrag(e){
    //http://www.javascripter.net/faq/canceleventbubbling.htm
    if (e.stopPropagation)    e.stopPropagation();
    if (!e.cancelBubble) e.cancelBubble = true;
    self.beingDragged = true;
    window.onmousemove = drag; 
    //drag(e);
  } 

  function disableDrag (){
    self.beingDragged = false;
    window.onmousemove = undefined;
  }
  
  //------TOUCH CALLBACKS-------
  function touchClickStart(e){
    //??
    if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if( e.target !== self.div_oCircle || e.target !== self.div_oCircleHover || e.target !== self.div_oCircleHoverRight) return;
    console.log("touchclick");
    var touches = e.changedTouches;      
    // find finger's coordinates
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    moveHandle(x, y);
  }
  
  var xstart;
  var ystart;

  function touchStartDrag(e){
    self.div_oCircle.removeEventListener("touchstart", touchClickStart, {passive: true});
    //if (!e){ e = window.event;} 
    if( e.target !== self.div_handle) return;
    // find finger coordinates
    xstart = e.changedTouches[0].pageX;
    ystart = e.changedTouches[0].pageY;
    
    self.div_handle.addEventListener("touchmove", touchMoveDrag, {passive: true});
    self.div_handle.addEventListener("touchend", touchEnd, {passive: true});
    self.div_handle.addEventListener("touchcancel", touchCancel, {passive: true});
  } 
 
  function touchMoveDrag(e){
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    moveHandle(x, y);
   
  }

  function touchEnd(e){
    self.div_handle.removeEventListener("touchmove", touchMoveDrag, {passive: true});
    self.div_handle.removeEventListener("touchend", touchEnd, {passive: true});
    self.div_oCircle.addEventListener("touchstart", touchClickStart, {passive: true});
  }

  function touchCancel(e){
    moveHandle(xstart, ystart);
    self.div_handle.removeEventListener("touchmove", touchMoveDrag, {passive: true});
    self.div_handle.removeEventListener("touchcancel", touchCancel, {passive: true});
    self.div_oCircle.addEventListener("touchstart", touchClickStart, {passive: true});
  }

  // -----------ATTACH CALLBACKS------------
  
  this.div_oCircle.onclick = click;
  this.div_handle.onmousedown = enableDrag;

  window.onmouseup = disableDrag; 
  
  // -----------ATTACH TOUCH CALLBACKS------------

  this.div_oCircle.addEventListener("touchstart", touchClickStart, {passive: true});
  
  
  this.div_handle.addEventListener("touchstart", touchStartDrag, {passive: true});

  /*touch events always target the element where that touch STARTED, while mouse events target 
   the element currently under the mouse cursor.

   -> wait until you get a touchstart event and then add touchmove/touchend/touchcancel handlers
   to the target of the touchstart event (and remove them on end/cancel)
   https://www.html5rocks.com/en/mobile/touchandmouse/
  */

}



  

