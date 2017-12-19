document.body.onload = demo();

function demo(){
  new Slider(document.body, 99);
}

function Slider(parent, R){
  this.r = R*0.8;
  this.fi = 0; 
  this.dh = (R - this.r) + 8; 
  this.parent = parent;

  var r = this.r;
  var dh = this.dh;
  var fi = this.fi; 

  this.div_slider = document.createElement("div");
  this.div_slider.id = "slider";
  this.parent.appendChild(this.div_slider);

  this.div_oCircle = document.createElement("div");
  this.div_oCircle.id = "outer_circle";
  this.div_oCircle.style.width=2*R+"px";
  this.div_oCircle.style.height=2*R+"px";
  this.div_oCircle.style.borderRadius = R+"px";
  this.div_oCircle.style.background = "#d3d3d3";
  this.div_oCircle.style.opacity = "0.6";
  this.div_slider.appendChild(this.div_oCircle);


  this.div_iCircle = document.createElement("div");
  this.div_iCircle.id = "inner_circle";
  this.div_iCircle.style.width= 2*r+"px";
  this.div_iCircle.style.height= 2*r+"px";
  this.div_iCircle.style.borderRadius = r+"px";
  this.div_iCircle.style.background = "white";
  this.div_iCircle.style.opacity = "0.6";
  this.div_iCircle.style.position = "relative";
  this.div_iCircle.style.left = (R-r)+"px";
  this.div_iCircle.style.top= (R-r)+"px";
  this.div_oCircle.appendChild(this.div_iCircle);

  this.div_handle = document.createElement("div");
  this.div_handle.id = "handle";
  this.div_handle.style.width= dh+"px";
  this.div_handle.style.height= dh +"px";
  this.div_handle.style.borderRadius = dh/2+"px";
  this.div_handle.style.background = "red";
  this.div_handle.style.border = "1px solid #a8a8a8";
  this.div_handle.style.position = "relative";
  
  this.div_iCircle.appendChild(this.div_handle);

  var self = this;
  
  self.update = function(fi){
    self.fi = fi;
    self.div_handle.style.left= r + (r+(R-r)/2)*Math.cos(fi) - dh/2 +"px";  //x = r*cos(fi); 
    self.div_handle.style.top= r + (r+(R-r)/2)*Math.sin(fi) - dh/2 +"px";
  }
  self.update(0);

  // -----------CALLBACKS--------------------
  function click(e){
    if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if( e.target !== self.div_oCircle) return;
    // find mouse coordinates
    var x = e.pageX ;
    var y = e.pageY ;
    // find center of the circle in widow coordinates
    // nice approach from here https://stackoverflow.com/a/33347664/8325614
    var x0 = self.div_iCircle.getBoundingClientRect().left;
    var y0 = self.div_iCircle.getBoundingClientRect().top;
    //move handle to the coordinates
    fi = Math.atan2(x - x0 - self.r , (y - y0 - self.r));
    self.update(-fi+Math.PI/2);
  } 

  function drag(){} 

  // -----------ATTACH CALLBACKS------------
  this.div_oCircle.onclick = click;



}



  

