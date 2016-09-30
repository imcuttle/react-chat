import React from 'react'
import classname from 'classname'

import Message from './Message'
import '../css/base.less'

class App extends React.Component {

    shouldComponentUpdate(nextPorps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        this.refs.content.style.height = nextState.mini ? '0px' : this.refs.childContent.clientHeight + this.refs.bottom.clientHeight + 'px';;
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.refs.content.style.height = this.refs.childContent.clientHeight + this.refs.bottom.clientHeight + 'px';
    }


	constructor(props) {
	    super(props);
	    this.send = this.send.bind(this);
        this.login = this.login.bind(this);
	}

	static defaultProps = {
	    title: 'Chat',
        mini: false,
        tipText: '',
        msgs: [{
            name: 'Alexanssder Pierce',
            time: '23 Jan 2:00 pm',
            content: "Is this template really for free? That's unbelievable!",
            self: false
        },{
            name: 'Sarah Bullock',
            time: "23 Jan 2:05 pm",
            content: "You better believe it!",
            self: true
        }]
	}
	static propTypes = {
	    title: React.PropTypes.string.isRequired,
    }
    state = {
	    mini: this.props.mini,
        sendDisabled: false,
        tipText: this.props.tipText,
        logined: false,
        msgs: this.props.msgs
	}

    send() {
        const {mini, sendDisabled, msgs} = this.state;
        const val = this.refs.ipt.value;
        if(val.trim() === '') {
            this.setTip('please input message.')
            return;
        }
        if(sendDisabled === true) {
            return;
        }
        this.refs.ipt.value = '';
        this.setState({
            // sendDisabled: true,
            msgs: msgs.concat({
                name: 'Sarah Bullock',
                time: "23 Jan 2:05 pm",
                content: val,
                appendAnimation: true,
                doneCallback: () => {
                    this.refs.childContent.scrollTop = this.refs.childContent.scrollHeight;
                },
                self: true
            })
        });
    }

    login() {
        const {mini, logined, msgs} = this.state;
        const val = this.refs.emailIpt.value.trim();
        if(val === '' ) {
            this.setTip('please input email.')
            this.refs.emailIpt.select();
            this.refs.emailIpt.focus();
            return;
        }
        if(!/^\w+@\w+\.\w+$/.test(val)) {
            this.setTip('please input correct email.')
            this.refs.emailIpt.select();
            this.refs.emailIpt.focus();
            return;
        }
        if(logined === true) {
            return;
        }
        this.setState({
            logined: true
        });
    }

    renderTip() {
        const {tipText} = this.state;

        return (
            <div ref={(ref) => {
                if(ref && tipText) {
                    if(window.intFade) {
                        clearTimeout(window.intFade);
                    }
                    window.intFade = setTimeout(() => {
                        this.setTip('')
                    }, 1400)
                }
            }} className="tip">
                {tipText}
            </div>
        )
    }

    setTip(v) {
        this.setState({tipText: v})
    }

    renderWrap() {
        const {mini, msgs, logined} = this.state;

        const btnCls = classname({
            addon: true,
            disabled: logined
        })

        return (
            <div className="wrap">
                <div className="inputgroup">
                    <input ref="emailIpt" type="email" disabled={logined} placeholder="Type Email..." onKeyDown={e=>{
                        if(e.keyCode === 13) {
                            this.login();
                        }
                    }}/>
                    <span className={btnCls} onClick={this.login}>Login</span>
                </div>
            </div>
        )
    }

    render() {
    	const {title} = this.props;
        const {mini, sendDisabled, msgs, logined, tipText} = this.state;
        const iconCls = classname({
            icon: true,
            fa: true,
            'fa-minus': !mini,
            'fa-plus': mini
        })
        const btnCls = classname({
            addon: true,
            disabled: sendDisabled
        })

        return (
        	<div className="chat-container">
                {tipText ? this.renderTip() : null}
        		<h1 className="header">
        			{title}
        			<div className="right clearfix">
        				<i onClick={e=>{this.setState({mini: !this.state.mini})}} className={iconCls}></i>
        			</div>
        		</h1>
                <div ref="content" className="main-content">
                {/*!logined ? this.renderWrap() : null*/}
                <div ref="childContent" className="content">
                    {
                        msgs.map((x,i) => <Message {...x} key={i} />)
                    }
                </div>
                <div ref="bottom" className="bottom-bar">
                    <div className="inputgroup">
                        <input ref="ipt" type="text" placeholder="Type Message..." onKeyDown={e=>{
                            if(e.keyCode === 13) {
                                this.send();
                            }
                        }}/>
                        <span className={btnCls} onClick={this.send}>Send</span>
                    </div>
                </div>
                </div>
        	</div>
        )
    }
}


export default App;