
function TGDParser(){
	this.tokens = []
	this.addToken = function(symb, react){
		this.tokens[symb] = react;
	}
	this.parseStr = function(str, y){

		for (var i = str.length - 1; i >= 0; i--){
			this.tokens[str[i]](i, y||0)
		};
	}
	this.parseArr = function(arr){
		for(var i = 0; i<arr.length; i++){
			this.parseStr(arr[i], arr.length-1-i)
		}
	}
	this.addToken(" ", function(){})
}

////////////
