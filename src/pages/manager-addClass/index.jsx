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
        subject: undefined,
    }

    render() {
        const {beginDate, beginTime, endDate, endTime, subject} = this.state;
        return (
            <View className='index'>
                <Title title='添加排课' />

                <AtForm
                    onSubmit={this.onSubmit}
                >
                    <View className='form-item'>
                        <AtInput
                            name='subject'
                            title='名称'
                            type='text'
                            placeholder='输入课程名称'
                            value={subject}
                            onChange={this.handleChangeSubject}
                        />
                    </View>

                    <View className='form-item'>
                        <Picker mode='date' onChange={this.onTimeChange.bind(this, 'Date', 'begin')}>
                            <View className='picker'>
                                开始日期：{beginDate}
                            </View>
                        </Picker>
                        <Picker mode='time' onChange={this.onTimeChange.bind(this, 'Time', 'begin')}>
                            <View className='picker'>
                                开始时间：{beginTime}
                            </View>
                        </Picker>
                    </View>

                    <View className='form-item'>
                        <Picker mode='date' onChange={this.onTimeChange.bind(this, 'Date', 'end')}>
                            <View className='picker'>
                                结束日期：{endDate}
                            </View>
                        </Picker>
                        <Picker mode='time' onChange={this.onTimeChange.bind(this, 'Time', 'end')}>
                            <View className='picker'>
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
        this.setState({subject: e})
    }
    onTimeChange = (type, time, e) => {
        this.setState({[`${time}${type}`]: e.detail.value})
    }

    onSubmit = () => {
        const {beginDate, beginTime, endDate, endTime, subject} = this.state;
        if (!subject || !beginDate || !beginTime || !endDate || !endTime) {
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
            // teacher_id: info.user_type,
            start: `${beginDate} ${beginTime}`,
            end: `${endDate} ${endDate}`,
            subject,
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
                }
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default Student
