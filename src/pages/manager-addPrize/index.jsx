import Taro, {Component} from '@tarojs/taro'
import {View,} from '@tarojs/components'
import {
    AtButton,
    AtForm,
    AtInput,
} from 'taro-ui'
import {connect} from '@tarojs/redux'

import {asyncAddPrize} from '../../actions/manager'

import Title from '../../components/common-title'
import './index.less'



@connect(({user, manager}) => ({
    user,
    manager,
}), (dispatch) => ({
    asyncAddPrize(data) {
        return dispatch(asyncAddPrize(data))
    },
}))
class AddPrize extends Component {

    config = {
        navigationBarTitleText: '发布奖品'
    }

    state = {
        name: undefined,
        stock: undefined,
        cost: undefined,
    }

    componentDidShow() {
    }

    render() {
        const {name, stock, cost} = this.state;

        return (
            <View className='index'>
                <Title title='添加奖品' />

                <AtForm
                    onSubmit={this.onSubmit}
                >
                    <View className='form-item'>
                        <AtInput
                            name='name'
                            title='名称'
                            type='text'
                            placeholder='输入名称'
                            value={name}
                            onChange={this.handleChangeName}
                        />
                    </View>

                    <View className='form-item'>
                        <AtInput
                            name='stock'
                            title='数量'
                            type='number'
                            placeholder='输入奖品总数'
                            value={stock}
                            onChange={this.handleChangeStock}
                        />
                    </View>

                    <View className='form-item'>
                        <AtInput
                            name='cost'
                            title='花费'
                            type='number'
                            placeholder='输入兑换需要数量'
                            value={cost}
                            onChange={this.handleChangeCost}
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

    handleChangeName = e =>{
        this.setState({name: e})
    }
    handleChangeStock = e =>{
        this.setState({stock: e});
        return e;
    }
    handleChangeCost = e =>{
        this.setState({cost: e});
        return e;
    }

    onSubmit = () => {
        const {name, stock, cost} = this.state;
        if (!name || typeof stock === 'undefined' || typeof cost === 'undefined') {
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
            name,
            stock,
            cost,
        };

        this.props.asyncAddPrize(data)
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
                    this.resetForm();
                    Taro.navigateTo({url: '/pages/manager/index'});
                }
            })
            .catch(e => {
                console.error(e);
            })
    }

    resetForm = () => {
        this.setState({
            name: undefined,
            stock: undefined,
            cost: undefined,
        })
    }
}

export default AddPrize
