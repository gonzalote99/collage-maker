var currentlyDraggin;
var mode = 0;
var oldY;
var maxZ = 1;

$(window).load(function() {
  $("img").mousedown(startDragging);

  $("body").mousemove(whileDragging);

  $("body").mouseup(doneDragging);

  $("#toolchooser").change(changeMode);


});


function startDragging(e) {
  currentlyDraggin = $(this);

  if(!currentlyDraggin[0].degree)
  currentlyDraggin[0].degree = 0;

  if(mode == 3) {
    currentlyDraggin.css('z-index', maxZ);
    maxZ++


  }

  else if(mode == 4) {
    currentlyDraggin[0].parentElement.removeChild(currentlyDraggin[0])
  }

}


function whileDragging(e) {
if(currentlyDraggin == null) 
  return false;

  if(mode == 0) {
    var newY = e.pageY - 150;
    var newX = e.pageX - 150;

    currentlyDraggin.css({'margin-top': newY + 'px', 'margin-left': newX + 'px'});
  }

  else if(mode == 1) {
    if(e.pageY > oldY) {
      currentlyDraggin.css({height: '-=10%', width: '-=10%' })
    }
    else if(e.pageY < oldY) {
      currentlyDraggin.css({height: '+=10%', width: '+=10%'})
    }
    oldY = e.pageY
  }

  else if(mode == 2) {
    if(e.pageY > oldY) 
      currentlyDraggin[0].degree += 1;
    
      else if(e.pageY < oldY) 
      currentlyDraggin[0].degree -= 1;


      currentlyDraggin.css('transform', 'rotate(' + currentlyDraggin[0].degree + 'deg');

      oldY = e.pageY;


  }
}

function doneDragging(e) {
  currentlyDraggin = null;
}


function changeMode() {
  var selectedIndex = $(this)[0].selectedIndex;
   mode = selectedIndex;

}

if(window.FileReader) {
  window.addEventListener('load', function() {
    function cancel(e) {
      if(e.preventDefault) {e.preventDefault(); }
      return false;
    }
 
    document.body.addEventListener('dragover', cancel, false);
    document.body.addEventListener('dragcenter', cancel, false);

    document.body.addEventListener('drop', droppedImage, false);

  }, false);

} else {
  document.getElementById('status').innerHTML = 'browser not support';
};

function droppedImage(e) {
e.preventDefault();
var dt = e.dataTransfer;
var files = dt.files;
for(var i = 0; i < files.length; i++) {
  var file = files[i];
  var reader = new FileReader();

  reader.readAsDataURL(file);

  reader.addEventListener('loadend', function(e, file) {
    var bin = this.result;
    var img = document.createElement('div');
    img.file = file;
    img.src = bin;
    document.body.appendChild(img);

    $(img).attr('draggable', false);

    $(img).mousedown(startDragging);

  }.bindToEventHandler(file), false );
}
return false;
}

Function.prototype.bindToEventHandler = function bindToEventHandler() {
  var handler = this;
   var boundParameters = Array.prototype.slice.call(arguments);

   return function(e) {
     e = e || window.event;
     boundParameters.unshift(e);
     handler.apply(this, boundParameters);
   }
}

