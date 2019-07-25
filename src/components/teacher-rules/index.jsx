import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtList,
    AtListItem,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
} from 'taro-ui'

import './index.less'

class UserInfo extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        // list: [
        //     {id: '1', title: '2倍奖励', describe: '评分高于90%的学生', time: ''},
        //     {id: '2', title: '0.8倍奖励', describe: '评分低于90%的学生', time: ''},
        // ],
    }

    render() {
        const {rules = []} = this.props;

        return (
            <View className='user-info'>
                <AtList>
                    {
                        (rules || []).map((t, index) => {

                            return <AtListItem
                                key={index}
                                arrow='right'
                                title={`${t.id}. ${t.title}`}
                                note={`${t.describe}`}
                                iconInfo={{size: 25, color: '#939393', value: 'list'}}
                                onClick={this.props.selectRule.bind(this, t)}
                            />
                        })
                    }
                </AtList>
            </View>
        )
    }
}

export default UserInfo
