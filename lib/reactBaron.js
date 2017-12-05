/** forked from https://github.com/Diokuz/react-baron **/

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var React = require('react');
var createClass = require('create-react-class');
var baron = require('baron');

function getDOMNode(ref) {
	if (React.version < '0.14.0' && ref && ref.getDOMNode) {
		return ref.getDOMNode();
	}

	return ref;
}

var Baron = createClass({
	displayName: 'Baron',

	componentDidMount: function componentDidMount() {
		var clipper = getDOMNode(this.refs.clipper);
		var scroller = getDOMNode(this.refs.scroller);
		var track = getDOMNode(this.refs.track);
		var bar = getDOMNode(this.refs.bar);

		this.baron = baron({
			root: clipper,
			scroller: scroller,
			barOnCls: this.props.barOnCls,
			direction: this.props.direction,
			track: track,
			bar: bar,
			impact: this.props.impact,
			cssGuru: this.props.cssGuru,
			scrollingCls: this.props.scrollingCls
		});
	},

	componentDidUpdate: function componentDidUpdate() {
		if (this.baron) {
			this.baron.update();
		}
	},

	scrollToLast: function scrollToLast() {
		var scroll = this.props.direction === 'v' ? 'scrollTop' : 'scrollLeft';
		var size = this.props.direction === 'v' ? 'scrollHeight' : 'scrollWidth';
		var node = getDOMNode(this.refs.scroller);

		node[scroll] = node[size];
	},

	getScroller: function getScroller() {
		return getDOMNode(this.refs.scroller);
	},

	getClipper: function getClipper() {
		return getDOMNode(this.refs.clipper);
	},

	componentWillUnmount: function componentWillUnmount() {
		if (this.baron) {
			this.baron.dispose();
		}
	},

	render: function render() {
		var barCls = this.props.barCls;
		var trackCls = this.props.trackCls;

		if (this.props.direction === 'h') {
			barCls += ' ' + this.props.hModifier;
			trackCls += ' ' + this.props.hModifier;
		}

		return React.createElement('div', { className: this.props.clipperCls, ref: 'clipper' }, React.createElement('div', {
			className: this.props.scrollerCls,
			ref: 'scroller',
			onScroll: this.props.onScroll
		}, this.props.children), React.createElement('div', { className: trackCls, ref: 'track' }, React.createElement('div', { className: barCls, ref: 'bar' })));
	}
});

Baron.defaultProps = {
	clipperCls: 'clipper',
	scrollerCls: 'scroller',
	trackCls: 'track',
	barCls: 'bar',
	barOnCls: 'baron',
	direction: 'v',
	hModifier: '_h',
	impact: undefined,
	scrollingCls: '_scrolling'
};

exports.default = Baron;