import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {
    AtList,
    AtListItem,
} from 'taro-ui'

import './index.less'

class RewardList extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        // showModal: false,
        // selectItem: {id: 1, name: '凌美钢笔', stock: 100, cost: 30},
        // list: [
        //     {id: 1, name: '凌美钢笔', stock: 100, cost: 30},
        //     {id: 2, name: '派克签字笔', stock: 5, cost: 20},
        // ],
    }

    render() {
        const {rewardList = []} = this.props;

        return (
            <View className='reward-list'>
                <AtList>
                    {
                        rewardList.map((t, index) => {
                            return <AtListItem
                                key={index}
                                arrow='right'
                                title={`${t.id}. ${t.name}`}
                                note={`花费${t.cost} 库存${t.stock}`}
                                iconInfo={{size: 25, color: '#939393', value: 'list'}}
                                onClick={this.props.handleRewardClick.bind(this, t)}
                            />
                        })
                    }
                </AtList>
            </View>
        )
    }
}

export default RewardList
