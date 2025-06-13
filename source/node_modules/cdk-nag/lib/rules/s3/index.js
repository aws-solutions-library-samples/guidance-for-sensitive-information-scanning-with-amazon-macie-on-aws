"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3WebBucketOAIAccess = exports.S3DefaultEncryptionKMS = exports.S3BucketVersioningEnabled = exports.S3BucketSSLRequestsOnly = exports.S3BucketReplicationEnabled = exports.S3BucketPublicWriteProhibited = exports.S3BucketPublicReadProhibited = exports.S3BucketLoggingEnabled = exports.S3BucketLevelPublicAccessProhibited = exports.S3BucketDefaultLockEnabled = void 0;
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
var S3BucketDefaultLockEnabled_1 = require("./S3BucketDefaultLockEnabled");
Object.defineProperty(exports, "S3BucketDefaultLockEnabled", { enumerable: true, get: function () { return S3BucketDefaultLockEnabled_1.default; } });
var S3BucketLevelPublicAccessProhibited_1 = require("./S3BucketLevelPublicAccessProhibited");
Object.defineProperty(exports, "S3BucketLevelPublicAccessProhibited", { enumerable: true, get: function () { return S3BucketLevelPublicAccessProhibited_1.default; } });
var S3BucketLoggingEnabled_1 = require("./S3BucketLoggingEnabled");
Object.defineProperty(exports, "S3BucketLoggingEnabled", { enumerable: true, get: function () { return S3BucketLoggingEnabled_1.default; } });
var S3BucketPublicReadProhibited_1 = require("./S3BucketPublicReadProhibited");
Object.defineProperty(exports, "S3BucketPublicReadProhibited", { enumerable: true, get: function () { return S3BucketPublicReadProhibited_1.default; } });
var S3BucketPublicWriteProhibited_1 = require("./S3BucketPublicWriteProhibited");
Object.defineProperty(exports, "S3BucketPublicWriteProhibited", { enumerable: true, get: function () { return S3BucketPublicWriteProhibited_1.default; } });
var S3BucketReplicationEnabled_1 = require("./S3BucketReplicationEnabled");
Object.defineProperty(exports, "S3BucketReplicationEnabled", { enumerable: true, get: function () { return S3BucketReplicationEnabled_1.default; } });
var S3BucketSSLRequestsOnly_1 = require("./S3BucketSSLRequestsOnly");
Object.defineProperty(exports, "S3BucketSSLRequestsOnly", { enumerable: true, get: function () { return S3BucketSSLRequestsOnly_1.default; } });
var S3BucketVersioningEnabled_1 = require("./S3BucketVersioningEnabled");
Object.defineProperty(exports, "S3BucketVersioningEnabled", { enumerable: true, get: function () { return S3BucketVersioningEnabled_1.default; } });
var S3DefaultEncryptionKMS_1 = require("./S3DefaultEncryptionKMS");
Object.defineProperty(exports, "S3DefaultEncryptionKMS", { enumerable: true, get: function () { return S3DefaultEncryptionKMS_1.default; } });
var S3WebBucketOAIAccess_1 = require("./S3WebBucketOAIAccess");
Object.defineProperty(exports, "S3WebBucketOAIAccess", { enumerable: true, get: function () { return S3WebBucketOAIAccess_1.default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvczMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7OztFQUdFO0FBQ0YsMkVBQXFGO0FBQTVFLHdJQUFBLE9BQU8sT0FBOEI7QUFDOUMsNkZBQXVHO0FBQTlGLDBKQUFBLE9BQU8sT0FBdUM7QUFDdkQsbUVBQTZFO0FBQXBFLGdJQUFBLE9BQU8sT0FBMEI7QUFDMUMsK0VBQXlGO0FBQWhGLDRJQUFBLE9BQU8sT0FBZ0M7QUFDaEQsaUZBQTJGO0FBQWxGLDhJQUFBLE9BQU8sT0FBaUM7QUFDakQsMkVBQXFGO0FBQTVFLHdJQUFBLE9BQU8sT0FBOEI7QUFDOUMscUVBQStFO0FBQXRFLGtJQUFBLE9BQU8sT0FBMkI7QUFDM0MseUVBQW1GO0FBQTFFLHNJQUFBLE9BQU8sT0FBNkI7QUFDN0MsbUVBQTZFO0FBQXBFLGdJQUFBLE9BQU8sT0FBMEI7QUFDMUMsK0RBQXlFO0FBQWhFLDRIQUFBLE9BQU8sT0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cbmV4cG9ydCB7IGRlZmF1bHQgYXMgUzNCdWNrZXREZWZhdWx0TG9ja0VuYWJsZWQgfSBmcm9tICcuL1MzQnVja2V0RGVmYXVsdExvY2tFbmFibGVkJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUzNCdWNrZXRMZXZlbFB1YmxpY0FjY2Vzc1Byb2hpYml0ZWQgfSBmcm9tICcuL1MzQnVja2V0TGV2ZWxQdWJsaWNBY2Nlc3NQcm9oaWJpdGVkJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUzNCdWNrZXRMb2dnaW5nRW5hYmxlZCB9IGZyb20gJy4vUzNCdWNrZXRMb2dnaW5nRW5hYmxlZCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFMzQnVja2V0UHVibGljUmVhZFByb2hpYml0ZWQgfSBmcm9tICcuL1MzQnVja2V0UHVibGljUmVhZFByb2hpYml0ZWQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTM0J1Y2tldFB1YmxpY1dyaXRlUHJvaGliaXRlZCB9IGZyb20gJy4vUzNCdWNrZXRQdWJsaWNXcml0ZVByb2hpYml0ZWQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTM0J1Y2tldFJlcGxpY2F0aW9uRW5hYmxlZCB9IGZyb20gJy4vUzNCdWNrZXRSZXBsaWNhdGlvbkVuYWJsZWQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTM0J1Y2tldFNTTFJlcXVlc3RzT25seSB9IGZyb20gJy4vUzNCdWNrZXRTU0xSZXF1ZXN0c09ubHknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTM0J1Y2tldFZlcnNpb25pbmdFbmFibGVkIH0gZnJvbSAnLi9TM0J1Y2tldFZlcnNpb25pbmdFbmFibGVkJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUzNEZWZhdWx0RW5jcnlwdGlvbktNUyB9IGZyb20gJy4vUzNEZWZhdWx0RW5jcnlwdGlvbktNUyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFMzV2ViQnVja2V0T0FJQWNjZXNzIH0gZnJvbSAnLi9TM1dlYkJ1Y2tldE9BSUFjY2Vzcyc7XG4iXX0=