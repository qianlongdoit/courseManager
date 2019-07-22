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
        selectItem: {},
        list: [
            {id: '1', title: '2倍奖励', describe: '评分高于90%的学生', time: ''},
            {id: '2', title: '0.8倍奖励', describe: '评分低于90%的学生', time: ''},
        ],
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
        const {selectItem, list} = this.state;

        return (
            <View className='user-info'>
                <AtList>
                    {
                        list.map((t, index) => {

                            return <AtListItem
                                key={index}
                                arrow='right'
                                title={`${t.id}. ${t.title}`}
                                note={`${t.describe}`}
                                iconInfo={{size: 25, color: '#939393', value: 'list'}}
                                onClick={this.getMoreDetail.bind(this, t)}
                            />
                        })
                    }
                </AtList>

                {/*<AtModal
                    className='my-modal'
                    isOpened={false}
                    onClose={this.handleClose}
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
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={this.handleCancel}
                        >取消</Button>
                        <Button
                            onClick={this.handleConfirm}
                        >兑换</Button>
                    </AtModalAction>
                </AtModal>*/}
            </View>
        )
    }

    toggle = show => {
        show = typeof show === 'boolean' ? show : !this.state.showModal;
        this.setState({showModal: show});
    }

    getMoreDetail = (item) => {
        this.setState({selectItem: item})
    }
}

export default UserInfo
