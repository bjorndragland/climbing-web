(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{245:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),o=h(n),l=a(54),i=a(124),s=h(a(86)),u=h(a(430)),d=h(a(429)),c=h(a(428)),f=h(a(85)),p=h(a(88));function h(e){return e&&e.__esModule?e:{default:e}}a(87);var m=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"componentDidMount",value:function(){var e=this;s.default.get(f.default.getUrl("frontpage?regionId="+f.default.getRegion())).withCredentials().end(function(t,a){e.setState({error:t||null,data:t?null:a.body})}),document.title=f.default.getTitle()}},{key:"render",value:function(){if(!this.state)return o.default.createElement("center",null,o.default.createElement(p.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return o.default.createElement("span",null,o.default.createElement("h3",null,this.state.error.status),this.state.error.toString());var e=this.state.data.fas.map(function(e,t){return o.default.createElement("p",{key:t},o.default.createElement(l.Link,{to:"/problem/"+e.idProblem},e.problem)," ",e.grade,o.default.createElement("br",null),o.default.createElement("small",{style:{color:"#777"}},o.default.createElement(l.Link,{to:"/area/"+e.idArea,style:{color:"#777"}},e.area)," / ",o.default.createElement(l.Link,{to:"/sector/"+e.idSector,style:{color:"#777"}},e.sector)," ",e.date))}),t=this.state.data.ascents.map(function(e,t){return o.default.createElement("p",{key:t},o.default.createElement(l.Link,{to:"/problem/"+e.idProblem},e.problem)," ",e.grade,o.default.createElement("br",null),o.default.createElement("small",{style:{color:"#777"}},o.default.createElement(l.Link,{to:"/user/"+e.idUser,style:{color:"#777"}},e.user)," ",e.date))}),a=this.state.data.medias.map(function(e,t){var a="image"===e.type?o.default.createElement(p.default,{icon:"camera"}):o.default.createElement(p.default,{icon:"video"});return o.default.createElement("p",{key:t},o.default.createElement(l.Link,{to:"/problem/"+e.idProblem},e.problem)," ",o.default.createElement("small",null,e.grade)," ",a)}),r=this.state.data.comments.map(function(e,t){return o.default.createElement("p",{key:t},o.default.createElement("small",null,e.date)," ",o.default.createElement(l.Link,{to:"/problem/"+e.idProblem},e.problem))});return o.default.createElement(i.Grid,null,o.default.createElement(i.Row,null,o.default.createElement(i.Well,{style:{textAlign:"center"}},"Total: ",this.state.data.numProblems," (",this.state.data.numProblemsWithCoordinates," with coordinates",this.state.data.numProblemsWithTopo>0?", "+this.state.data.numProblemsWithTopo+" on topo":"",") | Public ascents: ",this.state.data.numTicks," | Images: ",this.state.data.numImages," | Ascents on video: ",this.state.data.numMovies)),o.default.createElement(i.Row,null,o.default.createElement(i.Col,{xs:8,md:9,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(d.default,{data:this.state.data.randomMedia})),o.default.createElement(i.Col,{xs:4,md:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(c.default,null))),o.default.createElement(i.Row,null,o.default.createElement(i.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(u.default,{title:"Newest",data:e})),o.default.createElement(i.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(u.default,{title:"Latest ascents",data:t})),o.default.createElement(i.Clearfix,{visibleXsBlock:!0}),o.default.createElement(i.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(u.default,{title:"Newest media",data:a})),o.default.createElement(i.Col,{xs:6,lg:3,style:{paddingLeft:"3px",paddingRight:"3px"}},o.default.createElement(u.default,{title:"Latest comments",data:r}))))}}]),t}();t.default=m},254:function(e,t,a){"use strict";a.r(t);var r=a(94);a.d(t,"MemoryRouter",function(){return r.a});var n=a(93);a.d(t,"Prompt",function(){return n.a});var o=a(89);a.d(t,"Redirect",function(){return o.a});var l=a(46);a.d(t,"Route",function(){return l.a});var i=a(31);a.d(t,"Router",function(){return i.a});var s=a(92);a.d(t,"StaticRouter",function(){return s.a});var u=a(91);a.d(t,"Switch",function(){return u.a});var d=a(30);a.d(t,"matchPath",function(){return d.a});var c=a(90);a.d(t,"withRouter",function(){return c.a})},265:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),o=b(n),l=b(a(296)),i=a(124),s=b(a(295)),u=b(a(125)),d=b(a(86)),c=a(274),f=a(54),p=b(a(85)),h=a(254),m=b(a(294)),g=b(a(88));function b(e){return e&&e.__esModule?e:{default:e}}a(87);var y=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={mediaIndex:0,hoverTrash:!1,hoverEdit:!1,showFullscreenButton:!0,showGalleryFullscreenButton:!0,showPlayButton:!0,showGalleryPlayButton:!1,showVideo:{},isFullscreen:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"componentWillReceiveProps",value:function(e){this.state={mediaIndex:0,hoverTrash:!1,hoverEdit:!1,showFullscreenButton:!0,showGalleryFullscreenButton:!0,showPlayButton:!0,showGalleryPlayButton:!1,showVideo:{},isFullscreen:!1},this.imageGallery&&this.imageGallery.slideToIndex(0)}},{key:"toggleHoverTrash",value:function(){this.setState({hoverTrash:!this.state.hoverTrash})}},{key:"toggleHoverEdit",value:function(){this.setState({hoverEdit:!this.state.hoverEdit})}},{key:"onDeleteImage",value:function(e){var t=this;if(confirm("Are you sure you want to delete this image?")){var a=this.props.media[this.state.mediaIndex].id;d.default.delete(p.default.getUrl("media?id="+a)).withCredentials().end(function(e,r){if(e)alert(e.toString());else{if(t.props.media.length>1&&t.state.mediaIndex>=t.props.media.length-1){var n=t.state.mediaIndex-1;t.setState({mediaIndex:n}),t.imageGallery.slideToIndex(n)}t.props.removeMedia(a)}})}}},{key:"onSlide",value:function(e){this.resetVideo(),this.setState({mediaIndex:e})}},{key:"onScreenChange",value:function(e){this.setState({isFullscreen:e})}},{key:"resetVideo",value:function(){this.setState({showVideo:{}}),this.state.showPlayButton&&this.setState({showGalleryPlayButton:!0}),this.state.showFullscreenButton&&this.setState({showGalleryFullscreenButton:!0})}},{key:"toggleShowVideo",value:function(e){this.state.showVideo[e]=!Boolean(this.state.showVideo[e]),this.setState({showVideo:this.state.showVideo}),this.state.showVideo[e]&&(this.state.showPlayButton&&this.setState({showGalleryPlayButton:!1}),this.state.showFullscreenButton&&this.setState({showGalleryFullscreenButton:!1}))}},{key:"renderVideo",value:function(e){var t=this;return o.default.createElement("div",{className:"image-gallery-image"},this.state.showVideo[e.embedUrl]?o.default.createElement("span",null,o.default.createElement("a",{className:"gallery-close-video",onClick:this.toggleShowVideo.bind(this,e.embedUrl)}),o.default.createElement(s.default,{ref:function(e){t.player=e},className:"react-player",width:"100%",height:"100%",url:e.embedUrl,onDuration:function(e){return t.setState({duration:e})},onStart:function(){return t.player.seekTo(parseFloat(e.seekTo/t.state.duration))},controls:!0,playing:!0})):o.default.createElement("a",{onClick:this.toggleShowVideo.bind(this,e.embedUrl)},o.default.createElement("div",{className:"gallery-play-button"}),o.default.createElement("img",{src:e.original})))}},{key:"pushUrl",value:function(e){this.setState({pushUrl:e})}},{key:"generateShapes",value:function(e,t,a,r){var n=this;return e.map(function(e,l){var i,s=(0,c.parseSVG)(e.path);(0,c.makeAbsolute)(s);for(var u,d=0,f=99999999,p=0,h=s.length;p<h;p++)s[p].y>d&&(i=p,d=s[p].y),s[p].y<f&&(u=p,f=s[p].y);var m=s[i].x,g=s[i].y,b=.012*a;m<b&&(m=b),m>a-b&&(m=a-b),g<b&&(g=b),g>r-b&&(g=r-b);var y=null;return e.hasAnchor&&(y=o.default.createElement("circle",{className:"buldreinfo-svg-ring",cx:s[u].x,cy:s[u].y,r:.006*a})),o.default.createElement("g",{className:"buldreinfo-svg-pointer buldreinfo-svg-hover"+(0===t||e.problemId===t?"":" buldreinfo-svg-opacity"),key:l,onClick:n.pushUrl.bind(n,"/problem/"+e.problemId)},o.default.createElement("path",{d:e.path,className:"buldreinfo-svg-route",strokeWidth:.003*a,strokeDasharray:.006*a}),o.default.createElement("circle",{className:"buldreinfo-svg-ring",cx:m,cy:g,r:b}),o.default.createElement("text",{className:"buldreinfo-svg-routenr",x:m,y:g,fontSize:.02*a,dy:".3em"},e.nr),y)})}},{key:"renderImage",value:function(e){return e.svgs?o.default.createElement("div",{className:"image-gallery-image"},o.default.createElement("canvas",{className:"buldreinfo-svg-canvas-ie-hack",width:e.width,height:e.height}),o.default.createElement("svg",{className:"buldreinfo-svg",viewBox:"0 0 "+e.width+" "+e.height,preserveAspectRatio:"xMidYMid meet"},o.default.createElement("image",{xlinkHref:p.default.getUrl("images?id="+e.id),width:"100%",height:"100%"}),this.generateShapes(e.svgs,e.svgProblemId,e.width,e.height))):o.default.createElement("div",{className:"image-gallery-image"},o.default.createElement("img",{src:p.default.getUrl("images?id="+e.id),className:"buldreinfo-scale-img"}))}},{key:"render",value:function(){var e=this;if((0,m.default)(null,{watchMQ:!0}),this.state&&this.state.pushUrl)return o.default.createElement(h.Redirect,{to:this.state.pushUrl,push:!0});var t=this.props.media.map(function(t,a){return 1==t.idType?{original:p.default.getUrl("images?id="+t.id),thumbnail:p.default.getUrl("images?id="+t.id),originalClass:"featured-slide",thumbnailClass:"featured-thumb",originalAlt:"original-alt",thumbnailAlt:"thumbnail-alt",renderItem:e.renderImage.bind(e,t)}:{original:p.default.getUrl("images?id="+t.id),thumbnail:p.default.getUrl("images?id="+t.id),originalClass:"featured-slide",thumbnailClass:"featured-thumb",originalAlt:"original-alt",thumbnailAlt:"thumbnail-alt",embedUrl:"https://buldreinfo.com/buldreinfo_media/mp4/"+100*Math.floor(t.id/100)+"/"+t.id+".mp4",seekTo:t.t,renderItem:e.renderVideo.bind(e)}}),a="",r=this.props.media[this.state.mediaIndex];return!this.state.isFullscreen&&1==r.idType&&u.default.isAdmin()&&(r.svgProblemId>0?a=o.default.createElement("span",{style:{position:"absolute",zIndex:"4",background:"rgba(0, 0, 0, 0.4)",padding:"8px 20px"}},o.default.createElement(f.Link,{to:"/problem/svg-edit/"+r.svgProblemId+"/"+r.id,onMouseEnter:this.toggleHoverEdit.bind(this),onMouseLeave:this.toggleHoverEdit.bind(this)},o.default.createElement(g.default,{icon:"edit",style:this.state.hoverEdit?{transform:"scale(1.1)",color:"#fff"}:{color:"#fff"}}))):r.svgs||(a=o.default.createElement("span",{style:{position:"absolute",zIndex:"4",background:"rgba(0, 0, 0, 0.4)",padding:"8px 20px"}},o.default.createElement("a",{href:"#",onMouseEnter:this.toggleHoverTrash.bind(this),onMouseLeave:this.toggleHoverTrash.bind(this)},o.default.createElement(g.default,{icon:"trash",style:this.state.hoverTrash?{transform:"scale(1.1)",color:"#fff"}:{color:"#fff"},onClick:this.onDeleteImage.bind(this)}))))),o.default.createElement(i.Well,{className:"app"},a,o.default.createElement(l.default,{ref:function(t){return e.imageGallery=t},items:t,onSlide:this.onSlide.bind(this),onScreenChange:this.onScreenChange.bind(this),showThumbnails:this.props.showThumbnails,showBullets:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton&&this.props.media.length>1,showIndex:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton,showPlayButton:!1,showFullscreenButton:this.state.showFullscreenButton&&this.state.showGalleryFullscreenButton}))}}]),t}();t.default=y},428:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),o=i(n),l=(a(54),i(a(85)));function i(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"render",value:function(){return o.default.createElement("div",null,4!=l.default.getRegion()&&o.default.createElement("a",{href:"https://play.google.com/store/apps/details?id=org.jossi.android.bouldering&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",target:"_blank"},o.default.createElement("img",{style:{maxWidth:"100%"},alt:"Get it on Google Play",src:"https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"})),1==l.default.getRegion()&&o.default.createElement("a",{href:"http://sissportssenter.no/",target:"_blank"},o.default.createElement("img",{style:{marginBottom:"10px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%",backgroundColor:"#00A0E0"},src:"/png/sis-sportssenter.png"})),(1==l.default.getRegion()||4==l.default.getRegion())&&o.default.createElement("a",{href:"http://brv.no/",target:"_blank"},o.default.createElement("img",{style:{marginBottom:"10px",borderTopLeftRadius:"8px",borderTopRightRadius:"8px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingLeft:"10px",paddingRight:"10px",maxWidth:"100%",backgroundColor:"#FFFFFF"},src:"/png/brv.png"})))}}]),t}();t.default=s},429:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=a(1),o=u(n),l=(u(a(265)),a(54)),i=a(124),s=u(a(85));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),r(t,[{key:"render",value:function(){var e=null;return this.props&&this.props.data?(e=this.props.data.inPhoto?o.default.createElement("i",null,"Photographer: ",o.default.createElement(l.Link,{to:"/user/"+this.props.data.idCreator},this.props.data.creator),", in photo: ",this.props.data.inPhoto):o.default.createElement("i",null,"Photographer: ",o.default.createElement(l.Link,{to:"/user/"+this.props.data.idCreator},this.props.data.creator)),o.default.createElement(i.Well,{style:{marginBottom:"15px",textAlign:"center"}},o.default.createElement("h4",null,o.default.createElement(l.Link,{to:"/problem/"+this.props.data.idProblem},this.props.data.problem)," ",this.props.data.grade),o.default.createElement(l.Link,{to:"/problem/"+this.props.data.idProblem},o.default.createElement("img",{style:{maxWidth:"100%"},src:s.default.getUrl("images?id="+this.props.data.idMedia+"&targetHeight=480")})),o.default.createElement("br",null),e)):o.default.createElement(i.Well,{style:{marginBottom:"15px",textAlign:"center"}},"No data")}}]),t}();t.default=d},430:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),o=a(1),l=(r=o)&&r.__esModule?r:{default:r},i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={showAll:!1,btnLabel:"More"},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),n(t,[{key:"handleOnClick",value:function(e){e.preventDefault(),!0===this.state.showAll?this.setState({showAll:!1,btnLabel:"More"}):this.setState({showAll:!0,btnLabel:"Less"})}},{key:"render",value:function(){var e=!0===this.state.showAll?this.props.data:this.props.data.map(function(e,t){if(t<10)return e});return l.default.createElement("div",{style:{backgroundColor:"#FFF",position:"relative",padding:"45px 15px 15px",borderColor:"#e3e3e3",borderStyle:"solid",borderWidth:"1px",borderTopLeftRadius:"4px",borderTopRightRadius:"4px",borderBottomLeftRadius:"4px"}},e,l.default.createElement("div",{style:{position:"absolute",top:"15px",left:"15px",fontSize:"12px",fontWeight:"700",color:"#959595",textTransform:"uppercase",letterSpacing:"1px"}},this.props.title),l.default.createElement("a",{style:{float:"right",display:"inline-block",position:"relative",right:"-16px",top:"15px",background:"#FFF",borderBottomLeftRadius:"4px",borderBottomRightRadius:"4px",border:"1px solid #e3e3e3",borderTop:"none",padding:"4px 8px",marginBottom:"20px"},href:"#",onClick:this.handleOnClick.bind(this)},this.state.btnLabel))}}]),t}();t.default=i}}]);
//# sourceMappingURL=18.index.js.map