import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtList,
    AtListItem,
    AtIcon,
} from 'taro-ui'

import './index.less'

class DailyTask extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        // task: [
        //     {id: 1, title: '任务标题1', describe: '描述信息', deadline: '2019-07-12 20:00:00', reward: '这里是奖励'},
        //     {id: 2, title: '任务标题2', describe: '描述信息2', deadline: '', reward: ''},
        // ],
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props, nextProps)
    // }
    //
    // componentWillUnmount() {
    // }
    //
    // componentDidShow() {
    // }
    //
    // componentDidHide() {
    // }

    render() {
        const {task} = this.props;
        return (
            <View className='task-list'>
                <View className='tips'>
                    <Text>说明：</Text>
                    <AtIcon value='check' size='18' color='#3ca440'/> 已完成
                    <AtIcon value='loading' size='18' color='#939393'/> 进行中
                    <AtIcon value='file-new' size='18' color='#939393'/> 未完成
                </View>
                <AtList>
                    {
                        (task || []).map((t, index) => {
                            const hasComplete = t.status === 0;
                            const doing = t.status === 2;
                            const undo = t.status === 1;

                            return <AtListItem
                                key={index}
                                arrow='right'
                                title={`${t.id}. ${t.title}`}
                                note={t.describe}
                                extraText={`奖励 ${t.reward} 星`}
                                iconInfo={
                                    hasComplete
                                        ? {size: 25, color: '#3ca440', value: 'check'}
                                        : undo
                                        ? {size: 25, color: '#939393', value: 'file-new'}
                                        : {size: 25, color: '#939393', value: 'loading'}
                                }
                                onClick={this.handleAcceptTask.bind(this, t)}
                            />
                        })
                    }
                </AtList>
            </View>
        )
    }

    handleAcceptTask = (value, e) => {
        this.props.acceptTask()(value.id)
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
                    this.props.getTaskList()
                }
            })
    }
}

export default DailyTask
