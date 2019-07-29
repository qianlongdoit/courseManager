import Taro, {Component} from '@tarojs/taro'
import {View, Picker, Text} from '@tarojs/components'
import {
    AtButton,
    AtForm,
    AtInput,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncAddClass} from '../../actions/manager'

import Title from '../../components/common-title'
import './index.less'


@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    asyncAddClass(data) {
        return dispatch(asyncAddClass(data))
    },
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '老师管理'
    }

    render() {
        const {list = []} = this.props.manager;

        return (
            <View className='index'>
                <Title title='老师名册' />

                <View key={index} className='header'>
                    <View>编号</View>
                    <View>姓名</View>
                    <View>科目</View>
                </View>
                {
                    list.map((l, index) => {
                        return (<View key={index} className='list-item'>
                            <View>{l.teacher_id}</View>
                            <View>{l.name}</View>
                            <View>{l.subject}</View>
                        </View>)
                    })
                }
            </View>
        )
    }


}

export default Student
