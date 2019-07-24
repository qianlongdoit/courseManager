import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker } from '@tarojs/components'
import {
    AtModal,
    AtModalAction,
    AtModalContent,
    AtModalHeader, AtRate,
    AtTabs,
    AtTabsPane,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {toggleChecked} from '../../actions/student'

import TeacherRule from '../../components/teacher-rules'
import TeacherRulePublish from '../../components/teacher-rules-publish'
import TeacherGradeMark from '../../components/teacher-grade-mark'
import './index.less'

const tabList = [
    {title: '查看规则'},
    {title: '任务管理'},
    {title: '学生评分'},
    // {title: '学生信息'},
];


@connect(({student}) => ({
    student
}), (dispatch) => ({
    toggleChecked(key) {
        dispatch(toggleChecked(key))
    }
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '老师'
    }

    state = {
        showModal: false,
        stars: 0,
        current: 2,
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        const {current, showModal, stars} = this.state;
        const {counter, toggleChecked} = this.props;

        return (
            <View className='index'>
                <AtTabs
                    current={current}
                    tabList={tabList}
                    onClick={this.handleChangeTab}
                >
                    <AtTabsPane current={current} index={0}>
                        <TeacherRule />
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        <TeacherRulePublish />
                    </AtTabsPane>
                    <AtTabsPane
                        current={current}
                        index={2}
                    >
                        <TeacherGradeMark
                            counter={counter}
                            toggleChecked={toggleChecked}
                            toggleModal={this.toggle}
                        />
                    </AtTabsPane>
                    <AtTabsPane current={current} index={3}>
                        ddd
                    </AtTabsPane>
                </AtTabs>


                <AtModal
                    className='my-modal'
                    isOpened={showModal}
                    onClose={this.handleClose}
                >
                    <AtModalHeader>选择评定等级</AtModalHeader>
                    <AtModalContent>
                        <View className='stars'>
                            <Text>星数：</Text>
                            <AtRate
                                max={5}
                                value={stars}
                                onChange={this.handleChangeStars}
                            />
                        </View>
                        <View className='level'>
                            <Text>等级：</Text>
                            {'A'}
                        </View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={this.handleCancel}
                        >取消</Button>
                        <Button
                            onClick={this.handleConfirm}
                        >确定</Button>
                    </AtModalAction>
                </AtModal>
            </View>
        )
    }

    handleChangeTab = value => this.setState({current: value})

    toggle = show => {
        show = typeof show === 'boolean' ? show : !this.state.showModal;
        this.setState({showModal: show});
    }
    handleCancel = () => {
        this.toggle()
    }
    handleConfirm = () => {
        this.toggle();
    }
    handleClose = () => {
        this.toggle();
    }
    handleChangeStars = (e) => {
        this.setState({stars: e});
    }
}

export default Student
