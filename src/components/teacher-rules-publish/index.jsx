import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtForm,
    AtInput,
    AtTextarea,
    AtButton,
    AtRate,
} from 'taro-ui'

import './index.less'

class UserInfo extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        task: {
            title: '',
            describe: '',
            reward: 3,
            deadline: '20XX-XX-XX',
        }
    }

    render() {
        const {task: {title, describe, reward, deadline}} = this.state;

        return (
            <View className='task-publish'>
                <AtForm
                    onSubmit={this.onSubmit}
                >
                    <View className='task-title'>发布任务</View>

                    <View className='form-item'>
                        <AtInput
                            name='value'
                            title='标题'
                            type='text'
                            placeholder='输入任务标题'
                            value={title}
                            onChange={this.handleChangeTitle}
                        />
                    </View>

                    <View className='form-item'>
                        <AtTextarea
                            value={describe}
                            onChange={this.handleChangeDescribe}
                            maxLength={200}
                            placeholder='输入任务描述'
                        />
                    </View>

                    <View className='form-item'>
                        <Text className='label'>选择奖励：</Text>
                        <AtRate
                            max={5}
                            value={reward}
                            onChange={this.handleChangeReward}
                        />
                    </View>

                    <View className='form-item'>
                        <Picker
                            mode='date'
                            onChange={this.handleChangeDate}
                        >
                            <View>
                                截止日期：{deadline}
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

    onSubmit = () => {
        const {task} = this.state;
        console.log(task);
        this.props.publishTask()(task)
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
                    this.getStarCount();
                }
            })
    }

    handleChangeTitle = (e) => {
        const {task} = this.state;
        this.setState({task: {...task, title: e}})
    }
    handleChangeDescribe = (e) => {
        const {task} = this.state;
        this.setState({task: {...task, describe: e.target.value}})
    }
    handleChangeReward = (e) => {
        const {task} = this.state;
        this.setState({task: {...task, reward: e}})
    }
    handleChangeDate = e => {
        const {task} = this.state;
        this.setState({task: {...task, deadline: e.detail.value}})
    }
}

export default UserInfo
