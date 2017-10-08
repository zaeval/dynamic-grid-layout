function Digl(args) {
    this.defaultObj = '<div class="img_container"><span></span><img src=""/></div>';
    this.containObj;
    this.wrapperObj;
    this.containSize;
    this.objSize;
    this.gap;

    this.init(args.containSize, args.objSize, args.containObjId, args.wrapperObjId);
}

function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}
String.prototype.insertAt = function (index, string) {
    return this.substr(0, index) + string + this.substr(index);
}

function splitAtChar(s) {
    for (var i = 0; i < s.length; i++) {
        if ((s.charAt(i) >= 'A' && s.charAt(i) <= 'Z') || (s.charAt(i) >= 'a' && s.charAt(i) <= 'z')) {
            return [s.slice(0, i), s.slice(i)];
        }
    }
}

function addWithUnit(a, b) {
    if (splitAtChar(a)[1] != splitAtChar(b)[1]) {
        console.log("must be same unit");
        return undefined;
    }
    //must be same unit
    return parseInt(splitAtChar(a)[0]) + parseInt(splitAtChar(b)[0]) + splitAtChar(a)[1];
}

function divWithUnit(a, b) {
    if (splitAtChar(a)[1] != splitAtChar(b)[1]) {
        console.log("must be same unit");
        return undefined;
    }
    //must be same unit
    return parseInt(parseInt(splitAtChar(a)[0]) / parseInt(splitAtChar(b)[0])) + splitAtChar(a)[1];
}

function mulWithUnit(a, b) {
    if (splitAtChar(a)[1] != splitAtChar(b)[1]) {
        console.log("must be same unit");
        return undefined;
    }
    //must be same unit
    return parseInt(parseInt(splitAtChar(a)[0]) * parseInt(splitAtChar(b)[0])) + splitAtChar(a)[1];
}

function minWithUnit(a, b) {
    if (splitAtChar(a)[1] != splitAtChar(b)[1]) {
        console.log("must be same unit");
        return undefined;
    }
    //must be same unit
    return parseInt(splitAtChar(a)[0]) - parseInt(splitAtChar(b)[0]) + splitAtChar(a)[1];
}
Digl.prototype.init = function (containSize, objSize, containObjId, wrapperObjId, gap) {
    if (objSize === undefined) {
        objSize = '200px';
    }
    if (containSize === undefined) {
        containSize = '444px';
    }
    if (containObjId === undefined) {
        containObjId = 'digl';
    }
    if (wrapperObjId === undefined) {
        wrapperObjId = 'digl_wrapper';
    }
    if (gap === undefined) {
        var tempContainSize = splitAtChar(containSize);
        var tempObjSize = splitAtChar(objSize);
        var objColumn = parseInt(parseInt(tempContainSize[0]) / parseInt(tempObjSize[0]));
        var gapn = objColumn + 1;
        gap = (parseInt(tempContainSize[0]) - getScrollbarWidth() - objColumn * parseInt(tempObjSize[0])) / gapn + tempContainSize[1];
    }



    this.containSize = containSize;
    this.objSize = objSize;
    this.gap = gap;

    this.containObj = document.getElementById(containObjId);
    this.wrapperObj = document.getElementById(wrapperObjId);

    var temp = addWithUnit(this.gap, objSize);

    this.containObj.style.columnWidth = objSize;
    this.containObj.style.width = minWithUnit(mulWithUnit(divWithUnit(containSize, temp), temp), this.gap);
    this.containObj.style.columnGap = gap;

    this.wrapperObj.style.width = containSize;
    this.wrapperObj.style.height = containSize;

}

Digl.prototype.pushObjs = function (imgUrls) {
    var objsArray = new Array();
    for (var i = 0, len = imgUrls.length; i < len; i++) {

        objsArray[i] = this.defaultObj;
        objsArray[i] = objsArray[i].insertAt(50, imgUrls[i]);

        var tempNode = document.createElement('div');
        tempNode.innerHTML = objsArray[i];
        
        objsArray[i] = tempNode.firstChild;
        objsArray[i].style.width = this.objSize;
        objsArray[i].style.marginTop = this.gap;

        objsArray[i].getElementsByTagName('img')[0].onload = function () {
            this.parentNode.getElementsByTagName('span')[0].innerHTML = this.naturalWidth + 'X' + this.naturalHeight;
        }
        
        this.containObj.appendChild(objsArray[i]);
        
    }
}
