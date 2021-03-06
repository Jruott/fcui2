define(function (require) {

    var React = require('react');
    var RangeCalendar = require('fcui/RangeCalendar.jsx');
    var calendarTools = require('fcui/core/calendarTools');

    var timer = new Date();
    var tmpValue = timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + (timer.getDate() - 5)
        + ';' + timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + (timer.getDate() + 5)

    var items = [
        {
            title: 'Normal RangeCalendar',
            onChange: true,
            props: {}
        },
        {
            title: 'RangeCalendar with ClassName',
            onChange: true,
            props: {className: 'marginLeft100 border2'}
        },
        {
            title: 'Readonly RangeCalendar',
            onChange: true,
            props: {value: tmpValue}
        },
        {
            title: 'Disabled RangeCalendar',
            onChange: true,
            props: {disabled: true}
        },
        {
            title: 'RangeCalendar with ValueLinker',
            valueLink: true,
            props: {}
        },
        {
            title: 'Custom Link RangeCalendar',
            customLink: true,
            props: {}
        },
        {
            title: 'RangeCalendar with Min and Max',
            onChange: true,
            props: {
                min: timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + (timer.getDate() - 5),
                max: timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + (timer.getDate() + 5)
            }
        },
        {
            title: 'RangeCalendar with ShortCut',
            onChange: true,
            props: {
                shortCut: [
                    {label: '今天', getValues: calendarTools.getDataRange.today},
                    {label: '昨天', getValues: calendarTools.getDataRange.yesterday},
                    {label: '前天', getValues: calendarTools.getDataRange.beforeYesterday},
                    {label: '上周', getValues: calendarTools.getDataRange.lastWeek},
                    {label: '过去7天', getValues: calendarTools.getDataRange.last7},
                    {label: '过去14天', getValues: calendarTools.getDataRange.last14},
                    {label: '过去30天', getValues: calendarTools.getDataRange.last30},
                    {label: '本月', getValues: calendarTools.getDataRange.currentMonth},
                    {label: '上月', getValues: calendarTools.getDataRange.lastMonth},
                    {label: '上季度', getValues: calendarTools.getDataRange.lastQuarter}
                ]
            }
        },
        {
            title: 'RangeCalendar with ShortCut and Min and Max',
            onChange: true,
            props: {
                min: timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + (timer.getDate() - 5),
                max: timer.getFullYear() + '-' + (timer.getMonth() + 1) + '-' + (timer.getDate() + 5),
                shortCut: [
                    {label: '今天', getValues: calendarTools.getDataRange.today},
                    {label: '昨天', getValues: calendarTools.getDataRange.yesterday},
                    {label: '前天', getValues: calendarTools.getDataRange.beforeYesterday},
                    {label: '上周', getValues: calendarTools.getDataRange.lastWeek},
                    {label: '过去7天', getValues: calendarTools.getDataRange.last7},
                    {label: '过去14天', getValues: calendarTools.getDataRange.last14},
                    {label: '过去30天', getValues: calendarTools.getDataRange.last30},
                    {label: '本月', getValues: calendarTools.getDataRange.currentMonth},
                    {label: '上月', getValues: calendarTools.getDataRange.lastMonth},
                    {label: '上季度', getValues: calendarTools.getDataRange.lastQuarter}
                ]
            }
        },
        {
            title: 'RangeCalendar with RangeValidator',
            onChange: true,
            props: {
                rangeValidator: function (v1, v2) {
                    var d = v2.getTime() - v1.getTime();
                    d = parseInt(d / (1000 * 60 * 60 * 24), 10); 
                    return d > 3 ? '时间跨度不能超过3天' : true;
                }
            }
        }
    ];

    function setter(me, field) {
        return function (e) {
            var obj = {};
            obj[field] = e.target.value;
            me.setState(obj);
        }
    }

    function factory(me, items) {
        var widgets = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var prop = item.props;
            var conf = JSON.stringify(prop);
            if (item.onChange) prop.onChange = me.changeHandler;
            if (item.valueLink) {
                prop.valueLink = me.linkState(item.title);
                conf = '{valueLink: this.linkState(\'message\')}';
            }
            if (item.customLink) {
                prop.value = me.state[item.title];
                prop.onChange = setter(me, item.title);
                conf = '{value: this.state.message, onChange: this.changeHandler}';
            }
            widgets.push(
                <div className="demo-item" key={i}>
                    <h3>{item.title}</h3>
                    <div className="props">{conf}</div>
                    <RangeCalendar {...prop}/>
                    <span>{me.state[item.title]}</span>
                </div>
            );
        }
        return widgets;
    }


    return React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        // @override
        getDefaultProps: function () {
            return {
                alert: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        changeHandler: function (e) {
            this.props.alert(e.target.value);
        },
        render: function () {
            return (<div>{factory(this, items)}</div>);
        }
    });
});
