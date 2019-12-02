/**
 * @fileoverview safe to get value
 * @author liujialong@dxy.cn
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


const checkPreIsUnSafeValue = (node, sourCode) => {
  return node.object.name != 'this' && node.object.type != 'ThisExpression'
}
module.exports = {
  meta: {
    docs: {
      description: "safe to get value",
      category: "warn",
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
    messages: {
      needSafeValue: "are you sure safe value ? if sure please ignore"
    },
  },

  create: function (context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    const sourCode = context.getSourceCode();
    return {

      // 变量赋值
      "AssignmentExpression > MemberExpression" : (node) => {
        const ancestor = node.parent;
        if (ancestor.right == node && checkPreIsUnSafeValue(node, sourCode)) {
          context.report({
            node,
            messageId: 'needSafeValue',
          });
        }
      },

      // 变量初始化
      "VariableDeclarator > MemberExpression" : (node) => {
        const ancestor = node.parent;
        if (ancestor.right == node && checkPreIsUnSafeValue(node, sourCode)) {
          context.report({
            node,
            messageId: 'needSafeValue',
          });
        }
      },

      // 对象属性赋值
      "Property > MemberExpression": (node) => {
        const ancestor = node.parent;
        if (ancestor.value == node && checkPreIsUnSafeValue(node, sourCode)) {
          context.report({
            node,
            messageId: 'needSafeValue',
          });
        }
      },

      // 对象属性表达式
      "Property > UnaryExpression > MemberExpression": (node) => {
        const ancestor = node.parent;
        if (ancestor.argument == node && checkPreIsUnSafeValue(node, sourCode)) {
          context.report({
            node,
            messageId: 'needSafeValue',
          });
        }
      },

      "LogicalExpression > MemberExpression": (node) => {
        const ancestor = node.parent;
        if (ancestor.left == node && node.object.type != 'CallExpression') {
          context.report({
            node,
            messageId: 'needSafeValue',
          });
        }
      }

      // "MemberExpression": (node) => {
      //   const ancestor = node.parent;
      //   if (!ancestor || node.object.type != 'Identifier' || node.object.name == 'this') {
      //     return;
      //   }
      //   if (ancestor && (ancestor.right == node || ancestor.init == node || ancestor.value == node || ancestor.argument == node)) {
      //     // 变量初始化
      //     if (ancestor.type == 'VariableDeclarator') {
      //       if ((node.object.type == 'Identifier' || node.object.type == 'MemberExpression') && ancestor.right == node) {
      //         context.report({
      //           node,
      //           messageId: 'needSafeValue',
      //         });
      //       }
      //     }
      //     // 变量重新重新赋值
      //     if (ancestor.type == 'AssignmentExpression') {
      //       if ((node.object.type == 'Identifier' || node.object.type == 'MemberExpression') && ancestor.right == node) {
      //         context.report({
      //           node,
      //           messageId: 'needSafeValue',
      //         });
      //       }
      //     }
      //     // 逻辑计算 这个有点复杂。。。
      //     if (ancestor.type == 'UnaryExpression') {

      //     }
      //     // 对象属性直接赋值
      //     if (ancestor.type == 'Property') {
      //       const preAnces = ancestor.parent;
      //       if (preAnces.type == 'ObjectExpression') {
      //         context.report({
      //           node,
      //           messageId: 'needSafeValue',
      //         });
      //       }
      //     }
      //   }
      // },
    };
  }
};
