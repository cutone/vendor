window.onload = function(){
	var oUl = document.getElementById('sale');//购买区
	var aSaleInput = oUl.getElementsByTagName('input');//购买金额
	var aBuyBtn = oUl.getElementsByTagName('button');//购买按钮
	var oIn = document.getElementById('in');//投币区
	var aInBtn = oIn.getElementsByTagName('input');//投币按钮
	var total = 0;//剩余金额
	var residue = document.getElementById('residue');//剩余金额显示
	var oResetBtn = document.getElementById('reset');//退币按钮
	var backShow = document.getElementById('back');//退出金额显示
	var outShow = document.getElementById('out');//出货区
	var outNameStr = [];//数组
	var outName = {};//对象（出货名称）
	var showOut = '';//出货区内容
	var showTotalValue = 0;//总消费金额
	var twenty = false;
	var twentySce;
	var times = document.getElementById('times');//剩余操作时间


	//投币点击事件
	for(var i = 0; i<aBuyBtn.length; i++){
		aBuyBtn[i].onclick = function(){
			saled(this);
			twenty = true;
			timer();
		};
	}

	//购买点击事件
	for(var i = 0; i<aInBtn.length; i++){
		aInBtn[i].onclick = function(){
			addNum(this.value);
			twenty = true;
			timer();
		};
	}

	//退币点击事件
	oResetBtn.onclick = reset;

	//投笔累加金额
	function addNum(num){
		num = parseInt(num);
		if(num == 50 || num == 100){
			alert('不能投超过面值20元的纸币');
		}else{
			total += num;
			residue.innerHTML = total;
		}
		sale();
	}

	//高亮显示可购买的商品
	function sale(){
		for(var i=0; i<aSaleInput.length; i++){
			if(-(parseInt(aSaleInput[i].value))<=total){
				aSaleInput[i].parentNode.className="active";
				var btns = aSaleInput[i].parentNode.getElementsByTagName('button');
				btns[0].removeAttribute('disabled');
			}else{
				aSaleInput[i].parentNode.className="";
				var btns = aSaleInput[i].parentNode.getElementsByTagName('button');
				btns[0].setAttribute('disabled','disabled');
			}
		}
	}

	//购买按钮点击事件
	function saled(btn){
		var btnParent = btn.parentNode;
		var saleName = btnParent.getElementsByTagName('h4')[0].innerHTML.substr(3)//显示商品名称
		var aInputVal = btnParent.getElementsByTagName('input');
		var cutNum = parseInt(aInputVal[0].value);
		total += cutNum;
		residue.innerHTML = total;
		sale();

		showTotalValue -= cutNum;

		//出货区outShow
		outNameStr.push(saleName);
		for(var i = 0; i<outNameStr.length; i++){
			if(outName[outNameStr[i]]){
				outName[outNameStr[i]]++;
			}else{
				outName[outNameStr[i]] = 1;
			}
		}
		outShow.innerHTML = '';

		for(var attr in outName){
			var br = document.createElement('br');
			var p = document.createElement('p');
			p.textContent = (attr + ' 数量: ' + outName[attr]);
			outShow.appendChild(p);
			outShow.appendChild(br);
			p = null;
			br = null;
		}
		var totalSpan = document.createElement('span');
		totalSpan.textContent = '总计消费： ' + showTotalValue + '元';
		outShow.appendChild(totalSpan);
		outName = {};
	}


	//退币重置
	function reset(){
		backShow.innerHTML = total;
		total = 0;
		residue.innerHTML = total;
		sale();
		twenty = false;
		timer();
		outNameStr = [];
		showTotalValue = 0;
		outShow.innerHTML = '';
	}

	//剩余操作时间
	function timer(){
		clearInterval(twentySce);
		var step = 20;
		if(twenty){
			twentySce = setInterval(function(){
				step--;
				times.innerHTML = step;
				if(step == 0){
					reset();
					clearInterval(twentySce);
					twenty = false;
				}
			},1000);
		}else{
			clearInterval(twentySce);
			times.innerHTML = step;
		}
	}

}