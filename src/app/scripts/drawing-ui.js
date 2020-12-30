import { Pdxf } from './Pdxf.js';
import { Dui_ContextMenu } from './Dui_ContextMenu.js';
import { Dui_Toolbar } from './Dui_Toolbar.js';
import { DUI } from './NewDrawingUI.js';

(function ($) {

	//reference
	//https://www.sitepoint.com/jquery-add-dragtouch-support-ipad/

    $.fn.addTouch = function(){
        this.each(function(i,el){
        $(el).bind('touchstart touchmove touchend touchcancel',function(){
            //we pass the original event object because the jQuery event
            //object is normalized to w3c specs and does not provide the TouchList
            handleTouch(event);
        });
        });

        var handleTouch = function(event)
        {
        var touches = event.changedTouches,
                first = touches[0],
                type = '';

        switch(event.type)
        {
            case 'touchstart':
            type = 'mousedown';
            break;

            case 'touchmove':
            type = 'mousemove';
            event.preventDefault();
            break;

            case 'touchend':
            type = 'mouseup';
            break;

            default:
            return;
        }

        var simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
        first.target.dispatchEvent(simulatedEvent);
        };
    };

})(jQuery);

//==================================
// COMMON JS/UI FUNCTIONS
//==================================
function JqueryId(id){

	let jqueryId = false;

	if((typeof id === "string" || typeof id === "number")  && id !== ""){

		if(typeof id === "string"){
			id = id.replace(/\./g, "\\.");
		}

		jqueryId = '#'+id;
	}

	return jqueryId;

}


//==================================
// SVG RELATED FUNCTIONS
//==================================
function Svg_CreateUseTag(contentId, width, height, scale, transform = null){
	
	let newTag = $('<use>');
	let tagPrefix = "use-";
	newTag.attr("id", tagPrefix+contentId);
	newTag.attr("xlink:href", "#"+contentId);
	
	if(width && height){
		
		newTag.attr("width", width);
		newTag.attr("height", height);
		//newTag.attr("viewBox", width+" "+height+" "+width+" "+height);
		
	}

	if(transform !== null){

		newTag.attr("transform", "translate("+(width*(1 - transform.scale[0])/2)+" "+(height*(1 - transform.scale[1])/2)+") rotate("+transform.rotate[0]+" "+(width/2)+" "+(height/2)+") scale("+transform.scale[0]+" "+transform.scale[1]+")");

	} else {

		if(scale === null){
			scale = 1;
		}

		newTag.attr("transform", "scale("+scale+" "+scale+")");

	}

	newTag = $.parseHTML(newTag[0].outerHTML);

	return newTag;

}

function Svg_CreateIcon(originalId, newId, width, height, scale, transform = null){
	
	let extra = 5;
	let block = Svg_CreateUseTag(originalId, width, height, scale, transform);
	
	let newSvg = $('<svg>');
	let newWidth, newHeight;
	let deltaX = -extra/2;
	let deltaY = -extra/2;
	
	if(transform !== null){
		
		let phi = transform.rotate[0]/180*Math.PI;
		newWidth = Math.abs(width*(Math.cos(phi))) + Math.abs(height*Math.cos(Math.PI/2 - phi));
		newHeight = Math.abs(width*(Math.sin(phi))) + Math.abs(height*Math.sin(Math.PI/2 - phi));
		
		deltaX = deltaX + (width - newWidth)/2;
		deltaY = deltaY + (height - newHeight)/2;
		
	} else {
		
		newWidth = width;
		newHeight = height;
		
	}
	
	newWidth = newWidth + extra;
	newHeight = newHeight + extra;
	
	let attributes = {
		id:	newId,
		width: newWidth,
		height: newHeight,
		viewBox: deltaX +" "+deltaY+" "+newWidth+" "+newHeight
	};
	
	newSvg.attr(attributes);
	newSvg.append(block);
	
	newSvg = $.parseHTML(newSvg[0].outerHTML);
	
	return newSvg;
	
}

function Logger(settings, prefix = null, containerDiv = null){
	
	let loaded = false;
	let active = false;
	let div = "messageBoard";
	let msgStyles = {
		typical:	[],
		error: 		[],
		command: 	[],
		prompt: 	[]
	}
	
	this.Reset = function(){
		if(active){
			$('#'+div).html("");
		}
	}

	this.Print = function(message, msgType = null){
	
		if(active){

			if(msgType === null){
				msgType = 'typical';
			}

			//For some reason, this doesn't work always...
			//message = $("<p>").addClass(msgStyles[msgType]).text(message);

			message = $("<p>").attr("class", msgStyles[msgType]).html(message);

			$('#'+div).append(message);
			$('#'+div).scrollTop($('#'+div)[0].scrollHeight);

		}

	}

	function Initialize(){
		
		function InitializeDiv(){
			
			if(typeof settings.div === "string"){
				
				div = settings.div;
				
			} else {
				
				if(prefix){
					div = prefix+div;
				}
				
				$('<div>').attr("id", div).appendTo("#"+containerDiv);
				
			}

		}

		function ApplyDivStyles(){

			if(Array.isArray(settings.classes)){

				settings.classes.forEach(function(cssClass){
					$('#'+div).addClass(cssClass);
				});

			}

			let divHeightLimit = [40,80];
			let messageBoardHt = $('#'+div).height();

			if(messageBoardHt < divHeightLimit[0] || messageBoardHt > divHeightLimit[1]){

				if(messageBoardHt < divHeightLimit[0]){
					messageBoardHt = divHeightLimit[0];
				} else {
					messageBoardHt = divHeightLimit[1];
				}

				$('#'+div).height(messageBoardHt);

			}

			$('#'+div).css('overflow-y', 'scroll').css('border', '1px black solid');

		}

		function UpdateMsgStyles(){

			if(settings.hasOwnProperty("msgClasses")){

				let key;

				for(key in msgStyles){
					if( settings.msgClasses.hasOwnProperty(key) ){
						msgStyles[key] = settings.msgClasses[key];
					}
				}
			}

		}
		
		if(settings){
			
			active = true;
			
			if(!loaded){
				
				if(typeof settings !== 'object'){
					settings = {};
				}
				
				InitializeDiv();
				ApplyDivStyles();
				UpdateMsgStyles();
				
				loaded = true;
				
			}
			
		}
		
	}

	Initialize();

}

