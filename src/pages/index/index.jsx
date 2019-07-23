import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
    AtForm,
    AtInput,
    AtButton,
    AtTag,
    AtToast,
} from 'taro-ui'
import {asyncLogin, login, netError} from '../../actions/counter'

import './index.less'
import {url} from "../../uitls/config";
import api from "../../uitls/api";


@connect(({counter}) => ({
    counter
}), (dispatch) => ({
    asyncLogin(data) {
        dispatch(asyncLogin(data))
    }
}))
class Index extends Component {

    config = {
        navigationBarTitleText: '首页'
    }

    state = {
        showToast: false,
        info: {},
        selector: [
            {title: '家长', user_type: 3},
            {title: '学生', user_type: 2},
            {title: '老师', user_type: 1},
            {title: '机构', user_type: 0},
        ],
        selectorChecked: {title: '学生', user_type: 2},
        region: {
            user_type: ["北京市", "北京市", "东城区"],
            code: ["110000", "110100", "110101"],
            postcode: ''
        },
        user_id: '',
        user_password: '',
    }

    render() {
        const {showToast, selector, selectorChecked, region} = this.state;

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
                    onSubmit={this.onSubmit}
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
                                        {region.user_type[0]} {region.user_type[1]} {region.user_type[2]}
                                    </Text>
                                </View>
                            </Picker>
                        }
                        <View>
                            <AtInput
                                title='账号'
                                placeholder='输入账号'
                                onChange={this.onAccountChange}
                            />
                        </View>
                        <View>
                            <AtInput
                                title='密码'
                                placeholder='密码'
                                type='password'
                                onChange={this.onPwdChange}
                            />
                        </View>

                        <AtButton
                            loading={false}
                            type='primary'
                            formType='submit'
                        >登陆</AtButton>
                    </View>
                </AtForm>

                {
                    showToast &&
                    <AtToast
                        isOpened
                        status="error"
                        text="{text}"
                        icon="{icon}"
                    />
                }
            </View>
        )
    }

    onRoleChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }

    onRegionChange = (e) => {
        const {user_type, code, postcode} = e.detail;
        this.setState({region: e.detail})
    }

    onAccountChange = e => this.setState({user_id: e})
    onPwdChange = e => this.setState({user_password: e})

    onSubmit = e => {
        const {
            selectorChecked,
            user_id,
            user_password,
            region: {user_type},
        } = this.state;

        const data = {
            user_id,
            user_password,
            user_type: selectorChecked.user_type,
            province: user_type[0],
            city: user_type[1],
            region: user_type[2]
        };

        wx.request({
            url: `${url}${api.LOGIN}`,
            data: JSON.stringify({data}),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
                console.log(res, 'success');
            },
            fail (res) {
                this.setState({info: res.data})
            }
        });
    }
}

export default Index
