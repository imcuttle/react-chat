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
        url: '',
        list: [],
        time: 'time',
        self: true,
        appendAnimation: false,
        html: false
	}
	static propTypes = {
	    name: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        url: React.PropTypes.string,
        list: React.PropTypes.array,
        time: React.PropTypes.string.isRequired,
        self: React.PropTypes.bool.isRequired,
        appendAnimation: React.PropTypes.bool,
        html: React.PropTypes.bool
    }
    state = {
	    
	}


    renderLink(text, url) {
        return (<a href={url} target="_blank"> {text} </a>)
    }

    renderList() {
        const {code, list} = this.props;
        if(code === 308000) {
            return (
                <div>
                {
                    list.map((x, i) => 
                        <p key={i} className="list-item">
                            {x.name}<br/>
                            <img src={x.icon} /><br/>
                            {x.info}<br/>
                            {this.renderLink('详细', x.detailurl)}
                        </p>
                    )
                }
                </div>
            )
        } else if (code === 302000) {
            return (
                <div>
                {
                    list.map((x, i) => 
                        <p key={i} className="list-item">
                            {x.article} - 来自 {x.source}<br/>
                            {!!x.icon?<span><img src={x.icon}/><br/></span>:null}
                            {this.renderLink('详细', x.detailurl)}
                            
                        </p>
                    )
                }
                </div>
            )
        }
    }

    render() {
        console.log(this)
    	const {name, content, time, self, appendAnimation, html, url, list, code} = this.props;

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
                <div className="message clearfix">
                    <img className="avatar" src={require(self?'../common/self.jpeg':'../common/robot.jpeg')}/>
                    {html
                        ? <div className="say-what" dangerouslySetInnerHTML={{__html: content}}></div>
                        : <div className="say-what" >
                              {content}
                              {!!url?<p>{renderLink('查看', url)}</p>:null}
                              {list&&list.length>0?this.renderList(list):null}
                          </div>
                    }
                </div>
            </div>
        )
    }
}


export default Message;