import Taro, {Component} from '@tarojs/taro'
import {View, Picker, Text} from '@tarojs/components'
import {
    AtButton,
    AtForm,
    AtInput,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncAddClass} from '../../actions/manager'

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
        begin: undefined,
        end: undefined,
        subject: undefined,
    }

    render() {
        const {begin, end, subject} = this.state;
        return (
            <View className='index'>
                <View className='page-section'>
                    <Text>添加排课</Text>
                </View>

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
                        <Picker mode='time' onChange={this.onStartTimeChange}>
                            <View className='picker'>
                                开始时间：{begin}
                            </View>
                        </Picker>
                    </View>

                    <View className='form-item'>
                        <Picker mode='time' onChange={this.onEndTimeChange}>
                            <View className='picker'>
                                结束时间：{end}
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
    onStartTimeChange = e => {
        this.setState({
            begin: e.detail.value
        })
    }
    onEndTimeChange = e => {
        this.setState({
            begin: e.detail.value
        })
    }

    onSubmit = () => {
        const {start, end, subject} = this.state;
        if (!subject || !start || !end) {
            Taro.showToast({
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
            start,
            end,
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
