//what about document ready in vanilla?
document.body.onload = createHtml;

  function createHtml(){
/*
    
meta.httpEquiv = "X-UA-Compatible";
meta.content = "IE=edge";
document.getElementsByTagName('head')[0].appendChild(meta); -SO

var meta=document.createElement('meta');
meta.name='viewport';
meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
document.getElementsByTagName('head')[0].appendChild(meta); - Github
 */
    var body = document.getElementsByTagName("body");

    var div_container = document.createElement("div");
    div_container.id = "container";
    body.appendChild(div_container);

    var div_values = document.createElement("div");
    div_values.id = "values";
    div_container.appendChild(div_values);

    for (var i=0; i<5; i++){
      var div = document.createElement("div");
      div.id = "value_" + i;
      console.log(div.id);
      div_values.appendChild(div);
    }

    var div_slider = document.createElement("div");
    div_slider.id = "slider";
    div_container.appendChild(div_slider);

    var div_oCircle = document.createElement("div");
    div_oCircle.id = "outer_cicrle";
    div_slider.appendChild(div_oCircle);

    var div_iCircle = document.createElement("div");
    div_iCircle.id = "inner_cicrle";
    div_slider.appendChild(div_iCircle);

    var div_handle = document.createElement("div");
    div_handle.id = "handle";
    div_slider.appendChild(div_handle);
    
    function center() {                            //function to centrelise my div
      var offsetWidth = document.getElementById('center').offsetWidth;
      var offsetHeight = document.getElementById('center').offsetHeight;

      console.log("offsetWidth", offsetWidth, "offsetHeight", offsetHeight);

      var container = document.getElementById('container');

      container.setAttribute = ("style", "position : absolute; left : 50%; top : 50%;" );
      container.style.marginLeft  = offsetWidth/2;
      container.style.marginTop  = offsetHeight/2;
    }
    center();
 
  }
  createHtml();
