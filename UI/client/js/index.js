(function(){
	let type = Array.from(document.querySelectorAll(".card-loan-type"));
	let loanForm = document.querySelector(".loan_form");
	let loantype = document.getElementById("loanType");
	let tenor = document.getElementById("tenor");
	let applyBtn = document.getElementById("apply");
	let card = document.querySelector(".card");
	tenor.onblur = (e)=>{
		if(tenor.value > 12){
			apply.disabled = true;
			apply.style.backgroundColor = "#9ea1a2d6";
			apply.style.border = "none";
			apply.setAttribute("value","tenor must be less than or equal 12")
		}else{
			apply.disabled = false;
			apply.style.border = "2px solid #0084d7";
			apply.style.backgroundColor = "#0084d7";
			apply.setAttribute("value","Apply")
		}
	}
	loanForm.onmouseenter = (e)=> {
		loanForm.style.bottom = "220px";
		loanForm.style.transition = "bottom 800ms .2s";
		loanForm.style.transitionTimingFunction = "cubic-bezier(0.4,0, 1,1)";
	}
	loanForm.onmouseleave = (e)=> {
		loanForm.style.bottom = "0px"
	}
	let img, bi, style;
	for(let i = 0; i < type.length; i++){
		type[i].onclick = (e)=> {
			loanForm.style.bottom = "220px";
			loanForm.style.display = "block"
			img = type[i];
			style = img.currentStyle || window.getComputedStyle(img, false)
			bi = style.backgroundImage.slice(4, -1).replace(/["']/g, "");
			loanForm.style.background= `url(${bi}) no-repeat`;
			loanForm.style.backgroundColor = "#fff";
			loanForm.style.backgroundSize = "contain";
			loanForm.style.transition = "bottom 800ms .2s";
			loanForm.style.transitionTimingFunction = "cubic-bezier(0.4,0, 1,1)";
			let children = Array.from(type[i].children);
			let loanType = children[0].textContent.trim();
			let loanMax = children[2].textContent.split(" ")[2].toString().split("").slice(0,-9).join("");
			loantype.value = loanType;
		}
	}
})();