//what about document ready in vanilla?
document.body.onload = createSlider(document.body,100);

function createSlider(parent, R){
    var r = R*0.8;
    var pi = Math.PI; 
    var fi = -pi/2; //global?
    var x0 = (r+(R-r)/2)*Math.cos(pi/4);  
    var y0 = (r+(R-r)/2)*Math.sin(pi/4);
    var dh = (R - r) + 8; 
   

    var div_center = document.createElement("div");
    div_center.id = "center";
    parent.appendChild(div_center);
    div_center.style.position = "relative";
    var offsetWidth = document.getElementById('center').offsetWidth;
    var offsetHeight = document.getElementById('center').offsetHeight;

    console.log("offsetWidth", offsetWidth, "offsetHeight", offsetHeight);
    div_center.style.left = offsetWidth/2;
    //div_center.style.margin = "auto";


    var div_slider = document.createElement("div");
    div_slider.id = "slider";
    //div_slider.style.borderRadius = R+"px";
    div_center.appendChild(div_slider);

    var div_oCircle = document.createElement("div");
    div_oCircle.id = "outer_circle";
    div_oCircle.style.width=2*R+"px";
    div_oCircle.style.height=2*R+"px";
    div_oCircle.style.borderRadius = R+"px";
    div_oCircle.style.background = "#d3d3d3";
    div_oCircle.style.opacity = "0.6";
    div_slider.appendChild(div_oCircle);


    var div_iCircle = document.createElement("div");
    div_iCircle.id = "inner_circle";
    div_iCircle.style.width= 2*r+"px";
    div_iCircle.style.height= 2*r+"px";
    div_iCircle.style.borderRadius = r+"px";
    div_iCircle.style.background = "white";
    div_iCircle.style.opacity = "0.6";
    div_iCircle.style.position = "relative";
    div_iCircle.style.left = (R-r)+"px";
    div_iCircle.style.top= (R-r)+"px";
    div_oCircle.appendChild(div_iCircle);

    var div_handle = document.createElement("div");
    div_handle.id = "handle";
    div_handle.style.width= dh+"px";
    div_handle.style.height= dh +"px";
    div_handle.style.borderRadius = dh/2+"px";
    div_handle.style.background = "red";
    div_handle.style.border = "1px solid #a8a8a8";
    div_handle.style.position = "relative";
    div_handle.style.left= r + (r+(R-r)/2)*Math.cos(fi) - dh/2 +"px";  //x = r*cos(fi); 
    div_handle.style.top= r + (r+(R-r)/2)*Math.sin(fi) - dh/2 +"px";
    div_iCircle.appendChild(div_handle);
   
 
  }

  function handlePOsition(value){

  
  }
