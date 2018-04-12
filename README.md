###threejs源码修改
30937:
```javascript
//var image = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'img' );
var image = wx.createImage();
```


###小游戏中threejs插件使用方法：
   >在THREE插件文件头部添加：
```javascript
var THREE = require('three');
```
   
   
   

###在游戏主文件头部引用threejs主程序和threejs插件:
   
```javascript
declare function require(arg:string):any;
   
   
import './lib/weapp-adapter'
import * as THREE from './lib/three.js'
require('lib/OrbitControls')
```
   