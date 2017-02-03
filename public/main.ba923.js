webpackJsonp([0],{167:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(11),r=n(l),d=a(106),u=n(d),s=a(5),o=n(s),i=a(4),f=n(i),p=a(6),c=n(p),h=a(8),g=n(h),m=a(7),y=n(m),C=a(1),T=n(C),x=a(389),E=n(x),v=function(e){function t(e){(0,f.default)(this,t);var a=(0,g.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return a.onStart=function(e,t){a.socket.emit("run",{key:e,flags:t})},a.onTerminate=function(e){a.socket.emit("terminate",{key:e})},a.onClear=function(e){a.socket.emit("clear",{key:e})},a.state={},a}return(0,y.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket=io(),this.socket.on("update",function(t){e.setState(t)})}},{key:"render",value:function(){var e=this;return T.default.createElement("div",null,(0,u.default)(this.state).map(function(t){return T.default.createElement(E.default,(0,r.default)({},e.state[t],{id:e.state[t].key,onStart:e.onStart,onTerminate:e.onTerminate,onClear:e.onClear}))}))}}]),t}(T.default.Component);t.default=v},389:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(105),r=n(l),d=a(5),u=n(d),s=a(4),o=n(s),i=a(6),f=n(i),p=a(8),c=n(p),h=a(7),g=n(h),m=a(1),y=n(m),C=a(176),T=a(192),x=n(T),E=a(183),v=n(E),k=a(190),_=n(k),b={backgroundColor:"#000",whiteSpace:"pre",overflowY:"scroll",maxHeight:400},S=function(e){function t(e){(0,o.default)(this,t);var a=(0,c.default)(this,(t.__proto__||(0,u.default)(t)).call(this,e));return a.handleExpandChange=function(e){a.setState({expanded:e})},a.handleToggle=function(e,t){a.setState({expanded:t})},a.handleFlagChange=function(e){a.setState({flags:e.target.value})},a.state={expanded:!1,flags:e.flags},a}return(0,g.default)(t,e),(0,f.default)(t,[{key:"componentWillUpdate",value:function(e){this.props.flags!==e.flags&&this.setState({flags:e.flags})}},{key:"render",value:function(){var e=this;return y.default.createElement(C.Card,{expanded:this.state.expanded,onExpandChange:this.handleExpandChange,style:{width:400}},y.default.createElement(C.CardTitle,{title:this.props.command}),y.default.createElement(C.CardText,null,y.default.createElement(x.default,{toggled:this.state.expanded,onToggle:this.handleToggle,labelPosition:"right",label:"Advanced area"})),!this.props.stdout&&!this.props.stderr&&y.default.createElement(C.CardText,{expandable:!0},"No Data"),this.props.stdout&&y.default.createElement(C.CardText,{expandable:!0,style:(0,r.default)({color:"#fff"},b)},this.props.stdout),this.props.stderr&&y.default.createElement(C.CardText,{expandable:!0,style:(0,r.default)({color:"#f00"},b)},this.props.stderr),y.default.createElement(C.CardText,{expandable:!0},y.default.createElement(_.default,{hintText:"Flags",floatingLabelText:"Additional flags passed in",onChange:this.handleFlagChange,value:this.state.flags})),y.default.createElement(C.CardActions,null,!this.props.isRunning&&y.default.createElement(v.default,{label:"Start",primary:!0,style:{},onClick:function(){e.props.onStart(e.props.id,e.state.flags),e.setState({expanded:!0})}}),this.props.isRunning&&y.default.createElement(v.default,{label:"Terminate",secondary:!0,style:{},onClick:function(){return e.props.onTerminate(e.props.id)}}),y.default.createElement(v.default,{label:"Clear Console",onClick:function(){return e.props.onClear(e.props.id)}})))}}]),t}(y.default.Component);t.default=S,S.propTypes={id:y.default.PropTypes.string.isRequired,command:y.default.PropTypes.string.isRequired,stderr:y.default.PropTypes.string.isRequired,stdout:y.default.PropTypes.string.isRequired,flags:y.default.PropTypes.string.isRequired,isRunning:y.default.PropTypes.bool,onStart:y.default.PropTypes.func.isRequired,onTerminate:y.default.PropTypes.func.isRequired,onClear:y.default.PropTypes.func.isRequired},S.defaultProps={exitCode:0,isRunning:!1}},395:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var l=a(1),r=n(l),d=a(34),u=n(d),s=a(166),o=n(s),i=a(165),f=n(i),p=a(167),c=n(p);(0,o.default)(),u.default.render(r.default.createElement(f.default,null,r.default.createElement(c.default,null)),document.querySelector("#app"))}},[395]);
//# sourceMappingURL=main.ba923.js.map