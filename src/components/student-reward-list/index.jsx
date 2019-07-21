import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text,} from '@tarojs/components'
import {
    AtList,
    AtListItem,
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
} from 'taro-ui'

import './index.less'

class RewardList extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        showModal: false,
        selectItem: {id: 1, name: '凌美钢笔', stock: 100, cost: 30},
        list: [
            {id: 1, name: '凌美钢笔', stock: 100, cost: 30},
            {id: 2, name: '派克签字笔', stock: 5, cost: 20},
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
        const {showModal, list, selectItem} = this.state;

        return (
            <View className='reward-list'>
                <AtList>
                    {
                        list.map((t, index) => {

                            return <AtListItem
                                key={index}
                                arrow='right'
                                title={`${t.id}. ${t.name}`}
                                note={`花费${t.cost} 库存${t.stock}`}
                                iconInfo={{size: 25, color: '#939393', value: 'list'}}
                                onClick={this.handleRewardClick.bind(this, t)}
                            />
                        })
                    }
                </AtList>

                <AtModal
                    className='my-modal'
                    isOpened={showModal}
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
                </AtModal>
            </View>
        )
    }

    toggle = show => {
        show = typeof show === 'boolean' ? show : !this.state.showModal;
        this.setState({showModal: show});
    }

    handleRewardClick = (value, e) => {
        this.setState({selectItem: value});
        this.toggle();
    }

    handleClose = e => {
        this.toggle();
    }
    handleCancel = e => {
        this.toggle();
    }
    handleConfirm = e => {
        this.toggle();
    }

    exchangeReward = () => {

    }
}

export default RewardList
