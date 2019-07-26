import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {
    AtList,
    AtListItem,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

// import {asyncGetStarCount} from '../../actions/manager'

import './index.less'

const AGENCY_ROUTE = [
    {title: '增加服务', url: '/pages/manager-addService/index'},
    {title: '增加排课', url: '/pages/manager-addClass/index'},
    {title: '添加奖品', url: '/pages/manager-addPrize/index'},
    {title: '添加规则', url: '/pages/manager-addRule/index'},
];


@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    // asyncGetStarCount() {
    //     return dispatch(asyncGetStarCount())
    // },
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '机构'
    }

    state = {
    }

    componentDidShow() {
    }

    render() {

        return (
            <View className='index'>
                <View className='page-section'>
                    <Text>管理人员</Text>
                </View>

                <View>
                    <Text>功能选择：</Text>
                </View>

                <View>
                    <AtList>
                        {
                            AGENCY_ROUTE.map((r, index) => (<AtListItem
                                key={index}
                                title={r.title}
                                arrow='right'
                                onClick={this.handleClick.bind(this, r)}
                            />))
                        }
                    </AtList>
                </View>
            </View>
        )
    }

    handleClick = route => {
        Taro.navigateTo({url: route.url});
    }
}

export default Student
