/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("\n// get a refernce to the canvas\nconst canvas = document.getElementById(\"myCanvas\");\n\n// set height\ncanvas.width = 200;\n\n// have a car and want to draw on the canvas...need the drawing context\nconst ctx = canvas.getContext(\"2d\");\n\n// draw a rectangle on the canvas using the context object (ctx)\nconst road = new Road(canvas.width / 2, canvas.width * 0.9); // x, width, laneCount\nconst car = new Car(road.getLaneCenter(1), 100, 30, 50) // x, y, width of car, height of car\n\nanimate();\n// update the car's position\nfunction animate() {\n    // update the car's position\n    car.update();\n\n    // canvas has a width and height property that we can use to set the canvas size\n    canvas.height = window.innerHeight;\n\n    // before drawing the road, we will save the current context state\n    ctx.save();\n    ctx.translate(0, -car.y + canvas.height * 0.8); // translate the canvas to the center of the car where we want the center to be positioned\n    // draw the road on the canvas\n    road.draw(ctx);\n\n    // draw the car on the canvas\n    car.draw(ctx); // draw the car\n\n    // requestAnimationFrame is a method of the window object that tells the browser to call the animate function again\n    requestAnimationFrame(animate);\n}\n\n//# sourceURL=webpack://vanilla-neural-network/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;