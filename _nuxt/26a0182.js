(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{263:function(e,t,n){var content=n(267);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(107).default)("6c857747",content,!0,{sourceMap:!1})},265:function(e,t,n){"use strict";n.r(t);n(191);var l={name:"Range",props:{labelLeft:{type:String,default:""},labelRight:{type:String,default:""},rangeValue:{type:Number,default:null}},data:function(){return{rangeMin:1,rangeMax:10,rangeStep:1}},computed:{rangeValueCSS:function(){return{"--range-value":"calc("+10.1*this.rangeValue+"% + "+"-2rem)"}},left:function(){return""!==this.labelLeft?this.labelLeft:"de"===this.language?"Gar Nicht":"Not at all"},right:function(){return""!==this.labelRight?this.labelRight:"de"===this.language?"Sehr":"Very much"}}},r=(n(266),n(43)),component=Object(r.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-grow justify-center items-start"},[t("div",{staticClass:"w-24 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap text-right"},[e._v("\n    "+e._s(e.left)+"\n  ")]),e._v(" "),t("div",{staticClass:"mx-2 w-full relative"},[null!==e.rangeValue?t("div",{staticClass:"absolute text-sm text-gray-700 w-8 rounded-full text-center select-none",staticStyle:{left:"var(--range-value)",bottom:"2.1rem"},style:e.rangeValueCSS},[e._v("\n      "+e._s(e.rangeValue)+"\n    ")]):e._e(),e._v(" "),t("input",{staticClass:"w-full",class:null!==e.rangeValue?"range-visible":"range-invisible",attrs:{type:"range",min:e.rangeMin,max:e.rangeMax,step:e.rangeStep},domProps:{value:e.rangeValue},on:{input:function(t){e.$emit("update:rangeValue",parseFloat(t.target.value))}}})]),e._v(" "),t("div",{staticClass:"w-24 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap"},[e._v("\n    "+e._s(e.right)+"\n  ")])])}),[],!1,null,"23b5fba8",null);t.default=component.exports},266:function(e,t,n){"use strict";n(263)},267:function(e,t,n){var l=n(106)((function(i){return i[1]}));l.push([e.i,".range-visible[data-v-23b5fba8]::-moz-range-thumb{visibility:visible}.range-visible[data-v-23b5fba8]::-webkit-slider-thumb{visibility:visible}.range-visible[data-v-23b5fba8]::-ms-thumb{visibility:visible}.range-invisible[data-v-23b5fba8]::-moz-range-thumb{visibility:hidden}.range-invisible[data-v-23b5fba8]::-webkit-slider-thumb{visibility:hidden}.range-invisible[data-v-23b5fba8]::-ms-thumb{visibility:hidden}",""]),l.locals={},e.exports=l}}]);