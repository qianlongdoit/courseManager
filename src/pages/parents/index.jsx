import Taro, {Component} from '@tarojs/taro'
import {View, Text } from '@tarojs/components'
import { AtForm } from 'taro-ui'
import {connect} from '@tarojs/redux'

// import {add, minus, asyncAdd} from '../../actions/counter'

import './index.less'
import Stars from '../../components/common-star'


@connect(({parents}) => ({
    parents
}), (dispatch) => ({
    // add() {
    //     dispatch(add())
    // },
    // dec() {
    //     dispatch(minus())
    // },
    // asyncAdd() {
    //     dispatch(asyncAdd())
    // }
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '家长'
    }

    state = {
    }

    componentDidShow() {
        // const {getStarCount} = this.props;
        // getStarCount({});
    }

    render() {
        const {parents = {}} = this.props;
        const {starCount} = parents;

        return (
            <View className='index'>
                <View>
                    <View className='h3'>
                        <Text>学生信息：</Text>
                    </View>

                    <View className='list'>
                        星星数量：
                        <Stars count={starCount}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default Student
