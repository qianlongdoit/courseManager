import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {
    AtButton,
    AtForm, AtList, AtListItem,
    AtTextarea,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncAddService} from '../../actions/manager'

import Title from '../../components/common-title'
import './index.less'



@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    asyncAddService(data) {
        return dispatch(asyncAddService(data))
    },
}))
class AddService extends Component {

    config = {
        navigationBarTitleText: '添加服务'
    }

    state = {
        service: ''
    }

    render() {
        const {service} = this.state;

        return (
            <View className='index'>
                <Title title='服务' />

                <View className='service'>
                    <AtList>
                        <AtListItem
                            arrow='right'
                            title={`场地出租、教具提供`}
                            note={`联系电话：13588888888`}
                            iconInfo={{size: 25, color: '#939393', value: 'list'}}
                        />
                        <AtListItem
                            arrow='right'
                            title={`教师、外教`}
                            note={`联系电话：13588888888`}
                            iconInfo={{size: 25, color: '#939393', value: 'list'}}
                        />
                    </AtList>
                </View>

                {/*<AtForm
                    onSubmit={this.onSubmit}
                >

                    <View className='form-item'>
                        <AtTextarea
                            value={service}
                            onChange={this.handleChangeDescribe}
                            maxLength={200}
                            placeholder='输入服务描述'
                        />
                    </View>

                    <View className='btn'>
                        <AtButton
                            formType='submit'
                            type='primary'
                            circle={true}
                        >发布</AtButton>
                    </View>
                </AtForm>*/}
            </View>
        )
    }

    handleChangeDescribe = e => {
        this.setState({service: e.target.value})
    }

    onSubmit = () => {
        const {service} = this.state;
        if (!service) {
            return Taro.showToast({
                title: '请输入服务描述',
                icon: 'none',
            })
        }

        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            agency_id: info.user_id,
            user_type: info.user_type,
            service,
        };

        this.props.asyncAddService(data)
            .then(res => {
                const {code, data: response, msg} = res;
                if (code !== 200) {
                    Taro.showToast({
                        title: msg,
                        icon: 'none',
                    });
                } else {
                    Taro.showToast({
                        title: msg,
                        icon: 'success',
                    });
                    this.setState({service: ''});
                    Taro.navigateTo({url: '/pages/manager/index'});
                }
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default AddService
