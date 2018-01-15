document.body.onload = demo();

function demo(){
  var w = document.documentElement.clientWidth;
  var parentContainer = document.createElement("div");
  var styles;
  if (w <= 600){
    styles = "width: " + (0.90*w) + "px; "
           + "height: " + (3/2*0.90*w) + "px; "
           + "background: #ededed; "
           + "position: absolute; ";
  } else {
    styles = "width: 600px; height: 400px; background: #ededed; "
           + "position: absolute; ";
  }
  parentContainer.setAttribute("style",styles);  //this line is needed -> to set width/height to the div
  styles = styles + setContainerAtTheCenterOfThePage(parentContainer);
  parentContainer.setAttribute("style",styles);
  document.body.appendChild(parentContainer);

  //-------locate valuesContainer and sliderContainer in table's columns-------
  var table = document.createElement('table');
  var tableStyle = "position: absolute; "
                 + "width: " + parentContainer.style.width +"; "
                 + "height: " + parentContainer.style.height +"; ";
  table.setAttribute("style",tableStyle);
  parentContainer.appendChild(table);


  if (w <= 600){
    var tr1 = document.createElement('tr');
    var tr1Style = "width: " + table.style.width + "; "
                 + "height: " + Number(table.style.height.slice(0, table.style.height.length-2))/3 +"px; "
                 + "position: relative; ";
    tr1.setAttribute("style", tr1Style);
    table.appendChild(tr1);

    var valuesContainer = document.createElement("div");
    var valuesContainerStyle = tr1Style;
    valuesContainer.setAttribute("style", valuesContainerStyle );
    tr1.appendChild(valuesContainer);

    var tr2 = document.createElement('tr');
    var tr2Style = "width: " + table.style.width + "; "
                 + "height: " + 2*Number(table.style.height.slice(0, table.style.height.length-2))/3 +"px; "
                 + "position: relative; ";
    tr2.setAttribute("style", tr2Style);
    table.appendChild(tr2);

    var sliderContainer = document.createElement("div");
    var sliderContainerStyle = tr2Style;
    sliderContainer.setAttribute("style",sliderContainerStyle );
    tr2.appendChild(sliderContainer);
  }

  else {
    var tr = document.createElement('tr');
    table.appendChild(tr);

    var td1 = document.createElement('td');
    var td1Style = "width: " + Number(table.style.width.slice(0, table.style.width.length-2))/3 +"px; "
                 + "height: " + table.style.height +"; "
                 + "position: relative; ";
    td1.setAttribute("style", td1Style);
    tr.appendChild(td1);

    var valuesContainer = document.createElement("div");
    var valuesContainerStyle = td1Style;
    valuesContainer.setAttribute("style", valuesContainerStyle + setDiv2InTheCenterOfDiv1(td1, valuesContainer));
    td1.appendChild(valuesContainer);

    var td2 = document.createElement('td');
    var td2Style = "width: " + 2*Number(table.style.width.slice(0, table.style.width.length-2))/3 +"px; "
                 + "height: " + table.style.height + "; "
                 + "position: relative; ";
    td2.setAttribute("style", td2Style);
    tr.appendChild(td2);

    var sliderContainer = document.createElement("div");
    var sliderContainerStyle = td2Style;
    sliderContainer.setAttribute("style",sliderContainerStyle);
    td2.appendChild(sliderContainer);
  }


  //----------------------------------------------------------------------------
  var valContArr = [];
  var RArr = [150, 120, 90, 60, 30];
  var maxArr = [800, 666, 516, 380, 240];
  var s = [null, null, null, null, null];
  var trackwidth = 20;
 var tn = [0,0,0,0,0]; //TODO: cleanup

  if (w <= 600){
    RArr = RArr.map(function(el){return el*w/440+30});
    trackwidth = w/(RArr.length*2+8);
  }

  for (let i = 0; i<5; i++){
    valContArr.push(document.createElement("div"));
    valuesContainer.appendChild(valContArr[i]);

    tn[i] =  document.createTextNode("");
    valContArr[i].appendChild(tn[i]);

    var options = { container: sliderContainer,
                     R: RArr[i],
                     max_value: maxArr[i],
                     min_value: 0,
                     step: 10,
                     color: "green",
                     valueCallback: function(v) {
                       tn[i].nodeValue = "$" + v;
                     },
                     trackwidth: trackwidth,
                  };
    s[i] = new Slider(options);
  }
}

