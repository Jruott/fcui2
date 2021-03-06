/**
 * @file 页码组件
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.2
 */
define(function (require) {


    var Button = require('./Button.jsx');
    var language = require('./core/language');
    var React = require('react');
    var InputWidget = require('./mixins/InputWidget');
    var cTools = require('./core/componentTools');


    return React.createClass({
        // #override
        mixins: [InputWidget],
        // @override
        getDefaultProps: function () {
            return {
                skin: '',
                className: '',
                style: {},
                disabled: false,
                min: 1,
                max: 10,
                threshold: Number.POSITIVE_INFINITY,
                valueTemplate: Number.POSITIVE_INFINITY
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        onButtonClick: function (e) {
            var min = parseInt(this.props.min, 10);
            var max = parseInt(this.props.max, 10);
            var current = parseInt(this.___getValue___(), 10);
            current = isNaN(current) ? min : current;
           
            var value = e.target.value;
            if (value + '' === current + '' || this.props.disabled) return;
            
            var v = 1;
            v = value === 'prev' ? current - 1 : value;
            v = v === 'next' ? current + 1 : v;
            v = parseInt(v, 10);
            v = v < min ? min : v;
            v = v > max ? max : v;

            e.target = this.refs.container;
            e.target.value = v;
            this.___dispatchChange___(e);
        },
        render: function () {
            var containerProp = cTools.containerBaseProps('pager', this);
            return (<div {...containerProp}>{buttonFactory(this)}</div>);
        }
    });


    function buttonFactory(me) {
        var min = parseInt(me.props.min, 10);
        var max = parseInt(me.props.max, 10);
        var threshold = parseInt(me.props.threshold, 10);
        var btns = [];
        var value = parseInt(me.___getValue___(), 10);

        value = isNaN(value) ? min : value;
        value = value < min ? min : value;
        value = value > max ? max: value;
        threshold = isNaN(threshold) || threshold < 1 ? Number.POSITIVE_INFINITY : threshold;

        btns.push(
            <Button label={language.pager.previousPage} value="prev"
                onClick={me.onButtonClick} disabled={me.props.disabled || value <= min} key="prev"/>
        );

        var i = min;
        var before = false;
        var after = false;
        while(i < max + 1) {
            if (i < value - threshold && i !== min) {
                if (!before) {
                    before = true;
                    btns.push(<Button {...prop} label=".." value={value - threshold - 1} key={value - threshold - 1}/>);
                }
                i++;
                continue;
            }
            if (i > value + threshold && i !== max) {
                if (!after) {
                    after = true;
                    btns.push(<Button {...prop} label=".." value={value + threshold + 1} key={value + threshold + 1}/>);
                }
                i++;
                continue;
            }
            var prop = {
                skin: i + '' === value + '' ? 'active' : '',
                minWidth: 12,
                disabled: me.props.disabled,
                onClick: me.onButtonClick
            };
            btns.push(<Button {...prop} label={i + ''} value={i} key={i}/>);
            i++;
        }

        btns.push(
            <Button label={language.pager.nextPage} value="next"
                onClick={me.onButtonClick} disabled={me.props.disabled || value >= max} key="next"/>
        );

        return btns;
    }


});
