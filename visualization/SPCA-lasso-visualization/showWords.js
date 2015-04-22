function showWords(words, size, vis, height, width, bottom, left, lowColor, highColor, minFont, maxFont, textAlign) {
	function fontString(value) {
		return "bold "+ (value) + " arial";
	}
	function getMin(a) {
		min = a[0];
		for(i = 0; i < a.length; i++)
			min = min < a[i] ? min : a[i];
		return min;
	}
	function getMax(a) {
		max = a[0];
		for(i = 0; i < a.length; i++)
			max = max > a[i] ? max : a[i];
		return max;
	}
	var curVis = vis.add(pv.Panel)
					.width(width)
					.height(height)
					.bottom(bottom)
					.left(left);
	var yScale = pv.Scale.linear(pv.range(words.length)).range(0, height);
	var colors = pv.Scale.linear(getMin(size), getMax(size)).range(lowColor, highColor);
	var fontSize = pv.Scale.log(getMin(size), getMax(size)).range(minFont, maxFont);
	curVis.add(pv.Label)
		.data(words)
		.textAlign(textAlign)
		.font(function(d) {return fontString(fontSize(size[this.index]))})
		.top(function(d) {return yScale(this.index)})
		.textStyle(function(d) {return colors(size[this.index])});		
	return curVis;
}