function setContainerAtTheCenterOfThePage(div2){
  var w = window.innerWidth/2;
  var h = window.innerHeight/2;

   var div2HalfWidth = Number(div2.style.width.slice(0, div2.style.width.length -2))/2;
   var div2HalfHeight = Number(div2.style.height.slice(0, div2.style.height.length -2))/2;

  return style = "-moz-transform: translate(" + (w - div2HalfWidth) +"px, " + (h - div2HalfHeight)+"px); "
               + "-webkit-transform: translate(" + (w - div2HalfWidth) +"px, " + (h - div2HalfHeight)+"px); "
               + "-o-transform: translate(" + (w - div2HalfWidth) +"px, " + (h - div2HalfHeight)+"px); "
               + "-ms-transform: translate(" + (w - div2HalfWidth) +"px, " + (h - div2HalfHeight)+"px); " ;
}

function setDiv2InTheCenterOfDiv1(div1, div2){
  //!works only if width & height of two divs are set in px!
  var div1HalfWidth = Number(div1.style.width.slice(0, div1.style.width.length -2))/2;
  var div1HalfHeight = Number(div1.style.height.slice(0, div1.style.height.length -2))/2;

  var div2HalfWidth = Number(div2.style.width.slice(0, div2.style.width.length -2))/2;
  var div2HalfHeight = Number(div2.style.height.slice(0, div2.style.height.length -2))/2;

  return style = "-moz-transform: translate(" + (div1HalfWidth - div2HalfWidth) +"px, " + (div1HalfHeight - div2HalfHeight)+"px); "
               + "-webkit-transform: translate(" + (div1HalfWidth - div2HalfWidth) +"px, " + (div1HalfHeight - div2HalfHeight)+"px); "
               + "-o-transform: translate(" + (div1HalfWidth - div2HalfWidth) +"px, " + (div1HalfHeight - div2HalfHeight)+"px); "
               + "-ms-transform: translate(" + (div1HalfWidth - div2HalfWidth) +"px, " + (div1HalfHeight - div2HalfHeight)+"px); "
               + "transform: translate(" + (div1HalfWidth - div2HalfWidth) +"px, " + (div1HalfHeight - div2HalfHeight)+"px); ";
}

