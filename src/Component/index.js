import React, { Component } from 'react'
import { Input, Card, Col, Select, Checkbox, Button, message, Row } from 'antd';
import Widget from './Widget';
import './Styles.css';
class FR8OS_Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            randomKey: "",
            widgetDomNodeId: "",
            widgeTitle: "",
            widgetScriptId: "",
            widgetType: "",
            enabledModes: [],
            optionList: [{
                "value": "",
                "label": "--Select--"
            }, {
                "value": "FreightEstimator",
                "label": "FreightEstimator"
            }, {
                "value": "CO2",
                "label": "CO2"
            }, {
                "value": "VolumeCalculator",
                "label": "VolumeCalculator"
            }, {
                "value": "ChargeableWeightCalculator",
                "label": "ChargeableWeightCalculator"
            }, {
                "value": "FreightClassCalculator",
                "label": "FreightClassCalculator"
            }],
            plainOptions: ['AIR', 'EXPRESS', 'OCEAN'],
            backgroundBanner: "https://storage.googleapis.com/freightos-widget/background.svg",
            configData: {},
            previousState: {},
            disableButton: 0
        }
    }
    onChange = (value) => {
        this.setState({
            widgetType: value
        })
    };
    onSearch = (value) => {
    };
    CheckboxonChange = (checkedValues) => {
        this.setState({
            enabledModes: checkedValues
        })
    };

    submit = () => {
        let { widgetDomNodeId, widgeTitle, widgetScriptId, widgetType, enabledModes } = this.state;
        let config = {
            title: widgeTitle,
            selector: `#${widgetDomNodeId}`,
            selectorid: widgetDomNodeId,
            calcType: "",
            enabledModes: enabledModes,
            background: {
                image: this.state.backgroundBanner
            },
            scriptID: widgetScriptId,
            type: widgetType
        }
        this.setState({
            configData: config, randomKey: Math.random(), previousState: this.state
        })
    }

    validate = () => {
        let { widgetDomNodeId, widgeTitle, widgetScriptId, widgetType, enabledModes } = this.state;
        if (widgetDomNodeId === "") {
            message.error('Please enter the DOM node ID');
            return false;
        }
        if (widgeTitle === "") {
            message.error('Please enter the Title');
            return false;
        }
        if (widgetScriptId === "") {
            message.error('Please enter the Script ID');
            return false;
        }
        if (widgetType === "") {
            message.error('Please select the Type');
            return false;
        }
        if (enabledModes.length === 0) {
            message.error('Please choose of the Checkbox');
            return false;
        }
        this.setState({
            disableButton: 1
        }, () => {
            this.submit();
        })
    }

    reset = () => {
        this.setState({
            widgetDomNodeId: "",
            widgeTitle: "",
            widgetScriptId: "",
            widgetType: "",
            enabledModes: [],
        })
    }

    render() {
        let { optionList, plainOptions, randomKey, widgetDomNodeId, widgeTitle, widgetScriptId, widgetType, enabledModes, disableButton } = this.state;
        return (
            <div>
                <Card
                    title={<div><img src='https://www.freightos.com/wp-content/themes/freightos/assets/svg/logo-black.svg' alt='Freightos Widgets' /></div>}
                    bordered={false}
                >
                    <Row gutter={8}>
                        <Col className='mt-2' xs={24} md={8}>
                            <Input size='large' required value={widgetDomNodeId} onChange={(event) => this.setState({ widgetDomNodeId: event.target.value, disableButton: this.state.disableButton > 0 ? this.state.disableButton - 0.5 : 0 })} placeholder='DOM node ID' />
                        </Col>
                        <Col className='mt-2' xs={24} md={8}>
                            <Input size='large' value={widgeTitle} onChange={(event) => this.setState({ widgeTitle: event.target.value })} placeholder='Title' />
                        </Col>
                        <Col className='mt-2' xs={24} md={8}>
                            <Input size='large' required value={widgetScriptId} onChange={(event) => this.setState({ widgetScriptId: event.target.value, disableButton: this.state.disableButton > 0 ? this.state.disableButton - 0.5 : 0 })} placeholder='Script ID' />
                        </Col>
                        <Col className='mt-2' xs={24} md={8}>
                            <Select
                                showSearch
                                size='large'
                                placeholder="Select Type"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onSearch={this.onSearch}
                                value={widgetType}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={optionList}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Col>
                        <Col className='mt-3' xs={24} md={8}>
                            <div><span className='text-bold'>Choose Medium: </span><span><Checkbox.Group size='large' options={plainOptions} value={enabledModes} onChange={this.CheckboxonChange} /></span></div>
                        </Col>
                        <Col className='mt-3' xs={24}>
                            <div className='text-right'><Button color="grey" shape="round" className='mr-1' size='large' onClick={this.reset}>Clear</Button><Button type="primary" shape="round" size='large' onClick={this.validate} disabled={disableButton === 0 ? false : true}>Generate Widget</Button></div>
                        </Col>
                    </Row>
                </Card>
                {<Widget config={this.state.configData} getNew={randomKey} />}
            </div>
        )
    }
}

export default FR8OS_Calculator;
