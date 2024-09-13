!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).wasmFeatureDetect=n()}(this,(function(){"use strict";return{bigInt:()=>(async e=>{try{return(await WebAssembly.instantiate(e)).instance.exports.b(BigInt(0))===BigInt(0)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,126,1,126,3,2,1,0,7,5,1,1,98,0,0,10,6,1,4,0,32,0,11])),bulkMemory:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,3,1,0,1,10,14,1,12,0,65,0,65,0,65,0,252,10,0,0,11])),exceptions:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),extendedConst:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,0,1,11,9,1,0,65,1,65,2,106,11,0])),gc:()=>(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0])))(),jspi:()=>(async()=>"Suspending"in WebAssembly)(),memory64:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,4,1])),multiMemory:()=>(async()=>{try{return new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,5,5,2,0,0,0,0])),!0}catch(e){return!1}})(),multiValue:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,0,2,127,127,3,2,1,0,10,8,1,6,0,65,0,65,0,11])),mutableGlobals:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,2,8,1,1,97,1,98,3,127,1,6,6,1,127,1,65,0,11,7,5,1,1,97,3,1])),referenceTypes:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,7,1,5,0,208,112,26,11])),relaxedSimd:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),saturatedFloatToInt:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,12,1,10,0,67,0,0,0,0,252,0,26,11])),signExtensions:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,65,0,192,26,11])),simd:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),streamingCompilation:()=>(async()=>"compileStreaming"in WebAssembly)(),tailCall:async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,6,1,4,0,18,0,11])),threads:()=>(async e=>{try{return"undefined"!=typeof MessageChannel&&(new MessageChannel).port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(e)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11])),typeReflection:()=>(async()=>"Function"in WebAssembly)()}}));

