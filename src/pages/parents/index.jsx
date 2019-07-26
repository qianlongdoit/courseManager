import Taro, {Component} from '@tarojs/taro'
import {View, Text } from '@tarojs/components'
import { AtForm } from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncGetStarCount} from '../../actions/parents'

import './index.less'
import Stars from '../../components/common-star'


@connect(({user, parents}) => ({
    user,
    parents,
}), (dispatch) => ({
    asyncGetStarCount(data) {
        return  dispatch(asyncGetStarCount(data))
    },
}))
class Student extends Component {

    config = {
        navigationBarTitleText: '家长'
    }

    state = {
    }

    componentDidShow() {
        this.getStudentStar();
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

    getStudentStar = () => {
        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            student_id: info.user_id,
            user_type: info.user_type,
        };

        this.props.asyncGetStarCount(data)
    }
}

export default Student
