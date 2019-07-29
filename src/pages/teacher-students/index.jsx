import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {
    AtIcon,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import './index.less'
import Title from "../../components/common-title";


@connect(({teacher}) => ({
    teacher,
}), (dispatch) => ({

}))
class Students extends Component {
    config = {
        navigationBarTitleText: '学生信息'
    }

    render() {
        const {
            teacher: {
                list = []
            },
        } = this.props;

        return (
            <View>
                <Title title='学生名册' />

                    <View className='list-item'>
                        <View className='head'>编号(后五位)</View>
                        <View className='head'>姓名</View>
                        <View className='head'>名次</View>
                    </View>

                    {
                        list.map((l, index) => {
                            return (<View key={index} className='list-item'>
                                <View>{`${l.student_id}`.slice(-5)}</View>
                                <View>{l.name}</View>
                                <View>{'暂无'}</View>
                            </View>)
                        })
                    }
            </View>
        )
    }
}

export default Students
