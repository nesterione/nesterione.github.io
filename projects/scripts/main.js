tags = [];
		

		function init_tags() {
			for(var i=0; i < data.length;i++) {
				for(var j = 0; j<data[i].tags.length; j++) {
					if(tags[data[i].tags[j]] === undefined) {
						tags[data[i].tags[j]] = {};
						tags[data[i].tags[j]].tagname = data[i].tags[j];
						tags[data[i].tags[j]].count = 1;
					} else {
						tags[data[i].tags[j]].count++;
					}
				}
			}
		}

		init_tags();

 		function load_data(){
			var cont = [];
			for(var i = 0; i< data.length; i++) {
				var model = __view_model(
					data[i].hidden,
					data[i].name,
					data[i].imgurl,
					data[i].description,
					string_links(data[i].links),
					string_tags(data[i].tags)
				);
				cont.push(model);
			}

			document.getElementById("content").innerHTML= cont.join("");;
		}

		// First, checks if it isn't implemented yet.
		if (!String.prototype.format) {
		  String.prototype.format = function() {
		    var args = arguments;
		    return this.replace(/{(\d+)}/g, function(match, number) { 
		      return typeof args[number] != 'undefined'
		        ? args[number]
		        : match
		      ;
		    });
		  };
		}

		/**
		* {0} display
		* {1} name
		* {2} image url
		* {3} description
		* {4} links
		* {5} tags
		*
		*/
		var partial = 
		"<div class='project' style='display:{0};'>\
				<div class='header'>{1}</div>\
				<div class='img'> <img src='{2}' height='400px'> </div>\
				<div class='cont'>\
					<h3>Краткое описание проекта</h3>\
					<p>{3}</p>\
					<h3>Ссылки</h3>\
					<p>{4}</p>\
					<h3>Теги</h3>\
					<p>{5}</p>\
				</div>\
				<div class='clean'></div>\
			</div>";
		
		function __view_model(ishidden,name, description, imageurl, links, tags) {
			var part = partial.format(ishidden?"none":"false",name, description, imageurl, links, tags)
			return part;
		}

		function string_tags(tags) {
			var str = "";
			for(var i = 0; i< tags.length;i++) {
				str+=__form_tag(tags[i]).outerHTML+" ";
			}

			return str;
		}

		function string_links(links) {
			
			if(links.length===0)
				return "Нету ссылок";

			var str = "";
			for(var i = 0; i< links.length;i++) {
				str+=__form_link(links[i].name, links[i].href).outerHTML+" ";
			}

			return str;
		}

		function add_class(node, className) {
			node.className = className;
		}

		function remove_class(node, className) {
			var re = RegExp('(?:^|\s)'+className+'(?!\S)', 'g');
			node.className = node.className.replace(re , '' );
		}

		function change_class(node, oldclass, newclass) {
			remove_class(node, oldclass);
			add_class(node, newclass);
		}

		/**
		* @Depricated
		*/
		function __form_tag(tagname) {
			var a = document.createElement("a");         
			var t = document.createTextNode('#'+tagname);       
			a.appendChild(t);                                
			a.href="javascript:filter_by_tag('"+tagname+"')";
			//a.addEventListener("click", function() {alert(tagname)}, false); 
			return a;
		}

		/**
		* @Depricated
		*/
		function __form_link(name, href) {
			var a = document.createElement("a");         
			var t = document.createTextNode(name);       
			a.appendChild(t);                                
			a.href=href;
			//a.addEventListener("click", function() {alert(tagname)}, false); 
			return a;
		}

		function __form_tag_node(node) {
			var a = document.createElement("a");         
			var t = document.createTextNode('#'+node.tagname+ "("+node.count+") ");       
			a.appendChild(t);                                
			a.href="javascript:filter_by_tag('"+node.tagname+"')";
			//a.addEventListener("click", function() {alert(tagname)}, false); 
			return a;
		}

		function filter_by_tag(tagname) { 
			change_class(document.getElementById("tagbox"), "m-hide", "m-show");
			document.getElementById("tagtext").innerHTML=tagname;

			for(var i=0; i < data.length;i++) {
				data[i].hidden = true;
				for(var j = 0; j<data[i].tags.length; j++) {
					 
					if(data[i].tags[j]==tagname) {
						data[i].hidden = false;
					}
				}
			}
			load_data();
		}

		function filter_clear() { 
			change_class(document.getElementById("tagbox"), "m-show", "m-hide");
			for(var i=0; i < data.length;i++) {
				data[i].hidden = false;
			}
			load_data();
		}

		function load_tags() {
			for(var item in tags) {
				document.getElementById("tags").appendChild(__form_tag_node(tags[item]));
				document.getElementById("tags").appendChild(document.createTextNode(" "));
			}
		}


		load_data();
		load_tags();