function DrawingUI(template, userSettings = null, preloaded = null){
	
	//==================================
	// DECLARATIONS
	//==================================
	let version = undefined;
	let autoRun = true;
	
	let svgId,
		selectFrom,
		drwgList,
		activeDetail,
		svgActives = [],
		projectProperties;
		
	let settings = {
		prefix:		"pdxf",
		metric:		false,
		currency:	"usd"
	};
	
	let styleSettings = {
		styleMultiplier:	2.5,
		//messagesDivMinHt:	40,
		//messagesDivMaxHt:	80,
		librarySvgSize: [36,36],
		libraryPadding:		5
	}
	
	let miscIds = {
		blockLibDiv:		"bl-",
	}

	let styles = {
		buttons: 		[],
		inputText:		[],
		select:			[],
		textArea:		[]
	}

	let vars = {};

	let actionList = [];
	let activeSvgElements = [];
	let insertables = [];
	let localPicked = [];
	
	let stage = 0;
	let self = this;
	
	//==================================
	// FUNCTIONS
	//==================================
	
	this.ResetSelectOptions = function(){
		
		let lastPicked = pdxf.LastPicked();
		let selectGroups = GetProperty(lastPicked, 'data-selectgroup');
		
		if (selectGroups !== false) {

			this.ResetSelectGroups(selectGroups);
			selectFrom = GetProperty(lastPicked, 'data-select');

			let self = this;
			selectFrom.forEach(
				function(option){
					$('#'+svgId+' [id="'+option+'"]').attr('visibility', 'visible');
				}
			);
		}

	}

	this.ResetSelectGroups = function(selectGroups){

		let self = this;
		let tmp = '';

		selectGroups.forEach(
			function(option){
				tmp = option+"-";
				$('#'+svgId+' [id*="'+tmp+'"]').attr('visibility', 'hidden');
			}
		);

	}

	function GetProperty(id, property){

		let value = $(JqueryId(id)).attr(property);

		if (typeof value !== typeof undefined && value !== false) {

			value = value.split(' ');

		} else {

			value = false;

		}

		return value;

	}

	function ReadActions(actionSet){

		let newActions = false;

		if(actionSet !== null){

			newActions = {};
			let tmp, defValue;
			actionSet = actionSet.split(')');

			actionSet.forEach(

				function(action, key){

					if(action !== ""){

						action = action.split('(');

						if(key !== 0){
							action[0] = action[0].substr(1);
						}

						action[0] = action[0].replace(" ", "-");

						tmp = [];
						defValue = "";

						if(action[1] !== ""){

							if(action[1] !== "*"){

								action[1] = action[1].split('*');

								action[1].forEach(
									function(option){
										if(option !== ""){
											if(option.indexOf('[') ===  0 &&  option.indexOf(']') === option.length-1){
												defValue = tmp.length;
												option = option.slice(1, option.length-1);
											}
											tmp.push(option);

										}
									}
								);

							}

						} else {

							tmp = false;

						}

						newActions[action[0]] = {};
						newActions[action[0]].options = tmp;
						newActions[action[0]].def = defValue;

					}

				}

			);

		}

		return newActions;

	}

	this.UpdateDetail = function(whichDetail = null){

		if(activeDetail !== null){
			$('#'+drwgList[activeDetail]).hide();
		}

		if(whichDetail !== null){
			activeDetail = whichDetail;
			$('#'+drwgList[activeDetail]).show();
		}

	}
	
	let Focus = function(e){
		$(e.target).focus();
		ApplyFocusStyle(e.target.id, true);
	}
	
	let UnFocus = function(e){
		ApplyFocusStyle(e.target.id, false);
	}
	
	function SwitchFocus(id, on){
		
		if(on){
			document.getElementById(id).addEventListener('mouseout', UnFocus, {passive: false});
			document.getElementById(id).removeEventListener('mouseover', Focus, {passive: false});
		} else {
			document.getElementById(id).removeEventListener('mouseout', UnFocus, {passive: false});
			document.getElementById(id).addEventListener('mouseover', Focus, {passive: false});
		}
		
	}
	
	function ApplyFocusStyle(id, on){
		
		let cursor = "pointer";
		let c = styleSettings.styleMultiplier;
		
		if(on){
			let isDraggable = activeSvgElements[id].draggable;
			if(isDraggable){
				cursor = "grab";
			}
		} else {
			cursor = "";
			c = 1/c;
		}
		
		$("body").css('cursor', cursor);
		
		let jid = JqueryId(id);
		let type = $(jid).prop("tagName");
		
		if(type == "circle"){
			
			
		} else if (type == "path"){
			
			let tmp = $(jid).attr("stroke-width");
			$(jid).attr("stroke-width", c*tmp);
			
		} else if (type == "text"){
			
			let size = $(jid).attr('font-size');
			let tmp = size.substr(size.length - 2);
			if(tmp == "pt"){
				size = size.slice(0,-2);
			}
			$(jid).attr("font-size", c*size+tmp);
		}
		
		SwitchFocus(id, on);
		
	}
	
	function Select(pickedId = null, e = null){
		
		function PrintSelectedMessage(){
			
			let parts = pickedId.split('.');
			let msg = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

			parts.forEach(function(part, key){
				if(key){
					msg = msg+ " "+part;
				}
			});
			
			msg = msg + " SELECTED";
			
			logger.Print(msg);

		}
		
		function CreateAnimation(){
			
			let startTime = 0;
			let duration = 0.75;
			let repeatCount = "indefinite";
			let animation = 
				'<animate attributeType="CSS" attributeName="opacity"'+
					'begin="'+startTime+'s" dur="'+duration+'s"'+
					'repeatCount="'+repeatCount+'"'+
					'from="1" to="0.2" />'+
				'</animate>'
			;
			
			return animation;
			
		}
		
		function ApplyStyleToSelected(on = null){
			
			let applyTo = [];
			
			if(!on){
				applyTo = localPicked;
			} else {
				let n = localPicked.length - 1;
				applyTo = [localPicked[n]];
			}
			
			if(!on){
				
				applyTo.forEach(function(id){
					id = JqueryId(id);
					$(id+' animate').remove();
				});
				
			} else {
				
				let animation = CreateAnimation();
				
				applyTo.forEach(function(id){
					id = JqueryId(id);
					let exist =  $(id).html();
					$(id).html( animation + exist);
				});
				
			}
			
		}
		
		function CheckIfNegative(){
			
			let negative = $(JqueryId(pickedId)).attr('data-neg');
			
			if(typeof negative !== typeof undefined){
				negative = true;
			} else {
				negative = false;
			}
			
			return negative;

		}
		
		self.UpdateDetail();
		ApplyStyleToSelected();
		
		localPicked.forEach(function(id){
			if(id != pickedId){
				let elem = document.getElementById(pickedId);
				if(elem){
					ApplyFocusStyle(id, false);
				}
			}
		});
		
		pdxf.Cancel();
		localPicked = [];
		
		if( !appUi.IsActive() || typeof activeSvgElements[pickedId] === typeof undefined){
			pickedId = null;
		}
		
		if(pickedId !== null){
			
			let isNegative = CheckIfNegative();
			pdxf.Select(pickedId, isNegative);
			
			let elem = document.getElementById(pickedId);
			if(elem){
				//This check is for the selection of blocks
				elem.removeEventListener('mouseover', Focus, {passive: false});
				elem.removeEventListener('mouseout', UnFocus, {passive: false});
			}
			localPicked.push(pickedId);
			ApplyStyleToSelected(true);
			PrintSelectedMessage();
			
		}
		
		appUi.UpdateAvailableInputs(pickedId, e);
		
	}
	
	function RunCommand(actionId){
		
		pdxf.Command(actionId);
		
		if(typeof actionList[actionId] !== typeof undefined){
			
			let activeCommand = actionList[actionId].name;
			pdxf.Command(activeCommand);
			
			if(Array.isArray(actionList[actionId].options) && actionList[actionId].options.length > 1){
				
				appUi.ResetSelectInput(actionList[actionId].options, actionList[actionId].def);
				
			} else {
				
				if(actionList[actionId].options){
					
					let value = null;
					if($(JqueryId(pdxf.LastPicked()))[0].tagName == "text"){
						value = $(JqueryId(pdxf.LastPicked())).text();
					}
					
					appUi.ResetPopUp("input", value);

				} else {
					
					self.Do();

				}
				
			}
			
		}
		
	}
	
	
	//==================================
	// DRAWING ACTIONS
	//==================================
	
    this.Do = function(action = null, customParameter = null, target = null) {
		
		let done = pdxf.Do(target, action, customParameter);
		
		if(done){
			Calculate();
		}

	}

	this.Undo = function(printIt = true){
		
		let undone = pdxf.Undo();
		
		if(undone){
			if(printIt){
				logger.Print("UNDO", 'command');
			}
			
		} else {
			
			logger.Print("NOTHING TO UNDO", 'error');
			
		}
		
	}

	this.Redo = function(){

		let response = pdxf.Redo();

		if(response){
			logger.Print("REDO", 'command');
		}

	}

	this.ConnectToDB = function(){
		
		let id = $(JqueryId(pdxf.LastPicked())).data();
		id = ReadActions(id.properties);
		id = id.id.options[0];
		
		alert(id);
		
	}
	
	this.LoadProject = function(savedProject = null){
		
		if(savedProject){
			
			let savedVersion = 0;
			if(typeof savedProject.version != typeof undefined){
				savedVersion = savedProject.version;
			}
			
			version = savedVersion;
			pdxf.OpenFile(savedProject.actions);
			
		}
		
		Calculate();
		
	}
	
	this.Start = function(){
		Calculate();
	}
	
	function ClearSelection(){
		if (window.getSelection) {window.getSelection().removeAllRanges();}
		else if (document.selection) {document.selection.empty();}
	}

	//==================================
	// RESPONSE RECEIVER
	//==================================

	this.InitializeSvgUI = function(response){

		appUi.Load(response);

	}

	function ActivatePresetCommand(commands, article){

		if(commands !== false){

			commands = commands.split(' ');

			if($.inArray("select", commands) > -1 || $.inArray("pick", commands) > -1){

				if($.inArray("select", commands) > -1){

					let targets = $('#'+svgId+' [id*="'+article+'"]').attr('data-selectgroup');
					targets = targets.split(' ');
					self.ResetSelectGroups(targets);

				}

			} else if ($.inArray("confirm", commands) > -1){

				//self.EnableAction("confirm", true);

			}

		}

	}

	function UpdateActives(activeSvgIds){

		if(typeof activeSvgIds !== typeof undefined){

			svgActives = activeSvgIds;

		}

	}

	function UpdateMessages(serverSays){
		
		if(serverSays.length){
			
			serverSays.forEach(function(message){
				logger.Print(message[0], message[1]);
			});

			pdxf.UpdateLastAction(serverSays);

		} else {

			logger.Print("READY - Click an item to edit", 'command');

		}

	}

	function UpdateSelected(preSelected){

		//Keep this here in case the server requires a preselected elemented

	}

	function UpdateDrawings(svgSet){
		
		function ActivateSvgList(svgSet){
			
			function ActivateSvg(svg){
				
				function ActivateSvgElement(svgElement){
					
					function CheckIfHasData(){
						
						let hasData = $(svgElement).data() || {};
						
						if(!Object.keys(hasData).length){
							hasData = false;
						}
						
						return hasData;
						
					}
					
					function CheckIfActive(){

						function CheckIfInActives(pickedId){

							let hasData = false;

							if(pickedId in svgActives){

								hasData = true;

							}

							return hasData;

						}

						let isActive = false;

						isActive = CheckIfInActives(svgElementId);

						if(!isActive){

							isActive = CheckIfHasData();

						}

						return isActive;

					}
					
					function CreateNewActiveElement(data){
						
						function RegisterAction(actionName, actionProps){
							
							let actionId = $.inArray(actionName, registeredActions);
							
							let action = {
								name: 		null,
								options:	null,
								def:		null
							};
							
							if(actionId == -1){

								action.name = actionName;
								action.options = actionProps.options;
								action.def = actionProps.def;

								actionList.push(action);

								registeredActions.push(actionName);
								actionId = registeredActions.length - 1;
								
								if(action.name !== 'drag'){
									appUi.CreateActionButton(action, actionId);
								}

							}

							return actionId;

						}
						
						let newActive = {
							draggable:	false,
							actions:	[],
							detRefs:	[]
						};
						
						if(data && data !== true){

							if('actions' in data){
								
								let actions = ReadActions(data.actions);
								
								if(actions.hasOwnProperty("drag")){
									newActive.draggable = true;
								}
								
								let actionId = null;
								let key;
								
								for(key in actions){
									actionId = RegisterAction(key, actions[key]);
									newActive.actions.push(actionId);
								}
								
							}
							
							if('detref' in data){
								
							}
							
						}
						
						return newActive;
						
					}
					
					let SelectElement = function(e){
						
						if(e.button != 1){
							e.preventDefault(); //This is required, otherwise when clicking on a svg text element, it will keep selecting all the texts of the page...
							Select(svgElementId, e);
							if(isDraggable){
								newDui.Reflect("Drag", [e.pageX, e.pageY], e.target.id, self.Drag);
							}
						}
						
					}
					
					let svgElementId = $(svgElement).attr("id");
					let isActive = false;
					let isDraggable = false;
					
					if(typeof svgElementId === "string" && svgElementId !== "" && !$(svgElement).children().length){
						
						$(svgElement)[0].addEventListener('mousedown', Select(), {passive: false});
						$(svgElement).addTouch();
						
						isActive = CheckIfActive();
						
						if(isActive){
							
							let data = CheckIfHasData();
							activeSvgElements[svgElementId] = CreateNewActiveElement(data);
							isDraggable = activeSvgElements[svgElementId].draggable;
							
							$(svgElement)[0].addEventListener('mouseover', Focus, {passive: false});
							$(svgElement)[0].addEventListener('mousedown', SelectElement, {passive: false});
							
						}
						
					}
					
				}
				
				let registeredActions = [];
				
				if(svg !== null){
					
					svg = $.parseHTML(svg);
					
					$(svg).find('*').toArray().forEach(function (svgElement) {
						ActivateSvgElement(svgElement);
					});
					
					$(svg).on('mousedown', function(e) {
						if(e.which == 1 && e.target.id == svgId){
							Select();
						}
					});
					
					$(svg).addTouch();
					
				}
				
				return svg;

			}
			
			let activeSvgList = [];
			let newSvgId;
			
			if(svgSet.length){
				
				svgSet.forEach(function(svg, key){
					
					newSvgId = $(svgSet[key]).attr('id');
					drwgList.push(newSvgId);
					
					if(key === 0){
						svgId = newSvgId;
					}
					
					activeSvgList.push(ActivateSvg(svg));

				});
				
			}

			return activeSvgList;

		}
		
		actionList = [];
		drwgList = [];
		activeSvgElements = insertables;

		svgSet = ActivateSvgList(svgSet);

		appUi.UpdateDrawings(svgSet);

		self.UpdateDetail();

	}
	
	function CheckForUpgrades(response){
		
		/*
		if(response.hasOwnProperty("upgraded")){
			
			pdxf.Upgrade(response.upgraded);
			
			let msg = "File upgraded from v."+version+" to v."+response.version+".\n\nPlease SAVE before continuing.\n\n";
			alert(msg);
			
		}
		*/
		
		version = response.version;
		
	}
	
	this.Run = function(response){
		
		appUi.Reset(response);
		
		if(response){
			
			localPicked = [];
			CheckForUpgrades(response);
			
			UpdateMessages(response.messages);
			
			UpdateDrawings(response.svg);
			
			UpdateSelected(response.picked);
			ActivatePresetCommand(response.command, response.article);
			
			UpdateActives(response.actives);
			
			Select();
			SetStage(stage);
			
		}
		
	}
	
	function GetExtraInput(redraw = null){
		
		let env = GetEnv(redraw);
		
		return {
			version: version,
			env: env
		}
		
	}
	
	function GetEnv(redraw = null){
		
		let env = newDui.GetEnv(redraw);
		env.misc = vars;
		env.metric = settings.metric;
		env.prefix = settings.prefix;
		
		return env;
		
	}
	
	let SetStage = function(what){
		
		let stages;
		let id;
		
		stage = Number(what);
		
		if(stage < 0){
			
			for(id in activeSvgElements){
				stages = GetProperty(id, 'data-stages');
				if(stages){
					$(JqueryId(id)).show();
				}
			}
			
		} else {
			
			for(id in activeSvgElements){
				stages = GetProperty(id, 'data-stages');
				what = what.toString();
				
				if(stages){
					if($.inArray(what, stages) > -1){
						$(JqueryId(id)).show();
					} else {
						$(JqueryId(id)).hide();
					}
				}
			}
			
		}
		
	}
	
	function Calculate(redraw = null){
		
		pdxf.Run(GetExtraInput(redraw));
		
	}
	
	this.OnError = function(response){
		
		newDui.OnError();
		Select();
		appUi.onError();
		response = response.responseText;
		response = response.replace(/\\n/g,'<br>');
		logger.Print(response, 'error');
		
	}
	
	//==================================
	//	SET UP
	//==================================
	
	this.SaveDUI = function(){
		
		let saved = pdxf.Save();
		
		Select();
		appUi.ResetUndoRedo();
		
	}
	
	this.Clear = function(){
		
		svgId = "";
		activeDetail = null;
		selectFrom = [];
		drwgList = [];
		Select();
		
	}
	
	this.Reset = function(){

		let msg = 	"Are you sure?"+
					"\nThis will copletely reset your design"+
					"\nUse \"Undo\" if you just want to undo some actions";
		
		if(appUi.AskForConfirmation(msg)){
			
			self.Clear();
			appUi.Reset();
			logger.Reset();
			pdxf.Reset();
			Calculate();
			
		}
		
	}
	
	this.SwitchUnits = function(){
		
		settings.metric = Boolean(1 - settings.metric);
		Calculate();
		
	}
	
	this.ReportBug = function(){

		if(!pdxf.IsAtStart()){

			let message = "Please enter a short description of the problem";
			logger.Print(message, 'prompt');
			appUi.ResetPopUp(["textArea", "sendReport"], [message, ""]);
			
		}
		
	}
	
	this.ActivateUI = function(on){
		appUi.Activate(on);
	}
	
	this.Insert = function(blockId, sourceId, coords){
		
		sourceId = sourceId.replace(svgId+".",'');
		
		Select(sourceId);
		RunCommand("insert");
		pdxf.Set(coords);
		
		self.Do();
		
	}
	
	this.Drag = function(blockId, sourceId, coords){
		
		Select(blockId);
		RunCommand("drag");
		pdxf.Set(coords);
		self.Do();
		
	}
	
	this.Copy = function(blockId, sourceId, coords){
		
		Select(blockId);
		RunCommand("copy");
		pdxf.Set(coords);
		self.Do();
		
	}
	
	let Copy_Start = function(e){
		
		newDui.Reflect("Copy", pdxf.LastPicked(), self.Copy);
		
	}
	
	this.EnterValue = function(value){
		pdxf.Set(value);
		self.Do();
	}
	
	this.ReScale = function(){
		Calculate(true);
	}
	
	this.ReCalc = function(){
		Calculate();
	}
	
	this.Open = function(e){
		
		let file = e.target.files[0];
		var result = "error reading file";
		
		if(file){
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function (e) {
				self.LoadProject(JSON.parse(e.target.result));
			}
			/*reader.onerror = function (e) {
				file = "error reading file";
			}*/
		}
		
	}
	
	
	//==================================
	// UI SET UP
	//==================================
	
	function AppUI(userDivs, userPrefix = null){
		
		let mainDiv = "DrawingUiMain";
		let activated = false;
		
		let prefs = {
			prefix:			"",
			soundOn: 		false, //Move this one to Pdxf.js
			path2sounds: 	'https://glassd-dev.herokuapp.com/pdxf/DrawingUI/sounds/', //Move this one to Pdxf.js
			clearConsole:	false //Move this one to Pdxf.js
		}
		
		let miscIds = {
			propInput:			"propInput",
			propRow:			"propRow",
			actionButtons:		"ab-",
			contextMenu:		"contextMenu",
			contextItems:		"ci-",
			blockLibDiv:		"bl-",
			blocksPrefix:		"block-",
			stageSelector:		"stage",
			fileUploader:		"fileUploader"
		}
		
		let sounds = {
			main:		'tetris.mp3',
			fail:		'pacman_death.mp3',
			success:	'Tetris-BrickDrop.mp3'
		};
		
		let divs = {
			//Contains all the divs required.
			//Add new to create more.
			//div: "idToBeUsed"
			globalDiv:		"dui",
			prefs:			"prefs",
			library:		"library",
			appActions:		"appActions",
			objectActions:	"objectActions",
			actionInputs:	"actionInputs",
			inputDiv:		"inputDiv",
			detDrwg:		"detDrwg",
			propTable:		"propTable",
			dumper:			"dumper"
		};
		
		let appActions = {
			//Foreach: {id, value, onClick}
			report:	{
				id:			"reportBug",
				src:		"https://upload.wikimedia.org/wikipedia/commons/5/56/Gnome-mail-mark-important.svg",
				value:		"report",
				onClick:	"ReportBug",
				title:		"Report Bug",
				newThing:	false
			},
			reset:	{
				id:			"reset",
				src:		"https://upload.wikimedia.org/wikipedia/commons/b/b5/Gnome-document-new.svg",
				value:		"reset",
				title:		"New Document",
				onClick:	"Reset",
				newThing:	false
			},
			download:	{
				id:			"download",
				src:		"https://upload.wikimedia.org/wikipedia/commons/9/92/Gnome-document-save.svg",
				value:		"Download",
				title:		"Download File",
				onClick:	"Download",
				newThing:	true
			},
			open:	{
				id:			"open",
				src:		"https://upload.wikimedia.org/wikipedia/commons/0/01/Gnome-document-open.svg",
				value:		"Open",
				title:		"Open File",
				onClick:	"AskForFile",
				newThing:	true
			},
			save:	{
				id:			"save",
				//src:		"https://upload.wikimedia.org/wikipedia/commons/9/92/Gnome-document-save.svg",
				//src:		"https://upload.wikimedia.org/wikipedia/commons/3/38/Gnome-media-floppy.svg",
				src:		"https://upload.wikimedia.org/wikipedia/commons/5/5d/Oxygen480-actions-document-save.svg",
				value:		"save",
				onClick:	"SaveDUI",
				title:		"Save",
				newThing:	false
			},
			undo:	{
				id:			"undo",
				src:		"https://upload.wikimedia.org/wikipedia/commons/6/6c/Gnome-edit-undo.svg",
				value:		"undo",
				onClick:	"Undo",
				title:		"Undo",
				newThing:	false
			},
			redo:	{
				id:			"redo",
				src: 		"https://upload.wikimedia.org/wikipedia/commons/c/c1/Gnome-edit-redo.svg",
				value:		"redo",
				onClick:	"Redo",
				title:		"Redo",
				newThing:	false
			},
			recalc:	{
				id:			"refresh",
				src:		"https://upload.wikimedia.org/wikipedia/commons/2/2a/Gnome-view-refresh.svg",
				value:		"refresh",
				onClick:	"ReCalc",
				title:		"Refresh",
				newThing:	false
			},
			fullScreen:	{
				id:			"fullScreen",
				src:		"https://upload.wikimedia.org/wikipedia/commons/f/fa/Gnome-view-fullscreen.svg",
				value:		"FS",
				onClick:	"Fullscreen",
				title:		"Fullscreen",
				newThing:	true
			},
			rescale:	{
				id:			"rescale",
				src:		"https://upload.wikimedia.org/wikipedia/commons/5/52/Gnome-font-x-generic.svg",
				value:		"rescale",
				onClick:	"ReScale",
				title:		"Rescale",
				newThing:	false
			},
			sounds:	{
				id:			"sound",
				src:		"https://upload.wikimedia.org/wikipedia/commons/6/6c/Gnome-audio-volume-muted.svg",
				switch: 	"https://upload.wikimedia.org/wikipedia/commons/6/6c/Gnome-audio-volume-high.svg",
				value:		"SwitchSound",
				onClick:	"SwitchSound",
				title:		"Switch Sound",
				newThing:	true
			},
		};
		
		let actionInputs = {
			confirm:	{
				id:			"confirm",
				value:		"confirm",
				onClick:	"Do"
			},
			/*
			input:	{
				id:			"inputValue",
				value:		"inputValue",
				onClick:	"Do"
			},
			*/
			select:	{
				id:			"selectValues",
				value:		"inputValue",
				onClick:	"Do"
			},
			textArea: {
				id:			"textArea",
				value:		"",
				onClick:	null
			},
			sendReport:	{
				id:			"sendReport",
				value:		"send",
				onClick:	"SendReport"
			}
		};
		
		let tmpSelectClicks = 0;
		let tmpSelected = null;
		let onClicks = {};
		let uiSelf = this;
		
		let contextMenu = null;
		
		function SetUp(){
			
			function LoadUserPrefs(){
				
				if(!userPrefix){
					userPrefix = settings.prefix;
				}
				
				let key;
				for(key in miscIds){
					miscIds[key] = userPrefix+miscIds[key];
				}
				
				for(key in actionInputs){
					actionInputs[key].id = userPrefix+actionInputs[key].id;
				};
				
				for(key in divs){
					divs[key] = userPrefix+divs[key];
				};
				
			}
			
			function SetUpDivs(){
				
				function CreateDiv(id, where = null){
					
					if(!$("#"+id).length){
						
						let newDiv = $('<div>');
						let container = document.body;

						if(where !== null){
							container = JqueryId(where);
						}

						newDiv.attr("id", id).appendTo(container);
						
					}
					
				}
				
				function CreateNewAppDivs(){
					
					let key;
					
					if(typeof userDivs === "string"){
						mainDiv = userDivs;
					}
					
					CreateDiv(mainDiv);
					
					for(key in divs){
						CreateDiv(divs[key], mainDiv);
					}
					
				}

				function UseExistingDivs(){
					
					for(let key in divs){
						
						if(userDivs[key]){
							
							if($(JqueryId(userDivs[key])).length){
								divs[key] = userDivs[key];
							} else {
								CreateDiv(divs[key], null);
							}
							
						} else {
							
							if(userDivs[key] !== false){
								
								CreateDiv(divs[key], null);
								
							} else {
								
								divs[key] = false;
								
							}
							
						}
						
					};
					
				}
				
				if(userDivs === null || typeof userDivs !== "object"){
					
					CreateNewAppDivs();
					
				} else {
					
					UseExistingDivs();
					
				}
				
			}

			function CreateActionInputs(){
				
				if(divs.actionInputs){
					
					let attributes;
					
					//TEXT AREA
					attributes = {
						id: actionInputs.textArea.id
					};
					$('<textarea>').attr(attributes).appendTo('#'+divs.actionInputs);
					styles.textArea.forEach(function(style){
						$('#'+attributes.id).addClass(style);
					});
					
					styles.inputText.forEach(function(style){
						$('#'+attributes.id).addClass(style);
					});

					//SELECT
					attributes = {
						id: actionInputs.select.id
					};
					$('<select>').attr(attributes).appendTo('#'+divs.actionInputs);
					$('#'+actionInputs.select.id).on("change", function(){
						pdxf.Set($(this).val());
						self.Do();
					});
					
					//CONFIRM BUTTON
					let onClick = function(){self.Do();};
					CreateButton(actionInputs.confirm.id, actionInputs.confirm.value, divs.actionInputs, onClick);
					
					//SEND REPORT BUTTON
					onClick = function(){
						Select();
						pdxf.SendReport(GetExtraInput(), $('#'+actionInputs.textArea.id).val());
						uiSelf.ResetPopUp();
					}

					CreateButton(actionInputs.sendReport.id, actionInputs.sendReport.value, divs.actionInputs, onClick);
					
				}
				
			}
			
			function SetUpPreferences(){
				
				if(divs.prefs){

					let checkBoxId = "";
					let checkBox = null;

					checkBoxId = divs.prefs+'-metric';
					checkBox = $('<input>', {id: checkBoxId, type: 'checkbox'}).prop('checked', settings.metric).change( function(){self.SwitchUnits()} );
					$('<label>', {for: checkBoxId}).html(checkBox).append('Metric').css('display', 'block').appendTo(JqueryId(divs.prefs));

					checkBoxId = divs.prefs+'-sounds';
					checkBox = $('<input>', {id: checkBoxId, type: 'checkbox'}).prop('checked', prefs.soundOn).change(uiSelf.SwitchSound);
					$('<label>', {for: checkBoxId}).html(checkBox).append('Sounds').css('display', 'block').appendTo(JqueryId(divs.prefs));

				}

			}
			
			function CreateAppActionButtons(){
				
				let ChangeStage = function(e){
					SetStage($("#"+e.target.id).val());
				}
				
				if(divs.appActions){
					
					let fileInput = $('<input>')
						.attr("id", miscIds.fileUploader)
						.attr("type", "file")
						.attr("accept", ".pdxf")
						.on("change", self.Open)
						.hide()
						.appendTo("#"+divs.appActions)
					;
					
					let toolbar = new Dui_Toolbar(divs.appActions, "appActions", userPrefix);
					
					for(let key in appActions){
						
						let app = self;
						if(appActions[key].newThing){
							app = uiSelf;
						}
						
						appActions[key].onClick = app[appActions[key].onClick];
						appActions[key].id = userPrefix+appActions[key].id;
						appActions[key] = toolbar.AddButton(appActions[key]);
						
					}
					
					let specs = {
						id: miscIds.stageSelector,
						onChange: ChangeStage
					};
					
					toolbar.AddSelect(specs);
					
				}
				
			}
			
			function SetUpBrowser(){
				
				function AddKeyActions(){
					
					let keyActions = [];
					
					keyActions[0] = function(event){
						if(event.which === 27) {
							Select();
						}
					}
					
					keyActions[1] = function(event){
						if(event.which === 90 && event.ctrlKey ) {
							self.Undo();
						}
					}
					
					keyActions[2] = function(event){
						if(event.which === 89 && event.ctrlKey ) {
							self.Redo();
						}
					}
					
					keyActions[3] = function(event){
						if(event.which === 46) {
							pdxf.Command("delete");
							self.Do();
						}
					}
					
					keyActions.forEach(function(action){
						$(document).on("keydown", action);
					});
					
				}
				
				AddKeyActions();
				
			}
			
			function SetUpAudio(){
				
				let key;
				
				for(key in sounds){
					sounds[key] = prefs.path2sounds + sounds[key];
				}
				
				//sounds.main = new Audio(sounds.main);
				//sounds.main.loop = true;
				
			}
			
			LoadUserPrefs();
			contextMenu = new Dui_ContextMenu(miscIds.contextMenu);
			SetUpDivs();
			SetUpPreferences();
			CreateAppActionButtons();
			CreateActionInputs();
			SetUpBrowser();
			SetUpAudio();
			
		}
		
		this.Fullscreen = function (){
			
			let fullScreen = false;
			if (!window.screenTop && !window.screenLeft && !window.screenY && !window.screenX) {
				fullScreen = true;
			}
			
			if(fullScreen){
				
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}

				fullScreen = false;

			} else {
				
				let elem = $(JqueryId(divs.globalDiv));
				elem = elem[0];
				
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} else if (elem.mozRequestFullScreen) { /* Firefox */
					elem.mozRequestFullScreen();
				} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
					elem.webkitRequestFullscreen();
				} else if (elem.msRequestFullscreen) { /* IE/Edge */
					elem.msRequestFullscreen();
				}
				
				fullScreen = true;
				
			}

		}
		
		this.SwitchSound = function(){
			
			prefs.soundOn = Boolean(1 - prefs.soundOn);

			if(prefs.soundOn){
				sounds.main = new Audio(sounds.main);
				sounds.main.play();
				sounds.main.loop = true;
			} else {
				sounds.main.pause();
				sounds.main = sounds.main.currentSrc;
			}

		}
		
		this.AskForFile = function(e){
			$('#'+miscIds.fileUploader).trigger("click");
		}
		
		this.Download = function(){
			
			let file = pdxf.ComposeRequest(GetExtraInput());
			file = JSON.stringify(file);
			let timestamp = new Date().getTime();
			let filename = "mirror_"+timestamp+".pdxf";;
			
			//https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
			//https://stackoverflow.com/questions/11336663/how-to-make-a-browser-display-a-save-as-dialog-so-the-user-can-save-the-conten
			
			if (window.navigator.msSaveOrOpenBlob){ // IE10+
				let blob = new Blob([file], {type: 'text/plain'});
				window.navigator.msSaveOrOpenBlob(blob, filename);
			} else { // Others
				var a = document.createElement("a");
				a.href = "data:application/pdxf;charset=utf-8,"+file;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
			
		}
		
		function CreateButton(id, value, where, onClick){
			
			let classes = "";
			if(Array.isArray(styles.buttons) && styles.buttons.length){
				classes = styles.buttons.reduce((acc, cur) => acc + ' ' + cur);
			}
			
			let button = $('<input>')
				.attr("type", "button")
				.attr("id", id)
				.attr("value", value.toUpperCase())
				.addClass(classes)
				.on('click', onClick)
				.appendTo(JqueryId(where))
			;
			
		}
		
		this.ResetPopUp = function(enableTag = null, value = null){
			
			function AskForInput(on, inputId, value = null) {
				
                let selectWhat = '#' + inputId;
				let tagName = $(selectWhat)[0].tagName;
				let inputType = $(selectWhat).attr('type');
				
				if(on){
					
					$(selectWhat).show();
					$("label[for='" + inputId + "']").show();
					
					if (tagName == "SELECT") {
						$(selectWhat + ' option[value="' + value + '"]').prop('selected', true);
					}
					
					if (inputType !== "submit" && inputType !== "button" && tagName !== "SELECT") {
						$(selectWhat).val(value);
						$(selectWhat).select();
					}
					
					$(selectWhat).focus();
					
				} else {
					
					$(selectWhat).hide();
					$("label[for='" + inputId + "']").hide();
					value = '';
					
				}
				
			}
			
			if(divs.actionInputs){
				
				for(let key in actionInputs){
					AskForInput(false, actionInputs[key].id);
				}
				
				$('#'+divs.actionInputs).children().hide();
				newDui.RequestValue(false);
				
				if(enableTag){
					
					if(enableTag != "input"){
						
						if(typeof enableTag == "string"){
							enableTag = [enableTag];
							value = [value];
						}
						
						enableTag.forEach(function(tag, key){
							if(tag in actionInputs){
								AskForInput(true, actionInputs[tag].id, value[key]);
							} else {
								$('#'+tag).show();
							}
						});
						
					} else {
						
						newDui.RequestValue(value);
						
					}
					
				}
				
			}
			
		}
		
		this.Activate = function(on) {
			
			on = Boolean(1-on);
			activated = on;
			newDui.Activate(on);
			
			this.ResetPopUp();
			this.UpdateAvailableInputs();
			
			let key;
			for(key in appActions){
				appActions[key].Enable(on);
			}
			
			appActions.fullScreen.Enable(true);
			
			if(on){
				this.ResetUndoRedo();
			}
			
		}
		
		this.onError = function(){
			
			if(prefs.soundOn){
				let sound = new Audio(sounds.fail);
				sound.play();
			}
			
		}
		
		this.Reset = function(response = null){
			
			function ResetSounds(){
				
				/*
				if(prefs.soundOn){
					sounds.main.pause();
					sounds.main.currentTime = 0;
					sounds.main.play();
				}
				*/

				if(prefs.soundOn){

					let sound = new Audio(sounds.success);

					//sounds.success.pause();
					//sounds.success.currentTime = 0;
					sound.play();

				}

			}

			function ClearConsole(){
				
				if(prefs.clearConsole){
					console.clear();
				}
				
			}

			function Dump(){
				
				if(divs.dumper){
					
					$('#'+divs.dumper).html("");
					
					if(response && response.echo){
						$('#'+divs.dumper).html(response.echo);
					}
					
				}
				
			}

			Dump();
			ClearConsole();
			ResetSounds();
			this.ResetPopUp();
			$('#'+divs.objectActions).html("");
			contextMenu.Clear();
			this.ResetUndoRedo();
			
		}
		
		this.ResetUndoRedo = function(){
			
			function ResetUnloader(){
				
				let unloadSwitch = "off";
				let enable = false;
				let unloadingPreventer = null;
				
				if(pdxf.IsUnsaved()){
					unloadSwitch = "on";
					enable = true;
					unloadingPreventer = function(){
						return "You have unsaved changes which will be lost if you leave the page. Do you still want to leave?";
					}
				}
				
				$(window)[unloadSwitch]("beforeunload", unloadingPreventer);
				
				appActions.save.Enable(enable);
				
			}
			
			function ResetUndo(){
				
				let enable = true;
				
				if(pdxf.IsAtStart()){
					enable = false;
				}
				
				appActions.undo.Enable(enable);
				appActions.report.Enable(enable);
				appActions.reset.Enable(enable);

			}

			function ResetRedo(){
				
				let enable = false;
				if(pdxf.UnDone()){
					enable = true;
				}
				
				appActions.redo.Enable(enable);
			}

			ResetUndo();
			ResetRedo();
			ResetUnloader();

		}
		
		this.CreateActionButton = function(action, id){
			
			if(divs.objectActions){
				
				let buttonId = miscIds.actionButtons+id;
				
				let onClick = null;
				if(actionList[id].name == "copy"){
					onClick = function(e){
						Copy_Start(e);
					}
				} else {
					onClick = function(e){
						RunCommand(id);
					}
				}
				
				CreateButton(buttonId, action.name, divs.objectActions, onClick);
				
				buttonId = miscIds.contextItems+id;
				contextMenu.CreateItem(buttonId, action.name, onClick);
				
				$('#'+buttonId).css('display', '');
				
			}
			
		}
		
		this.UpdateAvailableInputs = function(id = null, e = null){
			
			function UpdatePropertiesTable(id){

				if(divs.propTable){

					tmpSelectClicks = 0;
					tmpSelected = null;

					if(id !== null && id in svgActives){

						svgActives[id].properties.forEach(function(value, propertyId){
							$(JqueryId(miscIds.propRow+propertyId)).show();
							$(JqueryId(miscIds.propInput+propertyId)).val(value);
						});

					} else {

						if(projectProperties !== undefined){

							projectProperties.forEach(function(value, propertyId){
								$(JqueryId(miscIds.propRow+propertyId)).hide();
							});

						}

					}

				}

			}
			
			function UpdateToolBar(id, e){
				
				let run = false;
				let selected = [];
				
				if(id !== null){
					selected = activeSvgElements[id].actions;
				}
				
				let count = selected.length;
				
				if(e && e.type == "mousedown" && e.which == 1){
					
					if(count > 0 && count < 3){
						
						if(count == 1 && actionList[selected[0]].options !== false){
							
							run = selected[0];
							
						} else {
							
							let actions = [];
							
							selected.forEach(function(action, key){
								actions.push(actionList[action].name);
							});
							
							run = $.inArray("set", actions);
							
							if(run > -1){
								run = selected[run];
							} else {
								run = false;
							}
							
						}
						
					}
				
				}
				
				actionList.forEach(function(action, key){
					
					let display = 'none';
					
					if($.inArray(key, selected) > -1 ){
						display = '';
					}

					$('#'+miscIds.actionButtons+key).css('display', display);
					
				});
				
				contextMenu.Update(selected);
				
				if(run !== false){
					RunCommand(run);
				}
				
			}
			
			this.ResetPopUp();
			UpdatePropertiesTable(id);
			UpdateToolBar(id, e);

		}
		
		this.Load = function(response){
			
			function UpdateProjectProperties(propertiesList){

				function CreatePropertiesTable(){
					//Creates the table of properties for the whole project

					function SetProperty(which, value){

						if(tmpSelectClicks === 1){

							if(value !== tmpSelected){

								let propertyId = which.replace(miscIds.propInput, "");

								pdxf.Command(projectProperties[propertyId].name);
								pdxf.Set(value);
								self.Do();

							} else {

								tmpSelected = null;
								tmpSelectClicks = 0;

							}

						} else {

							tmpSelectClicks++;
							tmpSelected = value;

						}

					}

					if(divs.propTable !== false){

						let table = $('<table>');
						let row, cell, input, selectOption;

						projectProperties.forEach(function(property, key){
							
							input = null;
							
							row = $('<tr>').attr('id', miscIds.propRow+key);

							cell = $('<td>').html(property.prompt);
							cell.appendTo(row);

							cell = $('<td>');

							if(property.type == "select"){

								input = $('<select>');

								property.options.forEach(function(option, optionKey){

									selectOption = $('<option>').attr('value', optionKey).html(option.name);
									selectOption.appendTo(input);

								});

								input.on("click", function(){SetProperty($(this).attr('id'), $(this).val())});

							}

							if(input){

								input.attr('id', miscIds.propInput+key).appendTo(cell);
								cell.appendTo(row);
								row.appendTo(table);

							}

							row.hide();

						});

						table.appendTo(JqueryId(divs.propTable));

					}

				}

				if(typeof propertiesList !== typeof undefined){

					projectProperties = propertiesList;
					CreatePropertiesTable();

				}

			}
			
			function UpdateLibrary(blockList){
				
				function CreateLibraryIcon(id, block){
					
					function Assign_InsertAction(){
						
						$(icon).mousedown(function(e){
							if(e.which == 1 && appUi.IsActive()){
								
								let getId = $(e.target).children();
								if(getId.length){
									getId = getId[0].id;
								} else {
									getId = e.target.id;
								}
								Select();
								newDui.Reflect("Insert", [e.pageX, e.pageY], getId, self.Insert);
								
							}
						});
						
						$(icon).addTouch();

						return icon;

					}
					
					function PutIconInDiv(){
						
						iconDiv = $('<div>');
						iconDiv.css('padding', styleSettings.libraryPadding);
						iconDiv.attr('display', 'block');
						iconDiv.attr('id', miscIds.blockLibDiv+id);
						iconDiv.append(icon);
						
					}

					let iconDiv = "";
					let blockName = block[0];
					
					let icon = Svg_CreateIcon(svgId+"."+blockName, miscIds.blocksPrefix+id, styleSettings.librarySvgSize[0], styleSettings.librarySvgSize[1], null);
					$(icon).css('cursor', 'grab');
					
					Assign_InsertAction();
					PutIconInDiv();

					return iconDiv;

				}
				
				$('#'+divs.library).html('');
				
				if(Array.isArray(blockList)){
					
					blockList.forEach(function(block, id){
						insertables[block[0]] = {actions:[]};
						$('#'+divs.library).append(CreateLibraryIcon(id, block));
					});
					
				}
				
			}

			function UpdateStages(stageList){
				
				if(typeof stageList !== typeof undefined){

					let i = stageList.length;
					let preSetStages = [
						"ALL"
					];
					
					$(JqueryId(miscIds.stageSelector)).html("");
					//$(JqueryId(miscIds.stageSelector)).hide();
					
					if(i){
						
						let selectOption;
						let n = -preSetStages.length;
						
						preSetStages.forEach(
							function(mode, i){
								selectOption = $('<option>').attr('value', n).html(mode);
								selectOption.appendTo(JqueryId(miscIds.stageSelector));
								n++;
							}
						);
						
						stageList.forEach(
							function(mode, i){
								selectOption = $('<option>').attr('value', i).html(mode);
								selectOption.appendTo(JqueryId(miscIds.stageSelector));
							}
						);
						
						//$(JqueryId(miscIds.stageSelector)).show();
						$(JqueryId(miscIds.stageSelector)).val(stage);
						
					}
					
				}
				
			}
			
			UpdateProjectProperties(response.propertiesList);
			UpdateLibrary(response.blockList);
			UpdateStages(response.stages);
			
		}
		
		this.UpdateDrawings = function(svgList){
			
			let divToAppend;
			
			svgList.forEach(function(svg, key){
				
				divToAppend = divs.detDrwg;
				
				if(key === 0){
					
					newDui.Feed(svg);
					
				} else {
					
					$('#'+divToAppend).html(svg);
					$('#'+drwgList[key]).show();
					
				}
				
			});
			
		}
		
		this.ResetSelectInput = function(options = null, value = null){

			$('#'+actionInputs.select.id).html('');

			if(options){

				let attributes, selectedValue;
			
				options.forEach(function(option, key){

					option = $.trim(option);

					if(option){

						attributes = {
							id:		actionInputs.select.id+"-"+key,
							value: 	key
						};

						$('<option>').attr(attributes).html(option).appendTo('#'+actionInputs.select.id);

						if(key === parseInt(value)){
							selectedValue = attributes.value;
						}

					}

				});

				this.ResetPopUp("select", selectedValue);

			}

		}
		
		this.AskForConfirmation = function(msg){
			return confirm(msg);
		}
		
		this.Container = function(){
			return divs.globalDiv;
		}
		
		this.IsActive = function(){
			return activated;
		};
		
		SetUp();
		
	}

	//=========================================================
	// INITIALIZE
	//=========================================================
	
	function Initialize(){
		
		function GetUserSettings(){
			
			let key;
			
			let settingsStructure = {
				prefix: 	null,
				container:	null,
				logger:		null
			};
			
			if(userSettings === null){
				userSettings = {};
			}
			
			for(key in settingsStructure){
				if(!userSettings.hasOwnProperty(key)){
					userSettings[key] = null;
				}
			};
			
			for(key in settings){
				if(userSettings.hasOwnProperty(key)){
					settings[key] = userSettings[key];
				}
			}
			
			if(userSettings.hasOwnProperty("styles")){
				for(key in styles){
					if(userSettings.styles.hasOwnProperty(key)){
						styles[key] = userSettings.styles[key];
					}
				};
			}
			
			if(userSettings.hasOwnProperty("vars")){
				vars = userSettings.vars;
			}

			if(userSettings.hasOwnProperty("stage")){
				stage = userSettings.stage;
			}
			
		}
		
		function AdjustIds(){
			
			if(settings.prefix !== ""){
				
				let key;
				
				for(key in miscIds){
					miscIds[key] = settings.prefix+miscIds[key];
				};
				
			}
			
		}
		
		GetUserSettings();
		AdjustIds();
		
	}
	
	let
	consumer = {
		object:		this,
		onSuccess:	"Run",
		onFail:		"OnError",
		onLoad:		"InitializeSvgUI",
		onSave:		null,
		onRun:		"ActivateUI"
	};
	
	let pdxf = new Pdxf("dui", template, consumer, settings.currency);
	pdxf.AddConsumers(userSettings.consumers);
	
	Initialize();
	
	let newDui = new DUI(userSettings.container.mainDrwg, this);
	let appUi = new AppUI(userSettings.container, userSettings.prefix);
	let logger = new Logger(userSettings.logger, userSettings.prefix, appUi.Container());
	
	this.Clear();
	
    $(document).ready(function() {
		if(autoRun){
			self.LoadProject(preloaded);
		}
    });

}

window.DrawingUI = DrawingUI;

