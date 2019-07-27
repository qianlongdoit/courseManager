import Taro, {Component} from '@tarojs/taro'
import {View, Text, Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
    AtForm,
    AtInput,
    AtButton,
    AtTag,
} from 'taro-ui'
import {asyncLogin, login} from '../../actions/user'

import './index.less'

const LOGIN_URL = {
    '2': '/pages/student/index',
    '3': '/pages/parents/index',
    '1': '/pages/teacher/index',
    '0': '/pages/manager/index',
}


@connect(({user}) => ({
    user
}), (dispatch) => ({
    asyncLogin(data) {
        return dispatch(asyncLogin(data))
    },
    login(data) {
        dispatch(login(data))
    }
}))
class Index extends Component {

    config = {
        navigationBarTitleText: '首页'
    }

    state = {
        info: {},
        loading: false,
        selector: [
            {title: '家长', user_type: 3},
            {title: '学生', user_type: 2},
            {title: '老师', user_type: 1},
            {title: '机构', user_type: 0},
        ],
        // selectorChecked: {title: '学生', user_type: 2},
        // selectorChecked: {title: '老师', user_type: 1},
        selectorChecked: {title: '机构', user_type: 0},
        region: {
            value: ["北京市", "北京市", "东城区"],
            code: ["110000", "110100", "110101"],
            postcode: ''
        },
        // user_id: '',
        // user_password: '',
        // user_id: '001000100001',
        // user_password: 'test2',
        // user_id: '001000100001',    //学生
        // user_password: 'test1',
        // user_id: '0010001',
        // user_password: 'test',
        user_id: '001',
        user_password: 'test',
    }

    render() {
        const {
            loading,
            selector,
            selectorChecked,
            region,
            user_id,
            user_password,
        } = this.state;

        return (
            <View className='index'>
                <View>
                    <Picker mode='selector' range-key='title' range={selector} onChange={this.onRoleChange}>
                        <View className='picker'>
                            <Text className='label'>选择登陆身份：</Text>
                            <AtTag type='primary'>{selectorChecked.title}</AtTag>
                        </View>
                    </Picker>
                </View>

                <AtForm
                    onSubmit={this.onSubmit.bind(this)}
                >
                    <View>
                        {
                            selectorChecked.user_type === 2 &&
                            <Picker
                                mode="region"
                                user_type={region.code}
                                onChange={this.onRegionChange}
                            >
                                <View className='picker'>
                                    <Text className='label'>选择区域：</Text>
                                    <Text className='form-user_type'>
                                        {region.value[0]} {region.value[1]} {region.value[2]}
                                    </Text>
                                </View>
                            </Picker>
                        }
                        <View>
                            <AtInput
                                title='账号'
                                placeholder='输入账号'
                                value={user_id}
                                onChange={this.onAccountChange}
                            />
                        </View>
                        <View>
                            <AtInput
                                title='密码'
                                placeholder='密码'
                                type='password'
                                value={user_password}
                                onChange={this.onPwdChange}
                            />
                        </View>

                        <AtButton
                            loading={loading}
                            type='primary'
                            formType='submit'
                        >登陆</AtButton>
                    </View>
                </AtForm>
            </View>
        )
    }

    onRoleChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }

    onRegionChange = (e) => {
        this.setState({region: e.detail})
    }

    onAccountChange = e => this.setState({user_id: e})
    onPwdChange = e => this.setState({user_password: e})

    onSubmit = () => {
        const {
            selectorChecked,
            user_id,
            user_password,
            region: {value},
        } = this.state;

        if (!user_id || !user_password) {
            return Taro.showToast({
                title: '请填写完整登陆信息!',
            })
        }

        let data = {
            user_id,
            user_password,
            user_type: selectorChecked.user_type,
        };

        if (selectorChecked.user_type === 3) {
            data = Object.assign({
                province: value[0],
                city: value[1],
                region: value[2]
            }, data);
        }

        this.setState({loading: true});
        this.props.asyncLogin(data)
            .then(res => {
                const {code, data: response, msg} = res;
                if (code !== 200) {
                    Taro.showToast({
                        title: msg,
                        icon: 'none',
                    });
                } else {
                    Taro.navigateTo({
                        url: LOGIN_URL[selectorChecked.user_type]
                    });
                }
                this.setState({loading: false})
            })
            .catch(e => {
                this.setState({loading: false})
                console.error(e);
            })
    }
}

export default Index
