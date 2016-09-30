import React from 'react'
import classname from 'classname'
import {Map} from 'immutable'

class Message extends React.Component {

    shouldComponentUpdate(nextPorps, nextState) {
        return !Map(this.props).equals(Map(nextPorps))        
    }

    componentWillUpdate(nextProps, nextState) {
        
    }

    componentWillMount() {

    }

    componentDidMount() {
        const {doneCallback} = this.props;

        doneCallback && doneCallback();
    }


	constructor(props) {
	    super(props);
	    
	}

	static defaultProps = {
	    name: 'name',
        content: 'content',
        time: 'time',
        self: true,
        appendAnimation: false
	}
	static propTypes = {
	    name: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        time: React.PropTypes.string.isRequired,
        self: React.PropTypes.bool.isRequired,
        appendAnimation: React.PropTypes.bool
    }
    state = {
	    
	}



    render() {
        console.log(this)
    	const {name, content, time, self, appendAnimation} = this.props;

        const msgCls = classname({
            'message-item': true,
            'self': self,
            'append-animate': appendAnimation
        })
        return (
        	<div className={msgCls}>
                <div className="information clearfix">
                    <span className="name">{name}</span>
                    <span className="time">{time}</span>
                </div>
                <div className="message">
                    <img className="avatar" />
                    <div className="say-what">{content}</div>
                </div>
            </div>
        )
    }
}


export default Message;