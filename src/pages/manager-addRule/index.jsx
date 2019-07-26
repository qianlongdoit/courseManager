import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {
    AtButton,
    AtForm,
    AtInput,
    AtTextarea,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncAddRule} from '../../actions/manager'

import Title from '../../components/common-title'
import './index.less'



@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    asyncAddRule(data) {
        return dispatch(asyncAddRule(data))
    },
}))
class AddRule extends Component {

    config = {
        navigationBarTitleText: '添加规则'
    }

    state = {
        title: '',
        describe: '',
    }


    render() {
        const {title, describe} = this.state;

        return (
            <View className='index'>
                <Title title='发布规则' />

                <AtForm
                    onSubmit={this.onSubmit}
                >

                    <View className='form-item'>
                        <AtInput
                            name='value'
                            title='标题'
                            type='text'
                            placeholder='输入标题'
                            value={title}
                            onChange={this.handleChangeTitle}
                        />
                    </View>

                    <View className='form-item'>
                        <AtTextarea
                            value={describe}
                            onChange={this.handleChangeDescribe}
                            maxLength={200}
                            placeholder='输入描述'
                        />
                    </View>

                    <View className='btn'>
                        <AtButton
                            formType='submit'
                            type='primary'
                            circle={true}
                        >发布</AtButton>
                    </View>
                </AtForm>
            </View>
        )
    }

    handleChangeTitle = e => {
        this.setState({title: e})
    }
    handleChangeDescribe = e => {
        this.setState({describe: e.target.value})
    }

    onSubmit = () => {
        const {title, describe} = this.state;
        if (!title || !describe) {
            return Taro.showToast({
                title: '请输入完整信息',
                icon: 'none',
            })
        }

        const {user: {info}} = this.props;
        const data = {
            token: info.token,
            agency_id: info.user_id,
            user_type: info.user_type,
            title,
            describe,
        };

        this.props.asyncAddRule(data)
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
                    })
                }
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default AddRule
