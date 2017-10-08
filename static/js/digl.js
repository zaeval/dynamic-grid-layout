var defaultObj = '<div class="img_container"><span></span><img src=""/></div>';
var containObj;
var wrapperObj;
var containSize = '433px';
var objSize = '200px';

String.prototype.insertAt=function(index, string) { 
  return this.substr(0, index) + string + this.substr(index);
}
function realImgDimension(imgSrc) {
    var i = new Image();
    i.src = imgSrc;
    return {
        naturalWidth: i.width, 
        naturalHeight: i.height
    };
}
function init(){
    containObj = document.getElementById('digl');
    wrapperObj = document.getElementById('digl_wrapper');
    
    containObj.style.maxWidth = containSize;
    containObj.style.columnWidth = objSize;
    
    wrapperObj.style.width = containSize;
    wrapperObj.style.height = containSize;

}
function initObjs(imgUrls){
    var objsArray = new Array();
    for ( var i = 0, len = imgUrls.length; i < len; i++ ){
        
        objsArray[i] = defaultObj;
        objsArray[i] = objsArray[i].insertAt(50,imgUrls[i]);
        
        var temp = realImgDimension(imgUrls[i]);
        objsArray[i] = objsArray[i].insertAt(33,temp.naturalWidth + 'X' + temp.naturalHeight);
        
        var tempNode = document.createElement('div');
        tempNode.innerHTML = objsArray[i];
        objsArray[i] = tempNode.firstChild;
        objsArray[i].style.width = objSize;
        
        containObj.appendChild(objsArray[i]);
    }
    console.log(objsArray);
}
