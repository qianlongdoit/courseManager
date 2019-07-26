import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtButton,
} from 'taro-ui'
import StudentList from '../../components/common-student-list'
import './index.less'

class UserInfo extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    state = {
        // list: [
        //     {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'},
        //     {student_id: '1', name: '王大锤', star_count: 5, checked: true},
        //     {student_id: '2', name: '陆小凤', star_count: 15, checked: false},
        // ],
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
        const {counter = {}, toggleChecked, toggleModal} = this.props;
        const {list = []} = counter;

        return (
            <View className='content'>
                <View className='edit'>
                    <AtButton
                        size='small'
                        type='primary'
                        onClick={toggleModal}
                    >评定</AtButton>
                </View>

                <View className='students'>
                    {
                        (list || []).map((t, index) => {
                            return <StudentList
                                key={index}
                                index={index}
                                item={t}
                                toggleChecked={toggleChecked}
                            />
                        })
                    }
                </View>
            </View>
        )
    }
}

export default UserInfo
