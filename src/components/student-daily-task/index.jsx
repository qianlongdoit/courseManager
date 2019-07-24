import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtList,
    AtListItem,
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
                <AtList>
                    {
                        (task || []).map((t, index) => {
                            const hasComplete = !!t.deadline;

                            return <AtListItem
                                key={index}
                                arrow='right'
                                title={`${t.id}. ${t.title}`}
                                note={t.describe}
                                extraText={t.reward}
                                iconInfo={
                                    hasComplete
                                     ? {size: 25, color: '#3ca440', value: 'check'}
                                     : {size: 25, color: '#939393', value: 'list'}
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
        console.log(value);
        this.props.acceptTask()(value.id)
    }
}

export default DailyTask
