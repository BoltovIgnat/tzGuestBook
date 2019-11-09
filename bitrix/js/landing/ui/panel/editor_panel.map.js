{"version":3,"sources":["editor_panel.js"],"names":["BX","namespace","proxy","Landing","Utils","getSelectedElement","UI","Panel","EditorPanel","BaseButtonPanel","apply","this","arguments","layout","classList","add","position","currentElement","makeDraggable","registerBaseActions","appendToBody","rect","getBoundingClientRect","instance","getInstance","scrollHandler","target","onShow","node","onScroll","bind","document","addEventListener","onKeydown","window","passive","err","onHide","removeEventListener","event","which","nodeName","preventDefault","range","getSelection","getRangeAt","br","create","deleteContents","insertNode","createRange","setStartAfter","collapse","sel","removeAllRanges","addRange","setTimeout","adjustPosition","editor","dragButton","Button","EditorAction","html","attrs","title","Loc","getMessage","onbxdrag","onDrag","onbxdragstop","onDragEnd","jsDD","registerObject","prependButton","offsetCalculates","offsetLeft","offsetTop","x","y","pos","current_node","Math","max","abs","left","top","DOM","write","remove","style","addButton","onClick","adjustButtonsState","CreateLink","ColorAction","text","TextBackgroundAction","lastPosition","adjustAbsolutePosition","force","nodeRect","width","height","bottom","pageYOffset","innerWidth","hideButtonsPopups","body","appendChild","mouseTarget","onMousedown","preventClick","onMouseUp","stopPropagation","closePopup","button","popup","close","menu","buttons","forEach","additionalButtons","Tool","ColorPicker","hideAll","prototype","constructor","__proto__","show","element","insertAfter","prevSibling","querySelector","isShown","onCustomEvent","call","hide","getAction","value","key","get","requestAnimationFrame","format","getFormat","bold","italic","underline","strike","align","getComputedStyle","getPropertyValue","includes","match","closest","isFixed"],"mappings":"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","file":"editor_panel.map.js"}