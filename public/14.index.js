(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{242:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(1),r=y(l),o=(n(60),n(125)),i=y(n(92)),s=n(124),u=n(267),d=y(n(426)),c=y(n(364)),f=y(n(91)),h=y(n(126)),m=y(n(301)),p=y(n(94));function y(e){return e&&e.__esModule?e:{default:e}}n(93);var g=(0,u.withGoogleMap)(function(e){return r.default.createElement(u.GoogleMap,{defaultZoom:e.defaultZoom,defaultCenter:e.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN,onClick:e.onClick.bind(void 0)},e.markers)}),b=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),a(t,[{key:"componentDidMount",value:function(){var e=this;document.title=f.default.getTitle()+" | Problem edit",i.default.get(f.default.getUrl("grades?regionId="+f.default.getRegion())).end(function(t,n){e.setState({error:t||null,grades:t?null:n.body})}),i.default.get(f.default.getUrl("types?regionId="+f.default.getRegion())).end(function(t,n){e.setState({error:t||null,types:t?null:n.body})}),-1==this.props.match.params.problemId?this.setState({id:-1,visibility:0,name:"",comment:"",originalGrade:"n/a",fa:[],faDate:f.default.convertFromDateToString(new Date),nr:this.props.location.query.nr,lat:0,lng:0,newMedia:[]}):i.default.get(f.default.getUrl("problems?regionId="+f.default.getRegion()+"&id="+this.props.match.params.problemId)).withCredentials().end(function(t,n){t?e.setState({error:t}):e.setState({id:n.body[0].id,visibility:n.body[0].visibility,name:n.body[0].name,comment:n.body[0].comment,originalGrade:n.body[0].originalGrade,fa:n.body[0].fa,faDate:n.body[0].faDate,nr:n.body[0].nr,typeId:n.body[0].t.id,lat:n.body[0].lat,lng:n.body[0].lng,newMedia:[]})})}},{key:"onNameChanged",value:function(e){this.setState({name:e.target.value})}},{key:"onNrChanged",value:function(e){this.setState({nr:parseInt(e.target.value)})}},{key:"onLatChanged",value:function(e){this.setState({lat:parseFloat(e.target.value)})}},{key:"onLngChanged",value:function(e){this.setState({lng:parseFloat(e.target.value)})}},{key:"onVisibilityChanged",value:function(e,t){this.setState({visibility:e})}},{key:"onCommentChanged",value:function(e){this.setState({comment:e.target.value})}},{key:"onFaDateChanged",value:function(e){this.setState({faDate:e})}},{key:"onOriginalGradeChanged",value:function(e,t){this.setState({originalGrade:e})}},{key:"onTypeIdChanged",value:function(e,t){this.setState({typeId:e})}},{key:"onNewMediaChanged",value:function(e){this.setState({newMedia:e})}},{key:"save",value:function(e){var t=this;e.preventDefault(),this.setState({isSaving:!0});var n=this.state.newMedia.map(function(e){return{name:e.file.name.replace(/[^-a-z0-9.]/gi,"_"),photographer:e.photographer,inPhoto:e.inPhoto}}),a=i.default.post(f.default.getUrl("problems?regionId="+f.default.getRegion())).withCredentials().field("json",JSON.stringify({sectorId:this.props.location.query.idSector,id:this.state.id,visibility:this.state.visibility,name:this.state.name,comment:this.state.comment,originalGrade:this.state.originalGrade,fa:this.state.fa,faDate:this.state.faDate,nr:this.state.nr,t:this.state.typeId?this.state.types.find(function(e){return e.id===t.state.typeId}):this.state.types[0],lat:this.state.lat,lng:this.state.lng,newMedia:n})).set("Accept","application/json");this.state.newMedia.forEach(function(e){return a.attach(e.file.name.replace(/[^-a-z0-9.]/gi,"_"),e.file)}),a.end(function(e,n){e?t.setState({error:e}):t.setState({pushUrl:"/problem/"+n.body.id})})}},{key:"onMapClick",value:function(e){this.setState({lat:e.latLng.lat(),lng:e.latLng.lng()})}},{key:"onUsersUpdated",value:function(e){var t=e.map(function(e){return{id:e.id,firstname:e.name,surname:null}});this.setState({fa:t})}},{key:"onCancel",value:function(){window.history.back()}},{key:"render",value:function(){var e=this;if(!(this.state&&this.state.id&&this.state.types&&this.state.grades))return r.default.createElement("center",null,r.default.createElement(p.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return r.default.createElement("span",null,r.default.createElement("h3",null,this.state.error.status),this.state.error.toString());if(this.state.pushUrl)return r.default.createElement(o.Redirect,{to:this.state.pushUrl,push:!0});var t=new Date;t.setDate(t.getDate()-1);var n="Visible for everyone";1===this.state.visibility?n="Only visible for administrators":2===this.state.visibility&&(n="Only visible for super administrators");var a,l,i=this.state.typeId?this.state.types.find(function(t){return t.id===e.state.typeId}):this.state.types[0];return 0!=this.state.lat&&0!=this.state.lng?(a={lat:this.state.lat,lng:this.state.lng},l=15):this.props.location.query.lat&&parseFloat(this.props.location.query.lat)>0?(a={lat:parseFloat(this.props.location.query.lat),lng:parseFloat(this.props.location.query.lng)},l=14):(a=f.default.getDefaultCenter(),l=f.default.getDefaultZoom()),r.default.createElement(s.Well,null,r.default.createElement("form",{onSubmit:this.save.bind(this)},r.default.createElement(s.FormGroup,{controlId:"formControlsName"},r.default.createElement(s.ControlLabel,null,"Problem name"),r.default.createElement(s.FormControl,{type:"text",value:this.state.name,placeholder:"Enter name",onChange:this.onNameChanged.bind(this)})),r.default.createElement(s.FormGroup,{controlId:"formControlsFaDate"},r.default.createElement(s.ControlLabel,null,"FA date (yyyy-mm-dd)"),r.default.createElement("br",null),r.default.createElement(m.default,{format:"YYYY-MM-DD",computableFormat:"YYYY-MM-DD",date:this.state.faDate,onChange:this.onFaDateChanged.bind(this)}),r.default.createElement(s.ButtonGroup,null,r.default.createElement(s.Button,{onClick:this.onFaDateChanged.bind(this,f.default.convertFromDateToString(t))},"Yesterday"),r.default.createElement(s.Button,{onClick:this.onFaDateChanged.bind(this,f.default.convertFromDateToString(new Date))},"Today"))),r.default.createElement(s.FormGroup,{controlId:"formControlsTypeId"},r.default.createElement(s.ControlLabel,null,"Type"),r.default.createElement("br",null),r.default.createElement(s.DropdownButton,{title:i.type+(i.subType?" - "+i.subType:""),id:"bg-nested-dropdown"},this.state.types.map(function(t,n){return r.default.createElement(s.MenuItem,{key:n,eventKey:n,onSelect:e.onTypeIdChanged.bind(e,t.id)},t.type," ",t.subType?" - "+t.subType:"")}))),r.default.createElement(s.FormGroup,{controlId:"formControlsGrade"},r.default.createElement(s.ControlLabel,null,"Grade"),r.default.createElement("br",null),r.default.createElement(s.DropdownButton,{title:this.state.originalGrade,id:"bg-nested-dropdown"},this.state.grades.map(function(t,n){return r.default.createElement(s.MenuItem,{key:n,eventKey:n,onSelect:e.onOriginalGradeChanged.bind(e,t.grade)},t.grade)}))),r.default.createElement(s.FormGroup,{controlId:"formControlsFA"},r.default.createElement(s.ControlLabel,null,"FA"),r.default.createElement("br",null),r.default.createElement(d.default,{users:this.state.fa?this.state.fa.map(function(e){return{id:e.id,name:e.firstname+" "+e.surname}}):[],onUsersUpdated:this.onUsersUpdated.bind(this)})),r.default.createElement(s.FormGroup,{controlId:"formControlsVisibility"},r.default.createElement(s.ControlLabel,null,"Visibility"),r.default.createElement("br",null),r.default.createElement(s.DropdownButton,{title:n,id:"bg-nested-dropdown"},r.default.createElement(s.MenuItem,{eventKey:"0",onSelect:this.onVisibilityChanged.bind(this,0)},"Visible for everyone"),r.default.createElement(s.MenuItem,{eventKey:"1",onSelect:this.onVisibilityChanged.bind(this,1)},"Only visible for administrators"),h.default.isSuperAdmin()&&r.default.createElement(s.MenuItem,{eventKey:"2",onSelect:this.onVisibilityChanged.bind(this,2)},"Only visible for super administrators"))),r.default.createElement(s.FormGroup,{controlId:"formControlsSectorNr"},r.default.createElement(s.ControlLabel,null,"Sector number"),r.default.createElement(s.FormControl,{type:"text",value:this.state.nr,placeholder:"Enter sector number",onChange:this.onNrChanged.bind(this)})),r.default.createElement(s.FormGroup,{controlId:"formControlsComment"},r.default.createElement(s.ControlLabel,null,"Comment"),r.default.createElement(s.FormControl,{style:{height:"100px"},componentClass:"textarea",placeholder:"Enter comment",value:this.state.comment,onChange:this.onCommentChanged.bind(this)})),r.default.createElement(s.FormGroup,{controlId:"formControlsMedia"},r.default.createElement(c.default,{onMediaChanged:this.onNewMediaChanged.bind(this)})),r.default.createElement(s.FormGroup,{controlId:"formControlsMap"},r.default.createElement(s.ControlLabel,null,"Click to mark problem on map"),r.default.createElement("br",null),r.default.createElement("section",{style:{height:"600px"}},r.default.createElement(g,{containerElement:r.default.createElement("div",{style:{height:"100%"}}),mapElement:r.default.createElement("div",{style:{height:"100%"}}),defaultZoom:l,defaultCenter:a,onClick:this.onMapClick.bind(this),markers:0!=this.state.lat&&0!=this.state.lng?r.default.createElement(u.Marker,{position:{lat:this.state.lat,lng:this.state.lng}}):""})),r.default.createElement(s.ControlLabel,null,"Latitude"),r.default.createElement(s.FormControl,{type:"text",value:this.state.lat,placeholder:"Latitude",onChange:this.onLatChanged.bind(this)}),r.default.createElement(s.ControlLabel,null,"Longitude"),r.default.createElement(s.FormControl,{type:"text",value:this.state.lng,placeholder:"Longitude",onChange:this.onLngChanged.bind(this)})),r.default.createElement(s.ButtonGroup,null,r.default.createElement(s.Button,{bsStyle:"danger",onClick:this.onCancel.bind(this)},"Cancel"),r.default.createElement(s.Button,{type:"submit",bsStyle:"success",disabled:this.state.isSaving},this.state.isSaving?"Saving...":"Save problem"))))}}]),t}();t.default=b},426:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(1),r=d(l),o=(n(127),d(n(92))),i=n(124),s=d(n(91)),u=d(n(94));function d(e){return e&&e.__esModule?e:{default:e}}n(93);var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={users:e.users,searchInputValue:""},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),a(t,[{key:"inputChange",value:function(e){var t=this,n=e.target.value;n.length>0?(this.setState({searchInputValue:n}),o.default.get(s.default.getUrl("users/search?value="+n)).withCredentials().end(function(e,a){e&&console.log(e);var l=a.body.filter(function(e){return 0==t.state.users.filter(function(t){return e.id==t.id}).length});0==l.filter(function(e){return e.name.toUpperCase()===n.toUpperCase()}).length&&0==t.state.users.filter(function(e){return e.name.toUpperCase()===n.toUpperCase()}).length&&l.push({id:-1,name:n}),t.setState({searchResults:l})})):this.setState({searchInputValue:n,searchResults:null})}},{key:"validateInput",value:function(){return this.state.searchResults?"error":"success"}},{key:"removeUser",value:function(e){var t=this.state.users.filter(function(t){return t.id!=e});this.setState({users:t}),this.props.onUsersUpdated(t)}},{key:"menuItemSelect",value:function(e,t){this.state.users.push(e),this.setState({searchInputValue:"",searchResults:null}),this.props.onUsersUpdated(this.state.users)}},{key:"render",value:function(){var e=this,t=null;if(this.state&&this.state.searchResults&&this.state.searchResults.length>0){var n=this.state.searchResults.map(function(t,n){var a=-1==t.id?r.default.createElement("b",null," [New user]"):r.default.createElement("b",null," [Existing user]");return r.default.createElement(i.MenuItem,{key:n,href:"#",onSelect:e.menuItemSelect.bind(e,t)},t.name," ",a)});t=r.default.createElement("div",null,r.default.createElement("ul",{className:"dropdown-menu open",style:{position:"absolute",display:"inline"}},n))}var a=this.state.users.map(function(t,n){return r.default.createElement(i.Button,{key:n,onClick:e.removeUser.bind(e,t.id)},r.default.createElement(u.default,{icon:"times"})," ",t.name,-1==t.id?" (new user)":"")});return r.default.createElement("div",{style:{position:"relative",width:"100%"}},r.default.createElement("div",{style:{width:"100%"}},a?r.default.createElement(i.ButtonGroup,null,a):null,r.default.createElement(i.FormGroup,{controlId:"formControlsSearchInput",validationState:this.validateInput()},r.default.createElement(i.FormControl,{style:{display:"inline-block"},type:"text",placeholder:"Search users",value:this.state.searchInputValue,onChange:this.inputChange.bind(this)}),r.default.createElement(i.FormControl.Feedback,null))),t)}}]),t}();t.default=c}}]);
//# sourceMappingURL=14.index.js.map