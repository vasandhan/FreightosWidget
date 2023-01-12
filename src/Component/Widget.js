import React, { Component } from 'react'

export class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getNew:this.props.getNew,
            widgetDomNodeId: "",
            widgeTitle: "",
            widgetScriptId: "",
            widgetType: "",
            enabledModes: "",
            configData:{}
        }
    }

    goTofunction = (d, e, i, w) => {
        var config = this.state.configData;
            config.calcType = w;
        if (!d.getElementById(i)) {
            try {
                var s = d.createElement(e),
                    el = d.getElementsByTagName(e)[0];                
                s.src = "https://storage.googleapis.com/freightos-widget-prod/latest/dist/widget.js?nocache="
                    + Math.random();
                s.id = i;
                s.onload = function widget() {
                    if (typeof Fr8osWidget !== "undefined") {
                        Fr8osWidget && Fr8osWidget.widgets[w].run(config);
                    }
                };
                el.parentNode.insertBefore(s, el);
            } catch (e) {
                document.getElementById(i).innerText = '';
                console.error(w + ": ftool exception", e);
            }
        }
    }
    componentDidUpdate(prevProps) {        
        if (prevProps.getNew !== this.props.getNew) {
            let config = this.props.config
            this.setState({
                getNew:this.props.getNew,
                configData:config
            },()=>{
                this.goTofunction(document, "script", config.scriptID, config.type);
            });
        }
    }
    render() {
        let {getNew,configData}=this.state;
        return (
            (getNew && Object.keys(configData).length > 0 ) ? <div id={this.state.configData.selectorid}>Loading...</div>:""        
        )
    }
}

export default Widget;
