function startMove(obj, json, endFun) {
	//开始前关闭之前obj上的定时器
	clearInterval(obj.timer);

	//定时器
	obj.timer = setInterval(function() {

		var bStop = true; //假设所有值都到目标
		for(var attr in json) {//循环json数组

			//单独处理透明度
			if(attr == 'opacity') {
				var cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				var cur = parseInt(getStyle(obj, attr));
			}
			//速度处理
			var speed = (json[attr] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//如果当前的没到目标值
			if(cur != json[attr])
				bStop = false;

			//运动
			if(attr == 'opacity') {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
		//所有的都到达目标值
		if(bStop) {
			clearInterval(obj.timer);
			if(endFun) endFun();
		}
	}, 30);

}
function getStyle(obj, name) {
	if(obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, false)[name];
	}
}
