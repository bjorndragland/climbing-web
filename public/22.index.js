(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{250:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(1),l=h(i),o=h(n(92)),r=n(125),s=n(124),u=h(n(364)),d=n(267),c=h(n(91)),f=h(n(126)),m=h(n(94));function h(e){return e&&e.__esModule?e:{default:e}}n(93);var p=(0,d.withGoogleMap)(function(e){return l.default.createElement(d.GoogleMap,{defaultZoom:e.defaultZoom,defaultCenter:e.defaultCenter,defaultMapTypeId:google.maps.MapTypeId.TERRAIN,onClick:e.onClick.bind(void 0)},e.markers)}),y=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),a(t,[{key:"componentWillMount",value:function(){f.default.isAdmin()||this.setState({pushUrl:"/login",error:null})}},{key:"componentDidMount",value:function(){var e=this;document.title=c.default.getTitle()+" | Area edit",-1==this.props.match.params.areaId?this.setState({id:-1,visibility:0,name:"",comment:"",lat:0,lng:0,newMedia:[]}):o.default.get(c.default.getUrl("areas?id="+this.props.match.params.areaId)).withCredentials().end(function(t,n){t?e.setState({error:t}):e.setState({id:n.body.id,visibility:n.body.visibility,name:n.body.name,comment:n.body.comment,lat:n.body.lat,lng:n.body.lng,newMedia:[]})})}},{key:"onNameChanged",value:function(e){this.setState({name:e.target.value})}},{key:"onVisibilityChanged",value:function(e,t){this.setState({visibility:e})}},{key:"onCommentChanged",value:function(e){this.setState({comment:e.target.value})}},{key:"onNewMediaChanged",value:function(e){this.setState({newMedia:e})}},{key:"save",value:function(e){var t=this;e.preventDefault(),this.setState({isSaving:!0});var n=this.state.newMedia.map(function(e){return{name:e.file.name.replace(/[^-a-z0-9.]/gi,"_"),photographer:e.photographer,inPhoto:e.inPhoto}}),a=o.default.post(c.default.getUrl("areas")).withCredentials().field("json",JSON.stringify({regionId:c.default.getRegion(),id:this.state.id,visibility:this.state.visibility,name:this.state.name,comment:this.state.comment,lat:this.state.lat,lng:this.state.lng,newMedia:n})).set("Accept","application/json");this.state.newMedia.forEach(function(e){return a.attach(e.file.name.replace(/[^-a-z0-9.]/gi,"_"),e.file)}),a.end(function(e,n){e?t.setState({error:e}):t.setState({pushUrl:"/area/"+n.body.id})})}},{key:"onMarkerClick",value:function(e){this.setState({lat:e.latLng.lat(),lng:e.latLng.lng()})}},{key:"onCancel",value:function(){window.history.back()}},{key:"render",value:function(){if(!this.state)return l.default.createElement("center",null,l.default.createElement(m.default,{icon:"spinner",spin:!0,size:"3x"}));if(this.state.error)return l.default.createElement("span",null,l.default.createElement("h3",null,this.state.error.status),this.state.error.toString());if(this.state.pushUrl)return l.default.createElement(r.Redirect,{to:this.state.pushUrl,push:!0});var e="Visible for everyone";1===this.state.visibility?e="Only visible for administrators":2===this.state.visibility&&(e="Only visible for super administrators");var t=this.props.location.query&&this.props.location.query.lat&&parseFloat(this.props.location.query.lat)>0?{lat:parseFloat(this.props.location.query.lat),lng:parseFloat(this.props.location.query.lng)}:c.default.getDefaultCenter(),n=this.props.location.query&&this.props.location.query.lat&&parseFloat(this.props.location.query.lat)>0?8:c.default.getDefaultZoom();return l.default.createElement(s.Well,null,l.default.createElement("form",{onSubmit:this.save.bind(this)},l.default.createElement(s.FormGroup,{controlId:"formControlsName"},l.default.createElement(s.ControlLabel,null,"Area name"),l.default.createElement(s.FormControl,{type:"text",value:this.state.name,placeholder:"Enter name",onChange:this.onNameChanged.bind(this)})),l.default.createElement(s.FormGroup,{controlId:"formControlsComment"},l.default.createElement(s.ControlLabel,null,"Comment"),l.default.createElement(s.FormControl,{style:{height:"100px"},componentClass:"textarea",placeholder:"Enter comment",value:this.state.comment,onChange:this.onCommentChanged.bind(this)})),l.default.createElement(s.FormGroup,{controlId:"formControlsVisibility"},l.default.createElement(s.ControlLabel,null,"Visibility"),l.default.createElement("br",null),l.default.createElement(s.DropdownButton,{title:e,id:"bg-nested-dropdown"},l.default.createElement(s.MenuItem,{eventKey:"0",onSelect:this.onVisibilityChanged.bind(this,0)},"Visible for everyone"),l.default.createElement(s.MenuItem,{eventKey:"1",onSelect:this.onVisibilityChanged.bind(this,1)},"Only visible for administrators"),f.default.isSuperAdmin()&&l.default.createElement(s.MenuItem,{eventKey:"2",onSelect:this.onVisibilityChanged.bind(this,2)},"Only visible for super administrators"))),l.default.createElement(s.FormGroup,{controlId:"formControlsMedia"},l.default.createElement(u.default,{onMediaChanged:this.onNewMediaChanged.bind(this)})),l.default.createElement(s.FormGroup,{controlId:"formControlsMap"},l.default.createElement(s.ControlLabel,null,"Click to mark area center on map"),l.default.createElement("br",null),l.default.createElement("section",{style:{height:"600px"}},l.default.createElement(p,{containerElement:l.default.createElement("div",{style:{height:"100%"}}),mapElement:l.default.createElement("div",{style:{height:"100%"}}),defaultZoom:n,defaultCenter:t,onClick:this.onMarkerClick.bind(this),markers:0!=this.state.lat&&0!=this.state.lng?l.default.createElement(d.Marker,{position:{lat:this.state.lat,lng:this.state.lng}}):""}))),l.default.createElement(s.ButtonGroup,null,l.default.createElement(s.Button,{bsStyle:"danger",onClick:this.onCancel.bind(this)},"Cancel"),l.default.createElement(s.Button,{type:"submit",bsStyle:"success",disabled:this.state.isSaving},this.state.isSaving?"Saving...":"Save area"))))}}]),t}();t.default=y}}]);
//# sourceMappingURL=22.index.js.map