function Slider(options){

  var self = this;
  self.R = options.R;
  var R = self.R;
  if(!options.trackwidth)options.trackwidth=20;
  this.r = R - options.trackwidth;
  self.fi0 = Math.PI/2; //at fi = fi0 : psi = 0;
  self.fi = 0 ;
  var dir = 1; //direction of psi: "+1" - clockwise, "-1" - anticlockwise
  this.dh = options.trackwidth*1.08; //#handle size
  this.container = options.container;
  self.beingDragged = false;
  self.valueCallback = options.valueCallback;

  self.max_value = options.max_value ;
  self.min_value = options.min_value ;
  self.step = options.step;
  var max_value = self.max_value ;
  var min_value = self.min_value  ;
  self.value = self.min_value;
  var step = self.step ;
  this.psi_step = 2*Math.PI * step /(max_value - min_value) ;
  var a = (max_value - min_value)/(2*Math.PI);
  var b = min_value;

  var r = this.r;
  var dh = this.dh;
  var fi = self.fi;
  var fi0 = self.fi0;
  var psi_step = self.psi_step;

  self.divCenter = document.createElement("div");
  self.divCenterStyles  = "position: absolute; "
                      + "width: " + (2*R) +"px; "
                      + "height: " + (2*R) +"px; "
                      + "border-radius: " + R + "px; ";
  self.divCenter.setAttribute('style', self.divCenterStyles);
  self.divCenterStyles = self.divCenterStyles + setDiv2InTheCenterOfDiv1(self.container, self.divCenter);
  self.divCenter.setAttribute('style', self.divCenterStyles);
  self.container.appendChild(self.divCenter);


  self.divColorLeft = document.createElement("div");
  self.divColorLeftStyles  = "position: absolute; "
                      + "width: " + R +"px; "
                      + "height: " + (2*R) +"px; "
                      + "border-radius: " + R+"px 0 0 "+R+"px; "
                      + "background: green; ";
  self.divColorLeft.setAttribute('style', self.divColorLeftStyles);
  self.divCenter.appendChild(self.divColorLeft);

  self.divLeft = document.createElement("div");
  self.divLeftStyles  = "position: absolute; "
                      + "width: " + R +"px; "
                      + "height: " + (2*R) +"px; "
                      + "border-radius: " + R+"px 0 0 "+R+"px; "
                      + "background: grey; "
                      + "opacity: 0.8; ";
  self.divLeft.setAttribute('style', self.divLeftStyles);
  self.divColorLeft.appendChild(self.divLeft);

  self.divColorRight = document.createElement("div");
  self.divColorRightStyles  = "position: absolute; "
                       + "width: " + R +"px; "
                       + "height: " + (2*R) +"px; "
                       + "left: " + R +"px; "
                       + "border-radius: 0 "+R+"px "+R+"px 0; "
                       + "background: green; ";
   self.divColorRight.setAttribute('style', self.divColorRightStyles);
   self.divCenter.appendChild(self.divColorRight);

   self.divRight = document.createElement("div");
   self.divRightStyles  = "position: absolute; "
                        + "width: " + R +"px; "
                        + "height: " + (2*R) +"px; "
                        + "border-radius: 0 "+R+"px "+R+"px 0; "
                        + "background: grey; "
                        + "opacity: 0.8; ";
  self.divRight.setAttribute('style', self.divRightStyles);
  self.divColorRight.appendChild(self.divRight);

  //style - draw lines
  //used https://stackoverflow.com/a/5912283/8325614
  function createLineElement(x, y, length, angle) {
    self.line = document.createElement("div");
    var styles = 'border: 1px solid #ededed; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '
               + '-ms-transform: rotate(' + angle + 'rad); '
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + (x-R) + 'px; '
               + '-moz-transform-origin: top left; '
               + '-webkit-transform-origin: top left; '
               + '-o-transform-origin: top left; '
               + '-ms-transform-origin: top left; '
               /*to avoid dragability https://www.html5rocks.com/en/tutorials/dnd/basics/*/
               + '-moz-user-select: none; '
               + '-khtml-user-select: none; '
               + '-webkit-user-select: none; '
               + 'user-select: none; ';
    self.line.setAttribute('style', styles);
    self.divRight.appendChild(self.line);
    return self.line;
  }
  function drawLines(){
    var amountOfLines = Math.round((max_value - min_value)/step);
    for (var i = 0; i <= amountOfLines; i++ ){
      var angle = i* 2*Math.PI/amountOfLines;
      createLineElement(R, R, R, angle);
    }
  }
  drawLines();

  //mask
  self.div_iCircle = document.createElement("div");
  self.iCircleStyles  = "width: " + (2*r) +"px; "
                      + "height: " + (2*r) +"px; "
                      + "border-radius:" + r +"px; "
                      + "background: #ededed; "
                      + "left: " +(-r)+"px; "
                      + "top: " +(R-r)+"px; "
                      + "position: absolute; "
                      + '-moz-user-select: none; '
                      + '-khtml-user-select: none; '
                      + '-webkit-user-select: none; '
                      + 'user-select: none; ';
  self.div_iCircle.setAttribute('style', self.iCircleStyles);
  self.divRight.appendChild(this.div_iCircle);
  // distance to top left corner of div_iCircle from widow origin of coordinates
  // nice approach from here https://stackoverflow.com/a/33347664/8325614


  this.div_handle = document.createElement("div");
  self.handleStyles  = "width:" + dh+"px; "
                      + "height:" + dh +"px; "
                      + "border-radius:" + dh/2+"px; "
                      + "background: white; "
                      + "border: 1px solid #a8a8a8; "
                      + "position: relative; ";
  self.div_handle.setAttribute('style', self.handleStyles);
  this.div_iCircle.appendChild(this.div_handle);



  self.update = function(fi, v){
    var styles = self.handleStyles
                + 'left: ' + (r + (r+(R-r)/2)*Math.cos(fi) - dh/2) +"px; "
                + 'top: ' + (r - (r+(R-r)/2)*Math.sin(fi) - dh/2) +"px; ";

    self.div_handle.setAttribute('style', styles);

    self.fi = fi;
    self.value = v;
    self.valueCallback(self.value);
  }
  self.update(self.fi0, self.value);

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
    psi = (Math.round(psi/psi_step))*psi_step;
    return psi;
  }


  function fromPsiToValue(psi){
    return Math.round((a*psi +b)/step)*step;
  }
  function fromValueToPsi(value){
    return (value - b)/a;
  }

  function getFiV(x, y){
    var x0 = self.div_iCircle.getBoundingClientRect().left;
    var y0 = self.div_iCircle.getBoundingClientRect().top;
    //move handle to the coordinates
    fi = Math.atan2(-(y - y0 - self.r), x - x0 - self.r );

    var psi = fiToPsi(fi);
    var v = fromPsiToValue(psi);
    return [fi,v];
  }

  self.dragValidate = function (fi,v){
    // Validate the next update, so that we don't cross the origin

    var dv = v - self.value;
    if(Math.abs(dv)>0.5*(self.max_value - self.min_value)){
      fi = self.fi0;
      if( dv > 0 ){
        v = self.min_value;
      } else {
        v = self.max_value;
      }
    }
    return [fi, v];
  }

  /*
  // -----------CALLBACKS--------------------
  function click(e){
    if (!e){e = window.event;}
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if ( e.target == self.div_iCircle) {return;}
    // find mouse coordinates
    var x = e.clientX;
    var y = e.clientY;
    var FiV = getFiV(x, y);
    self.update(FiV[0], FiV[1]);
  }

  function drag(e){
    if (!e){e = window.event;}
    if(!self.beingDragged){return;}
    // find mouse coordinates
    var x = e.clientX;
    var y = e.clientY;
    var FiV = getFiV(x, y);
    FiV = self.dragValidate(FiV[0],FiV[1]);
    self.update(FiV[0], FiV[1]);
  }

  function enableDrag(e){
    self.beingDragged = true;
    window.onmousemove = drag;
  }

  function disableDrag (){
    self.beingDragged = false;
    window.onmousemove = undefined;
  }

  //------TOUCH CALLBACKS-------
  function touchClickStart(e){
    if (!e){e = window.event;}
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if( e.target !== self.div_oCircle ) return;
    var touches = e.changedTouches;
    // find finger's coordinates
    var x = e.changedTouches[0].clientX;
    var y = e.changedTouches[0].clientY;
    var FiV = getFiV(x, y);
    self.update(FiV[0], FiV[1]);
  }

  var xstart;
  var ystart;

  function touchStartDrag(e){
    self.div_oCircle.removeEventListener("touchstart", touchClickStart, {passive: true});
    //if (!e){ e = window.event;}
    if( e.target !== self.div_handle) return;
    // find finger coordinates
    xstart = e.changedTouches[0].clientX;
    ystart = e.changedTouches[0].clientY;

    self.div_handle.addEventListener("touchmove", touchMoveDrag, false);
    self.div_handle.addEventListener("touchend", touchEnd, {passive: true});
    self.div_handle.addEventListener("touchcancel", touchCancel, {passive: true});
  }

  function touchMoveDrag(e){
    e.preventDefault();
    e.stopPropagation();

    var x = e.changedTouches[0].clientX;
    var y = e.changedTouches[0].clientY;
    var FiV = getFiV(x, y);
    FiV = self.dragValidate(FiV[0],FiV[1]);
    self.update(FiV[0], FiV[1]);
  }

  function touchEnd(e){
    self.div_handle.removeEventListener("touchmove", touchMoveDrag, false);
    self.div_handle.removeEventListener("touchend", touchEnd, {passive: true});
    self.div_oCircle.addEventListener("touchstart", touchClickStart, {passive: true});
  }

  function touchCancel(e){
    var FiV=getFiV(xstart, ystart);
    self.update(FiV[0],FiV[1]);
    self.div_handle.removeEventListener("touchmove", touchMoveDrag, false);
    self.div_handle.removeEventListener("touchcancel", touchCancel, {passive: true});
    self.div_oCircle.addEventListener("touchstart", touchClickStart, {passive: true});
  }
  */
  // -----------ATTACH CALLBACKS------------
  /*
  this.div_oCircle.onclick = click;
  this.div_handle.onmousedown = enableDrag;

  window.onmouseup = disableDrag;

  // -----------ATTACH TOUCH CALLBACKS------------

  this.div_oCircle.addEventListener("touchstart", touchClickStart, {passive: true});


  this.div_handle.addEventListener("touchstart", touchStartDrag, {passive: true});
  */
  /*document.body.addEventListener("touchmove", function(event) {
      event.preventDefault();
      event.stopPropagation();
   }, false);*/

  /*touch events always target the element where that touch STARTED, while mouse events target
   the element currently under the mouse cursor.

   -> wait until you get a touchstart event and then add touchmove/touchend/touchcancel handlers
   to the target of the touchstart event (and remove them on end/cancel)
   https://www.html5rocks.com/en/mobile/touchandmouse/
  */

}
