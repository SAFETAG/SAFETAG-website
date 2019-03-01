/*
 * Dynamic Table of Contents script
 * by Matt Whitlock <http://www.whitsoftdev.com/>
 */

function createLink(href, innerHTML) {
	var a = document.createElement("a");
	a.setAttribute("href", href);
	a.innerHTML = innerHTML;
//	var collapse = document.createElement('a')
//	collapse.setAttribute("class", "collapse");
//	collapse.setAttribute("data-target", "li" + section );
//	a.insertBefore(coll)
	return a;
}

function generateTOC(toc) {
	var i1=0, i2 = 0, i3 = 0, i4 = 0;
	toc = toc.appendChild(document.createElement("ul"));
	var elements = getElementsByTagNames('h1,h2,h3');
	for (var i = 0; i < elements.length; ++i) {
		var node = elements[i];
		var tagName = node.nodeName.toLowerCase();
		if (tagName == "h4") {
			++i4;
			if (i4 == 1) toc.lastChild.lastChild.lastChild.appendChild(document.createElement("ul"));
			var section = i1 + "." + i2 + "." + i3 + "." + i4;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			var collapse = document.createElement("a");
			collapse.setAttribute('class', ':collapse');
			collapse.setAttribute('id', section);

			toc.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement("li")).appendChild((createLink("#section" + section, node.innerHTML)))
//			toc.insertBefore(document.createLink("#", "»"));
		}
		else if (tagName == "h3") {
			++i3, i4 = 0;
			if (i3 == 1) toc.lastChild.appendChild(document.createElement("ul"));
			var section = i1 + "." + i2 + "." + i3;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			toc.lastChild.lastChild.appendChild(document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
		}
		else if (tagName == "h2") {
			++i2, i3 = 0, i4 = 0;
			var section = i1 + "." + i2;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			toc.appendChild(h2item = document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
		}
		else if (tagName == "h1") {
			++i1, i2=0, i3 = 0, i4 = 0;
			var section = i1;
			node.insertBefore(document.createTextNode(section + ". "), node.firstChild);
			node.id = "section" + section;
			toc.appendChild(h2item = document.createElement("li")).appendChild(createLink("#section" + section, node.innerHTML));
		}
	}
}

/*
 * getElementsByTagNames
 * by http://www.quirksmode.org/
 */

function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}
