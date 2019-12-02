/**
 * @fileoverview safe to get value
 * @author liujialong@dxy.cn
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/safe-value"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    parserOptions: { 
        ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        }
    },
    "env":{ "es6": true }
});
ruleTester.run("safe-value", rule, {

    valid: [
        'e = a && a.somekey;',
        "const a = a && a.somekey",
        "var a = {a: b && b.somekey}",
        "var a = {a: \"demo\"}",
        "const a = {...b, a: \"demo\"}",
        "const a = {...b, a: demo}",
        "const a = demo",
        "this.a = b",
        "this.activities = newActivities",
        "runInAction(() => {this.activities = newActivities});",
        "getShoppingCartCommodity().then((res) => {const {valid} = res;this.validShoppings = valid;this.loaded = true;})",
        "getShoppingCartCommodity().then((res) => {const {valid} = res;this.validShoppings = valid && valid.someky;this.loaded = true;})",
        "commodityPlaceTheOrder({commodityId: this.id,})",
        `commodityPlaceTheOrder({
            commodityId: this.id,
            skuId: skuBaseObj && skuBaseObj[currentSelect.slice().join(',')].id,
            quantity,
          }).then(() => {
            wx.navigateTo({
              url: '/pages/mall/order/submit/index',
            });
            this.toggleSkuPannel();
          }, () => {
            wx.showToast({
              title: '提交订单失败',
              icon: 'none',
            });
          }).finally(() => {
            this._pageLock = false;
          });`,
          `const param = skuId ? {
            commodityId: this.id,
            type: 12,
            skuId,
          } : {
            commodityId: this.id,
            type: 12,
          };`,
          "const a = this.data.id",
    ],

    invalid: [
        {
            code: "b = demo.somekey;",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
        {
            code: "var b = {a: demo.somekey};",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
        {
            code: "const a = {a: b.f.d}",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
        {
            code: "const a = {selected: !item.selected}",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
        {
            code: "getShoppingCartCommodity().then((res) => {const {valid} = res;this.validShoppings = valid.someky;this.loaded = true;})",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
        {
            code: "let a = a.key && a.key.secondKey",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
        {
            code: "function aa() {return this.crossBorderListShoppings.length && this.crossBorderListShoppings.every(e => e.selected)}",
            errors: [
                {
                    messageId: 'needSafeValue',
                },
            ],
        },
    ]
});