(async function (name, context, definition) {
	
//-----------------------------------------
window.has_SIMD = false;
window.has_SIMD = await wasmFeatureDetect.simd();
//-----------------------------------------	
	
	if (typeof window !== 'undefined' && typeof define == 'function' && define.amd) {
		define(definition)
	}
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = definition()
	} else {
		context[name] = await definition()
	}
})('BarkoderSDK', this, function () {

//class Common { ... } //defined further down

class DOM_elements {
	
	//state
	//----------------------------------------------------
	static container = document.getElementById('barkoder-container'); //done on start as well
	
	static cameraPreview = document.createElement('div');
	static preview = document.createElement('video');
	static overlay = document.createElement('canvas');
	
	static readyToUse_RO = false;
	static resizeObserver = new ResizeObserver(() => {
		
		if (DOM_elements.readyToUse_RO)
		{
			Bridge.resizeHandler();
		}
	});
	
	static flash = document.createElement('div');
	static zoom = document.createElement('div');
	static close = document.createElement('div');
	static cameraPicker = document.createElement('div');
	
	static cameraPickerUI = document.createElement('div');
	
	static cameraPickerUI_style = document.createElement('style');
	
	
	static buttonsProperties = {
		
		flash_icons: ['data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy45LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iYnRuLWZsYXNoLW9mZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4Ig0KCSB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDggNDg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRjMzNDc7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9DQo8L3N0eWxlPg0KPGcgaWQ9ImJ0bl9iZyI+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTgsMWgzMmMzLjksMCw3LDMuMSw3LDd2MzJjMCwzLjktMy4xLDctNyw3SDhjLTMuOSwwLTctMy4xLTctN1Y4QzEsNC4xLDQuMSwxLDgsMXoiLz4NCjwvZz4NCjxwYXRoIGlkPSJQYXRoXzMxIiBjbGFzcz0ic3QxIiBkPSJNMTgsMTFoMTNsLTQuNSw5SDMxbC05LjEsMTYuOFYyNi41SDE4VjExeiBNMjAuNiwxMy41djEwLjRoMy45djMuNWwyLjYtNC43aC00LjlsNC42LTkuMQ0KCUwyMC42LDEzLjV6Ii8+DQo8L3N2Zz4NCg==', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy45LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iYnRuLWZsYXNoLW9uIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiDQoJIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OCA0ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGMzM0Qzt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJidG5fYmciPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDBoMzJjNC40LDAsOCwzLjYsOCw4djMyYzAsNC40LTMuNiw4LTgsOEg4Yy00LjQsMC04LTMuNi04LThWOEMwLDMuNiwzLjYsMCw4LDB6Ii8+DQo8L2c+DQo8cGF0aCBpZD0iUGF0aF8zNCIgY2xhc3M9InN0MSIgZD0iTTE4LDExdjE0LjJoMy45djExLjZMMzEsMjEuM2gtNS4yTDMxLDExSDE4eiIvPg0KPC9zdmc+DQo='],
		zoom_icons: ['data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy45LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iYnRuLXpvb20tb24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCINCgkgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4IDQ4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDpub25lO3N0cm9rZTojRkYzMzQ3O3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJidG5fYmciPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDFoMzJjMy45LDAsNywzLjEsNyw3djMyYzAsMy45LTMuMSw3LTcsN0g4Yy0zLjksMC03LTMuMS03LTdWOEMxLDQuMSw0LjEsMSw4LDF6Ii8+DQo8L2c+DQo8cGF0aCBpZD0iQ29sb3JfT3ZlcmxheSIgY2xhc3M9InN0MSIgZD0iTTMzLjYsMzUuNmwtNC41LTQuNWMtNC43LDMuNi0xMS4zLDIuNy0xNC45LTJzLTIuNy0xMS4zLDItMTQuOXMxMS4zLTIuNywxNC45LDINCgljMi45LDMuOCwyLjksOS4xLDAsMTIuOWw0LjUsNC41YzAuNSwwLjYsMC41LDEuNS0wLjEsMlMzNC4xLDM2LjEsMzMuNiwzNS42TDMzLjYsMzUuNnogTTE0LjgsMjIuNmMwLDQuMywzLjUsNy44LDcuOCw3LjgNCglzNy44LTMuNSw3LjgtNy44cy0zLjUtNy44LTcuOC03LjhDMTguMywxNC44LDE0LjgsMTguMywxNC44LDIyLjZ6IE0yMS42LDI3LjRjLTAuMy0wLjMtMC40LTAuNi0wLjQtMVYyNGgtMi40DQoJYy0wLjgsMC0xLjQtMC42LTEuNC0xLjRzMC42LTEuNCwxLjQtMS40bDAsMGgyLjR2LTIuNGMwLTAuOCwwLjYtMS40LDEuNC0xLjVTMjQsMTgsMjQsMTguOHYwLjF2Mi40aDIuNGMwLjgsMCwxLjQsMC42LDEuNCwxLjQNCglzLTAuNiwxLjQtMS40LDEuNGwwLDBIMjR2Mi40YzAsMC44LTAuNiwxLjQtMS40LDEuNEMyMi4yLDI3LjgsMjEuOSwyNy43LDIxLjYsMjcuNEwyMS42LDI3LjR6Ii8+DQo8L3N2Zz4NCg==', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy45LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iYnRuLXpvb20tb2ZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiDQoJIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OCA0ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGMzM0Nzt9DQoJLnN0MXtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJidG5fYmciPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDBoMzJjNC40LDAsOCwzLjYsOCw4djMyYzAsNC40LTMuNiw4LTgsOEg4Yy00LjQsMC04LTMuNi04LThWOEMwLDMuNiwzLjYsMCw4LDB6Ii8+DQo8L2c+DQo8cGF0aCBpZD0iQ29sb3JfT3ZlcmxheSIgY2xhc3M9InN0MSIgZD0iTTMzLjYsMzUuNmwtNC41LTQuNWMtNC43LDMuNi0xMS4zLDIuNy0xNC45LTJzLTIuNy0xMS4zLDItMTQuOXMxMS4zLTIuNywxNC45LDINCgljMi45LDMuOCwyLjksOS4xLDAsMTIuOWw0LjUsNC41YzAuNiwwLjUsMC42LDEuNCwwLjEsMmMtMC41LDAuNi0xLjQsMC42LTIsMC4xQzMzLjYsMzUuNywzMy42LDM1LjYsMzMuNiwzNS42TDMzLjYsMzUuNnoNCgkgTTE0LjgsMjIuNmMwLDQuMywzLjUsNy44LDcuOCw3LjhzNy44LTMuNSw3LjgtNy44cy0zLjUtNy44LTcuOC03LjhDMTguMywxNC44LDE0LjgsMTguMywxNC44LDIyLjZ6IE0xOC44LDI0DQoJYy0wLjgsMC0xLjQtMC42LTEuNC0xLjRjMC0wLjgsMC42LTEuNCwxLjQtMS40YzAsMCwwLDAsMCwwaDcuNmMwLjgsMCwxLjQsMC42LDEuNCwxLjRjMCwwLjgtMC42LDEuNC0xLjQsMS40YzAsMCwwLDAsMCwwSDE4Ljh6Ii8+DQo8L3N2Zz4NCg=='],
		close_icons: ['data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy45LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iYnRuLWNsb3NlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9DQoJLnN0MXtmaWxsOm5vbmU7fQ0KPC9zdHlsZT4NCjxwYXRoIGlkPSJQYXRoXzMwIiBjbGFzcz0ic3QwIiBkPSJNMjIsNGwtMi0ybC04LDhMNCwyTDIsNGw4LDhsLTgsOGwyLDJsOC04bDgsOGwyLTJsLTgtOEwyMiw0eiIvPg0KPHJlY3QgaWQ9IlJlY3RhbmdsZV8zOCIgeT0iMCIgY2xhc3M9InN0MSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+DQo8L3N2Zz4NCg=='],
		cameraPicker_icons: ['data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSwgLmNscy0yIHsKICAgICAgICBmaWxsOiAjRkZGRkZGOwogICAgICAgIHN0cm9rZS13aWR0aDogMHB4OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJtMTUsMjIuNzVoLTZjLTUuNDMsMC03Ljc1LTIuMzItNy43NS03Ljc1di02QzEuMjUsMy41NywzLjU3LDEuMjUsOSwxLjI1aDZjNS40MywwLDcuNzUsMi4zMiw3Ljc1LDcuNzV2NmMwLDUuNDMtMi4zMiw3Ljc1LTcuNzUsNy43NVpNOSwyLjc1Yy00LjYxLDAtNi4yNSwxLjY0LTYuMjUsNi4yNXY2YzAsNC42MSwxLjY0LDYuMjUsNi4yNSw2LjI1aDZjNC42MSwwLDYuMjUtMS42NCw2LjI1LTYuMjV2LTZjMC00LjYxLTEuNjQtNi4yNS02LjI1LTYuMjVoLTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJtMTgsNi41Yy0uMTMsMC0uMjYtLjAzLS4zOC0uMDgtLjEyLS4wNS0uMjMtLjEyLS4zMy0uMjEtLjA5LS4xLS4xNy0uMjEtLjIyLS4zMy0uMDUtLjEyLS4wNy0uMjUtLjA3LS4zOHMuMDItLjI2LjA3LS4zOGMuMDYtLjEzLjEzLS4yMy4yMi0uMzMuMDUtLjA0LjEtLjA5LjE1LS4xMi4wNi0uMDQuMTItLjA3LjE4LS4wOS4wNi0uMDMuMTItLjA1LjE5LS4wNi4zMi0uMDcuNjYuMDQuOS4yNy4wOS4xLjE2LjIuMjEuMzMuMDUuMTIuMDguMjUuMDguMzhzLS4wMy4yNi0uMDguMzgtLjEyLjIzLS4yMS4zM2MtLjEuMDktLjIxLjE2LS4zMy4yMS0uMTIuMDUtLjI1LjA4LS4zOC4wOFoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Im0xNS4wNSwxMC4yN2MtLjc1LTEtMS43NC0xLjc0LTMuMy0xLjc4LTEuODEsMC0zLjI1LDEuNDUtMy4yNSwzLjI1LDAsLjQxLS4zNC43NS0uNzUuNzVzLS43NS0uMzQtLjc1LS43NWMwLTQuMjQsNC45Ny02LjEsOC0zLjY1LS4xMi0xLjA2LDEuNDYtMS4yLDEuNS0uMTN2MmMuMDIuNy0uOTEsMS0xLjMyLjQ5bC0uMTMtLjE4Wm0tNi4xOSwzLjljMS44MSwyLjk0LDUuOTQsMi4xNSw2LjE0LTEuNDMsMC0uNDEuMzQtLjc1Ljc1LS43NXMuNzUuMzQuNzUuNzVjLjA4LDMuODYtNC42OSw2LjIyLTcuNTYsMy43LjA3LDEuMDMtMS40NywxLjExLTEuNS4wN3YtMmMtLjAyLS43Mi45OC0xLjAyLDEuMzYtLjQzbC4wNS4wOGgwWiIvPgo8L3N2Zz4='],
		
		showFlash: true,
		showZoom: true,
		showClose: true,
		showCameraPicker: true
	};
	
	static previewProperties = { x: 0, y: 0, width: 100, height: 100, orientation: 0 };
	
	static initialized = false;
	static initialized_dom = false;
	//----------------------------------------------------
	
	
	//methods
	//----------------------------------------------------
	static cameraPreview_init() {
		
		this.cameraPreview.id = "cameraPreview";
		this.cameraPreview.className = "cameraPreview-div";
		
		this.cameraPreview.style.position = "relative";
		this.cameraPreview.style.margin = "0";
		this.cameraPreview.style.padding = "0";
		this.cameraPreview.style.outline = "0";
		this.cameraPreview.style.fontSize = "100%";
		this.cameraPreview.style.verticalAlign = "baseline";
		this.cameraPreview.style.background = "0 0 black";
		
		//also TLWH
		this.cameraPreview.style.left 	= "" + this.previewProperties.x + "%";
		this.cameraPreview.style.top 	= "" + this.previewProperties.y + "%";
		this.cameraPreview.style.width 	= "" + this.previewProperties.width + "%";
		this.cameraPreview.style.height = "" + this.previewProperties.height + "%";
		
		this.cameraPreview.style.overflow = "hidden";
		this.cameraPreview.style.zIndex = "9999999";
		
		this.preview.id = "preview";
		this.preview.className = "cameraPreview-video";
		
		this.preview.playsInline = true; //for iOS Safari
		
		this.overlay.id = "overlay";
		this.overlay.className = "cameraPreview-canvas";
		
		this.overlay.style.position = "relative";
		this.overlay.style.top = "0%";
		this.overlay.style.left = "0px";
		this.overlay.style.backgroundColor = "transparent";
		this.overlay.style.zIndex = "99999999";
	};
	
	static flash_init(handler) {
		this.flash.id = "flash-button";
		
		if (!this.buttonsProperties.showFlash) this.flash.style.display = "none";
		
		var img = document.createElement('img');
		img.src = this.buttonsProperties.flash_icons[0];
		
		this.flash.appendChild(img);
		
		this.flash.style.position = "absolute";
		this.flash.style.cssFloat = "none";
		
		this.flash.style.top = "2px";
		this.flash.style.left = "2px";
		this.flash.style.width = "48px";
		this.flash.style.height = "48px";
		
		this.flash.style.zIndex = "999999999";
		
		this.flash.addEventListener('click', handler, false);
	};
	
	static zoom_init(handler) {
		this.zoom.id = "zoom-button";
		
		if (!this.buttonsProperties.showZoom) this.zoom.style.display = "none";
		
		var img = document.createElement('img');
		img.src = this.buttonsProperties.zoom_icons[0];
		
		this.zoom.appendChild(img);
		
		this.zoom.style.position = "absolute";
		this.zoom.style.cssFloat = "none";
		
		this.zoom.style.top = "2px";
		this.zoom.style.right = "2px";
		this.zoom.style.width = "48px";
		this.zoom.style.height = "48px";
		
		this.zoom.style.zIndex = "999999999";
		
		this.zoom.addEventListener('click', handler, false);
	};
	
	static close_init(handler) {
		this.close.id = "close-button";
		
		if (!this.buttonsProperties.showClose) this.close.style.display = "none";
		
		var img = document.createElement('img');
		img.src = this.buttonsProperties.close_icons[0];
		
		this.close.appendChild(img);
		
		this.close.style.position = "absolute";
		this.close.style.cssFloat = "none";
		
		this.close.style.right = "2px";
		this.close.style.width = "24px";
		this.close.style.height = "24px";
		
		this.close.style.zIndex = "999999999";
		
		this.close.addEventListener('click', handler, false);
	};
	
	static cameraPicker_init(handler) {
		this.cameraPicker.id = "cameraPicker-button";
		
		if (!this.buttonsProperties.showCameraPicker) this.cameraPicker.style.display = "none";
		
		var img = document.createElement('img');
		img.src = this.buttonsProperties.cameraPicker_icons[0];
		
		this.cameraPicker.appendChild(img);
		
		this.cameraPicker.style.position = "absolute";
		this.cameraPicker.style.cssFloat = "none";
		
		this.cameraPicker.style.left = "2px";
		this.cameraPicker.style.width = "48px";
		this.cameraPicker.style.height = "48px";
		
		this.cameraPicker.style.zIndex = "999999999";
		
		this.cameraPicker.addEventListener('click', handler, false);
	};
	
	//-----
	
	static cameraPickerUI_init(handler) {
		this.cameraPickerUI.id = "cameraPickerUI";
		this.cameraPickerUI_style.id = "cameraPickerUI_style";
		
		this.cameraPickerUI.style.position = "absolute";
		this.cameraPickerUI.style.cssFloat = "none";
		
		this.cameraPickerUI.style.top = "20%";
		this.cameraPickerUI.style.left = "20%";
		this.cameraPickerUI.style.width = "60%";
		this.cameraPickerUI.style.maxWidth = "90%";
		
		this.cameraPickerUI.style.background = "transparent";
		this.cameraPickerUI.style.borderRadius = "5px";
		
		this.cameraPickerUI.style.zIndex = "999999999";
	};
	
	static cameraPickerUI_update(cameras, currentCameraID) {
		
		let camerasCount = cameras.length;
		
		let input_elements = [];
		let label_elements = [];
		
		let elements_IDs = [];
		
		let desiredCameraLabels = ["back", "0"];
		
		for(let i = 0; i < camerasCount; i++)
		{
			let id = `c${i}`;
			
			elements_IDs.push(id);
			
			let input = document.createElement('input');
			input.id = id;
			input.name = "rd";
			input.type = "radio";
			
			input.style.display = "none";
			
			input.dataset.value = cameras[i].id;
			input.onclick = JS_media.changeCamera;
			
			if (currentCameraID != "") {
				//if (i == 0) input.setAttribute("checked", "checked"); //first
				if (cameras[i].id == currentCameraID) input.checked = true;
			}
			else {
				//
				let cameraLabel = cameras[i].label;
				
				if (cameraLabel.toLowerCase().includes(desiredCameraLabels[0].toLowerCase())) {
					//
					if (cameraLabel.toLowerCase().includes(desiredCameraLabels[1].toLowerCase())) {
						//android
						input.checked = true;
						Barkoder.setCameraId(cameras[i].id);
					}
					if (cameraLabel == "Back Camera") {
						//ios
						input.checked = true;
						Barkoder.setCameraId(cameras[i].id);
					}
				}
			}
			
			input_elements.push(input);
			
			let label = document.createElement('label');
			label.setAttribute("for", id);
			label.className = `box ${id}`;
			
			label.style.background = "rgba(255, 255, 255, 0.5)";
			label.style.marginTop = "2px";
			label.style.padding = "5px 12px";
			label.style.display = "flex";
			label.style.borderRadius = "5px";
			label.style.border = "2px solid transparent";
			label.style.borderColor = "rgba(0, 0, 0, 0.25)";
			label.style.cursor = "pointer";
			label.style.transition = "all 0.25s ease";
			
			let div = document.createElement('div');
			div.className = "content";
			
			div.style.display = "flex";
			div.style.width = "100%";
			div.style.alignItems = "center";
			
			let span = document.createElement('span');
			span.className = "circle";
			
			span.style.height = "6px";
			span.style.width = "6px";
			span.style.background = "#aaa";
			span.style.border = "2px solid transparent";
			span.style.borderColor = "rgba(0, 0, 0, 0.25)";
			span.style.display = "inline-block";
			span.style.marginRight = "15px";
			span.style.borderRadius = "50%";
			span.style.transition = "all 0.25s ease";
			
			let code = document.createElement('code');
			code.style.fontWeight = "bold";
			code.style.fontSize = "1.5vh";
			
			code.textContent = " " + cameras[i].label + " ";
			
			div.appendChild(span);
			div.appendChild(code);
			
			label.appendChild(div);
			
			label_elements.push(label);
			
			this.cameraPickerUI.appendChild(input);
			this.cameraPickerUI.appendChild(label);
		}
		
		this.cameraPickerUI_css(elements_IDs);
	};
	
	static cameraPickerUI_css(elements_IDs) {
		
		let elementsCount = elements_IDs.length;
		
		if (elementsCount == 0) return;
		
		let checked_labels = "";
		let checked_circles = "";
		
		for(let i = 0; i < elementsCount; i++)
		{
			let id = elements_IDs[i];
			
			checked_labels += `#cameraPickerUI #${id}:checked ~ label.${id}, `;
			checked_circles += `#cameraPickerUI #${id}:checked ~ label.${id} .circle, `;
		}
		
		checked_labels = checked_labels.slice(0, -2);
		checked_circles = checked_circles.slice(0, -2);
		
		checked_labels += (" " + "{ border-color:Red !important; background:#D5D5D5 !important; }");
		checked_circles += (" " + "{ border:2px solid !important; border-color:#333 !important; background:Red !important; }");
		
		let hovered_labels = "#cameraPickerUI label.box:hover { background:#E5E5E5 !important; }";
		
		let complete_css = `${checked_labels} ${hovered_labels} ${checked_circles}`;

		if (this.cameraPickerUI_style.styleSheet) {
			this.cameraPickerUI_style.styleSheet.cssText = complete_css;
		} else {
			//this.cameraPickerUI_style.appendChild(document.createTextNode(complete_css));
			this.cameraPickerUI_style.textContent = complete_css;
		}
		
		document.head.appendChild(this.cameraPickerUI_style);
	};
	
	static hideElements() {
		this.cameraPreview.style.visibility = "hidden";
		
		this.overlay.style.display = "none";
		this.flash.style.display = "none";
		this.zoom.style.display = "none";
		this.close.style.display = "none";
		this.cameraPicker.style.display = "none";
		this.cameraPickerUI.style.display = "none";
	};
	
	//NOTE: depends on JS_media
	//string values can be consts/enums
	static showElements() {
		this.cameraPreview.style.visibility = "visible";
		
		this.overlay.style.display = "initial";
		this.flash.style.display = (JS_media.flash.supported) ? ((this.buttonsProperties.showFlash) ? "initial" : "none") : "none";
		this.zoom.style.display = (JS_media.zoom.supported) ? ((this.buttonsProperties.showZoom) ? "initial" : "none") : "none";
		this.close.style.display = (this.buttonsProperties.showClose) ? "initial" : "none";
		this.cameraPicker.style.display = (this.buttonsProperties.showCameraPicker) ? "initial" : "none";
		//this.cameraPickerUI.style.display; //handled by cameraPickerHandler
	};
	
	static addPreview() {
		
		var container_exists = (this.container != undefined && this.container != null && typeof this.container === 'object' && this.container.tagName === 'DIV');
		
		if (!container_exists) this.container = document.body; //should it throw an error instead?
		
		this.container.appendChild(this.cameraPreview);
		
		if (this.initialized_dom) return;
		
		this.cameraPreview.appendChild(this.preview);
		this.cameraPreview.appendChild(this.overlay);
		this.cameraPreview.appendChild(this.flash);
		this.cameraPreview.appendChild(this.zoom);
		this.cameraPreview.appendChild(this.close);
		this.cameraPreview.appendChild(this.cameraPicker);
		this.cameraPreview.appendChild(this.cameraPickerUI);
		
		this.initialized_dom = true;
	};
	
	static stopPreview() {
		
		let cameraScannerProperties = Decoder.cameraScanner;
		const active = cameraScannerProperties.runningState.active;
		
		if (!active) return 1;
		
		//[1]
		Decoder.cameraScanner.runningState.active = false;
		
		//[2]
		let scanner_timeout = JS_media.scanner_timeout;
		if (scanner_timeout != null) { clearTimeout(scanner_timeout); scanner_timeout = null; }
		
		//[3]
		this.hideElements();
		
		//[3.1]
		//cameraPickerUI_style.textContent = "";
		document.head.removeChild(this.cameraPickerUI_style);
		
		//[3.2]
		this.cameraPickerUI.replaceChildren();
		
		//[4]
		if (this.preview.srcObject != null) this.preview.play();
		
		//[5]
		if (JS_media.videoTrack != null) JS_media.videoTrack.stop();
		
		//[6]
		Common.flashProxy.state = false;
		
		//[7] removeEventListener for all added
		//-------------------------------------------------------
		
		DOM_elements.readyToUse_RO = false;
		DOM_elements.resizeObserver.disconnect();
		
		window.removeEventListener('resize', Bridge.resizeHandler, false);
		
		if (Bridge.screenOrientation == 'undefined') window.removeEventListener('resize', Bridge.orientationChangeHandler, false);
		else screen.orientation.removeEventListener('change', Bridge.orientationChangeHandler);
		
		//NOTE: skip those under initialized
		
		this.preview.removeEventListener('loadeddata', JS_media.videoStreamData_handler_wrapper);
		//-------------------------------------------------------
		
		//[10]
		JS_media.videoTrack = null;
		JS_media.mediaStream = null;
		
		//[8]
		this.container.removeChild(this.cameraPreview);
		
		let startingROI = Connector.cache.ROI;
		let x = startingROI.x;
		let y = startingROI.y;
		let width = startingROI.width;
		let height = startingROI.height;
		
		Connector.setRegionOfInterest(x, y, width, height);
		
		//notify
		let stopEvent = new CustomEvent("stopScanner", { detail: "Camera stopped." });
		if (!JS_media.initial) document.dispatchEvent(stopEvent);
	};
	
	static createPreview() {
		
		if (!this.initialized) {
			
			this.cameraPreview_init();
			
			this.flash_init(JS_media.applyFlash);
			this.zoom_init(JS_media.applyZoom);
			this.close_init(JS_media.closeHandler);
			this.cameraPicker_init(JS_media.cameraPickerHandler);
			
			this.cameraPickerUI_init();
			
			this.initialized = true;
			
			Common.debugMessage("DOM", "in createPreview in initialized after everything", true);
		}
		
		
		this.hideElements();
		Common.debugMessage("DOM", "in createPreview after hideElements()", true);
		this.addPreview();
		Common.debugMessage("DOM", "in createPreview after addPreview()", true);
	};
	
	
	//----------------------------------------------------
}

class JS_media {
	
	//state
	//----------------------------------------------------
	static supported = (typeof navigator.mediaDevices == 'object' && typeof navigator.mediaDevices.getUserMedia == 'function');
	static initial = true;
	static initialTimeout = 2000;
	
	static browser_supported_constraints = null;
	static runtime_settings_videoTrack = null;
	static hardware_capabilities_ranges_videoTrack = null;
	
	static mediaStream = null;
	static videoTrack = null;
	
	static scanner_timeout = null;
	static videoStreamData_handler_wrapper = null;
	
	static frameWidth = { min: 640, ideal: 1280, max: 1920 };
	static frameHeight = { min: 480, ideal: 720, max: 1080 };
	
	static hardwareCameraResolution = { width: 1280, height: 720 };
	
	static frontCamera = false;
	
	static cameraId = '';
	
	static cameras = null;
	
	static constraints = {
		video: {
			width: null,//this.frameWidth,
			height: null,//this.frameHeight,
			frameRate: 30,
			facingMode: '',//(this.frontCamera) ? 'user' : 'environment',
			focusMode: 'continuous' //default
		}
	};
	
	static flash = { supported: false, ready: false, state: false };
	static zoom = { supported: false, ready: false, levels: [], level: 0 };
	
	//methods
	static constraints_init(width, height, useFrontCamera) {
		
		if (typeof width == 'number') this.frameWidth.ideal = width;
		if (typeof height == 'number') this.frameHeight.ideal = height;
		if (typeof useFrontCamera == 'boolean') this.frontCamera = useFrontCamera;
		
		this.constraints.video.width = this.frameWidth;
		this.constraints.video.height = this.frameHeight;
		if (this.cameraId == '')
		this.constraints.video.facingMode = (this.frontCamera) ? 'user' : 'environment';
		else
		this.constraints.video.deviceId = { exact: this.cameraId };
		
		this.hardwareCameraResolution.width = this.frameWidth.ideal;
		this.hardwareCameraResolution.height = this.frameHeight.ideal;
	};
	
	static applyFlash(changeState) {
		
		Common.debugMessage("JS_media", "in applyFlash", true);
		Common.debugMessage("", this, false); //this - context is div flash element
		
		let torchState = JS_media.flash.state;
		let videoTrack = JS_media.videoTrack;
		
		if (JS_media.videoTrack == null) return;
		
		if (!JS_media.flash.supported || !JS_media.flash.ready) return;		
		
		if (changeState) Common.flashProxy.state = !torchState;
		torchState = JS_media.flash.state; //see comment below
		
		if (JS_media.browser_supported_constraints.torch) {
			videoTrack.applyConstraints({
				advanced: [{torch: torchState}] //torchState is by value prior to change via Proxy
			})
			.catch(e => console.log(e));
		}
	};
	
	static applyZoom()
	{
		if (JS_media.videoTrack == null) return;
		
		if (!JS_media.zoom.supported || !JS_media.zoom.ready) return;
		
		JS_media.zoom.level++;
		Common.zoomProxy.level = (JS_media.zoom.level % 3);
		
		let zoomLevel = JS_media.zoom.level;
		let zoomLevels = JS_media.zoom.levels;
		let videoTrack = JS_media.videoTrack;
		
		videoTrack.applyConstraints({ advanced: [{zoom: zoomLevels[zoomLevel]}] }).catch(e => console.log(e));
	};
	
	static closeHandler()
	{
		DOM_elements.stopPreview();
	};
	
	static cameraPickerHandler()
	{
		let visibilityState = (DOM_elements.cameraPickerUI.style.display != "none");
		
		DOM_elements.cameraPickerUI.style.display = (visibilityState) ? "none" : "initial"; //inline-block
		
		let cameraPreview = DOM_elements.cameraPreview;
		let cameraPickerUI = DOM_elements.cameraPickerUI;
		
		let cameraPickerUI_height_percent = cameraPickerUI.offsetHeight / cameraPreview.offsetHeight;
		let cameraPickerUI_top_percent = Number(((1.0 - cameraPickerUI_height_percent) / 2.0).toFixed(2));
		let cameraPickerUI_height_half = Number((cameraPickerUI_height_percent / 2.0).toFixed(2));
		
		Common.debugMessage("resizeOverlay in handler", `${cameraPickerUI_height_percent} ${cameraPickerUI_top_percent} ${cameraPickerUI_height_half}`, false);
		
		cameraPickerUI.style.top = (cameraPickerUI_top_percent * 100) + "%";
	};
	
	static handleError(error) {
		
		console.error("Error " + error.name + " in constraint " + error.constraint + ": " + error.message);
		
		try { DOM_elements.stopPreview(); } catch(e) {}
		
		//callback with error details
		let cameraScannerProperties = Decoder.cameraScanner;
		
		cameraScannerProperties.config.result_callback({
			type: "error",
			error: {
				name: error.name,
				message: error.message ?? "",
			}
		});
	};
	
	static capabilitiesHandler() {
		if (typeof this.videoTrack.getCapabilities != 'function') return;
		
		const capabilities = this.videoTrack.getCapabilities(); //not available in Firefox
		this.hardware_capabilities_ranges_videoTrack = capabilities;
		
		Common.debugMessage("JS_media", "videoCapabilities", true);
		Common.debugMessage("", this.hardware_capabilities_ranges_videoTrack, true);
		
		Common.flashProxy.supported = capabilities.torch;
		this.flash.ready = true;
		
		//maybe apply for flash too
		
		if (capabilities.zoom) this.zoom.supported = true;
		else { DOM_elements.zoom.style.display = "none"; return; }
		
		//might be different scale values on different devices
		let min = capabilities.zoom.min;
		let max = capabilities.zoom.max;
		let step = capabilities.zoom.step;
		
		let mid = min + ((max - min) / 2);
		
		this.zoom.levels = [min, mid, max];
		
		this.zoom.ready = true;
		
		Common.debugMessage("capabilitiesHandler", "this.zoom.levels", true);
		Common.debugMessage("", this.zoom.levels, true);

		//apply
		let zoomLevel = this.zoom.level;
		let zoomLevels = this.zoom.levels;
		let videoTrack = this.videoTrack;
		
		videoTrack.applyConstraints({ advanced: [{zoom: zoomLevels[zoomLevel]}] }).catch(e => console.log(e));
	};
	
	static async getCameras() {
		
		async function requestPermission()
		{
			return new Promise(async function(resolve, reject) {
				
				//var stream = await navigator.mediaDevices.getUserMedia(JS_media.constraints);
				var stream = await navigator.mediaDevices.getUserMedia({ video: true });
				
				var videoTrack = stream.getVideoTracks()[0];
				var runtime_settings_videoTrack = videoTrack.getSettings();
				
				//camId_tmp = runtime_settings_videoTrack.deviceId;
				//debugToScreen("after --getUserMedia for permissions camera id is " + camId_tmp);
				
				if (videoTrack != null) videoTrack.stop();
				videoTrack = null;
				stream = null;
				
				resolve();
			});
			//----------------------------------------------
		};
		
		async function getCameraSelection(resolve)
		{
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoDevices = devices.filter(device => device.kind == 'videoinput');
			JS_media.cameras = videoDevices.map(videoDevice => {
				return { id: videoDevice.deviceId, label: videoDevice.label };
			});
			resolve(JS_media.cameras);
		};
		
		return new Promise(async function(resolve, reject) {
			
			if (!JS_media.supported)
			{
				if (location.protocol != "https:") JS_media.handleError({name: "SecurityError", message: "Not using HTTPS."}); //ProtocolError
				return reject("Camera access is not supported.");
			}
			
			try {
				const { state } = await navigator.permissions.query({name: "camera"});
				if (state != "granted") await requestPermission();
			}
			catch (error) {
				await requestPermission();
			}
			
			getCameraSelection(resolve);
		});
	};
	
	static async populateCameraPicker(currentCameraID)
	{
		let cameraCount = JS_media.cameras?.length ?? 0;
		
		if (cameraCount == 0) await Barkoder.getCameras();
		
		if ((currentCameraID == "") && (JS_media.cameraId != "")) currentCameraID = JS_media.cameraId;
		
		DOM_elements.cameraPickerUI_update(JS_media.cameras, currentCameraID);
		
		//cameraSelect.onchange = changeCamera; //probs best to remove on close, and re-add on start
	};
	
	static async changeCamera(event)
	{
		//
		Common.debugMessage("cameraPicker", "in onchange", true);
		
		let caller = event.target || event.srcElement;
		let cameraId = caller.dataset.value;
		
		Barkoder.stopScanner(); //tho it can also be the internal method
		//now this is not awaitable? its not, there is no need for it to be
		
		//but practically, there might be a need (still decoding frames and such)
		//plus operations taking longer on some devices
		
		await Common.wait(400); //200
		
		//cameraSelect.selectedIndex = [...cameraSelect.options].findIndex(option => option.text === JS_media.videoTrack.label);
		
		Common.debugMessage("cameraPicker", caller.value, true);
		Common.debugMessage("cameraPicker", caller.dataset.value, true);
		
		Barkoder.setCameraId(cameraId);
		
		Barkoder.startScanner(Decoder.cameraScanner.config.result_callback);
		
	}
	
	static startCamera(video, videoStreamData_handler, inactiveStream_handler) {
		
		if (!this.supported) {
			if (location.protocol != "https:") this.handleError({name: "SecurityError", message: "Not using HTTPS."});
			return;
		}
		
		this.browser_supported_constraints = navigator.mediaDevices.getSupportedConstraints();
		
		this.constraints_init();
		
		navigator.mediaDevices.getUserMedia(this.constraints)
		.then(function (stream) {
			
			let context = JS_media;
			Common.debugMessage("JS_media", "context = JS_media in getUserMedia", false);
			Common.debugMessage("", context, false); //OK
			
			//-----------------------------------
			if (context.initial) {
				
				DOM_elements.cameraPreview.style.visibility = "visible";
				
				Barkoder.stopScanner();
				
				setTimeout(function() {
					
					context.initial = false;
					Barkoder.startScanner(Decoder.cameraScanner.config.result_callback);
				}, context.initialTimeout);
			}
			//-----------------------------------
			
			context.mediaStream = stream;
			
			if (typeof inactiveStream_handler == 'function')
			stream.oninactive = inactiveStream_handler;
			
			const track = stream.getVideoTracks()[0];
			context.videoTrack = track;
			
			context.runtime_settings_videoTrack = track.getSettings();
			
			context.hardwareCameraResolution.width = context.runtime_settings_videoTrack.width;
			context.hardwareCameraResolution.height = context.runtime_settings_videoTrack.height;
			
			//--------------------------
			
			//context.populateCameraPicker(context.runtime_settings_videoTrack.deviceId);
			
			//--------------------------
			
			context.capabilitiesHandler();
			
			Common.debugMessage("JS_media", "in getUserMedia after capabilitiesHandler()", true);
			
			Common.debugMessage("JS_media", "video", false);
			Common.debugMessage("", video, false);
			
			if (typeof videoStreamData_handler == 'function')
			{
				let initial_s = JS_media.initial;
				context.videoStreamData_handler_wrapper = function () {
					//eventHandlers.loadeddata();
					videoStreamData_handler(initial_s);
				};
				video.addEventListener('loadeddata', context.videoStreamData_handler_wrapper);
			}
			Common.debugMessage("JS_media", "in getUserMedia after videoStreamData_handler is added as EL for loadeddata", true);
			
			video.srcObject = context.mediaStream;			
			video.onloadedmetadata = function (e) {
				
				this.muted = true;
				
				Common.debugMessage("JS_media", "in getUserMedia in onloadedmetadata handler before play", true);
				
				this.play()
				.catch(function(e) {
					
					Common.debugMessage("JS_media", "video", false);
					Common.debugMessage("", this, false);
					
					Common.debugMessage("JS_media", "play error", false);
					Common.debugMessage("", e, false);
					
				});
				
				context.applyFlash(false);
				
				Common.debugMessage("JS_media", "in getUserMedia in onloadedmetadata handler after play", true);
				
				//NOTE: depends on decoder_timeout
				let decoder_timeout = Decoder.cameraScanner.config.timeout;
				if (decoder_timeout != 0)
				context.scanner_timeout = setTimeout(async function () {
					
					DOM_elements.stopPreview();
					
				}, decoder_timeout * 1000);
			};
		})
		.catch(function(e) {
			JS_media.handleError(e);
		});
	};
}

class Bridge {
	
	static initialized = false;
	
	static hideDuringResize = false;
	
	static numberOfSupportedDecoders = 28; //const
	
	static enabledDecoders = 0;
	
	static untouchedROIArray = [];
	
	static viewfinder = { x: 0, y: 0, width: 0, height: 0, orientation: 0 };
	static untouchedROIUnion = { x: 0, y: 0, width: 100, height: 100 };
	static is_portrait = false;
	
	static viewfinderAppearance = {
		
		overlay: {
			roiVisible: true,
			lineWidth: 1.5,
			lineColor: "#ff3347" //rgba(255, 51, 71, 1.0)
		}
	};
	
	static cameraResolution_values = [[640, 480], [1280, 720], [1920, 1080]];
	
	static orientationType = {
		"landscape-primary": 	0,
		"portrait-primary": 	1,
		"landscape-secondary": 	2
	};
	
	static screenOrientation = (typeof screen.orientation == 'undefined') ? 'undefined' : screen.orientation;	
	
	static rotate(ROI, to_orientation) {
		
		if (to_orientation < 0 || to_orientation > 2) return ROI;

		let x1 = ROI.x;
		let y1 = ROI.y;
		let w1 = ROI.width;
		let h1 = ROI.height;

		let from_orientation = this.viewfinder.orientation;

		let rotate = [
			//landscape                                 portrait                                landscape flipped
			[{ x: x1, y: y1, width: w1, height: h1 }, { x: y1, y: (100 - x1 - w1), width: h1, height: w1 }, { x: (100 - x1 - w1), y: (100 - y1 - h1), width: w1, height: h1 }], //landscape
			[{ x: (100 - y1 - h1), y: x1, width: h1, height: w1 }, { x: x1, y: y1, width: w1, height: h1 }, { x: y1, y: (100 - x1 - w1), width: h1, height: w1 }], //portrait
			[{ x: (100 - x1 - w1), y: (100 - y1 - h1), width: w1, height: h1 }, { x: (100 - y1 - h1), y: (100 - x1 - w1), width: h1, height: w1 }, { x: x1, y: y1, width: w1, height: h1 }]  //landscape flipped
		];

		return rotate[from_orientation][to_orientation];
	};
	
	static scale(ROI, viewfinderScale, scaleHeight) {
		
		if (viewfinderScale < 0.01 || viewfinderScale > 1.0 || scaleHeight < 0 || scaleHeight > 1) return ROI;

		var x1 = ROI.x;
		var y1 = ROI.y;
		var w1 = ROI.width;
		var h1 = ROI.height;

		var cropScaleP = (1 - viewfinderScale) * 100; //on [0,100) scale
		//[scaleDirection]
		var scale_and_center = [
			//scale down and translate to justified position
			{ x: ((cropScaleP / 2) + (x1 * viewfinderScale)), y: y1, width: (w1 * viewfinderScale), height: h1 }, //scaleWidth
			{ x: x1, y: ((cropScaleP / 2) + (y1 * viewfinderScale)), width: w1, height: (h1 * viewfinderScale) }  //scaleHeight
		];

		return scale_and_center[scaleHeight];
	};
	
	static calculateROI(cameraPreview_AR_is_higher_than_camera_AR, croppedCameraAreaScale)
	{
		let is_portrait = this.is_portrait;
		
		let viewfinderAreaScale = (1 - croppedCameraAreaScale);
		
		let widthIndex = (is_portrait) ? 1 : 0;
		let heightIndex = (is_portrait) ? 0 : 1;
		
		// determine if cutting is done by width or height
		if ((!is_portrait && cameraPreview_AR_is_higher_than_camera_AR) || (is_portrait && !cameraPreview_AR_is_higher_than_camera_AR))
		{
			// it's done by height, less often
			let roi;

			for (let i = 0; i < this.numberOfSupportedDecoders; i++) {
				
				roi = this.rotate(this.untouchedROIArray[i], this.viewfinder.orientation);
				roi = this.scale(roi, viewfinderAreaScale, heightIndex);
				
				//needs to set individual ROIs for individual decoders
				Connector.setRegionOfInterest(roi.x, roi.y, roi.width, roi.height);
			}
		}
		else
		{
			// it's by width, more common
			let roi;

			for (let i = 0; i < this.numberOfSupportedDecoders; i++) {
				
				roi = this.rotate(this.untouchedROIArray[i], this.viewfinder.orientation);
				roi = this.scale(roi, viewfinderAreaScale, widthIndex);
				
				//needs to set individual ROIs for individual decoders
				Connector.setRegionOfInterest(roi.x, roi.y, roi.width, roi.height);
			}
		}
	};
	
	static calculatePreview(hardwareCameraResolution) {
		
		let previewFrame = DOM_elements.cameraPreview;
		let preview = DOM_elements.preview;
		
		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;
		let window_AR = windowWidth / windowHeight;
		
		let cameraPreviewWidth = previewFrame.offsetWidth;
		let cameraPreviewHeigth = previewFrame.offsetHeight;
		let cameraPreview_AR = cameraPreviewWidth / cameraPreviewHeigth;
		
		let cameraWidth = preview.videoWidth;;
		let cameraHeight = preview.videoHeight;
		let camera_AR = cameraWidth / cameraHeight;

		if (cameraPreview_AR == camera_AR) return;
		else if (cameraPreview_AR > camera_AR)
		{
			// fill video by width
			
			let scalingFactor = cameraPreviewWidth / cameraWidth;
			let new_cameraHeight = cameraHeight * scalingFactor;
			let croppedCameraArea = new_cameraHeight - cameraPreviewHeigth;
			
			// get percentages:
			let croppedCameraAreaScale = croppedCameraArea / new_cameraHeight;
			let translatedCameraTopPercent = -(croppedCameraAreaScale / 2) * 100;
			
			preview.style.cssText = "position: absolute; margin: auto; top: 0; bottom: 0; width: 100%; height: auto;";
			
			this.calculateROI(true, croppedCameraAreaScale);
		}
		else if (cameraPreview_AR < camera_AR)
		{
			//fill video by height
			
			let scalingFactor = cameraPreviewHeigth / cameraHeight;
			let new_cameraWidth = cameraWidth * scalingFactor;
			let croppedCameraArea = new_cameraWidth - cameraPreviewWidth;

			// get percentages
			let croppedCameraAreaScale = croppedCameraArea / new_cameraWidth;
			let translateCameraLeftPercent = -(croppedCameraAreaScale / 2) * 100;

			let croppedinDivAreaScale = croppedCameraArea / cameraPreviewWidth;
			translateCameraLeftPercent = -(croppedinDivAreaScale / 2) * 100;
			
			preview.style.cssText = "position: absolute; margin-left: " + translateCameraLeftPercent + "%; width: auto; height: 100%;";
			
			this.calculateROI(false, croppedCameraAreaScale);
		}
	};
	
	static handleOverlay() {
		
		let canvasOverlay = DOM_elements.overlay;
		let viewfinder = this.viewfinder;
		
		let mode = 1;
		
		var ctx = canvasOverlay.getContext("2d");
		
		if (mode == 0) {
			
			//cross-hairs visibility = "hidden"
			
			ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
		}
		else if (mode == 1)
		{
			if (!this.viewfinderAppearance.overlay.roiVisible) {
				ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
				return;
			}
			
			// draw shadow and clear the viewfinder area
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			//hmmm, maybe the bottom line is from somewhere else?
			ctx.fillRect(0, 0, canvasOverlay.width + 10, canvasOverlay.height + 10);
			ctx.clearRect(viewfinder.x, viewfinder.y, viewfinder.width, viewfinder.height);

			if (true) //borderVisible
			{
				// draw viewfinder border
				ctx.lineWidth = this.viewfinderAppearance.overlay.lineWidth;
				ctx.strokeStyle = this.viewfinderAppearance.overlay.lineColor;
				ctx.strokeRect(viewfinder.x, viewfinder.y, viewfinder.width, viewfinder.height);
			}
			
			Common.debugMessage("Bridge", "in handleOverlay() after mode 1 completed", true);
		}
		
		//user message
		if (Bridge.enabledDecoders == 0)
		{
			let middleWidth = canvasOverlay.width / 2;
			let middleHeight = canvasOverlay.height / 2;
			let fontSize = 20; //px
			ctx.font = `${fontSize}px Arial`;
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("There are no enabled symbologies.",middleWidth,middleHeight-fontSize);
			ctx.fillText("The scanner is not scanning for any barcodes.",middleWidth,middleHeight+fontSize);
			
			//console.log("user message, Bridge.enabledDecoders: " + Bridge.enabledDecoders);
		}
	};
	
	static resizeOverlay() {
		
		let viewfinderUnionROI = this.untouchedROIUnion;
		
		let cameraPreview = DOM_elements.cameraPreview;
		let canvasOverlay = DOM_elements.overlay;
		
		let cameraPickerUI = DOM_elements.cameraPickerUI;
		
		let flash = DOM_elements.flash;
		let zoom = DOM_elements.zoom;
		let close = DOM_elements.close;
		let cameraPicker = DOM_elements.cameraPicker;
		
		let viewfinder = this.viewfinder;

		//match preview
		//DOM_elements.setElementTop(canvasOverlay);
		canvasOverlay.style.top = cameraPreview.style.top;
		canvasOverlay.style.left = cameraPreview.style.left;
		canvasOverlay.width = cameraPreview.offsetWidth;
		canvasOverlay.height = cameraPreview.offsetHeight;
		
		Common.debugMessage("Bridge", "in resizeOverlay after overlay TLWH is set", true);
		
		flash.style.top = (canvasOverlay.offsetTop + 2) + "px";
		flash.style.left = canvasOverlay.offsetLeft + "px";
		zoom.style.top = (canvasOverlay.offsetTop + 2) + "px";
		zoom.style.left = ((canvasOverlay.offsetWidth + canvasOverlay.offsetLeft) - zoom.offsetWidth) + "px";
		
		close.style.top = ((canvasOverlay.offsetTop + canvasOverlay.height) - ((close.offsetHeight * 1.5) + 2)) + "px";
		close.style.left = ((canvasOverlay.offsetWidth + canvasOverlay.offsetLeft) - (close.offsetWidth * 1.5)) + "px";
		
		cameraPicker.style.top = ((canvasOverlay.offsetTop + canvasOverlay.height) - ((cameraPicker.offsetHeight * 1) + 2)) + "px";
		cameraPicker.style.left = canvasOverlay.offsetLeft + "px";
		
		let cameraPickerUI_height_percent = cameraPickerUI.offsetHeight / cameraPreview.offsetHeight;
		let cameraPickerUI_top_percent = Number(((1.0 - cameraPickerUI_height_percent) / 2.0).toFixed(2));
		let cameraPickerUI_height_half = Number((cameraPickerUI_height_percent / 2.0).toFixed(2));
		
		Common.debugMessage("resizeOverlay in handler", `${cameraPickerUI_height_percent} ${cameraPickerUI_top_percent} ${cameraPickerUI_height_half}`, false);
		
		cameraPickerUI.style.top = (cameraPickerUI_top_percent * 100) + "%";

		viewfinder.x = canvasOverlay.width * (viewfinderUnionROI.x / 100);
		viewfinder.y = canvasOverlay.height * (viewfinderUnionROI.y / 100);
		viewfinder.width = canvasOverlay.width * (viewfinderUnionROI.width / 100);
		viewfinder.height = canvasOverlay.height * (viewfinderUnionROI.height / 100);
		
		this.handleOverlay();
	};
	
	static resizePreview() {
		
		let hideDuringResize = this.hideDuringResize;
		let cameraPreview = DOM_elements.cameraPreview; //could also be preview i.e. video element
		let hardwareCameraResolution = JS_media.hardwareCameraResolution;
		
		//'window size is ' + window.innerWidth + 'x' + window.innerHeight

		// hide UI transformations, only show the final result
		if (hideDuringResize) {
			cameraPreview.style.visibility = "hidden";
		}
		
		//maybe Common.wait(1) between these calcs?
		
		Common.debugMessage("Bridge", "in resizePreview, before calling calculatePreview()", true);
		Common.debugMessage("", this, false); //first its Bridge, but then its window, so this method here should be wrapped before its passed on to EL
		
		this.calculatePreview(hardwareCameraResolution);
		this.resizeOverlay();
		
		if (hideDuringResize) {
			setTimeout(function () {
				cameraPreview.style.visibility = "visible";
			}, 1500); //depending on device, could be less [or is there a way to *know* how much it would take]
		}
	};
	
	//-----------------------------------helpers-----------------------------------
	
	static init_ROIs() {
		
		let numberOfSupportedDecoders = this.numberOfSupportedDecoders;
		let untouchedROIArray = this.untouchedROIArray;
		let untouchedROIUnion = this.untouchedROIUnion;
		
		if (!this.initialized)
		{
			//helper:
			Bridge["untouchedROIUnion_static"] = JSON.parse(JSON.stringify(untouchedROIUnion));
			
			for (let i = 0; i < numberOfSupportedDecoders; i++)
			{
				let rect = Connector.getRegionOfInterest(); //needs to get individual decoders ROI
				
				untouchedROIArray.push(rect);
			}
			
			this.initialized = true;
		}
		else
		{				
			for (let i = 0; i < numberOfSupportedDecoders; i++)
			{					
				let rect = Connector.getRegionOfInterest(); //needs to get individual decoders ROI
				
				untouchedROIArray[i] = rect;
			}
		}
		
		let ROIUnion = Connector.getRegionOfInterest();
		
		untouchedROIUnion.x = ROIUnion.x;
		untouchedROIUnion.y = ROIUnion.y;
		untouchedROIUnion.width = ROIUnion.width;
		untouchedROIUnion.height = ROIUnion.height;
	};
	
	static dpmHandler(use) {
		
		let ratio = window.screen.availWidth / window.screen.availHeight;
		
		let portrait_dpm_roi = [40, 44, 20, 12];
		let landscape_dpm_roi = [44, 40, 12, 20];
		
		if (ratio > 1.5) {
			
			if (Connector.templateMode == "dpm" || ((typeof use == 'boolean') && use))
			{
				//invert				
				Barkoder.setRegionOfInterest(
				landscape_dpm_roi[0],
				landscape_dpm_roi[1],
				landscape_dpm_roi[2],
				landscape_dpm_roi[3]);
				
			}
		}
		else {
			
			if (Connector.templateMode == "dpm")
			{
				//invert				
				Barkoder.setRegionOfInterest(
				portrait_dpm_roi[0],
				portrait_dpm_roi[1],
				portrait_dpm_roi[2],
				portrait_dpm_roi[3]);
				
			}
		}
	}
	
	static resizeHandler() {
		
		//------transpose ROI for dpm----------
		Bridge.dpmHandler();
		//------transpose ROI for dpm----------
		
		Bridge.resizePreview();
		
		let RP_properties = RefreshPreview.properties;
		
		RP_properties.resizeHandlerCallCount++;
		Common.debugMessage("resizeHandler", `resizeHandlerCallCount: ${RP_properties.resizeHandlerCallCount} at resizeEventCount: ${RP_properties.resizeEventCount}`, true);
		
		if (RefreshPreview.useRecursiveRefresh)
		{
			let currentValues = RefreshPreview.getValuesForResize();
			RP_properties.previousValues = JSON.parse(JSON.stringify(currentValues));
			
			RefreshPreview.refresh(++RP_properties.resizeEventCount);
		}
	};
	
	static orientationChangeHandler() {
		
		let orientation_int = (this.screenOrientation == 'undefined') ? Number(window.innerWidth < window.innerHeight) : this.orientationType[this.screenOrientation.type];
		let is_portrait = ((orientation_int % 2) == 1);
		
		this.viewfinder.orientation = orientation_int;
		this.is_portrait = is_portrait;
		
		//each frame is received exaclty in the orientation its preview-ed in
		
		let videoWidth = DOM_elements.preview.videoWidth; //video.naturalWidth;
		let videoHeight = DOM_elements.preview.videoHeight; //video.naturalHeight;
		
		let larger = videoWidth;
		let smaller = videoHeight;
			
		if (videoWidth < videoHeight)
		{
			larger = videoHeight;
			smaller = videoWidth;
		}
		
		//check hardwareCameraResolution usage
		JS_media.hardwareCameraResolution.width  = larger;
		JS_media.hardwareCameraResolution.height = smaller;
	};
}

//-----------------refresh-workaround-start---------------

class RefreshPreview {
	
	static useRecursiveRefresh = true;
	
	static properties = {
		previousValues: null,
		resizeEventCount: 0,
		resizeHandlerCallCount: 0
	};
	
	static clearProperties() {
		
		this.properties.previousValues = null;
		this.properties.resizeEventCount = 0;
		this.properties.resizeHandlerCallCount = 0;
	};

	static getValuesForResize() {

		let cameraPreview = DOM_elements.cameraPreview;

		let orientation = Bridge.viewfinder.orientation;
		let is_portrait = Bridge.is_portrait;

		let cameraPreviewTop = cameraPreview.offsetTop;
		let cameraPreviewLeft = cameraPreview.offsetLeft;
		let cameraPreviewWidth = cameraPreview.offsetWidth;
		let cameraPreviewHeigth = cameraPreview.offsetHeight;
		
		let cameraWidth = DOM_elements.preview.videoWidth;
		let cameraHeight = DOM_elements.preview.videoHeight;
		
		let values = 
		{
			cameraPreviewTop: 		cameraPreviewTop,
			cameraPreviewLeft: 		cameraPreviewLeft,
			cameraPreviewWidth: 	cameraPreviewWidth,
			cameraPreviewHeigth: 	cameraPreviewHeigth,
			cameraWidth: 			cameraWidth,
			cameraHeight: 			cameraHeight,
			orientation: 			orientation,
			is_portrait: 			is_portrait
		};
		
		return values;
	};

	//if true, no need to resize
	static checkSameValuesForResize() {
		
		let previousValues = this.properties.previousValues;
		let currentValues = this.getValuesForResize();
		
		//UI logs
		
		return (
			(currentValues.cameraPreviewTop == previousValues.cameraPreviewTop) &&
			(currentValues.cameraPreviewLeft == previousValues.cameraPreviewLeft) &&
			(currentValues.cameraPreviewWidth == previousValues.cameraPreviewWidth) &&
			(currentValues.cameraPreviewHeigth == previousValues.cameraPreviewHeigth) &&
			(currentValues.cameraWidth == previousValues.cameraWidth) &&
			(currentValues.cameraHeight == previousValues.cameraHeight) &&
			(currentValues.orientation == previousValues.orientation) &&
			(currentValues.is_portrait == previousValues.is_portrait)
		);
	};
	
	static refresh(resizeEventCount_at) {
		let refreshDuration = 0;
		let refreshRate = 50;
		let refreshFinish = 1500;
		let recursiveRefresh = setInterval(function()
		{
			refreshDuration += refreshRate;
			
			let resizeEventCount = RefreshPreview.properties.resizeEventCount; //read-only
			let RP_properties = RefreshPreview.properties;
			
			let cameraScannerProperties = Decoder.cameraScanner;
			const active = cameraScannerProperties.runningState.active;
			
			if (!active) {
				
				Common.debugMessage("RefreshPreview", `cleared recursiveRefresh at ${refreshDuration}ms because the decoder is not active`, true);
				
				clearInterval(recursiveRefresh); return;
			}
			
			if (refreshDuration > refreshFinish) { 
				
				Common.debugMessage("RefreshPreview", `cleared recursiveRefresh at ${refreshDuration}ms because it passed the limit of ${refreshFinish}ms`, true);
				
				clearInterval(recursiveRefresh); 
			}
			
			if (resizeEventCount > resizeEventCount_at) { 
				
				//might be faulty... might need to be resizeHandlerCallCount
				//or someone externally should be incrementing resizeEventCount
				
				Common.debugMessage("RefreshPreview", `cleared recursiveRefresh at ${refreshDuration}ms because more resize events (and subsequent resizeHandler calls) were already done i.e. ${resizeEventCount} > ${resizeEventCount_at}`, true);
				
				clearInterval(recursiveRefresh);
			}
			
			//in resizeHandler context
			var current_valuesForResize = RefreshPreview.getValuesForResize();

			if (RefreshPreview.checkSameValuesForResize()) return;
			
			Common.debugMessage("RefreshPreview", `recursiveRefresh[${resizeEventCount_at}] at ${refreshDuration}ms`, true);
			
			//UI logs

			RP_properties.previousValues = JSON.parse(JSON.stringify(current_valuesForResize));
			
			Bridge.orientationChangeHandler();
			Bridge.resizeHandler();
		}, refreshRate);
	};
}

//-----------------refresh-workaround-end-----------------


class Decoder { //Barkoder-scanner
	
	//state
	//----------------------------------------------------
	//see decoder.js class file
	
	static cameraScanner = {
		
		config: {
			timeout: 60,
			dps_limit: 2,
			continuous: false,
			result_beep: false,
			result_image: true,
			result_callback: (r) => console.log(r) //should be settable, same for all args here
		},
		
		overlay: {
			locationShow: true,
			locationShowTime: 400,
			locationLineWidth: 1.5,
			locationLineColor: "rgba(0, 255, 0, 1.0)"
		},
		
		runningState: {
			active: false,
			paused: false
		}
	};
	
	static locationClear = null;
	
	static async decoder(video, locationHandler) {
		//
		const dps_limit = this.cameraScanner.config.dps_limit;
		const frameInterval = 1000 / this.cameraScanner.config.dps_limit;
		
		let decodeCount = 0;
		
		let startTime = performance.now();
		
		let videoWidth = video.videoWidth; //video.naturalWidth;
		let videoHeight = video.videoHeight; //video.naturalHeight;
		

		var frameScanning = setInterval(async function () {
			
			let cameraScannerProperties = Decoder.cameraScanner;
			
			const active = cameraScannerProperties.runningState.active;
			const paused = cameraScannerProperties.runningState.paused;
			const continuous = cameraScannerProperties.config.continuous;
			const result_callback = cameraScannerProperties.config.result_callback;
			
			Common.debugMessage("frameScanning", `active is ${active}`, false);
			
			if (!active) { 
				
				let ref_type = typeof frameScanning;
				Common.debugMessage("frameScanning", `ref is ${ref_type}`, false);
				Common.debugMessage("", frameScanning, false);
				
				clearInterval(frameScanning);
				
				Common.debugMessage("frameScanning", `ref is now ${ref_type}`, false);
				Common.debugMessage("", frameScanning, false);
				
				return;
			}
			if (paused) return;
			
			decodeCount++;
			
			//relevant on orientation change
			videoWidth = video.videoWidth;
			videoHeight = video.videoHeight;
			
			if (videoWidth == 0 || videoHeight == 0) {
				return;
			}
			
			let canvasFrame = document.createElement("canvas");
			
			canvasFrame.width = videoWidth;
			canvasFrame.height = videoHeight;
			
			let ctx = canvasFrame.getContext("2d");
			
			ctx.drawImage(video, 0, 0, videoWidth, videoHeight); //source rectangle
			let imgData = ctx.getImageData(0, 0, canvasFrame.width, canvasFrame.height);
			
			//-------------------------------
			//Show frame if needed (Firefox)
			if (false)
			{
				//
				Common.debugMessage("Decoder", "Debug frame", true);
				let url = canvasFrame.toDataURL(); //dataURL is png
				let windowTitle = "Debug frame";
				//window.open(url, windowTitle);
				
				Common.debugMessage("", url, true);
			}
			//-------------------------------
			
			let scanFrame = Connector.scanFrame_native;
			
			startTime = performance.now();
			
			let BKResult = scanFrame(imgData, result_callback); //currently callback isn't executed by scanFrame_ext
			// Free memory - handled by scanFrame_ext
			
			
			let dps = 1000/(performance.now() - startTime); //current dps
			
			if (BKResult.resultsCount == 0)
			{
				if (decodeCount % 20 == 0)
				Common.debugMessage("Decoder", "dps(" + Math.round(dps) + "), frame " + decodeCount, true);
			}
			else
			{
				cameraScannerProperties.runningState.paused = true;
				
				let result = BKResult;
				
				//capturedFrame
				if (cameraScannerProperties.config.result_image)
				result.capturedFrame = imgData;
				
				if (result != null && result.resultsCount > 1 && result.results[0].location != null)
				{
					let multiple_locations = result.results.map(r => r.location);
					
					//console.log(multiple_locations);
					
					Decoder.locationOverlay(multiple_locations, canvasFrame.width, canvasFrame.height, frameInterval);
				}
				else
				if (result != null && result.location != null)
				//locationHandler(result.location, canvasFrame.width, canvasFrame.height, frameInterval);
				Decoder.locationOverlay(result.location, canvasFrame.width, canvasFrame.height, frameInterval); //might end up moving this back to its own class, and maybe even the assoc. properties there
				
				//ideally, scanFrame_ext should make use of the callback
				//and also do any beep if needed
				
				//here just canvas/location should be used
				//pause/unpause, active/unactive
				//and close
				
				
				if (continuous)
				{
					cameraScannerProperties.runningState.paused = true;
					
					if (typeof result_callback == 'function') result_callback(BKResult);
					else Common.debugMessage("Decoder", "result: " + BKResult.textualData, true);
					
				}
				else
				{
					cameraScannerProperties.runningState.paused = true;
					
					//pause preview on current frame
					video.pause();
					
					//use locationShowTime
					await Common.wait(500);
					
					/*await ?*/DOM_elements.stopPreview();
					
					cameraScannerProperties.runningState.paused = false; //reset on start -- maybe stopPreview should do that as the final step
					
					if (typeof result_callback == 'function') result_callback(BKResult);
					else Common.debugMessage("Decoder", "result: " + BKResult.textualData, true);
					
				}
			}
			
		}, frameInterval); 
	};
	
	static async locationOverlay(locations, frameWidth, frameHeight, frameInterval) {
		
		let preview = DOM_elements.preview;
		let canvasOverlay = DOM_elements.overlay;
		let viewfinder = Bridge.viewfinder;
		
		Common.debugMessage("context", "locationOverlay", false);
		Common.debugMessage("", this, false);
		
		let multidraw = false;
		if (typeof locations[0] == 'object') multidraw = true;
		
		//console.log("locationOverlay, multidraw: " + multidraw);
		
		let overlayProperties = this.cameraScanner.overlay;
		
		if (!overlayProperties.locationShow) return;
		
		
		let ctx = canvasOverlay.getContext("2d");
		
		//actual draw is further down in code, but its just calcs for getting the right coords
		//so clearing the timed clear + doing the clear now is just as ok
		
		if (this.locationClear != null) clearTimeout(this.locationClear); //relevant for CONT.
		ctx.clearRect(viewfinder.x + 1, viewfinder.y + 1, viewfinder.width - 2, viewfinder.height - 2);
		
		await Common.wait(10);

		Common.debugMessage("Decoder->Location", "result.locationPoints:", true);
		Common.debugMessage("", locations, true);
		
		ctx.lineWidth = overlayProperties.locationLineWidth;
		ctx.strokeStyle = overlayProperties.locationLineColor;

		let window_actualWidth = preview.offsetWidth;
		let window_actualHeight = preview.offsetHeight;
		
		let translate_x = (preview.offsetWidth - canvasOverlay.width) / 2;
		let translate_y = (preview.offsetHeight - canvasOverlay.height) / 2;
		
		let scale_x = window_actualWidth / frameWidth;
		let scale_y = window_actualHeight / frameHeight;
		
		if (!multidraw) {
			
			let x_points = [
				locations.p1.x,
				locations.p2.x,
				locations.p3.x,
				locations.p4.x
			].map(x => (x * scale_x) - translate_x);
			
			let y_points = [
				locations.p1.y,
				locations.p2.y,
				locations.p3.y,
				locations.p4.y
			].map(y => (y * scale_y) - translate_y);
			
			let x1 = x_points[0];
			let y1 = y_points[0];
			let x2 = x_points[1];
			let y2 = y_points[1];
			let x3 = x_points[2];
			let y3 = y_points[2];
			let x4 = x_points[3];
			let y4 = y_points[3];
			
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.lineTo(x4, y4);
			ctx.lineTo(x1, y1);
			
			ctx.stroke();
			
		} else {
			
			let drawCount = locations.length;
			
			for(let i = 0; i < drawCount; i++)
			{
				let location_i = locations[i];
				let x_points = [
					location_i.p1.x,
					location_i.p2.x,
					location_i.p3.x,
					location_i.p4.x
				].map(x => (x * scale_x) - translate_x);
				
				let y_points = [
					location_i.p1.y,
					location_i.p2.y,
					location_i.p3.y,
					location_i.p4.y
				].map(y => (y * scale_y) - translate_y);
				
				let x1 = x_points[0];
				let y1 = y_points[0];
				let x2 = x_points[1];
				let y2 = y_points[1];
				let x3 = x_points[2];
				let y3 = y_points[2];
				let x4 = x_points[3];
				let y4 = y_points[3];
				
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				ctx.lineTo(x4, y4);
				ctx.lineTo(x1, y1);
				
				ctx.stroke();
			}
		}
		
		//here-- also handle continuous scanning
		
		let locationBorderTime = (frameInterval > overlayProperties.locationShowTime) ? overlayProperties.locationShowTime : frameInterval;
		
		this.locationClear = setTimeout(async function () {
			ctx.clearRect(viewfinder.x + 1, viewfinder.y + 1, viewfinder.width - 2, viewfinder.height - 2);
			
			await Common.wait(10);
			
		}, locationBorderTime);
		
		//callback -- handled by scanning method
		// if no result - keep on scanning until either timeout or user calls closeScanner
		// if result - execute callback AND
		//		closeScanner (if in normal mode), or
		//		keep on scanning [until timeout/user] if continuous
		
		
	};
	
	static async videoStreamData_handler(initial_s) {
		
		let startEvent = new CustomEvent("startScanner", { detail: "Camera started." });
		if (!initial_s) document.dispatchEvent(startEvent);
		
		Common.debugMessage("Decoder", "start of videoStreamData_handler", true);
		
		Bridge.init_ROIs();
		Common.debugMessage("Decoder", "after init_ROIs()", true);
		
		await Common.wait(1);
		
		DOM_elements.showElements();
		
		Bridge.orientationChangeHandler();
		
		if (Bridge.screenOrientation == 'undefined') window.addEventListener('resize', Bridge.orientationChangeHandler, false);
		else screen.orientation.addEventListener('change', Bridge.orientationChangeHandler);
				
		window.addEventListener('resize', Bridge.resizeHandler, false); //resizePreview should be called in a separate method
		
		// Observe one or multiple elements
		if (DOM_elements.container != null) DOM_elements.resizeObserver.observe(DOM_elements.container);
		
		//--turn it on or off here--
		if (RefreshPreview.useRecursiveRefresh) RefreshPreview.clearProperties();
		if (RefreshPreview.useRecursiveRefresh) var currentValues = RefreshPreview.getValuesForResize();
		
		Bridge.resizePreview();
		
		if (RefreshPreview.useRecursiveRefresh) RefreshPreview.properties.previousValues = JSON.parse(JSON.stringify(currentValues));
		//--turn it on or off here--
		
		DOM_elements.readyToUse_RO = true;
		
		/*await*/ Decoder.decoder(DOM_elements.preview/*, Decoder.locationOverlay*/);
		
		Common.debugMessage("Decoder->start->startCamera", "Scanner start completed.", true);
	};
	
	static async start(callback) {
		
		let cameraScannerProperties = Decoder.cameraScanner;
		const active = cameraScannerProperties.runningState.active;
		
		if (active) return 1;
		cameraScannerProperties.runningState.active = true;
		
		cameraScannerProperties.config.result_callback = (typeof callback == 'function') ? callback : (r) => console.log(r);
		
		Common.debugMessage("start", "at start() 1", true);
		
		//------check container--------
		let context = DOM_elements;
		
		context.container = document.getElementById('barkoder-container');
		
		var container_exists = (context.container != undefined && context.container != null && typeof context.container === 'object' && context.container.tagName === 'DIV');
		
		if (!container_exists) {
			Common.debugMessage("start", `Container does not exist, aborting start.`, 1);
			return -1;
		}
		
		if (context.container.offsetWidth == 0 || context.container.offsetHeight == 0)
		{
			Common.debugMessage("start", `Container width or height is 0, setting half the window size (${window.innerWidth / 2}x${window.innerHeight / 2}px) as fallback size.`, 1);
			
			context.container.style.cssText = `width: ${window.innerWidth / 2}px; height: ${window.innerHeight / 2}px;`;
		}
		//------check container--------
		
		try {
			
			DOM_elements.createPreview();
			
			Common.debugMessage("start", "after createPreview()", true);
			
			Common.debugMessage("Decoder", "this.videoStreamData_handler", false);
			Common.debugMessage("", this.videoStreamData_handler, false);
			Common.debugMessage("", this, false); //when directly calling start, the context is the return object of the UMD module
			
			await Common.wait(200);
			
			await JS_media.populateCameraPicker("");
			
			JS_media.startCamera(DOM_elements.preview, this.videoStreamData_handler, function(){}); //inactive stream can have a handler
			
			Common.debugMessage("start", "after startCamera()", true);
			
		} catch(error) {
			//handle error
			
			Common.debugMessage("start", "error in start-try", true);
			Common.debugMessage("", error, true);
		}
		
		return 0;		
	};
}



class Common {
	static wait = ms => new Promise(resolve => setTimeout(resolve, ms)); //const
	
	static flashProxy = new Proxy(JS_media.flash, {
		set: function (target, key, value) {
			Common.debugMessage("flashProxy", `flash.${key} set to ${value}`, true);
			target[key] = value;
			
			if (key == 'state' && typeof value == 'boolean') {
				
				//console.log('state value: ' + Number(value));
				//console.log(DOM_elements.flash.getElementsByTagName('img')[0].src);
				//console.log(DOM_elements.buttonsProperties.flash_icons[Number(value)]);
				
				DOM_elements.flash.getElementsByTagName('img')[0].src = DOM_elements.buttonsProperties.flash_icons[Number(value)];
			}
			
			else if (key == 'supported' && typeof value == 'boolean') DOM_elements.flash.style.display = (value) ? "initial" : "none";
			
			return true;
		}
	});
	
	//JS_media.zoom.level
	
	static zoomProxy = new Proxy(JS_media.zoom, {
		set: function (target, key, value) {
			Common.debugMessage("flashProxy", `zoom.${key} set to ${value}`, true);
			target[key] = value;
			
			if (key == 'level' && typeof value == 'number') {
				
				let icon_i = (value == 0 || value == 1) ? 0 : 1;
				DOM_elements.zoom.getElementsByTagName('img')[0].src = DOM_elements.buttonsProperties.zoom_icons[icon_i];
			}
			
			else if (key == 'supported' && typeof value == 'boolean') DOM_elements.zoom.style.display = (value) ? "initial" : "none";
			
			return true;
		}
	});
	
	static debugMessage(tag, message, log) {
		
		if (typeof log == 'boolean' && log) {
			return;
			if (tag == '') console.log(message);
			else console.log('[' + tag + '] ' + message);
		}
		else if (typeof log == 'number' && log == 1) {
			if (tag == '') console.log(message);
			else console.log('[' + tag + '] ' + message);
		}
	};
	
	//example usage:
	//if (flashProxy.state)
	//flashProxy.state = false;
}



//-------------wrap--------------------

const ToggleTemplate = Object.freeze({
	Disable: 0,
	Enable: 1
});

const copyObject = (object) => JSON.parse(JSON.stringify(object));

class Constants {

	static DecodingSpeed = Object.freeze({
		Fast: 0,
		Normal: 1,
		Slow: 2
	});

	static Decoders = Object.freeze({
		Aztec: 0,
		AztecCompact: 1,
		QR: 2,
		QRMicro: 3,
		Code128: 4,
		Code93: 5,
		Code39: 6,
		Codabar: 7,
		Code11: 8,
		Msi: 9,
		UpcA: 10,
		UpcE: 11,
		UpcE1: 12,
		Ean13: 13,
		Ean8: 14,
		PDF417: 15,
		PDF417Micro: 16,
		Datamatrix: 17,
		Code25: 18,
		Interleaved25: 19,
		ITF14: 20,
		IATA25: 21,
		Matrix25: 22,
		Datalogic25: 23,
		COOP25: 24,
		Code32: 25,
		Telepen: 26,
		Dotcode: 27
	});
	
	static Code11ChecksumType = Object.freeze({
		disabled: 0,
		single: 1,
		double: 2
	});
	
	static Code39ChecksumType = Object.freeze({
		disabled: 0,
		enabled: 1
	});
	
	static MsiChecksumType = Object.freeze({
		disabled: 0,
		mod10: 1,
		mod11: 2,
		mod1010: 3,
		mod1110: 4,
		mod11IBM: 5,
		mod1110IBM: 6
	});

	static UpcEanDeblur = Object.freeze(copyObject(ToggleTemplate));
	static MulticodeCachingEnabled = Object.freeze(copyObject(ToggleTemplate)); //*
	static EnableMisshaped1D = Object.freeze(copyObject(ToggleTemplate)); //*
	static EnableVINRestrictions = Object.freeze(copyObject(ToggleTemplate)); //*

	static Formatting = Object.freeze({
		Disabled: 0,
		Automatic: 1,
		GS1: 2,
		AAMVA: 3
	});

	static EncodingCharacterSet = Object.freeze({
		None: 0,
		
		ISO_8859_2: 1,		// iso-8859-2		/ latin2
		ISO_8859_5: 2,		// iso-8859-5		/ cyrillic
		Shift_JIS: 3,		// shift-jis
		US_ASCII: 4,		// us-ascii
		UTF_8: 5,			// utf-8 (default)
		UTF_16: 6,			// utf-16 (little endian)
		
		windows_1251: 7,	// windows-1251
		windows_1256: 8		// windows-1256
	});

	static CameraResolution = Object.freeze({
		HD: 0,
		FHD: 1
	});

}

// == export types ==

let ConfigTypes = {}; 
{

	ConfigTypes.BarkoderConfig = class BarkoderConfig {
		
		closeSessionOnResultEnabled;// = true;
		barkoderResolution;// = Constants.CameraResolution.HD;
		decoder;// = new DekoderConfig(); //*
		
		constructor(config) {
			Object.assign(this, config);
		}

		toJsonString() {
			let configAsJson = {
				
				"closeSessionOnResultEnabled": this.closeSessionOnResultEnabled,
				"barkoderResolution": this.barkoderResolution,
				"decoder": this.decoder?.toMap()
			};

			return JSON.stringify(configAsJson);
		}
	}

	ConfigTypes.DekoderConfig = class DekoderConfig {
		aztec;// = new BarcodeConfig();
		aztecCompact;// = new BarcodeConfig();
		qr;// = new BarcodeConfig();
		qrMicro;// = new BarcodeConfig();
		code128;// = new BarcodeConfigWithLength();
		code93;// = new BarcodeConfigWithLength();
		code39;// = new Code39BarcodeConfig();
		codabar;// = new BarcodeConfigWithLength();
		code11;// = new Code11BarcodeConfig();
		msi;// = new MSIBarcodeConfig();
		upcA;// = new BarcodeConfig();
		upcE;// = new BarcodeConfig();
		upcE1;// = new BarcodeConfig();
		ean13;// = new BarcodeConfig();
		ean8;// = new BarcodeConfig();
		pdf417;// = new BarcodeConfig();
		pdf417Micro;// = new BarcodeConfig();
		datamatrix;// = new DatamatrixBarcodeConfig();
		code25;// = new BarcodeConfig();
		interleaved25;// = new BarcodeConfig();
		itf14;// = new BarcodeConfig();
		iata25;// = new BarcodeConfig();
		matrix25;// = new BarcodeConfig();
		datalogic25;// = new BarcodeConfig();
		coop25;// = new BarcodeConfig();
		code32;// = new BarcodeConfig();
		telepen;// = new BarcodeConfig();
		dotcode;// = new BarcodeConfig();
		general;// = new GeneralSettings();

		constructor(config) {
			Object.assign(this, config);
		}

		toMap() {
			const map = {
				'Aztec': this.aztec?.toMap(),
				'Aztec Compact': this.aztecCompact?.toMap(),
				'QR': this.qr?.toMap(),
				'QR Micro': this.qrMicro?.toMap(),
				'Code 128': this.code128?.toMap(),
				'Code 93': this.code93?.toMap(),
				'Code 39': this.code39?.toMap(),
				'Codabar': this.codabar?.toMap(),
				'Code 11': this.code11?.toMap(),
				'MSI': this.msi?.toMap(),
				'Upc-A': this.upcA?.toMap(),
				'Upc-E': this.upcE?.toMap(),
				'Upc-E1': this.upcE1?.toMap(),
				'Ean-13': this.ean13?.toMap(),
				'Ean-8': this.ean8?.toMap(),
				'PDF 417': this.pdf417?.toMap(),
				'PDF 417 Micro': this.pdf417Micro?.toMap(),
				'Datamatrix': this.datamatrix?.toMap(),
				'Code 25': this.code25?.toMap(),
				'Interleaved 2 of 5': this.interleaved25?.toMap(),
				'ITF 14': this.itf14?.toMap(),
				'IATA 25': this.iata25?.toMap(),
				'Matrix 25': this.matrix25?.toMap(),
				'Datalogic 25': this.datalogic25?.toMap(),
				'COOP 25': this.coop25?.toMap(),
				'Code 32': this.code32?.toMap(),
				'Telepen': this.telepen?.toMap(),
				'Dotcode': this.dotcode?.toMap(),
				'general': this.general?.toMap()
			}

			return map;
		}
	}

	ConfigTypes.BarcodeConfig = class BarcodeConfig {
        enabled;// = false;

        constructor(config) {
			Object.assign(this, config);
		}
		
		toMap() {
            const map = {
                "enabled": this.enabled
            }

            return map;
        }
    }

	ConfigTypes.BarcodeConfigWithLength = class BarcodeConfigWithLength {
        enabled;// = false;
        #minLength;
        #maxLength;

        constructor(config) {
			Object.assign(this, config);
		}

        toMap() {
            const map = {
                "enabled": this.enabled,
                "minimumLength": this.minLength,
                "maximumLength": this.maxLength
            }

            return map;
        }

        setLengthRange(minLength, maxLength) {
			
			if (typeof minLength != "number") throw new Error('Parameter minLength is not a number!');
			if (typeof maxLength != "number") throw new Error('Parameter maxLength is not a number!');
			
            this.minLength = minLength;
            this.maxLength = maxLength;
        }
    }

	ConfigTypes.MSIBarcodeConfig = class MSIBarcodeConfig {
        enabled;// = false;
        #minLength;
        #maxLength;
        checksum; //MsiChecksumType from constants

        constructor(config) {
			Object.assign(this, config);
		}

        toMap() {
            let map = {
                "enabled": this.enabled,
                "minimumLength": this.minLength,
                "maximumLength": this.maxLength,
                "checksum": this.checksum
            }

            return map;
        }

        setLengthRange(minLength, maxLength) {
			
			if (typeof minLength != "number") throw new Error('Parameter minLength is not a number!');
			if (typeof maxLength != "number") throw new Error('Parameter maxLength is not a number!');
			
            this.minLength = minLength;
            this.maxLength = maxLength;
        }
    }
	
	ConfigTypes.Code39BarcodeConfig = class Code39BarcodeConfig {
        enabled;// = false;
        #minLength;
        #maxLength;
        checksum; //Code39ChecksumType from constants

        constructor(config) {
			Object.assign(this, config);
		}

        toMap() {
            let map = {
                "enabled": this.enabled,
                "minimumLength": this.minLength,
                "maximumLength": this.maxLength,
                "checksum": this.checksum
            }

            return map;
        }

        setLengthRange(minLength, maxLength) {
			
			if (typeof minLength != "number") throw new Error('Parameter minLength is not a number!');
			if (typeof maxLength != "number") throw new Error('Parameter maxLength is not a number!');
			
            this.minLength = minLength;
            this.maxLength = maxLength;
        }
    }
	
	ConfigTypes.Code11BarcodeConfig = class Code11BarcodeConfig {
        enabled;// = false;
        #minLength;
        #maxLength;
        checksum; //Code11ChecksumType from constants

        constructor(config) {
			Object.assign(this, config);
		}

        toMap() {
            let map = {
                "enabled": this.enabled,
                "minimumLength": this.minLength,
                "maximumLength": this.maxLength,
                "checksum": this.checksum
            }

            return map;
        }

        setLengthRange(minLength, maxLength) {
			
			if (typeof minLength != "number") throw new Error('Parameter minLength is not a number!');
			if (typeof maxLength != "number") throw new Error('Parameter maxLength is not a number!');
			
            this.minLength = minLength;
            this.maxLength = maxLength;
        }
    }
	
	
	ConfigTypes.DatamatrixBarcodeConfig = class DatamatrixBarcodeConfig {
        enabled;// = false;
        dpmMode;
        #minLength;
        #maxLength;

        constructor(config) {
			Object.assign(this, config);
		}

        toMap() {
            let map = {
                "enabled": this.enabled,
                "dpmMode": this.dpmMode,
                "minimumLength": this.minLength,
                "maximumLength": this.maxLength,
            }

            return map;
        }

        setLengthRange(minLength, maxLength) {
			
			if (typeof minLength != "number") throw new Error('Parameter minLength is not a number!');
			if (typeof maxLength != "number") throw new Error('Parameter maxLength is not a number!');
			
            this.minLength = minLength;
            this.maxLength = maxLength;
        }
    }
	
	
	ConfigTypes.GeneralSettings = class GeneralSettings {
        
		decodingSpeed; //DecodingSpeed from constants
        roiX;
        roiY;
        roiWidth;
        roiHeight;
        formattingType; //Formatting from constants
        encodingCharacterSet; //EncodingCharacterSet from constants
        upcEanDeblur; //number
        enableMisshaped1D; //number

        constructor(config) {
			Object.assign(this, config);
		}

        toMap() {
            let map = {
                
				"decodingSpeed": this.decodingSpeed,
                "roi_x": this.roiX,
                "roi_y": this.roiY,
                "roi_w": this.roiWidth,
                "roi_h": this.roiHeight,
                "formattingType": this.formattingType,
                "encodingCharacterSet": this.encodingCharacterSet,
                "upcEanDeblur": this.upcEanDeblur,
                "enableMisshaped1D": this.enableMisshaped1D
            }

            return map;
        }

        setROI(x, y, width, height) {
			
			if (typeof x != "number") throw new Error('Parameter x is not a number!');
			if (typeof y != "number") throw new Error('Parameter y is not a number!');
			if (typeof width != "number") throw new Error('Parameter width is not a number!');
			if (typeof height != "number") throw new Error('Parameter height is not a number!');
			
            this.roiX = x;
            this.roiY = y;
            this.roiWidth = width;
            this.roiHeight = height;
        }
    }
}

// == export types ==

class Connector { //Barkoder-scanner
	
	static moduleLoaded = false;
	
	//-----------------------
	//static Module = {...};
	//-----------------------
	
	static cache = {
		ROI: { x: 0, y: 0, width: 100, height: 100 }
	};
	static isInRange(value, low, high) { return ((value >= low) && (value <= high)); };
	static storeROI(x,y,w,h) {
		//
		if (!Connector.isInRange(x, 0, 100)) return -1;
		if (!Connector.isInRange(y, 0, 100)) return -1;
		if (!Connector.isInRange(w, 0, 100)) return -1;
		if (!Connector.isInRange(h, 0, 100)) return -1;
		
		this.cache.ROI.x = x;
		this.cache.ROI.y = y;
		this.cache.ROI.width = w;
		this.cache.ROI.height = h;
		
		return 0;
	};
	
	static initialize = null;
	
	static getVersion = null;
	static getRegionOfInterest = null;
	static setRegionOfInterest = null;
	static setDecodingSpeed = null;
	static setEnabledDecoders = null;
	static setEnabledDecodersPro = null;
	static setUpcEanDeblur = null;
	
	static setSpecificConfig = null;
	static setLengthRange = null;
	static setFormatting = null;
	static setDuplicatesDelayMs = null;
	static setEncodingCharacterSet = null;
	static setMulticodeCachingEnabled  = null;
	static setMulticodeCachingDuration = null;
	static setEnableMisshaped1D = null;
	static setEnableVINRestrictions = null;
	
	static getDecodingSpeed = null;
	static getUpcEanDeblur = null;
	static getFormatting = null;
	static getDuplicatesDelayMs = null;
	static getEnableMisshaped1D = null;
	static getEnableVINRestrictions = null;
	
	static getEncodingCharacterSet = null;
	static getSpecificConfig = null;
	static getBarcodeTypeEnabled = null;
	
	static setBarcodeTypeEnabled = null;
	
	static getLengthRange = null;
	static getMulticodeCachingEnabled = null;
	static getMulticodeCachingDuration = null;
	
	static templateData = null;
	static templateMode = "all";
	
	static decoderGroup = {
		normal: 0,
		normalPlusLength: 1,
		normalPlusChecksum: 2, //also implies PlusLength
		other: 3
	};
	
	static templateModes = [
		"all"
		,"pdf_optimized"
		,"qr"
		,"retail_1d"
		,"industrial_1d"
		,"all_2d"
		,"dpm"
		,"vin"
		,"dotcode"
	];
	
	static templateLinker = {
		//
		decoder: [
		
			{	name: "Aztec"			, number: 0		, group: this.decoderGroup.normal 	},
			{	name: "Aztec Compact"	, number: 1		, group: this.decoderGroup.normal 	},
			{	name: "QR"				, number: 2		, group: this.decoderGroup.normal 	},
			{	name: "QR Micro"		, number: 3		, group: this.decoderGroup.normal 	},
			{	name: "Upc-A"			, number: 10	, group: this.decoderGroup.normal 	},
			{	name: "Upc-E"			, number: 11	, group: this.decoderGroup.normal 	},
			{	name: "Ean-13"			, number: 13	, group: this.decoderGroup.normal 	},
			{	name: "Ean-8"			, number: 14	, group: this.decoderGroup.normal 	},
			{	name: "PDF 417"			, number: 15	, group: this.decoderGroup.normal 	},
			{	name: "PDF 417 Micro"	, number: 16	, group: this.decoderGroup.normal 	},
			{	name: "ITF 14"			, number: 20	, group: this.decoderGroup.normal 	},
			{	name: "Dotcode"			, number: 27	, group: this.decoderGroup.normal 	},
			
			{	name: "Code 128"		, number: 4		, group: this.decoderGroup.normalPlusLength 	},
			{	name: "Code 93"			, number: 5		, group: this.decoderGroup.normalPlusLength 	},
			{	name: "Code 32"			, number: 25	, group: this.decoderGroup.normalPlusLength 	},
			{	name: "Telepen"			, number: 26	, group: this.decoderGroup.normalPlusLength 	},
			{	name: "Codabar"			, number: 7		, group: this.decoderGroup.normalPlusLength 	},
			
			{	name: "Code 11"			, number: 8		, group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "MSI"				, number: 9		, group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "Code 25"			, number: 18	, group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "Interleaved 2 of 5" , number: 19 , group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "IATA 25"			, number: 21	, group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "Matrix 25"		, number: 22	, group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "COOP 25"			, number: 24	, group: this.decoderGroup.normalPlusChecksum 	},
			{	name: "Code 39"			, number: 6		, group: this.decoderGroup.normalPlusChecksum 	},
			
			{	name: "Datamatrix"		, number: 17	, group: this.decoderGroup.other 	}
		
		]
	};
	
	static applyTemplate(templateFile, templateMode) {
		
		templateMode = (Connector.templateModes.includes(templateMode)) ? templateMode : Connector.templateMode;
		Connector.templateMode = templateMode;
		Common.debugMessage("Connector", "templateMode: " + templateMode, true);
		
		fetch(templateFile).then(function(res){
			return res.json()
		}).then(function(data){
			Connector.templateData = data;
			
			let decoder = data[templateMode].decoder;
			let general = decoder.general;
			
			let totalDecoders = Connector.templateLinker.decoder.length;
			
			let decodersToEnable = 0;
			
			for(let i = 0; i < totalDecoders; i++)
			{
				let decoderName = Connector.templateLinker.decoder[i].name;
				let decoderNumber = Connector.templateLinker.decoder[i].number;
				let decoderGroup = Connector.templateLinker.decoder[i].group;
				
				Common.debugMessage("Connector", decoderName + " i: " + i, false);
				Common.debugMessage("", decoder[decoderName], false);
				
				if (typeof decoder[decoderName] == 'object')
				{
					//
					Common.debugMessage("Connector", "decoderName: " + decoderName, false);
					if (decoder[decoderName].enabled) decodersToEnable += Math.pow(2, decoderNumber);
					
					if (decoderGroup == Connector.decoderGroup.normalPlusLength)
					{
						//
						Connector.setLengthRange(decoderNumber, decoder[decoderName].minimumLength, decoder[decoderName].maximumLength);
					}
					else if (decoderGroup == Connector.decoderGroup.normalPlusChecksum)
					{
						//
						Connector.setLengthRange(decoderNumber, decoder[decoderName].minimumLength, decoder[decoderName].maximumLength);
						Connector.setSpecificConfig(decoderNumber, decoder[decoderName].checksum);
					}
					else if (decoderGroup == Connector.decoderGroup.other)
					{
						//
						Connector.setSpecificConfig(decoderNumber, decoder[decoderName].dpmMode);
					}
				}
			}
			
			Common.debugMessage("Connector", "decodersToEnable: " + decodersToEnable, true);
			Connector.setEnabledDecodersPro(decodersToEnable);
			Bridge.enabledDecoders = decodersToEnable;
			
			Connector.setDecodingSpeed(general.decodingSpeed);
			Connector.setDuplicatesDelayMs(general.duplicatesDelayMs);
			Connector.setEnableMisshaped1D(general.enableMisshaped1D);
			Connector.setEnableVINRestrictions(general.enableVINRestrictions);
			Connector.setEncodingCharacterSet(general.encodingCharacterSet);
			Connector.setFormatting(general.formattingType);
			//general.maxThreads
			Connector.setMulticodeCachingDuration(general.multicodeCachingDuration);
			Connector.setMulticodeCachingEnabled(general.multicodeCachingEnabled);
			
			Barkoder.setContinuous(!general.closeSessionOnResultEnabled);
			
			/*Connector.storeROI(
				general.roi_x,
				general.roi_y,
				general.roi_w,
				general.roi_h);*/
			
			
			Barkoder.setRegionOfInterest(
				general.roi_x,
				general.roi_y,
				general.roi_w,
				general.roi_h);
			
			//------transpose ROI for dpm----------
			Bridge.dpmHandler();
			//------transpose ROI for dpm----------
			
			//general.thresholdBetweenDuplicatesScans
			Connector.setUpcEanDeblur(general.upcEanDeblur);
			
			Common.debugMessage("Connector", templateFile + " applied successfully", true);
		}).catch((error) => {
			//TypeError: Failed to fetch
			console.log('Failed to fetch ' + templateFile + ' -> error', error);
		});
		
	};
	
	static scanFrame_native(imageData, result_callback) {
		
		let data = imageData.data;
		let nDataBytes = data.length * data.BYTES_PER_ELEMENT;
		let dataPtr = Module._malloc(nDataBytes);
		Module.HEAPU8.set(data, dataPtr);
		
		let BKResult_json;
		let DEBUG_CODE = 0;
		
		BKResult_json = Module.cwrap("api_BKDecodeImageMemory", "string", ["number", "number", "number", "number"])(dataPtr, imageData.width, imageData.height, DEBUG_CODE); //maybe asign when Module is loaded
		
		//result_callback(JSON.parse(BKResult_json)); //maybe
		//maybe also do any 'beep' here
		
		let BKResult = JSON.parse(BKResult_json);
		
		Module._free(BKResult_json);
		Module._free(dataPtr);
		dataPtr = null;
		
		return BKResult;
	};
	
	static scanImage = function (imageURI, result_callback) {
		
		if (typeof imageURI != 'string') return Promise.resolve(false);
		
		let canvasFrame = document.createElement('canvas');
		let imageFrame = document.createElement('img');
		
		//result_callback = (typeof result_callback == 'function') ? result_callback : (r) => console.log(r);
		
		let use_callback = (typeof result_callback == 'function');
		
		return new Promise((resolve) => {
			
			imageFrame.onload = function () {
				canvasFrame.width = imageFrame.width;
				canvasFrame.height = imageFrame.height;
				
				var ctx = canvasFrame.getContext('2d');
				ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
				ctx.fillRect(0, 0, canvasFrame.width, canvasFrame.height);
				
				ctx.drawImage(imageFrame, 0, 0, imageFrame.width, imageFrame.height); //add [,offset-x, offset-y, upto-x, upto-y] to center a smaller image
				
				var imageData = ctx.getImageData(0, 0, canvasFrame.width, canvasFrame.height);
				
				let BKResult = Connector.scanFrame_native(imageData, result_callback);
				
				ctx.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
				canvasFrame.width = 0;
				canvasFrame.height = 0;
				
				if (use_callback) { result_callback(BKResult); resolve(true); }
				else resolve(BKResult);
			};
			
			imageFrame.onerror = (e) => {
				Common.debugMessage("scanImage", e.type, true);
				resolve(false);
			};
			
			imageFrame.src = imageURI;
		});
	};
	
	static scannerEvent = new CustomEvent("scannerReady", { detail:"Scanner is ready." });
}

var Module = {
	//_free: () => {/*needs to be added as an extra f() during build*/},
	preRun:[],
	postRun:[
		() => Common.debugMessage("Module", "The main() function is done.", true),
		async () => {
			if (Connector.moduleLoaded) return;
			
			if(typeof Module._free == "undefined") Module._free = Module.cwrap("aux_freeMemory",null,["number"]);
			
			//cfg_BKSetRegionOfInterest(float left, float top, float width, float height)
			//cfg_BKGetRegionOfInterest()
			//cfg_BKSetDecodingSpeed(int speed)
			
			Connector.initialize = Module.cwrap("initialize","number",["number"]); //export
			
			Connector.getVersion = Module.cwrap("inf_BKgetVersion","string",[]);
			Connector.getRegionOfInterest = Module.cwrap("cfg_BKGetRegionOfInterest","string",[]);
			Connector.setRegionOfInterest = Module.cwrap("cfg_BKSetRegionOfInterest",undefined,["number","number","number","number"]);
			Connector.setDecodingSpeed = Module.cwrap("cfg_BKSetDecodingSpeed","number",["number"]);
			
			//cfg_BKSetEnabledDecoders(int startingDecoder, int endingDecoder)
			//cfg_BKSetEnabledDecodersPro(int decoders)
			//cfg_BKSetUpcEanDeblur(int deblur)
			
			Connector.setEnabledDecoders = Module.cwrap("cfg_BKSetEnabledDecoders","number",["number","number"]);
			Connector.setEnabledDecodersPro = Module.cwrap("cfg_BKSetEnabledDecodersPro","number",["number"]);
			Connector.setUpcEanDeblur = Module.cwrap("cfg_BKSetUpcEanDeblur","number",["number"]);
			
			//cfg_BKSetSpecificConfig(int decoder, int value)
			//cfg_BKSetLengthRange(int decoder, int minimumLength, int maximumLength)
			//cfg_BKSetFormatting(int formatting)
			//cfg_BKSetDuplicatesDelayMs(int duplicatesDelayMs)
			//cfg_BKSetEncodingCharacterSet(int encodingCharacterSet)
			//cfg_BKSetMulticodeCachingEnabled(int multicodeCachingEnabled)
			//cfg_BKSetMulticodeCachingDuration(int multicodeCachingDuration)
			//cfg_BKSetEnableMisshaped1D(int enableMisshaped1D)
			//cfg_BKSetEnableVINRestrictions(int enableVINRestrictions)
			
			Connector.setSpecificConfig = Module.cwrap("cfg_BKSetSpecificConfig","number",["number","number"]);
			Connector.setLengthRange = Module.cwrap("cfg_BKSetLengthRange","number",["number","number","number"]);
			Connector.setFormatting = Module.cwrap("cfg_BKSetFormatting","number",["number"]);
			Connector.setDuplicatesDelayMs = Module.cwrap("cfg_BKSetDuplicatesDelayMs","number",["number"]);
			Connector.setEncodingCharacterSet = Module.cwrap("cfg_BKSetEncodingCharacterSet","number",["number"]);
			Connector.setMulticodeCachingEnabled = Module.cwrap("cfg_BKSetMulticodeCachingEnabled","number",["number"]);
			Connector.setMulticodeCachingDuration = Module.cwrap("cfg_BKSetMulticodeCachingDuration","number",["number"]);
			//new:
			Connector.setMaximumResultsCount = Module.cwrap("cfg_BKSetMaximumResultsCount","number",["number"]);
			Connector.setEnableMisshaped1D = Module.cwrap("cfg_BKSetEnableMisshaped1D","number",["number"]);
			Connector.setEnableVINRestrictions = Module.cwrap("cfg_BKSetEnableVINRestrictions","number",["number"]);
			
			//cfg_BKReturnDecodingSpeed
			//cfg_BKReturnUpcEanDeblur
			//cfg_BKReturnFormatting
			//cfg_BKReturnDuplicatesDelayMs
			//cfg_BKReturnEnableMisshaped1D
			//cfg_BKReturnEnableVINRestrictions
			
			Connector.getDecodingSpeed = Module.cwrap("cfg_BKReturnDecodingSpeed","number",[]);
			Connector.getUpcEanDeblur = Module.cwrap("cfg_BKReturnUpcEanDeblur","number",[]);
			Connector.getFormatting = Module.cwrap("cfg_BKReturnFormatting","number",[]);
			Connector.getDuplicatesDelayMs = Module.cwrap("cfg_BKReturnDuplicatesDelayMs","number",[]);
			Connector.getMaximumResultsCount = Module.cwrap("cfg_BKGetMaximumResultsCount","number",[]);
			Connector.getEnableMisshaped1D = Module.cwrap("cfg_BKReturnEnableMisshaped1D","number",[]);
			Connector.getEnableVINRestrictions = Module.cwrap("cfg_BKReturnEnableVINRestrictions","number",[]);
			
			//===
			//int cfg_BKReturnEncodingCharacterSet()
			//int cfg_BKReturnSpecificConfig(int decoder)
			//int cfg_BKReturnBarcodeTypeEnabled(int decoder)
			//int cfg_BKSetBarcodeTypeEnabled(int decoder, int enable)
			//int cfg_BKReturnLengthRange(int decoder)
			//int cfg_BKReturnMulticodeCachingEnabled()
			//int cfg_BKReturnMulticodeCachingDuration()
			//===
			
			Connector.getEncodingCharacterSet = Module.cwrap("cfg_BKReturnEncodingCharacterSet","number",[]);
			Connector.getSpecificConfig = Module.cwrap("cfg_BKReturnSpecificConfig","number",["number"]);
			Connector.getBarcodeTypeEnabled = Module.cwrap("cfg_BKReturnBarcodeTypeEnabled","number",["number"]);
			
			Connector.setBarcodeTypeEnabled = Module.cwrap("cfg_BKSetBarcodeTypeEnabled","number",["number","number"]);
			
			Connector.getLengthRange = Module.cwrap("cfg_BKReturnLengthRange","number",["number"]); //bitwise
			Connector.getMulticodeCachingEnabled = Module.cwrap("cfg_BKReturnMulticodeCachingEnabled","number",[]);
			Connector.getMulticodeCachingDuration = Module.cwrap("cfg_BKReturnMulticodeCachingDuration","number",[]);
			
			//----
			for(const key of Object.getOwnPropertyNames(Connector)) {
				const old = Connector[key];
				
				//'length', 'name', 'prototype', 'scanFrame_native', 'moduleLoaded', 'getVersion', 'getRegionOfInterest', 'setRegionOfInterest', 'setDecodingSpeed', 'scanImage', 'scannerEvent'
				
				Common.debugMessage("postRun", "Connector." + key + " accessed", false);
				Common.debugMessage("postRun", typeof old + " type", false);
				
				if (typeof old == 'function' && key.startsWith('get')) {
				
					Common.debugMessage("postRun", "Connector." + key + " is about to be overridden", true);
				
					Connector[key] = function(...args) {
						return JSON.parse(old.call(this, ...args));
					};
				}
			}
			//----
			
			//Connector.moduleLoaded = true;
			
			var timeCounter = 0;
			if (typeof window.BarkoderSDK_callback1D == 'undefined') window.BarkoderSDK_callback1D = false;
			while (!window.BarkoderSDK_callback1D) {
				await Common.wait(20);
				timeCounter += 20;
			}
			window.BarkoderSDK_callback1D = undefined;
			Common.debugMessage("Init", `Stage 1 took ${timeCounter}ms`, true);
			Connector.moduleLoaded = true;
			
			setTimeout(()=>{document.dispatchEvent(Connector.scannerEvent)}, 40);
		}
	],
	print: function (text) {
		Common.debugMessage("Module", text, 1);
	}
};

if (has_SIMD)
{

//-----------------------------------
var Module=typeof Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){return read(f)}}readBinary=function readBinary(f){var data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var tempRet0=0;var setTempRet0=function(value){tempRet0=value};var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr,maxBytesToRead){var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr))}else{var str="";for(var i=0;!(i>=maxBytesToRead/2);++i){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)break;str+=String.fromCharCode(codeUnit)}return str}}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}function lengthBytesUTF16(str){return str.length*2}function UTF32ToString(ptr,maxBytesToRead){var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}return str}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}function allocateUTF8(str){var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8Array(str,HEAP8,ret,size);return ret}function allocateUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8Array(str,HEAP8,ret,size);return ret}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;__ATINIT__.push({func:function(){___wasm_call_ctors()}});function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}function hasPrefix(str,prefix){return String.prototype.startsWith?str.startsWith(prefix):str.indexOf(prefix)===0}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return hasPrefix(filename,dataURIPrefix)}var fileURIPrefix="file://";function isFileURI(filename){return hasPrefix(filename,fileURIPrefix)}var wasmBinaryFile="barkoder.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["P"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["S"];removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={191692:function(){window.BarkoderSDK_callback2D=true},191730:function(){window.BarkoderSDK_callback3D=true},191768:function($0,$1){localStorage[UTF8ToString($0)]=UTF8ToString($1)},191823:function(){window.BarkoderSDK_callback1D=true}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)()}else{wasmTable.get(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var ExceptionInfoAttrs={DESTRUCTOR_OFFSET:0,REFCOUNT_OFFSET:4,TYPE_OFFSET:8,CAUGHT_OFFSET:12,RETHROWN_OFFSET:13,SIZE:16};function ___cxa_allocate_exception(size){return _malloc(size+ExceptionInfoAttrs.SIZE)+ExceptionInfoAttrs.SIZE}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-ExceptionInfoAttrs.SIZE;this.set_type=function(type){HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]=type};this.get_type=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]};this.set_destructor=function(destructor){HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]=destructor};this.get_destructor=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=refcount};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]=caught};this.get_caught=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]=rethrown};this.get_rethrown=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]!=0};this.init=function(type,destructor){this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false)};this.add_ref=function(){var value=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=value+1};this.release_ref=function(){var prev=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=prev-1;return prev===1}}var exceptionLast=0;var uncaughtExceptionCount=0;function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw ptr}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name}else{return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else{return this.name+": "+this.message}};return errorClass}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}});if(0===unregisteredTypes.length){onComplete(typeConverters)}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer')}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError("Cannot register type '"+name+"' twice")}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb()})}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return!!wt},"toWireType":function(destructors,o){return o?trueValue:falseValue},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8}else if(size===2){heap=HEAP16}else if(size===4){heap=HEAP32}else{throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])},destructorFunction:null})}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle)}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval}function __emval_register(value){switch(value){case undefined:{return 1}case null:{return 2}case true:{return 3}case false:{return 4}default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv},"toWireType":function(destructors,value){return __emval_register(value)},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null})}function _embind_repr(v){if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null})}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired"}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n"}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n"}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2])}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction)}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n"}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!")}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice")}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!")}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments}}}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i])}return array}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}}function dynCallLegacy(sig,ptr,args){var f=Module["dynCall_"+sig];return args&&args.length?f.apply(null,[ptr].concat(args)):f.call(null,ptr)}function dynCall(sig,ptr,args){if(sig.indexOf("j")!=-1){return dynCallLegacy(sig,ptr,args)}return wasmTable.get(ptr).apply(null,args)}function getDynCaller(sig,ptr){var argCache=[];return function(){argCache.length=arguments.length;for(var i=0;i<arguments.length;i++){argCache[i]=arguments[i]}return dynCall(sig,ptr,argCache)}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(){if(signature.indexOf("j")!=-1){return getDynCaller(signature,rawFunction)}return wasmTable.get(rawFunction)}var fp=makeDynCaller();if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction)}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes)},argCount-1);whenDependentTypesAreResolved([],argTypes,function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);return[]})}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var shift=getShiftFromSize(size);var fromWireType=function(value){return value};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift}}var isUnsignedType=name.indexOf("unsigned")!=-1;registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return isUnsignedType?value>>>0:value|0},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null})}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true})}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==="std::string";registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var str;if(stdStringIsUTF8){var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i;if(i==length||HEAPU8[currentBytePtr]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+1}}}else{var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i])}str=a.join("")}_free(value);return str},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}var getLength;var valueIsOfTypeString=typeof value==="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string")}if(stdStringIsUTF8&&valueIsOfTypeString){getLength=function(){return lengthBytesUTF8(value)}}else{getLength=function(){return value.length}}var length=getLength();var ptr=_malloc(4+length+1);HEAPU32[ptr>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr+4,length+1)}else{if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+4+i]=charCode}}else{for(var i=0;i<length;++i){HEAPU8[ptr+4+i]=value[i]}}}if(destructors!==null){destructors.push(_free,ptr)}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr)}})}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var decodeString,encodeString,getHeap,lengthBytesUTF,shift;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;getHeap=function(){return HEAPU16};shift=1}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;getHeap=function(){return HEAPU32};shift=2}registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var HEAP=getHeap();var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||HEAP[currentBytePtr>>shift]==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+charSize}}_free(value);return str},"toWireType":function(destructors,value){if(!(typeof value==="string")){throwBindingError("Cannot pass non-string to C++ string type "+name)}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length>>shift;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr)}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr)}})}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined},"toWireType":function(destructors,o){return undefined}})}function requireHandle(handle){if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle)}return emval_handle_array[handle].value}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType))}return impl}function __emval_as(handle,returnType,destructorsRef){handle=requireHandle(handle);returnType=requireRegisteredType(returnType,"emval::as");var destructors=[];var rd=__emval_register(destructors);HEAP32[destructorsRef>>2]=rd;return returnType["toWireType"](destructors,handle)}function __emval_allocateDestructors(destructorsRef){var destructors=[];HEAP32[destructorsRef>>2]=__emval_register(destructors);return destructors}var emval_symbols={};function getStringOrSymbol(address){var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}else{return symbol}}var emval_methodCallers=[];function __emval_call_method(caller,handle,methodName,destructorsRef,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);return caller(handle,methodName,__emval_allocateDestructors(destructorsRef),args)}function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);caller(handle,methodName,null,args)}function emval_get_global(){if(typeof globalThis==="object"){return globalThis}return function(){return Function}()("return this")()}function __emval_get_global(name){if(name===0){return __emval_register(emval_get_global())}else{name=getStringOrSymbol(name);return __emval_register(emval_get_global()[name])}}function __emval_addMethodCaller(caller){var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id}function __emval_lookupTypes(argCount,argTypes){var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAP32[(argTypes>>2)+i],"parameter "+i)}return a}function __emval_get_method_caller(argCount,argTypes){var types=__emval_lookupTypes(argCount,argTypes);var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map(function(t){return t.name}).join("_")+"$";var params=["retType"];var args=[retType];var argsList="";for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;params.push("argType"+i);args.push(types[1+i])}var functionName=makeLegalFunctionName("methodCaller_"+signatureName);var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";var offset=0;for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";offset+=types[i+1]["argPackAdvance"]}functionBody+="    var rv = handle[name]("+argsList+");\n";for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n"}}if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n"}functionBody+="};\n";params.push(functionBody);var invokerFunction=new_(Function,params).apply(null,args);return __emval_addMethodCaller(invokerFunction)}function __emval_get_module_property(name){name=getStringOrSymbol(name);return __emval_register(Module[name])}function __emval_get_property(handle,key){handle=requireHandle(handle);key=requireHandle(key);return __emval_register(handle[key])}function __emval_incref(handle){if(handle>4){emval_handle_array[handle].refcount+=1}}function craftEmvalAllocator(argCount){var argsList="";for(var i=0;i<argCount;++i){argsList+=(i!==0?", ":"")+"arg"+i}var functionBody="return function emval_allocator_"+argCount+"(constructor, argTypes, args) {\n";for(var i=0;i<argCount;++i){functionBody+="var argType"+i+" = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + "+i+'], "parameter '+i+'");\n'+"var arg"+i+" = argType"+i+".readValueFromPointer(args);\n"+"args += argType"+i+"['argPackAdvance'];\n"}functionBody+="var obj = new constructor("+argsList+");\n"+"return __emval_register(obj);\n"+"}\n";return new Function("requireRegisteredType","Module","__emval_register",functionBody)(requireRegisteredType,Module,__emval_register)}var emval_newers={};function __emval_new(handle,argCount,argTypes,args){handle=requireHandle(handle);var newer=emval_newers[argCount];if(!newer){newer=craftEmvalAllocator(argCount);emval_newers[argCount]=newer}return newer(handle,argTypes,args)}function __emval_new_cstring(v){return __emval_register(getStringOrSymbol(v))}function __emval_run_destructors(handle){var destructors=emval_handle_array[handle].value;runDestructors(destructors);__emval_decref(handle)}function __emval_set_property(handle,key,value){handle=requireHandle(handle);key=requireHandle(key);value=requireHandle(value);handle[key]=value}function __emval_take_value(type,argv){type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](argv);return __emval_register(v)}function _abort(){abort()}function _clock(){if(_clock.start===undefined)_clock.start=Date.now();return(Date.now()-_clock.start)*(1e6/1e3)|0}var _emscripten_get_now;if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function(){var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}else _emscripten_get_now=function(){return performance.now()};var _emscripten_get_now_is_monotonic=true;function setErrNo(value){HEAP32[___errno_location()>>2]=value;return value}function _clock_gettime(clk_id,tp){var now;if(clk_id===0){now=Date.now()}else if((clk_id===1||clk_id===4)&&_emscripten_get_now_is_monotonic){now=_emscripten_get_now()}else{setErrNo(28);return-1}HEAP32[tp>>2]=now/1e3|0;HEAP32[tp+4>>2]=now%1e3*1e3*1e3|0;return 0}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function _emscripten_get_heap_size(){return HEAPU8.length}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=_emscripten_get_heap_size();var maxHeapSize=2147483648;if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}function _emscripten_run_script(ptr){eval(UTF8ToString(ptr))}function _emscripten_thread_sleep(msecs){var start=_emscripten_get_now();while(_emscripten_get_now()-start<msecs){}}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_close(fd){return 0}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}function _tzset(){if(_tzset.called)return;_tzset.called=true;var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAP32[__get_timezone()>>2]=stdTimezoneOffset*60;HEAP32[__get_daylight()>>2]=Number(winterOffset!=summerOffset);function extractZone(date){var match=date.toTimeString().match(/\(([A-Za-z ]+)\)$/);return match?match[1]:"GMT"}var winterName=extractZone(winter);var summerName=extractZone(summer);var winterNamePtr=allocateUTF8(winterName);var summerNamePtr=allocateUTF8(summerName);if(summerOffset<winterOffset){HEAP32[__get_tzname()>>2]=winterNamePtr;HEAP32[__get_tzname()+4>>2]=summerNamePtr}else{HEAP32[__get_tzname()>>2]=summerNamePtr;HEAP32[__get_tzname()+4>>2]=winterNamePtr}}function _mktime(tmPtr){_tzset();var date=new Date(HEAP32[tmPtr+20>>2]+1900,HEAP32[tmPtr+16>>2],HEAP32[tmPtr+12>>2],HEAP32[tmPtr+8>>2],HEAP32[tmPtr+4>>2],HEAP32[tmPtr>>2],0);var dst=HEAP32[tmPtr+32>>2];var guessedOffset=date.getTimezoneOffset();var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dstOffset=Math.min(winterOffset,summerOffset);if(dst<0){HEAP32[tmPtr+32>>2]=Number(summerOffset!=winterOffset&&dstOffset==guessedOffset)}else if(dst>0!=(dstOffset==guessedOffset)){var nonDstOffset=Math.max(winterOffset,summerOffset);var trueOffset=dst>0?dstOffset:nonDstOffset;date.setTime(date.getTime()+(trueOffset-guessedOffset)*6e4)}HEAP32[tmPtr+24>>2]=date.getDay();var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();return date.getTime()/1e3|0}function _setTempRet0($i){setTempRet0($i|0)}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function jstoi_q(str){return parseInt(str)}function _strptime(buf,format,tm){var pattern=UTF8ToString(format);var SPECIAL_CHARS="\\!@#$^&*()+=-[]/{}|:<>?,.";for(var i=0,ii=SPECIAL_CHARS.length;i<ii;++i){pattern=pattern.replace(new RegExp("\\"+SPECIAL_CHARS[i],"g"),"\\"+SPECIAL_CHARS[i])}var EQUIVALENT_MATCHERS={"%A":"%a","%B":"%b","%c":"%a %b %d %H:%M:%S %Y","%D":"%m\\/%d\\/%y","%e":"%d","%F":"%Y-%m-%d","%h":"%b","%R":"%H\\:%M","%r":"%I\\:%M\\:%S\\s%p","%T":"%H\\:%M\\:%S","%x":"%m\\/%d\\/(?:%y|%Y)","%X":"%H\\:%M\\:%S"};for(var matcher in EQUIVALENT_MATCHERS){pattern=pattern.replace(matcher,EQUIVALENT_MATCHERS[matcher])}var DATE_PATTERNS={"%a":"(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)","%b":"(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)","%C":"\\d\\d","%d":"0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31","%H":"\\d(?!\\d)|[0,1]\\d|20|21|22|23","%I":"\\d(?!\\d)|0\\d|10|11|12","%j":"00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d","%m":"0[1-9]|[1-9](?!\\d)|10|11|12","%M":"0\\d|\\d(?!\\d)|[1-5]\\d","%n":"\\s","%p":"AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.","%S":"0\\d|\\d(?!\\d)|[1-5]\\d|60","%U":"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53","%W":"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53","%w":"[0-6]","%y":"\\d\\d","%Y":"\\d\\d\\d\\d","%%":"%","%t":"\\s"};var MONTH_NUMBERS={JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11};var DAY_NUMBERS_SUN_FIRST={SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6};var DAY_NUMBERS_MON_FIRST={MON:0,TUE:1,WED:2,THU:3,FRI:4,SAT:5,SUN:6};for(var datePattern in DATE_PATTERNS){pattern=pattern.replace(datePattern,"("+datePattern+DATE_PATTERNS[datePattern]+")")}var capture=[];for(var i=pattern.indexOf("%");i>=0;i=pattern.indexOf("%")){capture.push(pattern[i+1]);pattern=pattern.replace(new RegExp("\\%"+pattern[i+1],"g"),"")}var matches=new RegExp("^"+pattern,"i").exec(UTF8ToString(buf));function initDate(){function fixup(value,min,max){return typeof value!=="number"||isNaN(value)?min:value>=min?value<=max?value:max:min}return{year:fixup(HEAP32[tm+20>>2]+1900,1970,9999),month:fixup(HEAP32[tm+16>>2],0,11),day:fixup(HEAP32[tm+12>>2],1,31),hour:fixup(HEAP32[tm+8>>2],0,23),min:fixup(HEAP32[tm+4>>2],0,59),sec:fixup(HEAP32[tm>>2],0,59)}}if(matches){var date=initDate();var value;var getMatch=function(symbol){var pos=capture.indexOf(symbol);if(pos>=0){return matches[pos+1]}return};if(value=getMatch("S")){date.sec=jstoi_q(value)}if(value=getMatch("M")){date.min=jstoi_q(value)}if(value=getMatch("H")){date.hour=jstoi_q(value)}else if(value=getMatch("I")){var hour=jstoi_q(value);if(value=getMatch("p")){hour+=value.toUpperCase()[0]==="P"?12:0}date.hour=hour}if(value=getMatch("Y")){date.year=jstoi_q(value)}else if(value=getMatch("y")){var year=jstoi_q(value);if(value=getMatch("C")){year+=jstoi_q(value)*100}else{year+=year<69?2e3:1900}date.year=year}if(value=getMatch("m")){date.month=jstoi_q(value)-1}else if(value=getMatch("b")){date.month=MONTH_NUMBERS[value.substring(0,3).toUpperCase()]||0}if(value=getMatch("d")){date.day=jstoi_q(value)}else if(value=getMatch("j")){var day=jstoi_q(value);var leapYear=__isLeapYear(date.year);for(var month=0;month<12;++month){var daysUntilMonth=__arraySum(leapYear?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,month-1);if(day<=daysUntilMonth+(leapYear?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[month]){date.day=day-daysUntilMonth}}}else if(value=getMatch("a")){var weekDay=value.substring(0,3).toUpperCase();if(value=getMatch("U")){var weekDayNumber=DAY_NUMBERS_SUN_FIRST[weekDay];var weekNumber=jstoi_q(value);var janFirst=new Date(date.year,0,1);var endDate;if(janFirst.getDay()===0){endDate=__addDays(janFirst,weekDayNumber+7*(weekNumber-1))}else{endDate=__addDays(janFirst,7-janFirst.getDay()+weekDayNumber+7*(weekNumber-1))}date.day=endDate.getDate();date.month=endDate.getMonth()}else if(value=getMatch("W")){var weekDayNumber=DAY_NUMBERS_MON_FIRST[weekDay];var weekNumber=jstoi_q(value);var janFirst=new Date(date.year,0,1);var endDate;if(janFirst.getDay()===1){endDate=__addDays(janFirst,weekDayNumber+7*(weekNumber-1))}else{endDate=__addDays(janFirst,7-janFirst.getDay()+1+weekDayNumber+7*(weekNumber-1))}date.day=endDate.getDate();date.month=endDate.getMonth()}}var fullDate=new Date(date.year,date.month,date.day,date.hour,date.min,date.sec,0);HEAP32[tm>>2]=fullDate.getSeconds();HEAP32[tm+4>>2]=fullDate.getMinutes();HEAP32[tm+8>>2]=fullDate.getHours();HEAP32[tm+12>>2]=fullDate.getDate();HEAP32[tm+16>>2]=fullDate.getMonth();HEAP32[tm+20>>2]=fullDate.getFullYear()-1900;HEAP32[tm+24>>2]=fullDate.getDay();HEAP32[tm+28>>2]=__arraySum(__isLeapYear(fullDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,fullDate.getMonth()-1)+fullDate.getDate()-1;HEAP32[tm+32>>2]=0;return buf+intArrayFromString(matches[0]).length-1}return 0}function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var double=ch<105;if(double&&buf&1)buf++;readAsmConstArgsArray.push(double?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");init_emval();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var asmLibraryArg={"a":___assert_fail,"d":___cxa_allocate_exception,"c":___cxa_throw,"J":__embind_register_bool,"I":__embind_register_emval,"v":__embind_register_float,"A":__embind_register_function,"f":__embind_register_integer,"e":__embind_register_memory_view,"w":__embind_register_std_string,"p":__embind_register_std_wstring,"K":__embind_register_void,"r":__emval_as,"k":__emval_call_method,"B":__emval_call_void_method,"b":__emval_decref,"g":__emval_get_global,"j":__emval_get_method_caller,"z":__emval_get_module_property,"s":__emval_get_property,"m":__emval_incref,"h":__emval_new,"l":__emval_new_cstring,"i":__emval_run_destructors,"y":__emval_set_property,"q":__emval_take_value,"n":_abort,"x":_clock,"t":_clock_gettime,"o":_emscripten_asm_const_int,"E":_emscripten_memcpy_big,"F":_emscripten_resize_heap,"O":_emscripten_run_script,"G":_emscripten_thread_sleep,"H":_fd_close,"C":_fd_seek,"u":_fd_write,"N":_mktime,"D":_setTempRet0,"L":_strptime,"M":_time};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["Q"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["R"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["T"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["U"]).apply(null,arguments)};var _aux_freeMemory=Module["_aux_freeMemory"]=function(){return(_aux_freeMemory=Module["_aux_freeMemory"]=Module["asm"]["V"]).apply(null,arguments)};var _setCode1DChecksum=Module["_setCode1DChecksum"]=function(){return(_setCode1DChecksum=Module["_setCode1DChecksum"]=Module["asm"]["W"]).apply(null,arguments)};var _initialize=Module["_initialize"]=function(){return(_initialize=Module["_initialize"]=Module["asm"]["X"]).apply(null,arguments)};var _inf_BKgetVersion=Module["_inf_BKgetVersion"]=function(){return(_inf_BKgetVersion=Module["_inf_BKgetVersion"]=Module["asm"]["Y"]).apply(null,arguments)};var _cfg_BKSetRegionOfInterest=Module["_cfg_BKSetRegionOfInterest"]=function(){return(_cfg_BKSetRegionOfInterest=Module["_cfg_BKSetRegionOfInterest"]=Module["asm"]["Z"]).apply(null,arguments)};var _cfg_BKGetRegionOfInterest=Module["_cfg_BKGetRegionOfInterest"]=function(){return(_cfg_BKGetRegionOfInterest=Module["_cfg_BKGetRegionOfInterest"]=Module["asm"]["_"]).apply(null,arguments)};var _cfg_BKSetDecodingSpeed=Module["_cfg_BKSetDecodingSpeed"]=function(){return(_cfg_BKSetDecodingSpeed=Module["_cfg_BKSetDecodingSpeed"]=Module["asm"]["$"]).apply(null,arguments)};var _cfg_BKSetEnabledDecoders=Module["_cfg_BKSetEnabledDecoders"]=function(){return(_cfg_BKSetEnabledDecoders=Module["_cfg_BKSetEnabledDecoders"]=Module["asm"]["aa"]).apply(null,arguments)};var _cfg_BKSetEnabledDecodersPro=Module["_cfg_BKSetEnabledDecodersPro"]=function(){return(_cfg_BKSetEnabledDecodersPro=Module["_cfg_BKSetEnabledDecodersPro"]=Module["asm"]["ba"]).apply(null,arguments)};var _cfg_BKSetUpcEanDeblur=Module["_cfg_BKSetUpcEanDeblur"]=function(){return(_cfg_BKSetUpcEanDeblur=Module["_cfg_BKSetUpcEanDeblur"]=Module["asm"]["ca"]).apply(null,arguments)};var _cfg_BKSetLengthRange=Module["_cfg_BKSetLengthRange"]=function(){return(_cfg_BKSetLengthRange=Module["_cfg_BKSetLengthRange"]=Module["asm"]["da"]).apply(null,arguments)};var _cfg_BKSetSpecificConfig=Module["_cfg_BKSetSpecificConfig"]=function(){return(_cfg_BKSetSpecificConfig=Module["_cfg_BKSetSpecificConfig"]=Module["asm"]["ea"]).apply(null,arguments)};var _cfg_BKSetFormatting=Module["_cfg_BKSetFormatting"]=function(){return(_cfg_BKSetFormatting=Module["_cfg_BKSetFormatting"]=Module["asm"]["fa"]).apply(null,arguments)};var _cfg_BKSetDuplicatesDelayMs=Module["_cfg_BKSetDuplicatesDelayMs"]=function(){return(_cfg_BKSetDuplicatesDelayMs=Module["_cfg_BKSetDuplicatesDelayMs"]=Module["asm"]["ga"]).apply(null,arguments)};var _cfg_BKSetEncodingCharacterSet=Module["_cfg_BKSetEncodingCharacterSet"]=function(){return(_cfg_BKSetEncodingCharacterSet=Module["_cfg_BKSetEncodingCharacterSet"]=Module["asm"]["ha"]).apply(null,arguments)};var _cfg_BKSetMulticodeCachingEnabled=Module["_cfg_BKSetMulticodeCachingEnabled"]=function(){return(_cfg_BKSetMulticodeCachingEnabled=Module["_cfg_BKSetMulticodeCachingEnabled"]=Module["asm"]["ia"]).apply(null,arguments)};var _cfg_BKSetMulticodeCachingDuration=Module["_cfg_BKSetMulticodeCachingDuration"]=function(){return(_cfg_BKSetMulticodeCachingDuration=Module["_cfg_BKSetMulticodeCachingDuration"]=Module["asm"]["ja"]).apply(null,arguments)};var _cfg_BKSetMaximumResultsCount=Module["_cfg_BKSetMaximumResultsCount"]=function(){return(_cfg_BKSetMaximumResultsCount=Module["_cfg_BKSetMaximumResultsCount"]=Module["asm"]["ka"]).apply(null,arguments)};var _cfg_BKSetEnableMisshaped1D=Module["_cfg_BKSetEnableMisshaped1D"]=function(){return(_cfg_BKSetEnableMisshaped1D=Module["_cfg_BKSetEnableMisshaped1D"]=Module["asm"]["la"]).apply(null,arguments)};var _cfg_BKSetEnableVINRestrictions=Module["_cfg_BKSetEnableVINRestrictions"]=function(){return(_cfg_BKSetEnableVINRestrictions=Module["_cfg_BKSetEnableVINRestrictions"]=Module["asm"]["ma"]).apply(null,arguments)};var _cfg_BKReturnDecodingSpeed=Module["_cfg_BKReturnDecodingSpeed"]=function(){return(_cfg_BKReturnDecodingSpeed=Module["_cfg_BKReturnDecodingSpeed"]=Module["asm"]["na"]).apply(null,arguments)};var _cfg_BKReturnUpcEanDeblur=Module["_cfg_BKReturnUpcEanDeblur"]=function(){return(_cfg_BKReturnUpcEanDeblur=Module["_cfg_BKReturnUpcEanDeblur"]=Module["asm"]["oa"]).apply(null,arguments)};var _cfg_BKReturnFormatting=Module["_cfg_BKReturnFormatting"]=function(){return(_cfg_BKReturnFormatting=Module["_cfg_BKReturnFormatting"]=Module["asm"]["pa"]).apply(null,arguments)};var _cfg_BKReturnDuplicatesDelayMs=Module["_cfg_BKReturnDuplicatesDelayMs"]=function(){return(_cfg_BKReturnDuplicatesDelayMs=Module["_cfg_BKReturnDuplicatesDelayMs"]=Module["asm"]["qa"]).apply(null,arguments)};var _cfg_BKReturnEncodingCharacterSet=Module["_cfg_BKReturnEncodingCharacterSet"]=function(){return(_cfg_BKReturnEncodingCharacterSet=Module["_cfg_BKReturnEncodingCharacterSet"]=Module["asm"]["ra"]).apply(null,arguments)};var _cfg_BKReturnSpecificConfig=Module["_cfg_BKReturnSpecificConfig"]=function(){return(_cfg_BKReturnSpecificConfig=Module["_cfg_BKReturnSpecificConfig"]=Module["asm"]["sa"]).apply(null,arguments)};var _cfg_BKReturnBarcodeTypeEnabled=Module["_cfg_BKReturnBarcodeTypeEnabled"]=function(){return(_cfg_BKReturnBarcodeTypeEnabled=Module["_cfg_BKReturnBarcodeTypeEnabled"]=Module["asm"]["ta"]).apply(null,arguments)};var _cfg_BKSetBarcodeTypeEnabled=Module["_cfg_BKSetBarcodeTypeEnabled"]=function(){return(_cfg_BKSetBarcodeTypeEnabled=Module["_cfg_BKSetBarcodeTypeEnabled"]=Module["asm"]["ua"]).apply(null,arguments)};var _cfg_BKReturnLengthRange=Module["_cfg_BKReturnLengthRange"]=function(){return(_cfg_BKReturnLengthRange=Module["_cfg_BKReturnLengthRange"]=Module["asm"]["va"]).apply(null,arguments)};var _cfg_BKReturnMulticodeCachingEnabled=Module["_cfg_BKReturnMulticodeCachingEnabled"]=function(){return(_cfg_BKReturnMulticodeCachingEnabled=Module["_cfg_BKReturnMulticodeCachingEnabled"]=Module["asm"]["wa"]).apply(null,arguments)};var _cfg_BKReturnMulticodeCachingDuration=Module["_cfg_BKReturnMulticodeCachingDuration"]=function(){return(_cfg_BKReturnMulticodeCachingDuration=Module["_cfg_BKReturnMulticodeCachingDuration"]=Module["asm"]["xa"]).apply(null,arguments)};var _cfg_BKGetMaximumResultsCount=Module["_cfg_BKGetMaximumResultsCount"]=function(){return(_cfg_BKGetMaximumResultsCount=Module["_cfg_BKGetMaximumResultsCount"]=Module["asm"]["ya"]).apply(null,arguments)};var _cfg_BKReturnEnableMisshaped1D=Module["_cfg_BKReturnEnableMisshaped1D"]=function(){return(_cfg_BKReturnEnableMisshaped1D=Module["_cfg_BKReturnEnableMisshaped1D"]=Module["asm"]["za"]).apply(null,arguments)};var _cfg_BKReturnEnableVINRestrictions=Module["_cfg_BKReturnEnableVINRestrictions"]=function(){return(_cfg_BKReturnEnableVINRestrictions=Module["_cfg_BKReturnEnableVINRestrictions"]=Module["asm"]["Aa"]).apply(null,arguments)};var _api_BKDecodeImageMemory=Module["_api_BKDecodeImageMemory"]=function(){return(_api_BKDecodeImageMemory=Module["_api_BKDecodeImageMemory"]=Module["asm"]["Ba"]).apply(null,arguments)};var ___getTypeName=Module["___getTypeName"]=function(){return(___getTypeName=Module["___getTypeName"]=Module["asm"]["Ca"]).apply(null,arguments)};var ___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=function(){return(___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=Module["asm"]["Da"]).apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return(___errno_location=Module["___errno_location"]=Module["asm"]["Ea"]).apply(null,arguments)};var __get_tzname=Module["__get_tzname"]=function(){return(__get_tzname=Module["__get_tzname"]=Module["asm"]["Fa"]).apply(null,arguments)};var __get_daylight=Module["__get_daylight"]=function(){return(__get_daylight=Module["__get_daylight"]=Module["asm"]["Ga"]).apply(null,arguments)};var __get_timezone=Module["__get_timezone"]=function(){return(__get_timezone=Module["__get_timezone"]=Module["asm"]["Ha"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return(stackSave=Module["stackSave"]=Module["asm"]["Ia"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return(stackRestore=Module["stackRestore"]=Module["asm"]["Ja"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return(stackAlloc=Module["stackAlloc"]=Module["asm"]["Ka"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return(dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["La"]).apply(null,arguments)};Module["ccall"]=ccall;Module["cwrap"]=cwrap;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];args=args||[];var argc=args.length+1;var argv=stackAlloc((argc+1)*4);HEAP32[argv>>2]=allocateUTF8OnStack(thisProgram);for(var i=1;i<argc;i++){HEAP32[(argv>>2)+i]=allocateUTF8OnStack(args[i-1])}HEAP32[(argv>>2)+argc]=0;try{var ret=entryFunction(argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="unwind"){noExitRuntime=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&noExitRuntime&&status===0){return}if(noExitRuntime){}else{EXITSTATUS=status;exitRuntime();if(Module["onExit"])Module["onExit"](status);ABORT=true}quit_(status,new ExitStatus(status))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();

} else {
//-------------nosimd----------------

var Module=typeof Module!=="undefined"?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=function shell_read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){return read(f)}}readBinary=function readBinary(f){var data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var tempRet0=0;var setTempRet0=function(value){tempRet0=value};var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr,maxBytesToRead){var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr))}else{var str="";for(var i=0;!(i>=maxBytesToRead/2);++i){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)break;str+=String.fromCharCode(codeUnit)}return str}}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}function lengthBytesUTF16(str){return str.length*2}function UTF32ToString(ptr,maxBytesToRead){var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}return str}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}function allocateUTF8(str){var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8Array(str,HEAP8,ret,size);return ret}function allocateUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8Array(str,HEAP8,ret,size);return ret}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;__ATINIT__.push({func:function(){___wasm_call_ctors()}});function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);throw e}function hasPrefix(str,prefix){return String.prototype.startsWith?str.startsWith(prefix):str.indexOf(prefix)===0}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return hasPrefix(filename,dataURIPrefix)}var fileURIPrefix="file://";function isFileURI(filename){return hasPrefix(filename,fileURIPrefix)}var wasmBinaryFile="barkoder_nosimd.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["P"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["S"];removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={191480:function(){window.BarkoderSDK_callback2D=true},191518:function(){window.BarkoderSDK_callback3D=true},191556:function($0,$1){localStorage[UTF8ToString($0)]=UTF8ToString($1)},191611:function(){window.BarkoderSDK_callback1D=true}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)()}else{wasmTable.get(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var ExceptionInfoAttrs={DESTRUCTOR_OFFSET:0,REFCOUNT_OFFSET:4,TYPE_OFFSET:8,CAUGHT_OFFSET:12,RETHROWN_OFFSET:13,SIZE:16};function ___cxa_allocate_exception(size){return _malloc(size+ExceptionInfoAttrs.SIZE)+ExceptionInfoAttrs.SIZE}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-ExceptionInfoAttrs.SIZE;this.set_type=function(type){HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]=type};this.get_type=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]};this.set_destructor=function(destructor){HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]=destructor};this.get_destructor=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=refcount};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]=caught};this.get_caught=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]=rethrown};this.get_rethrown=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]!=0};this.init=function(type,destructor){this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false)};this.add_ref=function(){var value=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=value+1};this.release_ref=function(){var prev=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=prev-1;return prev===1}}var exceptionLast=0;var uncaughtExceptionCount=0;function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw ptr}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name}else{return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else{return this.name+": "+this.message}};return errorClass}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}});if(0===unregisteredTypes.length){onComplete(typeConverters)}}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer')}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError("Cannot register type '"+name+"' twice")}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb()})}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return!!wt},"toWireType":function(destructors,o){return o?trueValue:falseValue},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8}else if(size===2){heap=HEAP16}else if(size===4){heap=HEAP32}else{throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])},destructorFunction:null})}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle)}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval}function __emval_register(value){switch(value){case undefined:{return 1}case null:{return 2}case true:{return 3}case false:{return 4}default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv},"toWireType":function(destructors,value){return __emval_register(value)},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null})}function _embind_repr(v){if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value},"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null})}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired"}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n"}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n"}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2])}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction)}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n"}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!")}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice")}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!")}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments}}}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i])}return array}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}}function dynCallLegacy(sig,ptr,args){var f=Module["dynCall_"+sig];return args&&args.length?f.apply(null,[ptr].concat(args)):f.call(null,ptr)}function dynCall(sig,ptr,args){if(sig.indexOf("j")!=-1){return dynCallLegacy(sig,ptr,args)}return wasmTable.get(ptr).apply(null,args)}function getDynCaller(sig,ptr){var argCache=[];return function(){argCache.length=arguments.length;for(var i=0;i<arguments.length;i++){argCache[i]=arguments[i]}return dynCall(sig,ptr,argCache)}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(){if(signature.indexOf("j")!=-1){return getDynCaller(signature,rawFunction)}return wasmTable.get(rawFunction)}var fp=makeDynCaller();if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction)}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes)},argCount-1);whenDependentTypesAreResolved([],argTypes,function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);return[]})}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var shift=getShiftFromSize(size);var fromWireType=function(value){return value};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift}}var isUnsignedType=name.indexOf("unsigned")!=-1;registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return isUnsignedType?value>>>0:value|0},"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null})}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true})}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==="std::string";registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var str;if(stdStringIsUTF8){var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i;if(i==length||HEAPU8[currentBytePtr]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+1}}}else{var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i])}str=a.join("")}_free(value);return str},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}var getLength;var valueIsOfTypeString=typeof value==="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string")}if(stdStringIsUTF8&&valueIsOfTypeString){getLength=function(){return lengthBytesUTF8(value)}}else{getLength=function(){return value.length}}var length=getLength();var ptr=_malloc(4+length+1);HEAPU32[ptr>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr+4,length+1)}else{if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+4+i]=charCode}}else{for(var i=0;i<length;++i){HEAPU8[ptr+4+i]=value[i]}}}if(destructors!==null){destructors.push(_free,ptr)}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr)}})}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var decodeString,encodeString,getHeap,lengthBytesUTF,shift;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;getHeap=function(){return HEAPU16};shift=1}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;getHeap=function(){return HEAPU32};shift=2}registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var HEAP=getHeap();var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||HEAP[currentBytePtr>>shift]==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+charSize}}_free(value);return str},"toWireType":function(destructors,value){if(!(typeof value==="string")){throwBindingError("Cannot pass non-string to C++ string type "+name)}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length>>shift;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr)}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr)}})}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined},"toWireType":function(destructors,o){return undefined}})}function requireHandle(handle){if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle)}return emval_handle_array[handle].value}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType))}return impl}function __emval_as(handle,returnType,destructorsRef){handle=requireHandle(handle);returnType=requireRegisteredType(returnType,"emval::as");var destructors=[];var rd=__emval_register(destructors);HEAP32[destructorsRef>>2]=rd;return returnType["toWireType"](destructors,handle)}function __emval_allocateDestructors(destructorsRef){var destructors=[];HEAP32[destructorsRef>>2]=__emval_register(destructors);return destructors}var emval_symbols={};function getStringOrSymbol(address){var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}else{return symbol}}var emval_methodCallers=[];function __emval_call_method(caller,handle,methodName,destructorsRef,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);return caller(handle,methodName,__emval_allocateDestructors(destructorsRef),args)}function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];handle=requireHandle(handle);methodName=getStringOrSymbol(methodName);caller(handle,methodName,null,args)}function emval_get_global(){if(typeof globalThis==="object"){return globalThis}return function(){return Function}()("return this")()}function __emval_get_global(name){if(name===0){return __emval_register(emval_get_global())}else{name=getStringOrSymbol(name);return __emval_register(emval_get_global()[name])}}function __emval_addMethodCaller(caller){var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id}function __emval_lookupTypes(argCount,argTypes){var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAP32[(argTypes>>2)+i],"parameter "+i)}return a}function __emval_get_method_caller(argCount,argTypes){var types=__emval_lookupTypes(argCount,argTypes);var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map(function(t){return t.name}).join("_")+"$";var params=["retType"];var args=[retType];var argsList="";for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;params.push("argType"+i);args.push(types[1+i])}var functionName=makeLegalFunctionName("methodCaller_"+signatureName);var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";var offset=0;for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";offset+=types[i+1]["argPackAdvance"]}functionBody+="    var rv = handle[name]("+argsList+");\n";for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n"}}if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n"}functionBody+="};\n";params.push(functionBody);var invokerFunction=new_(Function,params).apply(null,args);return __emval_addMethodCaller(invokerFunction)}function __emval_get_module_property(name){name=getStringOrSymbol(name);return __emval_register(Module[name])}function __emval_get_property(handle,key){handle=requireHandle(handle);key=requireHandle(key);return __emval_register(handle[key])}function __emval_incref(handle){if(handle>4){emval_handle_array[handle].refcount+=1}}function craftEmvalAllocator(argCount){var argsList="";for(var i=0;i<argCount;++i){argsList+=(i!==0?", ":"")+"arg"+i}var functionBody="return function emval_allocator_"+argCount+"(constructor, argTypes, args) {\n";for(var i=0;i<argCount;++i){functionBody+="var argType"+i+" = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + "+i+'], "parameter '+i+'");\n'+"var arg"+i+" = argType"+i+".readValueFromPointer(args);\n"+"args += argType"+i+"['argPackAdvance'];\n"}functionBody+="var obj = new constructor("+argsList+");\n"+"return __emval_register(obj);\n"+"}\n";return new Function("requireRegisteredType","Module","__emval_register",functionBody)(requireRegisteredType,Module,__emval_register)}var emval_newers={};function __emval_new(handle,argCount,argTypes,args){handle=requireHandle(handle);var newer=emval_newers[argCount];if(!newer){newer=craftEmvalAllocator(argCount);emval_newers[argCount]=newer}return newer(handle,argTypes,args)}function __emval_new_cstring(v){return __emval_register(getStringOrSymbol(v))}function __emval_run_destructors(handle){var destructors=emval_handle_array[handle].value;runDestructors(destructors);__emval_decref(handle)}function __emval_set_property(handle,key,value){handle=requireHandle(handle);key=requireHandle(key);value=requireHandle(value);handle[key]=value}function __emval_take_value(type,argv){type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](argv);return __emval_register(v)}function _abort(){abort()}function _clock(){if(_clock.start===undefined)_clock.start=Date.now();return(Date.now()-_clock.start)*(1e6/1e3)|0}var _emscripten_get_now;if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function(){var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}else _emscripten_get_now=function(){return performance.now()};var _emscripten_get_now_is_monotonic=true;function setErrNo(value){HEAP32[___errno_location()>>2]=value;return value}function _clock_gettime(clk_id,tp){var now;if(clk_id===0){now=Date.now()}else if((clk_id===1||clk_id===4)&&_emscripten_get_now_is_monotonic){now=_emscripten_get_now()}else{setErrNo(28);return-1}HEAP32[tp>>2]=now/1e3|0;HEAP32[tp+4>>2]=now%1e3*1e3*1e3|0;return 0}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function _emscripten_get_heap_size(){return HEAPU8.length}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=_emscripten_get_heap_size();var maxHeapSize=2147483648;if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}function _emscripten_run_script(ptr){eval(UTF8ToString(ptr))}function _emscripten_thread_sleep(msecs){var start=_emscripten_get_now();while(_emscripten_get_now()-start<msecs){}}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _fd_close(fd){return 0}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}function _tzset(){if(_tzset.called)return;_tzset.called=true;var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAP32[__get_timezone()>>2]=stdTimezoneOffset*60;HEAP32[__get_daylight()>>2]=Number(winterOffset!=summerOffset);function extractZone(date){var match=date.toTimeString().match(/\(([A-Za-z ]+)\)$/);return match?match[1]:"GMT"}var winterName=extractZone(winter);var summerName=extractZone(summer);var winterNamePtr=allocateUTF8(winterName);var summerNamePtr=allocateUTF8(summerName);if(summerOffset<winterOffset){HEAP32[__get_tzname()>>2]=winterNamePtr;HEAP32[__get_tzname()+4>>2]=summerNamePtr}else{HEAP32[__get_tzname()>>2]=summerNamePtr;HEAP32[__get_tzname()+4>>2]=winterNamePtr}}function _mktime(tmPtr){_tzset();var date=new Date(HEAP32[tmPtr+20>>2]+1900,HEAP32[tmPtr+16>>2],HEAP32[tmPtr+12>>2],HEAP32[tmPtr+8>>2],HEAP32[tmPtr+4>>2],HEAP32[tmPtr>>2],0);var dst=HEAP32[tmPtr+32>>2];var guessedOffset=date.getTimezoneOffset();var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dstOffset=Math.min(winterOffset,summerOffset);if(dst<0){HEAP32[tmPtr+32>>2]=Number(summerOffset!=winterOffset&&dstOffset==guessedOffset)}else if(dst>0!=(dstOffset==guessedOffset)){var nonDstOffset=Math.max(winterOffset,summerOffset);var trueOffset=dst>0?dstOffset:nonDstOffset;date.setTime(date.getTime()+(trueOffset-guessedOffset)*6e4)}HEAP32[tmPtr+24>>2]=date.getDay();var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();return date.getTime()/1e3|0}function _setTempRet0($i){setTempRet0($i|0)}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function jstoi_q(str){return parseInt(str)}function _strptime(buf,format,tm){var pattern=UTF8ToString(format);var SPECIAL_CHARS="\\!@#$^&*()+=-[]/{}|:<>?,.";for(var i=0,ii=SPECIAL_CHARS.length;i<ii;++i){pattern=pattern.replace(new RegExp("\\"+SPECIAL_CHARS[i],"g"),"\\"+SPECIAL_CHARS[i])}var EQUIVALENT_MATCHERS={"%A":"%a","%B":"%b","%c":"%a %b %d %H:%M:%S %Y","%D":"%m\\/%d\\/%y","%e":"%d","%F":"%Y-%m-%d","%h":"%b","%R":"%H\\:%M","%r":"%I\\:%M\\:%S\\s%p","%T":"%H\\:%M\\:%S","%x":"%m\\/%d\\/(?:%y|%Y)","%X":"%H\\:%M\\:%S"};for(var matcher in EQUIVALENT_MATCHERS){pattern=pattern.replace(matcher,EQUIVALENT_MATCHERS[matcher])}var DATE_PATTERNS={"%a":"(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)","%b":"(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)","%C":"\\d\\d","%d":"0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31","%H":"\\d(?!\\d)|[0,1]\\d|20|21|22|23","%I":"\\d(?!\\d)|0\\d|10|11|12","%j":"00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d","%m":"0[1-9]|[1-9](?!\\d)|10|11|12","%M":"0\\d|\\d(?!\\d)|[1-5]\\d","%n":"\\s","%p":"AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.","%S":"0\\d|\\d(?!\\d)|[1-5]\\d|60","%U":"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53","%W":"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53","%w":"[0-6]","%y":"\\d\\d","%Y":"\\d\\d\\d\\d","%%":"%","%t":"\\s"};var MONTH_NUMBERS={JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11};var DAY_NUMBERS_SUN_FIRST={SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6};var DAY_NUMBERS_MON_FIRST={MON:0,TUE:1,WED:2,THU:3,FRI:4,SAT:5,SUN:6};for(var datePattern in DATE_PATTERNS){pattern=pattern.replace(datePattern,"("+datePattern+DATE_PATTERNS[datePattern]+")")}var capture=[];for(var i=pattern.indexOf("%");i>=0;i=pattern.indexOf("%")){capture.push(pattern[i+1]);pattern=pattern.replace(new RegExp("\\%"+pattern[i+1],"g"),"")}var matches=new RegExp("^"+pattern,"i").exec(UTF8ToString(buf));function initDate(){function fixup(value,min,max){return typeof value!=="number"||isNaN(value)?min:value>=min?value<=max?value:max:min}return{year:fixup(HEAP32[tm+20>>2]+1900,1970,9999),month:fixup(HEAP32[tm+16>>2],0,11),day:fixup(HEAP32[tm+12>>2],1,31),hour:fixup(HEAP32[tm+8>>2],0,23),min:fixup(HEAP32[tm+4>>2],0,59),sec:fixup(HEAP32[tm>>2],0,59)}}if(matches){var date=initDate();var value;var getMatch=function(symbol){var pos=capture.indexOf(symbol);if(pos>=0){return matches[pos+1]}return};if(value=getMatch("S")){date.sec=jstoi_q(value)}if(value=getMatch("M")){date.min=jstoi_q(value)}if(value=getMatch("H")){date.hour=jstoi_q(value)}else if(value=getMatch("I")){var hour=jstoi_q(value);if(value=getMatch("p")){hour+=value.toUpperCase()[0]==="P"?12:0}date.hour=hour}if(value=getMatch("Y")){date.year=jstoi_q(value)}else if(value=getMatch("y")){var year=jstoi_q(value);if(value=getMatch("C")){year+=jstoi_q(value)*100}else{year+=year<69?2e3:1900}date.year=year}if(value=getMatch("m")){date.month=jstoi_q(value)-1}else if(value=getMatch("b")){date.month=MONTH_NUMBERS[value.substring(0,3).toUpperCase()]||0}if(value=getMatch("d")){date.day=jstoi_q(value)}else if(value=getMatch("j")){var day=jstoi_q(value);var leapYear=__isLeapYear(date.year);for(var month=0;month<12;++month){var daysUntilMonth=__arraySum(leapYear?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,month-1);if(day<=daysUntilMonth+(leapYear?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[month]){date.day=day-daysUntilMonth}}}else if(value=getMatch("a")){var weekDay=value.substring(0,3).toUpperCase();if(value=getMatch("U")){var weekDayNumber=DAY_NUMBERS_SUN_FIRST[weekDay];var weekNumber=jstoi_q(value);var janFirst=new Date(date.year,0,1);var endDate;if(janFirst.getDay()===0){endDate=__addDays(janFirst,weekDayNumber+7*(weekNumber-1))}else{endDate=__addDays(janFirst,7-janFirst.getDay()+weekDayNumber+7*(weekNumber-1))}date.day=endDate.getDate();date.month=endDate.getMonth()}else if(value=getMatch("W")){var weekDayNumber=DAY_NUMBERS_MON_FIRST[weekDay];var weekNumber=jstoi_q(value);var janFirst=new Date(date.year,0,1);var endDate;if(janFirst.getDay()===1){endDate=__addDays(janFirst,weekDayNumber+7*(weekNumber-1))}else{endDate=__addDays(janFirst,7-janFirst.getDay()+1+weekDayNumber+7*(weekNumber-1))}date.day=endDate.getDate();date.month=endDate.getMonth()}}var fullDate=new Date(date.year,date.month,date.day,date.hour,date.min,date.sec,0);HEAP32[tm>>2]=fullDate.getSeconds();HEAP32[tm+4>>2]=fullDate.getMinutes();HEAP32[tm+8>>2]=fullDate.getHours();HEAP32[tm+12>>2]=fullDate.getDate();HEAP32[tm+16>>2]=fullDate.getMonth();HEAP32[tm+20>>2]=fullDate.getFullYear()-1900;HEAP32[tm+24>>2]=fullDate.getDay();HEAP32[tm+28>>2]=__arraySum(__isLeapYear(fullDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,fullDate.getMonth()-1)+fullDate.getDate()-1;HEAP32[tm+32>>2]=0;return buf+intArrayFromString(matches[0]).length-1}return 0}function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var double=ch<105;if(double&&buf&1)buf++;readAsmConstArgsArray.push(double?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");InternalError=Module["InternalError"]=extendError(Error,"InternalError");init_emval();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var asmLibraryArg={"a":___assert_fail,"d":___cxa_allocate_exception,"c":___cxa_throw,"J":__embind_register_bool,"I":__embind_register_emval,"v":__embind_register_float,"A":__embind_register_function,"f":__embind_register_integer,"e":__embind_register_memory_view,"w":__embind_register_std_string,"p":__embind_register_std_wstring,"K":__embind_register_void,"r":__emval_as,"k":__emval_call_method,"B":__emval_call_void_method,"b":__emval_decref,"g":__emval_get_global,"j":__emval_get_method_caller,"z":__emval_get_module_property,"s":__emval_get_property,"m":__emval_incref,"h":__emval_new,"l":__emval_new_cstring,"i":__emval_run_destructors,"y":__emval_set_property,"q":__emval_take_value,"n":_abort,"x":_clock,"t":_clock_gettime,"o":_emscripten_asm_const_int,"E":_emscripten_memcpy_big,"F":_emscripten_resize_heap,"O":_emscripten_run_script,"G":_emscripten_thread_sleep,"H":_fd_close,"C":_fd_seek,"u":_fd_write,"N":_mktime,"D":_setTempRet0,"L":_strptime,"M":_time};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["Q"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["R"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["T"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["U"]).apply(null,arguments)};var _aux_freeMemory=Module["_aux_freeMemory"]=function(){return(_aux_freeMemory=Module["_aux_freeMemory"]=Module["asm"]["V"]).apply(null,arguments)};var _setCode1DChecksum=Module["_setCode1DChecksum"]=function(){return(_setCode1DChecksum=Module["_setCode1DChecksum"]=Module["asm"]["W"]).apply(null,arguments)};var _initialize=Module["_initialize"]=function(){return(_initialize=Module["_initialize"]=Module["asm"]["X"]).apply(null,arguments)};var _inf_BKgetVersion=Module["_inf_BKgetVersion"]=function(){return(_inf_BKgetVersion=Module["_inf_BKgetVersion"]=Module["asm"]["Y"]).apply(null,arguments)};var _cfg_BKSetRegionOfInterest=Module["_cfg_BKSetRegionOfInterest"]=function(){return(_cfg_BKSetRegionOfInterest=Module["_cfg_BKSetRegionOfInterest"]=Module["asm"]["Z"]).apply(null,arguments)};var _cfg_BKGetRegionOfInterest=Module["_cfg_BKGetRegionOfInterest"]=function(){return(_cfg_BKGetRegionOfInterest=Module["_cfg_BKGetRegionOfInterest"]=Module["asm"]["_"]).apply(null,arguments)};var _cfg_BKSetDecodingSpeed=Module["_cfg_BKSetDecodingSpeed"]=function(){return(_cfg_BKSetDecodingSpeed=Module["_cfg_BKSetDecodingSpeed"]=Module["asm"]["$"]).apply(null,arguments)};var _cfg_BKSetEnabledDecoders=Module["_cfg_BKSetEnabledDecoders"]=function(){return(_cfg_BKSetEnabledDecoders=Module["_cfg_BKSetEnabledDecoders"]=Module["asm"]["aa"]).apply(null,arguments)};var _cfg_BKSetEnabledDecodersPro=Module["_cfg_BKSetEnabledDecodersPro"]=function(){return(_cfg_BKSetEnabledDecodersPro=Module["_cfg_BKSetEnabledDecodersPro"]=Module["asm"]["ba"]).apply(null,arguments)};var _cfg_BKSetUpcEanDeblur=Module["_cfg_BKSetUpcEanDeblur"]=function(){return(_cfg_BKSetUpcEanDeblur=Module["_cfg_BKSetUpcEanDeblur"]=Module["asm"]["ca"]).apply(null,arguments)};var _cfg_BKSetLengthRange=Module["_cfg_BKSetLengthRange"]=function(){return(_cfg_BKSetLengthRange=Module["_cfg_BKSetLengthRange"]=Module["asm"]["da"]).apply(null,arguments)};var _cfg_BKSetSpecificConfig=Module["_cfg_BKSetSpecificConfig"]=function(){return(_cfg_BKSetSpecificConfig=Module["_cfg_BKSetSpecificConfig"]=Module["asm"]["ea"]).apply(null,arguments)};var _cfg_BKSetFormatting=Module["_cfg_BKSetFormatting"]=function(){return(_cfg_BKSetFormatting=Module["_cfg_BKSetFormatting"]=Module["asm"]["fa"]).apply(null,arguments)};var _cfg_BKSetDuplicatesDelayMs=Module["_cfg_BKSetDuplicatesDelayMs"]=function(){return(_cfg_BKSetDuplicatesDelayMs=Module["_cfg_BKSetDuplicatesDelayMs"]=Module["asm"]["ga"]).apply(null,arguments)};var _cfg_BKSetEncodingCharacterSet=Module["_cfg_BKSetEncodingCharacterSet"]=function(){return(_cfg_BKSetEncodingCharacterSet=Module["_cfg_BKSetEncodingCharacterSet"]=Module["asm"]["ha"]).apply(null,arguments)};var _cfg_BKSetMulticodeCachingEnabled=Module["_cfg_BKSetMulticodeCachingEnabled"]=function(){return(_cfg_BKSetMulticodeCachingEnabled=Module["_cfg_BKSetMulticodeCachingEnabled"]=Module["asm"]["ia"]).apply(null,arguments)};var _cfg_BKSetMulticodeCachingDuration=Module["_cfg_BKSetMulticodeCachingDuration"]=function(){return(_cfg_BKSetMulticodeCachingDuration=Module["_cfg_BKSetMulticodeCachingDuration"]=Module["asm"]["ja"]).apply(null,arguments)};var _cfg_BKSetMaximumResultsCount=Module["_cfg_BKSetMaximumResultsCount"]=function(){return(_cfg_BKSetMaximumResultsCount=Module["_cfg_BKSetMaximumResultsCount"]=Module["asm"]["ka"]).apply(null,arguments)};var _cfg_BKSetEnableMisshaped1D=Module["_cfg_BKSetEnableMisshaped1D"]=function(){return(_cfg_BKSetEnableMisshaped1D=Module["_cfg_BKSetEnableMisshaped1D"]=Module["asm"]["la"]).apply(null,arguments)};var _cfg_BKSetEnableVINRestrictions=Module["_cfg_BKSetEnableVINRestrictions"]=function(){return(_cfg_BKSetEnableVINRestrictions=Module["_cfg_BKSetEnableVINRestrictions"]=Module["asm"]["ma"]).apply(null,arguments)};var _cfg_BKReturnDecodingSpeed=Module["_cfg_BKReturnDecodingSpeed"]=function(){return(_cfg_BKReturnDecodingSpeed=Module["_cfg_BKReturnDecodingSpeed"]=Module["asm"]["na"]).apply(null,arguments)};var _cfg_BKReturnUpcEanDeblur=Module["_cfg_BKReturnUpcEanDeblur"]=function(){return(_cfg_BKReturnUpcEanDeblur=Module["_cfg_BKReturnUpcEanDeblur"]=Module["asm"]["oa"]).apply(null,arguments)};var _cfg_BKReturnFormatting=Module["_cfg_BKReturnFormatting"]=function(){return(_cfg_BKReturnFormatting=Module["_cfg_BKReturnFormatting"]=Module["asm"]["pa"]).apply(null,arguments)};var _cfg_BKReturnDuplicatesDelayMs=Module["_cfg_BKReturnDuplicatesDelayMs"]=function(){return(_cfg_BKReturnDuplicatesDelayMs=Module["_cfg_BKReturnDuplicatesDelayMs"]=Module["asm"]["qa"]).apply(null,arguments)};var _cfg_BKReturnEncodingCharacterSet=Module["_cfg_BKReturnEncodingCharacterSet"]=function(){return(_cfg_BKReturnEncodingCharacterSet=Module["_cfg_BKReturnEncodingCharacterSet"]=Module["asm"]["ra"]).apply(null,arguments)};var _cfg_BKReturnSpecificConfig=Module["_cfg_BKReturnSpecificConfig"]=function(){return(_cfg_BKReturnSpecificConfig=Module["_cfg_BKReturnSpecificConfig"]=Module["asm"]["sa"]).apply(null,arguments)};var _cfg_BKReturnBarcodeTypeEnabled=Module["_cfg_BKReturnBarcodeTypeEnabled"]=function(){return(_cfg_BKReturnBarcodeTypeEnabled=Module["_cfg_BKReturnBarcodeTypeEnabled"]=Module["asm"]["ta"]).apply(null,arguments)};var _cfg_BKSetBarcodeTypeEnabled=Module["_cfg_BKSetBarcodeTypeEnabled"]=function(){return(_cfg_BKSetBarcodeTypeEnabled=Module["_cfg_BKSetBarcodeTypeEnabled"]=Module["asm"]["ua"]).apply(null,arguments)};var _cfg_BKReturnLengthRange=Module["_cfg_BKReturnLengthRange"]=function(){return(_cfg_BKReturnLengthRange=Module["_cfg_BKReturnLengthRange"]=Module["asm"]["va"]).apply(null,arguments)};var _cfg_BKReturnMulticodeCachingEnabled=Module["_cfg_BKReturnMulticodeCachingEnabled"]=function(){return(_cfg_BKReturnMulticodeCachingEnabled=Module["_cfg_BKReturnMulticodeCachingEnabled"]=Module["asm"]["wa"]).apply(null,arguments)};var _cfg_BKReturnMulticodeCachingDuration=Module["_cfg_BKReturnMulticodeCachingDuration"]=function(){return(_cfg_BKReturnMulticodeCachingDuration=Module["_cfg_BKReturnMulticodeCachingDuration"]=Module["asm"]["xa"]).apply(null,arguments)};var _cfg_BKGetMaximumResultsCount=Module["_cfg_BKGetMaximumResultsCount"]=function(){return(_cfg_BKGetMaximumResultsCount=Module["_cfg_BKGetMaximumResultsCount"]=Module["asm"]["ya"]).apply(null,arguments)};var _cfg_BKReturnEnableMisshaped1D=Module["_cfg_BKReturnEnableMisshaped1D"]=function(){return(_cfg_BKReturnEnableMisshaped1D=Module["_cfg_BKReturnEnableMisshaped1D"]=Module["asm"]["za"]).apply(null,arguments)};var _cfg_BKReturnEnableVINRestrictions=Module["_cfg_BKReturnEnableVINRestrictions"]=function(){return(_cfg_BKReturnEnableVINRestrictions=Module["_cfg_BKReturnEnableVINRestrictions"]=Module["asm"]["Aa"]).apply(null,arguments)};var _api_BKDecodeImageMemory=Module["_api_BKDecodeImageMemory"]=function(){return(_api_BKDecodeImageMemory=Module["_api_BKDecodeImageMemory"]=Module["asm"]["Ba"]).apply(null,arguments)};var ___getTypeName=Module["___getTypeName"]=function(){return(___getTypeName=Module["___getTypeName"]=Module["asm"]["Ca"]).apply(null,arguments)};var ___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=function(){return(___embind_register_native_and_builtin_types=Module["___embind_register_native_and_builtin_types"]=Module["asm"]["Da"]).apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return(___errno_location=Module["___errno_location"]=Module["asm"]["Ea"]).apply(null,arguments)};var __get_tzname=Module["__get_tzname"]=function(){return(__get_tzname=Module["__get_tzname"]=Module["asm"]["Fa"]).apply(null,arguments)};var __get_daylight=Module["__get_daylight"]=function(){return(__get_daylight=Module["__get_daylight"]=Module["asm"]["Ga"]).apply(null,arguments)};var __get_timezone=Module["__get_timezone"]=function(){return(__get_timezone=Module["__get_timezone"]=Module["asm"]["Ha"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return(stackSave=Module["stackSave"]=Module["asm"]["Ia"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return(stackRestore=Module["stackRestore"]=Module["asm"]["Ja"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return(stackAlloc=Module["stackAlloc"]=Module["asm"]["Ka"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return(dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["La"]).apply(null,arguments)};Module["ccall"]=ccall;Module["cwrap"]=cwrap;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];args=args||[];var argc=args.length+1;var argv=stackAlloc((argc+1)*4);HEAP32[argv>>2]=allocateUTF8OnStack(thisProgram);for(var i=1;i<argc;i++){HEAP32[(argv>>2)+i]=allocateUTF8OnStack(args[i-1])}HEAP32[(argv>>2)+argc]=0;try{var ret=entryFunction(argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="unwind"){noExitRuntime=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&noExitRuntime&&status===0){return}if(noExitRuntime){}else{EXITSTATUS=status;exitRuntime();if(Module["onExit"])Module["onExit"](status);ABORT=true}quit_(status,new ExitStatus(status))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();

}
//-----------------------------------
let Barkoder = null;

return {
	
	initialize: async (key) => {
		
		//-----------------------------------

		while (!Connector.moduleLoaded) {
			await Common.wait(20);
			Common.debugMessage("while await", Connector.moduleLoaded, true);
		}

		Common.debugMessage("UMD", "return point", true);

		//-----------------------------------------------------
		
		if (typeof key != 'string')
			return new window.Promise(function(resolve, reject) {
				
				return reject("LicenseKeyNotString");
			});
		
		try {
			let key_len = key.length;
			const uintc8 = new Uint8ClampedArray(key_len + 1);
			
			for (let i = 0; i < key_len; i++) uintc8[i] = key.charCodeAt(i);
			uintc8[key_len] = 0;
			
			let data = uintc8;
			let nDataBytes = data.length * data.BYTES_PER_ELEMENT;
			
			let dataPtr = Module._malloc(nDataBytes);
			Module.HEAPU8.set(data, dataPtr);
			
			let response = Connector.initialize(dataPtr);
			
			//-------------------------
			//window.BarkoderSDK_callback2D
			//window.BarkoderSDK_callback3D
			
			if (typeof window.BarkoderSDK_callback3D == 'undefined') {
				
				var timeCounter = 0;
				var timeout = false;
				
				if (typeof window.BarkoderSDK_callback2D == 'undefined') window.BarkoderSDK_callback2D = false;
				while (!window.BarkoderSDK_callback2D) {
					await Common.wait(20);
					timeCounter += 20;
					if (timeCounter >= 10000) {
						Common.debugMessage("Init", "Stage 2 timeout.", true);
						timeout = true;
						break;
					}
				}
				window.BarkoderSDK_callback2D = undefined;
				
				Common.debugMessage("Init", `Stage 2/3 took ${timeCounter}ms`, true);
				
				if (!timeout) response = Connector.initialize(dataPtr);
			}
			window.BarkoderSDK_callback3D = undefined;
			//-------------------------
			
			Module._free(dataPtr);
			dataPtr = null;
			
			return new window.Promise(function(resolve, reject) {
				
				//resolve(`License response: ${response}`);
				
				Barkoder = {
					constants: Constants,
					configTypes: ConfigTypes,
					
					configureBarkoder: (barkoderConfig) => {
						
						if (typeof barkoderConfig != 'object') return false;
						
						let tmp_BarkoderConfig = new ConfigTypes.BarkoderConfig();
						let tmp_DekoderConfig = new ConfigTypes.DekoderConfig();
						let tmp_GeneralSettings = new ConfigTypes.GeneralSettings();
						
						for (const [key, value] of Object.entries(barkoderConfig)) {
							//console.log(`${key}: ${value}`);
							
							//if (key in ConfigTypes.BarkoderConfig)
							if (key in tmp_BarkoderConfig)
							{
								switch (key) {
									case "closeSessionOnResultEnabled":
									//type checker
									//statement
									//Decoder.cameraScanner.config.continuous = !value;
									Barkoder.setContinuous(!value);
									break;
									
									case "barkoderResolution":
									//type checker
									//statement
									Barkoder.setCameraResolution(value);
									break;
									
									case "decoder":
									{
										//unpack
										
										//type DekoderConfig, with  many nested props
										//-------------------------------
										let decoderConfig = value;
										
										let totalDecoders = Bridge.numberOfSupportedDecoders;
										let decodersToEnable = 0;
										
										for (const [key, value] of Object.entries(decoderConfig)) {
											//console.log(`${key}: ${value}`);
											
											//if (key in ConfigTypes.DekoderConfig)
											if ((key in tmp_DekoderConfig) && (typeof value == 'object'))
											{
												switch (key) {
													
													//all BarcodeConfigWithLength first
													case "general":
													{
														//-----------------------------
														let generalSettings = value;
														
														for (const [key, value] of Object.entries(generalSettings)) {
															//console.log(`${key}: ${value}`);
															
															//if (key in ConfigTypes.GeneralSettings)
															if (key in tmp_GeneralSettings)
															{
																let ROI_is_set = false;
																
																switch (key) {
																	case "decodingSpeed":
																	//type checker
																	//statement
																	Barkoder.setDecodingSpeed(value);
																	break;
																	
																	case "formattingType":
																	//type checker
																	//statement
																	Barkoder.setFormatting(value);
																	break;
																	
																	case "encodingCharacterSet":
																	//type checker
																	//statement
																	Barkoder.setEncodingCharacterSet(value);
																	break;
																	
																	case "upcEanDeblur":
																	//type checker
																	//statement
																	Barkoder.setUpcEanDeblur(value);
																	break;
																	
																	case "enableMisshaped1D":
																	//type checker
																	//statement
																	Barkoder.setEnableMisshaped1D(value);
																	break;
																	
																	default:
																	{
																		//ROI
																		if (!ROI_is_set)
																		if ((typeof generalSettings.roiX == 'number') && (typeof generalSettings.roiY == 'number') && (typeof generalSettings.roiWidth == 'number') && (typeof generalSettings.roiHeight == 'number'))
																		{
																			Barkoder.setRegionOfInterest(generalSettings.roiX, generalSettings.roiY, generalSettings.roiWidth, generalSettings.roiHeight);
																			ROI_is_set = true;
																		}
																	}
																}
															}
														}
														
														//-----------------------------
													}
													break;
													
													default:
													{
														let decoderNumber = Object.keys(tmp_DekoderConfig).indexOf(key);
														
														//enable
														if (typeof value.enabled == 'boolean')
														if (value.enabled) decodersToEnable += Math.pow(2, decoderNumber);
														
														//minLength / maxLength
														if ((typeof value.minLength == 'number') && (typeof value.maxLength == 'number'))
														Barkoder.setLengthRange(decoderNumber, value.minLength, value.maxLength);
														
														//checksum
														if (typeof value.checksum == 'number')
														Connector.setSpecificConfig(decoderNumber, value.checksum);
														
														//dpmMode
														if (typeof value.dpmMode == 'number')
														Connector.setSpecificConfig(decoderNumber, value.dpmMode);
													}
												}
											}
											
										}
										
										Connector.setEnabledDecodersPro(decodersToEnable);
										Bridge.enabledDecoders = decodersToEnable;
										//console.log("decodersToEnable:" + decodersToEnable);
										
										//-------------------------------
									}
									break;
								}
							}
							
						}
					
						return true;
					},
					
					scanImage: Connector.scanImage,
					setDecodingSpeed: Connector.setDecodingSpeed,
					
					setEnabledDecoders: function() {
						
						let totalDecoders = arguments.length;
						let decodersToEnable = 0;
						
						Common.debugMessage("API", "totalDecoders: " + totalDecoders, true);
						
						for(let i = 0; i < totalDecoders; i++)
						{
							let decoder_i = arguments[i];
							
							if (typeof decoder_i == 'number') decodersToEnable += Math.pow(2, decoder_i);
						}
						
						Common.debugMessage("API", "decodersToEnable: " + decodersToEnable, true);
						Connector.setEnabledDecodersPro(decodersToEnable);
						Bridge.enabledDecoders = decodersToEnable;
						
						//------transpose ROI for dpm----------
						let use_dpmHandler = ((totalDecoders == 1) && (arguments[0] == Barkoder.constants.Decoders.Datamatrix));
						
						if (use_dpmHandler)
						Bridge.dpmHandler(use_dpmHandler);
						//------transpose ROI for dpm----------
						else {
							//
							//let startingROI = Connector.cache.ROI;
							if (typeof Bridge.untouchedROIUnion_static != 'undefined') {
								let startingROI = Bridge.untouchedROIUnion_static;
								console.log(startingROI);
								let x = startingROI.x;
								let y = startingROI.y;
								let width = startingROI.width;
								let height = startingROI.height;
								
								Barkoder.setRegionOfInterest(x, y, width, height);
							}
						}
					},
					setUpcEanDeblur: Connector.setUpcEanDeblur,
					
					getRegionOfInterest					: Connector.getRegionOfInterest,
					setRegionOfInterest					: (...args) => { 
						Connector.setRegionOfInterest(...args);
						Connector.storeROI(
							args[0],
							args[1],
							args[2],
							args[3]);
						Bridge.init_ROIs();
						//Bridge.resizeHandler();
						Bridge.resizePreview();
					},
								
					setLengthRange						: Connector.setLengthRange,
					setFormatting						: Connector.setFormatting,
					setDuplicatesDelayMs				: Connector.setDuplicatesDelayMs,
					setEncodingCharacterSet				: Connector.setEncodingCharacterSet,
					setMulticodeCachingEnabled			: Connector.setMulticodeCachingEnabled,
					setMulticodeCachingDuration			: Connector.setMulticodeCachingDuration,
					//new:
					setMaximumResultsCount			: Connector.setMaximumResultsCount,
					setEnableMisshaped1D				: Connector.setEnableMisshaped1D,
					setEnableVINRestrictions			: Connector.setEnableVINRestrictions,
					
					getDecodingSpeed					: Connector.getDecodingSpeed,
					getUpcEanDeblur						: Connector.getUpcEanDeblur,
					getFormatting						: Connector.getFormatting,
					getDuplicatesDelayMs				: Connector.getDuplicatesDelayMs,
					getMaximumResultsCount				: Connector.getMaximumResultsCount,
					getEnableMisshaped1D				: Connector.getEnableMisshaped1D,
					getEnableVINRestrictions			: Connector.getEnableVINRestrictions,
					
					//---
					getEncodingCharacterSet				: Connector.getEncodingCharacterSet, //ok
					
					getMsiChecksumType: () => { 
						return Connector.getSpecificConfig(Constants.Decoders.Msi);
					},
					getCode39ChecksumType: () => { 
						return Connector.getSpecificConfig(Constants.Decoders.Code39);
					},
					getCode11ChecksumType: () => { 
						return Connector.getSpecificConfig(Constants.Decoders.Code11);
					},
					
					isBarcodeTypeEnabled: (decoder) => { if (typeof decoder == 'number') {
							let barcodeTypeEnabled = Connector.getBarcodeTypeEnabled(decoder);
							if (barcodeTypeEnabled == 1) return true;
							if (barcodeTypeEnabled == 0) return false;
							return barcodeTypeEnabled;
						} return -1;
					},

					setBarcodeTypeEnabled				: Connector.setBarcodeTypeEnabled, //ok

					getBarcodeTypeLengthRange: (decoder) => { if (typeof decoder == 'number') {
							let lengthRange = Connector.getLengthRange(decoder);
							
							if (lengthRange != -1)							
							{
								let max = (lengthRange >> (8 * 1)) & 0xFF;
								let min = lengthRange & 0xFF;
								
								return [min, max];
							}
							else return -1;
						} return -1;
					},
					
					getMulticodeCachingEnabled			: Connector.getMulticodeCachingEnabled, //ok
					getMulticodeCachingDuration			: Connector.getMulticodeCachingDuration, //ok
					//---
					//---
					
					
					setCode11ChecksumType: (code11ChecksumType) => { if (typeof code11ChecksumType == 'number') {
							Connector.setSpecificConfig(Constants.Decoders.Code11, code11ChecksumType); return 0;
						} return -1;
					},
					
					setCode39ChecksumType: (code39ChecksumType) => { if (typeof code39ChecksumType == 'number') {
							Connector.setSpecificConfig(Constants.Decoders.Code39, code39ChecksumType); return 0;
						} return -1;
					},
					
					setMsiChecksumType: (msiChecksumType) => { if (typeof msiChecksumType == 'number') {
							Connector.setSpecificConfig(Constants.Decoders.Msi, msiChecksumType); return 0;
						} return -1;
					},
					
					setDatamatrixDpmModeEnabled: (dpmModeEnabled) => { if (typeof dpmModeEnabled == 'boolean') {
							Connector.setSpecificConfig(Constants.Decoders.Datamatrix, dpmModeEnabled); return 0;
						} return -1;
					},
					
					
					setFlashEnabled: (flashEnabled) => { if (typeof flashEnabled == 'boolean') {
							DOM_elements.buttonsProperties.showFlash = flashEnabled; return 0;
						} return -1;
					},
					
					setZoomEnabled: (zoomEnabled) => { if (typeof zoomEnabled == 'boolean') {
							DOM_elements.buttonsProperties.showZoom = zoomEnabled; return 0;
						} return -1;
					},
					
					setCloseEnabled: (closeEnabled) => { if (typeof closeEnabled == 'boolean') {
							DOM_elements.buttonsProperties.showClose = closeEnabled; return 0;
						} return -1;
					},
					
					setCameraPickerEnabled: (cameraPickerEnabled) => { if (typeof cameraPickerEnabled == 'boolean') {
							DOM_elements.buttonsProperties.showCameraPicker = cameraPickerEnabled; return 0;
						} return -1;
					},
					
					changeFlashState: () => {
						JS_media.applyFlash(true);
					},
					
					changeZoomState: () => {
						JS_media.applyZoom();
					},
					
					
					setCameraResolution: (camRes) => { if (typeof camRes == 'number') {
						
							if (camRes == 0) { JS_media.frameWidth.ideal = 1280; JS_media.frameHeight.ideal = 720; return 0; }
							if (camRes == 1) { JS_media.frameWidth.ideal = 1920; JS_media.frameHeight.ideal = 1080; return 0; }
							return -1;
						} return -1;
					},
					setDpsLimit: (dpsLimit) => { if (typeof dpsLimit == 'number') {
							if (dpsLimit >= 1 && dpsLimit <= 30) { Decoder.cameraScanner.config.dps_limit = dpsLimit; return 0; }
							return -1;
						} return -1;
					},
					setScannerTimeout: (timeout_ms) => { if (typeof timeout_ms == 'number') {
							if (timeout_ms == 0) { Decoder.cameraScanner.config.timeout = timeout_ms; return 0; }
							else if (timeout_ms >= 10 && timeout_ms <= 3600) { Decoder.cameraScanner.config.timeout = timeout_ms; return 0; }
							return -1;
						} return -1;
					},
					setContinuous: (continuous) => { if (typeof continuous == 'boolean') {
							Decoder.cameraScanner.config.continuous = continuous; return 0;
						} return -1;
					},
					
					//--
					getCameraResolution: () => { 
						if ((JS_media.frameWidth.ideal == 1280) && (JS_media.frameHeight.ideal == 720)) return 0;
						if ((JS_media.frameWidth.ideal == 1920) && (JS_media.frameHeight.ideal == 1080)) return 1;
						
						return -1;
					},
					
					getContinuous: () => { 
						return Decoder.cameraScanner.config.continuous;
					},
					//--
					
					applyTemplate: Connector.applyTemplate,
					
					startScanner: async (...args) => { Decoder.start(...args); }, //.call(this, ...args)
					stopScanner: JS_media.closeHandler,
					setCameraId: (id) => { JS_media.cameraId = id; },
					getActiveCamera: () => { 
						
						let cameraScannerProperties = Decoder.cameraScanner;
						const active = cameraScannerProperties.runningState.active;
						
						if (active)
						{
							if (typeof JS_media.runtime_settings_videoTrack == "object")
							{
								const activeCameraId = JS_media.runtime_settings_videoTrack.deviceId;
								let activeCamera = JS_media.cameras.filter((camera) => camera.id == activeCameraId);
								
								return activeCamera[0];
							}
							return null;
						}
						return null;
					},
					getCameras: JS_media.getCameras,
					setPauseDecoding: (pause) => { if (typeof pause == 'boolean') Decoder.cameraScanner.runningState.paused = pause; },
					
					//----new ui methods------------
					
					setLocationLineColor: (color) => { if (typeof color == 'string') Decoder.cameraScanner.overlay.locationLineColor = color; },
					
					setLocationLineWidth: (width) => { if (typeof width == 'number') Decoder.cameraScanner.overlay.locationLineWidth = width; },
					
					setRoiLineColor: (color) => { if (typeof color == 'string') Bridge.viewfinderAppearance.overlay.lineColor = color; },
					
					setRoiLineWidth: (width) => { if (typeof width == 'number') Bridge.viewfinderAppearance.overlay.lineWidth = width; },
					
					setRegionOfInterestVisible: (visible) => { if (typeof visible == 'boolean') Bridge.viewfinderAppearance.overlay.roiVisible = visible; },
					
					setImageResultEnabled: (enabled) => { if (typeof enabled == 'boolean') Decoder.cameraScanner.config.result_image = enabled; },
					
					setLocationInPreviewEnabled: (enabled) => { if (typeof enabled == 'boolean') Decoder.cameraScanner.overlay.locationShow = enabled; },
					
					getLocationLineColor: () => { return Decoder.cameraScanner.overlay.locationLineColor; },
					getLocationLineWidth: () => { return Decoder.cameraScanner.overlay.locationLineWidth; },
					getRoiLineColor: () => { return Bridge.viewfinderAppearance.overlay.lineColor; },
					getRoiLineWidth: () => { return Bridge.viewfinderAppearance.overlay.lineWidth; },
					isRegionOfInterestVisible: () => { return Bridge.viewfinderAppearance.overlay.roiVisible; },
					isImageResultEnabled: () => { Decoder.cameraScanner.config.result_image; },
					isLocationInPreviewEnabled: () => { return Decoder.cameraScanner.overlay.locationShow; },
					
					//----new ui methods------------
					
					//<form><input type="file" value="Scan file" onchange="Barkoder.scanFromLocalFileSystem(this)"/></form>
					
					scanFromLocalFileSystem: function(input, result_callback) {
						
						let file = input.files[0];
						let reader = new FileReader();
						
						if (file?.type.match(/image/i)) {
							
							reader.readAsDataURL(file);
							reader.onload = function () {
								
								Barkoder.scanImage(reader.result, result_callback);
								
							};
							
							reader.onerror = function () {
								console.log(reader.error);
							};
							
						} else {
							if (typeof file == 'object')
							console.log('File is not an image.');
							else console.log('No file is selected.');
						}
					},
					
					//----new ui methods------------
					
					getVersion: Connector.getVersion
				};
				
				resolve(Barkoder);
			});
			
		} catch (e) {
			Common.debugMessage("initialize", "error: " + e, true);
			
			return new window.Promise(function(resolve, reject) {
				
				return reject("LicenseKeyError");
			});
		}
	}
};

})