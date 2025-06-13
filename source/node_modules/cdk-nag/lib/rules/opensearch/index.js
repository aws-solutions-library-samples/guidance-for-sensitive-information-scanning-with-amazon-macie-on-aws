"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSearchZoneAwareness = exports.OpenSearchSlowLogsToCloudWatch = exports.OpenSearchNoUnsignedOrAnonymousAccess = exports.OpenSearchNodeToNodeEncryption = exports.OpenSearchInVPCOnly = exports.OpenSearchErrorLogsToCloudWatch = exports.OpenSearchEncryptedAtRest = exports.OpenSearchDedicatedMasterNode = exports.OpenSearchAllowlistedIPs = void 0;
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
var OpenSearchAllowlistedIPs_1 = require("./OpenSearchAllowlistedIPs");
Object.defineProperty(exports, "OpenSearchAllowlistedIPs", { enumerable: true, get: function () { return OpenSearchAllowlistedIPs_1.default; } });
var OpenSearchDedicatedMasterNode_1 = require("./OpenSearchDedicatedMasterNode");
Object.defineProperty(exports, "OpenSearchDedicatedMasterNode", { enumerable: true, get: function () { return OpenSearchDedicatedMasterNode_1.default; } });
var OpenSearchEncryptedAtRest_1 = require("./OpenSearchEncryptedAtRest");
Object.defineProperty(exports, "OpenSearchEncryptedAtRest", { enumerable: true, get: function () { return OpenSearchEncryptedAtRest_1.default; } });
var OpenSearchErrorLogsToCloudWatch_1 = require("./OpenSearchErrorLogsToCloudWatch");
Object.defineProperty(exports, "OpenSearchErrorLogsToCloudWatch", { enumerable: true, get: function () { return OpenSearchErrorLogsToCloudWatch_1.default; } });
var OpenSearchInVPCOnly_1 = require("./OpenSearchInVPCOnly");
Object.defineProperty(exports, "OpenSearchInVPCOnly", { enumerable: true, get: function () { return OpenSearchInVPCOnly_1.default; } });
var OpenSearchNodeToNodeEncryption_1 = require("./OpenSearchNodeToNodeEncryption");
Object.defineProperty(exports, "OpenSearchNodeToNodeEncryption", { enumerable: true, get: function () { return OpenSearchNodeToNodeEncryption_1.default; } });
var OpenSearchNoUnsignedOrAnonymousAccess_1 = require("./OpenSearchNoUnsignedOrAnonymousAccess");
Object.defineProperty(exports, "OpenSearchNoUnsignedOrAnonymousAccess", { enumerable: true, get: function () { return OpenSearchNoUnsignedOrAnonymousAccess_1.default; } });
var OpenSearchSlowLogsToCloudWatch_1 = require("./OpenSearchSlowLogsToCloudWatch");
Object.defineProperty(exports, "OpenSearchSlowLogsToCloudWatch", { enumerable: true, get: function () { return OpenSearchSlowLogsToCloudWatch_1.default; } });
var OpenSearchZoneAwareness_1 = require("./OpenSearchZoneAwareness");
Object.defineProperty(exports, "OpenSearchZoneAwareness", { enumerable: true, get: function () { return OpenSearchZoneAwareness_1.default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvb3BlbnNlYXJjaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7O0VBR0U7QUFDRix1RUFBaUY7QUFBeEUsb0lBQUEsT0FBTyxPQUE0QjtBQUM1QyxpRkFBMkY7QUFBbEYsOElBQUEsT0FBTyxPQUFpQztBQUNqRCx5RUFBbUY7QUFBMUUsc0lBQUEsT0FBTyxPQUE2QjtBQUM3QyxxRkFBK0Y7QUFBdEYsa0pBQUEsT0FBTyxPQUFtQztBQUNuRCw2REFBdUU7QUFBOUQsMEhBQUEsT0FBTyxPQUF1QjtBQUN2QyxtRkFBNkY7QUFBcEYsZ0pBQUEsT0FBTyxPQUFrQztBQUNsRCxpR0FBMkc7QUFBbEcsOEpBQUEsT0FBTyxPQUF5QztBQUN6RCxtRkFBNkY7QUFBcEYsZ0pBQUEsT0FBTyxPQUFrQztBQUNsRCxxRUFBK0U7QUFBdEUsa0lBQUEsT0FBTyxPQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4qL1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPcGVuU2VhcmNoQWxsb3dsaXN0ZWRJUHMgfSBmcm9tICcuL09wZW5TZWFyY2hBbGxvd2xpc3RlZElQcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5TZWFyY2hEZWRpY2F0ZWRNYXN0ZXJOb2RlIH0gZnJvbSAnLi9PcGVuU2VhcmNoRGVkaWNhdGVkTWFzdGVyTm9kZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5TZWFyY2hFbmNyeXB0ZWRBdFJlc3QgfSBmcm9tICcuL09wZW5TZWFyY2hFbmNyeXB0ZWRBdFJlc3QnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPcGVuU2VhcmNoRXJyb3JMb2dzVG9DbG91ZFdhdGNoIH0gZnJvbSAnLi9PcGVuU2VhcmNoRXJyb3JMb2dzVG9DbG91ZFdhdGNoJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3BlblNlYXJjaEluVlBDT25seSB9IGZyb20gJy4vT3BlblNlYXJjaEluVlBDT25seSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5TZWFyY2hOb2RlVG9Ob2RlRW5jcnlwdGlvbiB9IGZyb20gJy4vT3BlblNlYXJjaE5vZGVUb05vZGVFbmNyeXB0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3BlblNlYXJjaE5vVW5zaWduZWRPckFub255bW91c0FjY2VzcyB9IGZyb20gJy4vT3BlblNlYXJjaE5vVW5zaWduZWRPckFub255bW91c0FjY2Vzcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9wZW5TZWFyY2hTbG93TG9nc1RvQ2xvdWRXYXRjaCB9IGZyb20gJy4vT3BlblNlYXJjaFNsb3dMb2dzVG9DbG91ZFdhdGNoJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgT3BlblNlYXJjaFpvbmVBd2FyZW5lc3MgfSBmcm9tICcuL09wZW5TZWFyY2hab25lQXdhcmVuZXNzJztcbiJdfQ==