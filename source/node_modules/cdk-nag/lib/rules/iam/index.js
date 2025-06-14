"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAMUserNoPolicies = exports.IAMUserGroupMembership = exports.IAMPolicyNoStatementsWithFullAccess = exports.IAMPolicyNoStatementsWithAdminAccess = exports.IAMNoWildcardPermissions = exports.IAMNoManagedPolicies = exports.IAMNoInlinePolicy = exports.IAMGroupHasUsers = void 0;
/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
var IAMGroupHasUsers_1 = require("./IAMGroupHasUsers");
Object.defineProperty(exports, "IAMGroupHasUsers", { enumerable: true, get: function () { return IAMGroupHasUsers_1.default; } });
var IAMNoInlinePolicy_1 = require("./IAMNoInlinePolicy");
Object.defineProperty(exports, "IAMNoInlinePolicy", { enumerable: true, get: function () { return IAMNoInlinePolicy_1.default; } });
var IAMNoManagedPolicies_1 = require("./IAMNoManagedPolicies");
Object.defineProperty(exports, "IAMNoManagedPolicies", { enumerable: true, get: function () { return IAMNoManagedPolicies_1.default; } });
var IAMNoWildcardPermissions_1 = require("./IAMNoWildcardPermissions");
Object.defineProperty(exports, "IAMNoWildcardPermissions", { enumerable: true, get: function () { return IAMNoWildcardPermissions_1.default; } });
var IAMPolicyNoStatementsWithAdminAccess_1 = require("./IAMPolicyNoStatementsWithAdminAccess");
Object.defineProperty(exports, "IAMPolicyNoStatementsWithAdminAccess", { enumerable: true, get: function () { return IAMPolicyNoStatementsWithAdminAccess_1.default; } });
var IAMPolicyNoStatementsWithFullAccess_1 = require("./IAMPolicyNoStatementsWithFullAccess");
Object.defineProperty(exports, "IAMPolicyNoStatementsWithFullAccess", { enumerable: true, get: function () { return IAMPolicyNoStatementsWithFullAccess_1.default; } });
var IAMUserGroupMembership_1 = require("./IAMUserGroupMembership");
Object.defineProperty(exports, "IAMUserGroupMembership", { enumerable: true, get: function () { return IAMUserGroupMembership_1.default; } });
var IAMUserNoPolicies_1 = require("./IAMUserNoPolicies");
Object.defineProperty(exports, "IAMUserNoPolicies", { enumerable: true, get: function () { return IAMUserNoPolicies_1.default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcnVsZXMvaWFtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7RUFHRTtBQUNGLHVEQUFpRTtBQUF4RCxvSEFBQSxPQUFPLE9BQW9CO0FBQ3BDLHlEQUFtRTtBQUExRCxzSEFBQSxPQUFPLE9BQXFCO0FBQ3JDLCtEQUF5RTtBQUFoRSw0SEFBQSxPQUFPLE9BQXdCO0FBQ3hDLHVFQUFpRjtBQUF4RSxvSUFBQSxPQUFPLE9BQTRCO0FBQzVDLCtGQUF5RztBQUFoRyw0SkFBQSxPQUFPLE9BQXdDO0FBQ3hELDZGQUF1RztBQUE5RiwwSkFBQSxPQUFPLE9BQXVDO0FBQ3ZELG1FQUE2RTtBQUFwRSxnSUFBQSxPQUFPLE9BQTBCO0FBQzFDLHlEQUFtRTtBQUExRCxzSEFBQSxPQUFPLE9BQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiovXG5leHBvcnQgeyBkZWZhdWx0IGFzIElBTUdyb3VwSGFzVXNlcnMgfSBmcm9tICcuL0lBTUdyb3VwSGFzVXNlcnMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJQU1Ob0lubGluZVBvbGljeSB9IGZyb20gJy4vSUFNTm9JbmxpbmVQb2xpY3knO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJQU1Ob01hbmFnZWRQb2xpY2llcyB9IGZyb20gJy4vSUFNTm9NYW5hZ2VkUG9saWNpZXMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJQU1Ob1dpbGRjYXJkUGVybWlzc2lvbnMgfSBmcm9tICcuL0lBTU5vV2lsZGNhcmRQZXJtaXNzaW9ucyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIElBTVBvbGljeU5vU3RhdGVtZW50c1dpdGhBZG1pbkFjY2VzcyB9IGZyb20gJy4vSUFNUG9saWN5Tm9TdGF0ZW1lbnRzV2l0aEFkbWluQWNjZXNzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSUFNUG9saWN5Tm9TdGF0ZW1lbnRzV2l0aEZ1bGxBY2Nlc3MgfSBmcm9tICcuL0lBTVBvbGljeU5vU3RhdGVtZW50c1dpdGhGdWxsQWNjZXNzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSUFNVXNlckdyb3VwTWVtYmVyc2hpcCB9IGZyb20gJy4vSUFNVXNlckdyb3VwTWVtYmVyc2hpcCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIElBTVVzZXJOb1BvbGljaWVzIH0gZnJvbSAnLi9JQU1Vc2VyTm9Qb2xpY2llcyc7XG4iXX0=