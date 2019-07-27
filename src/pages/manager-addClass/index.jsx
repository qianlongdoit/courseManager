import Taro, {Component} from '@tarojs/taro'
import {View, Picker, Text} from '@tarojs/components'
import {
    AtButton,
    AtForm,
    AtInput,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncAddClass} from '../../actions/manager'

import Title from '../../components/common-title'
import './index.less'



@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    asyncAddClass(data) {
        return dispatch(asyncAddClass(data))
    },
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '添加排课'
    }

    state = {
        beginDate: "2019-09-01",
        beginTime: "8:00",
        endDate: "2019-09-01",
        endTime: "8:45",
        course: {teacher_id: "", subject: "尚未选择", name: ""},
    }

    render() {
        const {beginDate, beginTime, endDate, endTime, course} = this.state;
        const {list = []} = this.props.manager;

        return (
            <View className='index'>
                <Title title='添加排课' />

                <AtForm
                    onSubmit={this.onSubmit}
                >
                    <View className='form-item'>
                        <Picker mode='selector' range={list} rangeKey={'subject'} onChange={this.handleChangeSubject}>
                            <View className='form-value'>
                                选择课程：{
                                course.name
                                    ? `${course.subject} - ${course.name}`
                                    : '尚未选择'
                            }
                            </View>
                        </Picker>
                    </View>

                    <View className='form-item'>
                        <Picker mode='date' onChange={this.onTimeChange.bind(this, 'Date', 'begin')}>
                            <View className='form-value'>
                                开始日期：{beginDate}
                            </View>
                        </Picker>
                        <Picker mode='time' onChange={this.onTimeChange.bind(this, 'Time', 'begin')}>
                            <View className='form-value'>
                                开始时间：{beginTime}
                            </View>
                        </Picker>
                    </View>

                    <View className='form-item'>
                        <Picker mode='date' onChange={this.onTimeChange.bind(this, 'Date', 'end')}>
                            <View className='form-value'>
                                结束日期：{endDate}
                            </View>
                        </Picker>
                        <Picker mode='time' onChange={this.onTimeChange.bind(this, 'Time', 'end')}>
                            <View className='form-value'>
                                结束时间：{endTime}
                            </View>
                        </Picker>
                    </View>

                    <View className='btn'>
                        <AtButton
                            formType='submit'
                            type='primary'
                            circle={true}
                        >发布</AtButton>
                    </View>
                </AtForm>
            </View>
        )
    }

    handleChangeSubject = e => {
        const {manager: {list = []}} = this.props;
        this.setState({course: list[e.detail.value]})
    }
    onTimeChange = (type, time, e) => {
        this.setState({[`${time}${type}`]: e.detail.value})
    }

    onSubmit = () => {
        const {beginDate, beginTime, endDate, endTime, course} = this.state;
        if (!course.name || !beginDate || !beginTime || !endDate || !endTime) {
            return Taro.showToast({
                title: '请输入完整信息',
                icon: 'none',
            })
        }

        const {user: {info}} = this.props;
        //  TODO: 获取teacher_id
        const data = {
            token: info.token,
            agency_id: info.user_id,
            user_type: info.user_type,
            teacher_id: course.teacher_id,
            // begin: `${beginDate} ${beginTime}`,
            // end: `${endDate} ${endTime}`,
            begin: `${beginDate}`,
            end: `${endDate}`,
            subject: course.subject,
        };

        this.props.asyncAddClass(data)
            .then(res =>{
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
                    setTimeout(() => Taro.navigateTo({url: '/pages/manager/index'}), 800)
                }
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default Student
