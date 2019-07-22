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
        }
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
        const {task: {title, describe, reward}} = this.state;

        return (
            <View className='task-publish'>
                <AtForm
                    onSubmit={this.onSubmit}
                    // onReset={this.onReset}
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

                    <View className='btn'>
                        <AtButton
                            formType='submit'
                            type='primary'
                            circle={true}
                        >发布</AtButton>
                    </View>
                    {/*<View className='btn'>
                        <AtButton
                            circle={true}
                            formType='reset'
                        >重置</AtButton>
                    </View>*/}
                </AtForm>
            </View>
        )
    }

    onSubmit = () => {
        const {task} = this.state;
        console.log(task);
    }

    onReset = () => {

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
}

export default UserInfo
