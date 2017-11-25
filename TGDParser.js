// creates Parser object
// if you want to store levels or anything else as a planetext
// you can use this to parse your text and create different objects, but you need to specify tokens, example:
//parser.addToken("X", function(x, y){
//	platforms.push(new Platform(x, y, 1, 1))
//}) - Calls Platform constructor when finds 'X' in text
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
