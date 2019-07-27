import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtModal,
    AtModalAction,
    AtModalContent,
    AtModalHeader,
    AtTabs,
    AtTabsPane,
    AtTextarea,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {
    asyncGetStarCount,
    asyncGetTaskList,
    asyncAcceptTask,
    asyncGetRewardList,
    asyncExchangeReward,
    selectReward,
} from '../../actions/student'

import UserInfo from '../../components/student-stars/index'
import DailyTask from '../../components/student-daily-task/index'
import RewardList from '../../components/student-reward-list/index'
import './index.less'

const tabList = [
    {title: '我'},
    {title: '每日任务'},
    {title: '兑换奖品'}
];

@connect(({user, student}) => ({
    user,
    student,
}), (dispatch) => ({
    getStarCount(data) {
        dispatch(asyncGetStarCount(data))
    },
    asyncGetTaskList(data) {
        return dispatch(asyncGetTaskList(data))
    },
    asyncAcceptTask(data) {
        return dispatch(asyncAcceptTask(data))
    },
    asyncGetRewardList(data) {
        return dispatch(asyncGetRewardList(data))
    },
    asyncExchangeReward(data) {
        return dispatch(asyncExchangeReward(data))
    },
    selectReward(data) {
        return dispatch(selectReward(data))
    },
}))
class Student extends Component {
    config = {
        navigationBarTitleText: '学生',
    }

    state = {
        current: 0,
        showModal: false,
        address: '',
        region: {
            value: ["北京市", "北京市", "东城区"],
            code: ["110000", "110100", "110101"],
            postcode: ''
        },
    }

    componentDidShow = () => {
        this.getStarCount();
        this.getTaskList();
        this.getRewardList();
    }

    render() {
        const {current, showModal, region, address} = this.state;
        const {student} = this.props;
        const {
            studentStars,
            taskList = [],
            selectItem = {},
        } = student;

        return (
            <View>
                <AtTabs current={current} tabList={tabList} onClick={this.handleChangeTab}>
                    <AtTabsPane current={current} index={0}>
                        <UserInfo
                            title={'个人信息：'}
                            studentStars={studentStars}
                        />
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        <DailyTask
                            task={taskList}
                            acceptTask={this.acceptTask}
                            getTaskList={this.getTaskList}
                        />
                    </AtTabsPane>
                    <AtTabsPane current={current} index={2}>
                        <RewardList
                            {...student}
                            handleRewardClick={this.handleRewardClick}
                        />
                    </AtTabsPane>
                </AtTabs>

                <AtModal
                    className='my-modal'
                    isOpened={showModal}
                    onClose={this.toggle}
                >
                    <AtModalHeader>标题</AtModalHeader>
                    <AtModalContent>
                        <View>
                            确认花费
                            <Text className='count'>{selectItem.cost}</Text>
                            星兑换奖品
                            <Text className='item'>{selectItem.name}</Text>
                            吗？
                        </View>

                        <View className='form-item'>
                            <View className='h3'>选择收货地址</View>
                            <Picker
                                mode='region'
                                range={this.state.selector}
                                onChange={this.onRegionChange}
                            >
                                <View className='picker'>
                                    当前选择：{`${region.value[0]} - ${region.value[1]} - ${region.value[2]}`}
                                </View>
                            </Picker>
                        </View>

                        <View className='form-item'>
                            <AtTextarea
                                onChange={this.handleChangeAddress}
                                maxLength={200}
                                placeholder='填写详细地址，如街道、门牌号'
                                placeholderClass={`{fontSize: '12px', color: '#333'}`}
                            />
                        </View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={this.toggle}
                        >取消</Button>
                        <Button
                            onClick={this.handleConfirm}
                        >兑换</Button>
                    </AtModalAction>
                </AtModal>
            </View>
        )
    }


    onRegionChange = (e) => {
        this.setState({region: e.detail})
    }

    handleChangeAddress = e => {
        this.setState({address: e.target.value});
    }

    handleChangeTab = value => this.setState({current: value})

    getStarCount = () => {
        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id,
            user_type: info.user_type,
        };

        this.props.getStarCount(data);
    }

    getTaskList = () => {
        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id,
            user_type: info.user_type,
        };

        this.props.asyncGetTaskList(data);
    }

    acceptTask = () => {
        const {user: {info}, asyncAcceptTask} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id,
            user_type: info.user_type,
        };

        return (task_id) => asyncAcceptTask({...data, task_id});
    }

    getRewardList = () => {
        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id,
            user_type: info.user_type,
        };

        this.props.asyncGetRewardList(data);
    }

    exchangeReward = () => {
        const {region, address} = this.state;
        const {user: {info}, student: {selectItem = {}}} = this.props;
        //  TODO: 获取地址
        const data = {
            token: info.token,
            student_id: info.user_id,
            user_type: info.user_type,
            prize_id: selectItem.id,
            address: `${region.value.join('-')}, ${address}`,
        };

        this.props.asyncExchangeReward(data)
            .then(res => {
                const {code, data: response, msg} = res;
                if (code !== 200) {
                    Taro.showToast({
                        title: msg,
                        icon: 'none',
                    });
                } else {
                    Taro.showToast({
                        title: msg,
                        icon: 'success',
                    });
                    this.getStarCount();
                }
            })
    }

    toggle = show => {
        show = typeof show === 'boolean' ? show : !this.state.showModal;
        this.setState({showModal: show});
    }

    handleRewardClick = (value, e) => {
        this.props.selectReward(value);
        this.toggle();
    }

    handleConfirm = e => {
        this.exchangeReward();
        this.toggle();
    }
}

export default Student
