import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {
    AtButton,
} from 'taro-ui'
import StudentList from '../../components/common-student-list'
import './index.less'
const TABLE_HEAD = {student_id: '编号', name: '姓名', star_count: '星数', checked: '选择'}

class UserInfo extends Component {

    config = {
        navigationBarTitleText: '学生'
    }

    render() {
        const {counter = {}, toggleChecked, toggleModal} = this.props;
        const {list = []} = counter;

        return (
            <View className='content'>
                <View className='info' onClick={this.getAllStudent}>
                    查看全部学生
                </View>
                <Text className='note'>
                    操作提示：先选择学生后面的'√'，再进行评分，
                    可一次选择多位学生进行评分
                </Text>
                <View className='edit'>
                    <AtButton
                        size='small'
                        type='primary'
                        onClick={toggleModal}
                    >评定</AtButton>
                </View>

                <View className='students'>
                    <StudentList
                        type={'thead'}
                        item={TABLE_HEAD}
                    />

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

    getAllStudent = e => {
        Taro.navigateTo({url: '/pages/teacher-students/index'})
    }
}

export default UserInfo
