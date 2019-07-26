import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {
    AtList,
    AtListItem,
} from 'taro-ui'

import './index.less'
import Title from '../../components/common-title'

const AGENCY_ROUTE = [
    {title: '增加服务', url: '/pages/manager-addService/index'},
    {title: '增加排课', url: '/pages/manager-addClass/index'},
    {title: '添加奖品', url: '/pages/manager-addPrize/index'},
    {title: '添加规则', url: '/pages/manager-addRule/index'},
];


class Student extends Component {

    config = {
        navigationBarTitleText: '机构管理'
    }

    state = {
    }

    componentDidShow() {
    }

    render() {

        return (
            <View className='index'>
                <Title title='功能选择' />

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
