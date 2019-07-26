import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {
    AtModal,
    AtModalAction,
    AtModalContent,
    AtModalHeader, AtRate,
    AtTabs,
    AtTabsPane,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {
    selectRule,
    toggleChecked,
    asyncGetRules,
    asyncPublishRule,
    asyncEditStar,
    asyncGetStudentStatus,
} from '../../actions/teacher'

import TeacherRule from '../../components/teacher-rules'
import TeacherRulePublish from '../../components/teacher-rules-publish'
import TeacherGradeMark from '../../components/teacher-grade-mark'
import './index.less'

const TABLE_LIST = [
    {title: '查看规则'},
    {title: '任务管理'},
    {title: '学生评分'},
    // {title: '学生信息'},
];


@connect(({user, teacher}) => ({
    user,
    teacher,
}), (dispatch) => ({
    selectRule(key) {
        return dispatch(selectRule(key))
    },
    toggleChecked(key) {
        return dispatch(toggleChecked(key))
    },
    asyncGetRules(data) {
        return dispatch(asyncGetRules(data))
    },
    asyncPublishRule(data) {
        return dispatch(asyncPublishRule(data))
    },
    asyncEditStar(data) {
        return dispatch(asyncEditStar(data))
    },
    asyncGetStudentStatus(data) {
        return dispatch(asyncGetStudentStatus(data))
    },
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '老师'
    }

    state = {
        showMoreDetailModal: false,
        showModal: false,
        stars: 0,
        current: 2,
    }

    componentDidShow() {
        this.getRules();
        this.getStudentStatus();
    }

    render() {
        const {
            current,
            showModal,
            showMoreDetailModal,
            stars,
        } = this.state;
        const {
            teacher = {},
            toggleChecked,
        } = this.props;
        const {selectedRule = {}} = teacher;

        return (
            <View className='index'>
                <AtTabs
                    current={current}
                    tabList={TABLE_LIST}
                    onClick={this.handleChangeTab}
                >
                    <AtTabsPane current={current} index={0}>
                        <TeacherRule
                            rules={teacher.rules}
                            selectRule={this.handleRuleSelect}
                        />
                    </AtTabsPane>

                    <AtTabsPane current={current} index={1}>
                        <TeacherRulePublish
                            publishTask={this.handlePublishTask}
                        />
                    </AtTabsPane>

                    <AtTabsPane
                        current={current}
                        index={2}
                    >
                        <TeacherGradeMark
                            counter={teacher}
                            toggleChecked={toggleChecked}
                            toggleModal={this.toggle}
                        />
                    </AtTabsPane>
                </AtTabs>

                {/*规则详情*/}
                <AtModal
                    className='my-modal'
                    isOpened={showMoreDetailModal}
                    onClose={this.toggleRuleModal}
                >
                    <AtModalHeader>规则详情</AtModalHeader>
                    <AtModalContent>
                        <View>
                            {selectedRule.describe}
                        </View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={this.toggleRuleModal}
                        >确定</Button>
                    </AtModalAction>
                </AtModal>

                {/*评级*/}
                <AtModal
                    className='my-modal'
                    isOpened={showModal}
                    onClose={this.toggle}
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
                        {/*<View className='level'>
                            <Text>等级：</Text>
                            {'A'}
                        </View>*/}
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={this.toggle}
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

    getRules = () => {
        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            teacher_id: info.user_id,
            user_type: info.user_type,
        };
        this.props.asyncGetRules(data)
    }

    getStudentStatus = () => {
        const {user: {info}} = this.props;
        // TODO: 获取机构id
        const data = {
            token: info.token,
            // engency_id: info.user_id,
            user_type: info.user_type,
        };

        this.props.asyncGetStudentStatus(data);
    }

    toggleRuleModal = show => {
        show = typeof show === 'boolean' ? show : !this.state.showMoreDetailModal;
        this.setState({showMoreDetailModal: show});
    }

    handleRuleSelect = (rule) => {
        this.props.selectRule(rule);
        this.toggleRuleModal()
    }

    handlePublishTask = () => {
        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            teacher_id: info.user_id,
            user_type: info.user_type,
        };
        return (params) => this.props.asyncPublishRule({...params, ...data});
    }

    toggle = show => {
        show = typeof show === 'boolean' ? show : !this.state.showModal;
        this.setState({showModal: show});
    }
    handleConfirm = () => {
        const {star} = this.state;
        const {teacher = {}, user: {info}} = this.props;
        const students = (teacher.list || []).filter((l, index) => !!l.checked && index).map(l => l.student_id);

        const data = {
            count: star,
            students,
            user_type: info.user_type,
            token: info.token,
        };

        this.props.asyncEditStar(data)
            .then(res => {
                const {code, data: response, msg} = res;
                if (code !== 200) {
                    Taro.showToast({
                        title: msg,
                        icon: 'none',
                    });
                } else {
                    this.toggle();
                }
        })
    }
    handleChangeStars = (e) => {
        this.setState({stars: e});
    }
}

export default Student
