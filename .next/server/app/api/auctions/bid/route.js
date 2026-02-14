"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auctions/bid/route";
exports.ids = ["app/api/auctions/bid/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauctions%2Fbid%2Froute&page=%2Fapi%2Fauctions%2Fbid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauctions%2Fbid%2Froute.ts&appDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauctions%2Fbid%2Froute&page=%2Fapi%2Fauctions%2Fbid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauctions%2Fbid%2Froute.ts&appDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ACER_TCG_Pok_mon_app_api_auctions_bid_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auctions/bid/route.ts */ \"(rsc)/./app/api/auctions/bid/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auctions/bid/route\",\n        pathname: \"/api/auctions/bid\",\n        filename: \"route\",\n        bundlePath: \"app/api/auctions/bid/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ACER\\\\TCG Pokémon\\\\app\\\\api\\\\auctions\\\\bid\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ACER_TCG_Pok_mon_app_api_auctions_bid_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auctions/bid/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdWN0aW9ucyUyRmJpZCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXVjdGlvbnMlMkZiaWQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdWN0aW9ucyUyRmJpZCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBQ0VSJTVDVENHJTIwUG9rJUMzJUE5bW9uJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBQ0VSJTVDVENHJTIwUG9rJUMzJUE5bW9uJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNlO0FBQzVGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9rZW5leHVzLz80YTFiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEFDRVJcXFxcVENHIFBva8OpbW9uXFxcXGFwcFxcXFxhcGlcXFxcYXVjdGlvbnNcXFxcYmlkXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdWN0aW9ucy9iaWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdWN0aW9ucy9iaWRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1Y3Rpb25zL2JpZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXEFDRVJcXFxcVENHIFBva8OpbW9uXFxcXGFwcFxcXFxhcGlcXFxcYXVjdGlvbnNcXFxcYmlkXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdWN0aW9ucy9iaWQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauctions%2Fbid%2Froute&page=%2Fapi%2Fauctions%2Fbid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauctions%2Fbid%2Froute.ts&appDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auctions/bid/route.ts":
/*!***************************************!*\
  !*** ./app/api/auctions/bid/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\n\nasync function POST(req) {\n    const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    console.log(\"Bid API Session:\", JSON.stringify(session, null, 2));\n    if (!session || !session.user?.email) {\n        console.error(\"Bid API Unauthorized - Session is null or email missing\");\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            message: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    const { listingId, amount } = await req.json();\n    if (!listingId || !amount) {\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            message: \"Listing ID and Amount required\"\n        }, {\n            status: 400\n        });\n    }\n    const bidAmount = Number(amount);\n    try {\n        const result = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.$transaction(async (tx)=>{\n            // 1. Get Listing & Current Highest Bid\n            const listing = await tx.listing.findUnique({\n                where: {\n                    id: listingId\n                },\n                include: {\n                    bids: {\n                        orderBy: {\n                            amount: \"desc\"\n                        },\n                        take: 1\n                    }\n                }\n            });\n            if (!listing) throw new Error(\"Listing not found\");\n            // Check if active\n            if (listing.status !== \"ACTIVE\") throw new Error(\"Auction is not active\");\n            if (listing.endsAt && new Date() > listing.endsAt) throw new Error(\"Auction has ended\");\n            const highestBid = listing.bids[0];\n            const currentPrice = highestBid ? Number(highestBid.amount) : Number(listing.price);\n            // Validation: Bid must be higher\n            // Increment rule: +$5 if < 100, +$10 if >= 100\n            const minIncrement = currentPrice < 100 ? 5 : 10;\n            if (bidAmount < currentPrice + minIncrement) {\n                throw new Error(`Bid must be at least $${(currentPrice + minIncrement).toLocaleString()}`);\n            }\n            // 2. Get User to check balance\n            const user = await tx.user.findUnique({\n                where: {\n                    email: session.user?.email\n                }\n            });\n            if (!user) throw new Error(\"User not found\");\n            if (Number(user.walletBalance) < bidAmount) {\n                throw new Error(`Insufficient funds. You have $${Number(user.walletBalance).toLocaleString()}`);\n            }\n            // 3. Charge New Bidder (Atomic Decrement)\n            const updatedUser = await tx.user.update({\n                where: {\n                    id: user.id\n                },\n                data: {\n                    walletBalance: {\n                        decrement: bidAmount\n                    }\n                }\n            });\n            // 4. Refund Previous Bidder (Atomic Increment)\n            if (highestBid) {\n                await tx.user.update({\n                    where: {\n                        id: highestBid.userId\n                    },\n                    data: {\n                        walletBalance: {\n                            increment: highestBid.amount\n                        }\n                    }\n                });\n                console.log(`Refunded $${highestBid.amount} to user ${highestBid.userId}`);\n            }\n            // 5. Create New Bid\n            const newBid = await tx.bid.create({\n                data: {\n                    listingId,\n                    userId: user.id,\n                    amount: bidAmount,\n                    placedAt: new Date()\n                }\n            });\n            return {\n                newBid,\n                newBalance: Number(updatedUser.walletBalance)\n            };\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            message: \"Bid placed successfully\",\n            bid: result.newBid,\n            newBalance: result.newBalance\n        });\n    } catch (error) {\n        console.error(\"Bid transaction failed:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            message: error.message || \"Failed to place bid\"\n        }, {\n            status: 400\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0JBQUVDLElBQUlRLFdBQVdVLE1BQU07b0JBQUM7b0JBQy9CRixNQUFNO3dCQUFFSCxlQUFlOzRCQUFFTSxXQUFXWCxXQUFXakIsTUFBTTt3QkFBQztvQkFBRTtnQkFDNUQ7Z0JBQ0FYLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRTJCLFdBQVdqQixNQUFNLENBQUMsU0FBUyxFQUFFaUIsV0FBV1UsTUFBTSxDQUFDLENBQUM7WUFDN0U7WUFFQSxvQkFBb0I7WUFDcEIsTUFBTUUsU0FBUyxNQUFNeEIsR0FBR3lCLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDO2dCQUMvQk4sTUFBTTtvQkFDRjFCO29CQUNBNEIsUUFBUWxDLEtBQUtnQixFQUFFO29CQUNmVCxRQUFRQztvQkFDUitCLFVBQVUsSUFBSWhCO2dCQUNsQjtZQUNKO1lBRUEsT0FBTztnQkFDSGE7Z0JBQ0FJLFlBQVkvQixPQUFPcUIsWUFBWUQsYUFBYTtZQUNoRDtRQUNKO1FBRUEsT0FBT3JDLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFDckJDLFNBQVM7WUFDVGlDLEtBQUszQixPQUFPMEIsTUFBTTtZQUNsQkksWUFBWTlCLE9BQU84QixVQUFVO1FBQ2pDO0lBRUosRUFBRSxPQUFPdEMsT0FBWTtRQUNqQk4sUUFBUU0sS0FBSyxDQUFDLDJCQUEyQkE7UUFDekMsT0FBT1YscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxTQUFTRixNQUFNRSxPQUFPLElBQUk7UUFBc0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEc7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VuZXh1cy8uL2FwcC9hcGkvYXVjdGlvbnMvYmlkL3JvdXRlLnRzPzI3MWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9uZXh0XCI7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkJpZCBBUEkgU2Vzc2lvbjpcIiwgSlNPTi5zdHJpbmdpZnkoc2Vzc2lvbiwgbnVsbCwgMikpO1xyXG5cclxuICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi51c2VyPy5lbWFpbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCaWQgQVBJIFVuYXV0aG9yaXplZCAtIFNlc3Npb24gaXMgbnVsbCBvciBlbWFpbCBtaXNzaW5nXCIpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGxpc3RpbmdJZCwgYW1vdW50IH0gPSBhd2FpdCByZXEuanNvbigpO1xyXG5cclxuICAgIGlmICghbGlzdGluZ0lkIHx8ICFhbW91bnQpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkxpc3RpbmcgSUQgYW5kIEFtb3VudCByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmlkQW1vdW50ID0gTnVtYmVyKGFtb3VudCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuJHRyYW5zYWN0aW9uKGFzeW5jICh0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAxLiBHZXQgTGlzdGluZyAmIEN1cnJlbnQgSGlnaGVzdCBCaWRcclxuICAgICAgICAgICAgY29uc3QgbGlzdGluZyA9IGF3YWl0IHR4Lmxpc3RpbmcuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogbGlzdGluZ0lkIH0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmlkczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckJ5OiB7IGFtb3VudDogJ2Rlc2MnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRha2U6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbGlzdGluZykgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGluZyBub3QgZm91bmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhY3RpdmVcclxuICAgICAgICAgICAgaWYgKGxpc3Rpbmcuc3RhdHVzICE9PSAnQUNUSVZFJykgdGhyb3cgbmV3IEVycm9yKFwiQXVjdGlvbiBpcyBub3QgYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBpZiAobGlzdGluZy5lbmRzQXQgJiYgbmV3IERhdGUoKSA+IGxpc3RpbmcuZW5kc0F0KSB0aHJvdyBuZXcgRXJyb3IoXCJBdWN0aW9uIGhhcyBlbmRlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hlc3RCaWQgPSBsaXN0aW5nLmJpZHNbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGhpZ2hlc3RCaWQgPyBOdW1iZXIoaGlnaGVzdEJpZC5hbW91bnQpIDogTnVtYmVyKGxpc3RpbmcucHJpY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gVmFsaWRhdGlvbjogQmlkIG11c3QgYmUgaGlnaGVyXHJcbiAgICAgICAgICAgIC8vIEluY3JlbWVudCBydWxlOiArJDUgaWYgPCAxMDAsICskMTAgaWYgPj0gMTAwXHJcbiAgICAgICAgICAgIGNvbnN0IG1pbkluY3JlbWVudCA9IGN1cnJlbnRQcmljZSA8IDEwMCA/IDUgOiAxMDtcclxuICAgICAgICAgICAgaWYgKGJpZEFtb3VudCA8IGN1cnJlbnRQcmljZSArIG1pbkluY3JlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBCaWQgbXVzdCBiZSBhdCBsZWFzdCAkJHsoY3VycmVudFByaWNlICsgbWluSW5jcmVtZW50KS50b0xvY2FsZVN0cmluZygpfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAyLiBHZXQgVXNlciB0byBjaGVjayBiYWxhbmNlXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0eC51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlcj8uZW1haWwhIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcIlVzZXIgbm90IGZvdW5kXCIpO1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHVzZXIud2FsbGV0QmFsYW5jZSkgPCBiaWRBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5zdWZmaWNpZW50IGZ1bmRzLiBZb3UgaGF2ZSAkJHtOdW1iZXIodXNlci53YWxsZXRCYWxhbmNlKS50b0xvY2FsZVN0cmluZygpfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAzLiBDaGFyZ2UgTmV3IEJpZGRlciAoQXRvbWljIERlY3JlbWVudClcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCB0eC51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlci5pZCB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB3YWxsZXRCYWxhbmNlOiB7IGRlY3JlbWVudDogYmlkQW1vdW50IH0gfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIDQuIFJlZnVuZCBQcmV2aW91cyBCaWRkZXIgKEF0b21pYyBJbmNyZW1lbnQpXHJcbiAgICAgICAgICAgIGlmIChoaWdoZXN0QmlkKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0eC51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGhpZ2hlc3RCaWQudXNlcklkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB3YWxsZXRCYWxhbmNlOiB7IGluY3JlbWVudDogaGlnaGVzdEJpZC5hbW91bnQgfSB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWZ1bmRlZCAkJHtoaWdoZXN0QmlkLmFtb3VudH0gdG8gdXNlciAke2hpZ2hlc3RCaWQudXNlcklkfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyA1LiBDcmVhdGUgTmV3IEJpZFxyXG4gICAgICAgICAgICBjb25zdCBuZXdCaWQgPSBhd2FpdCB0eC5iaWQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0aW5nSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogYmlkQW1vdW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZEF0OiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5ld0JpZCxcclxuICAgICAgICAgICAgICAgIG5ld0JhbGFuY2U6IE51bWJlcih1cGRhdGVkVXNlci53YWxsZXRCYWxhbmNlKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkJpZCBwbGFjZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgICAgICAgIGJpZDogcmVzdWx0Lm5ld0JpZCxcclxuICAgICAgICAgICAgbmV3QmFsYW5jZTogcmVzdWx0Lm5ld0JhbGFuY2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkJpZCB0cmFuc2FjdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIHBsYWNlIGJpZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInByaXNtYSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsIk5leHRSZXNwb25zZSIsIlBPU1QiLCJyZXEiLCJzZXNzaW9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyIiwiZW1haWwiLCJlcnJvciIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwibGlzdGluZ0lkIiwiYW1vdW50IiwiYmlkQW1vdW50IiwiTnVtYmVyIiwicmVzdWx0IiwiJHRyYW5zYWN0aW9uIiwidHgiLCJsaXN0aW5nIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJpbmNsdWRlIiwiYmlkcyIsIm9yZGVyQnkiLCJ0YWtlIiwiRXJyb3IiLCJlbmRzQXQiLCJEYXRlIiwiaGlnaGVzdEJpZCIsImN1cnJlbnRQcmljZSIsInByaWNlIiwibWluSW5jcmVtZW50IiwidG9Mb2NhbGVTdHJpbmciLCJ3YWxsZXRCYWxhbmNlIiwidXBkYXRlZFVzZXIiLCJ1cGRhdGUiLCJkYXRhIiwiZGVjcmVtZW50IiwidXNlcklkIiwiaW5jcmVtZW50IiwibmV3QmlkIiwiYmlkIiwiY3JlYXRlIiwicGxhY2VkQXQiLCJuZXdCYWxhbmNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auctions/bid/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    console.error(\"Missing credentials\");\n                    return null;\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    console.error(\"User not found:\", credentials.email);\n                    return null;\n                }\n                if (!user.password) {\n                    console.error(\"User has no password set (likely OAuth user):\", credentials.email);\n                    return null;\n                }\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.password);\n                if (!isValid) {\n                    console.error(\"Invalid password for user:\", credentials.email);\n                    return null;\n                }\n                console.log(\"Login successful for:\", user.email);\n                return {\n                    id: user.id,\n                    name: user.name || user.username,\n                    email: user.email,\n                    image: user.image,\n                    username: user.username,\n                    walletBalance: user.walletBalance\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user, trigger, session }) {\n            if (user) {\n                const u = user;\n                token.id = u.id;\n                token.username = u.username;\n                token.walletBalance = u.walletBalance;\n            }\n            // Allow updating the session (e.g. after purchase)\n            if (trigger === \"update\" && session?.walletBalance !== undefined) {\n                token.walletBalance = session.walletBalance;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.username = token.username;\n                session.user.walletBalance = token.walletBalance;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVrRTtBQUNSO0FBQ3BCO0FBQ1I7QUFFdkIsTUFBTUksY0FBK0I7SUFDeENDLFNBQVNKLHdFQUFhQSxDQUFDQywrQ0FBTUE7SUFDN0JJLFNBQVM7UUFDTEMsVUFBVTtJQUNkO0lBQ0FDLE9BQU87UUFDSEMsUUFBUTtJQUNaO0lBQ0FDLFdBQVc7UUFDUFYsMkVBQW1CQSxDQUFDO1lBQ2hCVyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1RDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ3BEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDdkIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQy9DRSxRQUFRQyxLQUFLLENBQUM7b0JBQ2QsT0FBTztnQkFDWDtnQkFFQSxNQUFNQyxPQUFPLE1BQU1sQiwrQ0FBTUEsQ0FBQ2tCLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN0Q0MsT0FBTzt3QkFDSFQsT0FBT0QsWUFBWUMsS0FBSztvQkFDNUI7Z0JBQ0o7Z0JBRUEsSUFBSSxDQUFDTyxNQUFNO29CQUNQRixRQUFRQyxLQUFLLENBQUMsbUJBQW1CUCxZQUFZQyxLQUFLO29CQUNsRCxPQUFPO2dCQUNYO2dCQUVBLElBQUksQ0FBQ08sS0FBS0osUUFBUSxFQUFFO29CQUNoQkUsUUFBUUMsS0FBSyxDQUFDLGlEQUFpRFAsWUFBWUMsS0FBSztvQkFDaEYsT0FBTztnQkFDWDtnQkFFQSxNQUFNVSxVQUFVLE1BQU1wQix3REFBYyxDQUFDUyxZQUFZSSxRQUFRLEVBQUVJLEtBQUtKLFFBQVE7Z0JBRXhFLElBQUksQ0FBQ08sU0FBUztvQkFDVkwsUUFBUUMsS0FBSyxDQUFDLDhCQUE4QlAsWUFBWUMsS0FBSztvQkFDN0QsT0FBTztnQkFDWDtnQkFFQUssUUFBUU8sR0FBRyxDQUFDLHlCQUF5QkwsS0FBS1AsS0FBSztnQkFFL0MsT0FBTztvQkFDSGEsSUFBSU4sS0FBS00sRUFBRTtvQkFDWGYsTUFBTVMsS0FBS1QsSUFBSSxJQUFJUyxLQUFLTyxRQUFRO29CQUNoQ2QsT0FBT08sS0FBS1AsS0FBSztvQkFDakJlLE9BQU9SLEtBQUtRLEtBQUs7b0JBQ2pCRCxVQUFVUCxLQUFLTyxRQUFRO29CQUN2QkUsZUFBZVQsS0FBS1MsYUFBYTtnQkFDckM7WUFDSjtRQUNKO0tBQ0g7SUFDREMsV0FBVztRQUNQLE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFWixJQUFJLEVBQUVhLE9BQU8sRUFBRTNCLE9BQU8sRUFBRTtZQUN2QyxJQUFJYyxNQUFNO2dCQUNOLE1BQU1jLElBQUlkO2dCQUNWWSxNQUFNTixFQUFFLEdBQUdRLEVBQUVSLEVBQUU7Z0JBQ2ZNLE1BQU1MLFFBQVEsR0FBR08sRUFBRVAsUUFBUTtnQkFDM0JLLE1BQU1ILGFBQWEsR0FBR0ssRUFBRUwsYUFBYTtZQUN6QztZQUVBLG1EQUFtRDtZQUNuRCxJQUFJSSxZQUFZLFlBQVkzQixTQUFTdUIsa0JBQWtCTSxXQUFXO2dCQUM5REgsTUFBTUgsYUFBYSxHQUFHdkIsUUFBUXVCLGFBQWE7WUFDL0M7WUFFQSxPQUFPRztRQUNYO1FBQ0EsTUFBTTFCLFNBQVEsRUFBRUEsT0FBTyxFQUFFMEIsS0FBSyxFQUFFO1lBQzVCLElBQUlBLFNBQVMxQixRQUFRYyxJQUFJLEVBQUU7Z0JBQ3RCZCxRQUFRYyxJQUFJLENBQVNNLEVBQUUsR0FBR00sTUFBTU4sRUFBRTtnQkFDbENwQixRQUFRYyxJQUFJLENBQVNPLFFBQVEsR0FBR0ssTUFBTUwsUUFBUTtnQkFDOUNyQixRQUFRYyxJQUFJLENBQVNTLGFBQWEsR0FBR0csTUFBTUgsYUFBYTtZQUM3RDtZQUNBLE9BQU92QjtRQUNYO0lBQ0o7QUFDSixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcG9rZW5leHVzLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSBcIkBuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgICBzZXNzaW9uOiB7XHJcbiAgICAgICAgc3RyYXRlZ3k6IFwiand0XCIsXHJcbiAgICB9LFxyXG4gICAgcGFnZXM6IHtcclxuICAgICAgICBzaWduSW46IFwiL2xvZ2luXCIsXHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcclxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGNyZWRlbnRpYWxzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgICAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIG5vdCBmb3VuZDpcIiwgY3JlZGVudGlhbHMuZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIGhhcyBubyBwYXNzd29yZCBzZXQgKGxpa2VseSBPQXV0aCB1c2VyKTpcIiwgY3JlZGVudGlhbHMuZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgcGFzc3dvcmQgZm9yIHVzZXI6XCIsIGNyZWRlbnRpYWxzLmVtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIHN1Y2Nlc3NmdWwgZm9yOlwiLCB1c2VyLmVtYWlsKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSB8fCB1c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiB1c2VyLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxldEJhbGFuY2U6IHVzZXIud2FsbGV0QmFsYW5jZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIsIHRyaWdnZXIsIHNlc3Npb24gfSkge1xyXG4gICAgICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdSA9IHVzZXIgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uaWQgPSB1LmlkO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4udXNlcm5hbWUgPSB1LnVzZXJuYW1lO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4ud2FsbGV0QmFsYW5jZSA9IHUud2FsbGV0QmFsYW5jZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWxsb3cgdXBkYXRpbmcgdGhlIHNlc3Npb24gKGUuZy4gYWZ0ZXIgcHVyY2hhc2UpXHJcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyID09PSBcInVwZGF0ZVwiICYmIHNlc3Npb24/LndhbGxldEJhbGFuY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4ud2FsbGV0QmFsYW5jZSA9IHNlc3Npb24ud2FsbGV0QmFsYW5jZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgICAgICAgaWYgKHRva2VuICYmIHNlc3Npb24udXNlcikge1xyXG4gICAgICAgICAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4uaWQ7XHJcbiAgICAgICAgICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkudXNlcm5hbWUgPSB0b2tlbi51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS53YWxsZXRCYWxhbmNlID0gdG9rZW4ud2FsbGV0QmFsYW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwiYmNyeXB0IiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzVmFsaWQiLCJjb21wYXJlIiwibG9nIiwiaWQiLCJ1c2VybmFtZSIsImltYWdlIiwid2FsbGV0QmFsYW5jZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwidHJpZ2dlciIsInUiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bva2VuZXh1cy8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XHJcbiAgICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KClcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauctions%2Fbid%2Froute&page=%2Fapi%2Fauctions%2Fbid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauctions%2Fbid%2Froute.ts&appDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CACER%5CTCG%20Pok%C3%A9mon&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();