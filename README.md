# dynamic-image-grid-layout 

* digl.js
* digl.css
* demo.css
* 01.jpeg
* 02.jpeg
* 03.jpeg
* 04.jpeg
* 05.jpeg
* 06.jpeg

# structure

```
wrapper    
│
└───containner
    │  
    └───obj1
    │   │   
    │   │   span
    │   └───img
    │  
    └───obj2
    │   │   
    │   │   span
    │   └───img
    │  
    └───obj3
    │   │   
    │   │   span
    │   └───img
    └───... 
```

# How 2 use

1. insert this code **<script> tag** in **head tag**

```html
<head>

  ...

  <script src="https://raw.githubusercontent.com/zaeval/dynamic-image-grid-layout/master/static/js/digl.js"></script>
  
  ...

</head>
```

2. insert like this code bottom of **body tag** 

```html
<script>
        var args = {
            containSize: "444px",
            objSize: "200px",
            containObjId: "digl",
            wrapperObjId: "digl_wrapper",
            gap: "5px",
        };
        var digl = new Digl(args);
        digl.pushObjs(['static/img/01.jpg', 'static/img/02.jpg', 'static/img/03.jpg', 'static/img/04.jpg', 'static/img/05.jpg', 'static/img/06.jpg']);
</script>
```

## explain of args
```
**containSize : wrapper&containner object size (width, height is same)**
**objSize : object size (height is depedency of width. this argument is width)**
```
>default value : '433px' & '200px'
```
containObjId : containner object id
wrapperObjId : wrapper object id
```
>default value : 'digl' & 'digl_wrapper'
```
gap : column & row gap
```
>default value : (contain_width - scroll_width - column * object_width) / gap_num 
    
# 2022-06-07
In css masonry layout supported. so this repository is not helpful.

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout
