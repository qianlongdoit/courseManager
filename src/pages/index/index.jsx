import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text, Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {
    AtForm,
    AtInput,
    AtButton,
    AtTag,
} from 'taro-ui'
import {add, minus, asyncAdd} from '../../actions/counter'

import './index.less'


@connect(({counter}) => ({
    counter
}), (dispatch) => ({
    add() {
        dispatch(add())
    },
    dec() {
        dispatch(minus())
    },
    asyncAdd() {
        dispatch(asyncAdd())
    }
}))
class Index extends Component {

    config = {
        navigationBarTitleText: '首页'
    }

    state = {
        // selector: ['学生', '家长', '老师', '机构'],
        selector: [
            {label: '学生', value: 'student'},
            {label: '家长', value: 'parents'},
            {label: '老师', value: 'teacher'},
            {label: '机构', value: 'manager'},
        ],
        selectorChecked: {label: '学生', value: 'student'},
        region: {
            value: ["北京市", "北京市", "东城区"],
            code: ["110000", "110100", "110101"],
            postcode: ''
        },
        sAccount: '',
        sPwd: '',
        pAccount: '',
        pPwd: '',
        tAccount: '',
        tPwd: '',
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    render() {
        const {selector, selectorChecked, region} = this.state;

        return (
            <View className='index'>
                <View>
                    <Picker mode='selector' range-key='label' range={selector} onChange={this.onRoleChange}>
                        <View className='picker'>
                            <Text className='label'>选择登陆身份：</Text>
                            <AtTag type='primary'>{selectorChecked.label}</AtTag>
                        </View>
                    </Picker>
                </View>

                <AtForm
                    onSubmit={this.onSubmit}
                >
                    {
                        selectorChecked.value === 'student' &&
                        <View>
                            <Picker
                                mode="region"
                                value={region.code}
                                onChange={this.onRegionChange}
                            >
                                <View className='picker'>
                                    <Text className='label'>选择区域：</Text>
                                    <Text className='form-value'>
                                        {region.value[0]} {region.value[1]} {region.value[2]}
                                    </Text>
                                </View>
                            </Picker>

                            <View>
                                <AtInput
                                    title='学号'
                                    placeholder='输入学号'
                                    onChange={this.onStudentAccountChange}
                                />
                            </View>
                            <View>
                                <AtInput
                                    title='密码'
                                    placeholder='密码'
                                    type='password'
                                    onChange={this.onStudentPwdChange}
                                />
                            </View>

                            <AtButton
                                loading={false}
                                type='primary'
                                formType='submit'
                            >登陆</AtButton>
                        </View>
                    }
                    {
                        selectorChecked.value === 'parents' &&
                        <View>
                            <View>
                                <AtInput
                                    title='学号'
                                    placeholder='输入学号'
                                    onChange={this.onParentAccountChange}
                                />
                            </View>
                            <View>
                                <AtInput
                                    title='密码'
                                    placeholder='密码'
                                    type='password'
                                    onChange={this.onParentPwdChange}
                                />
                            </View>

                            <AtButton
                                loading={false}
                                type='primary'
                                formType='submit'
                            >登陆</AtButton>
                        </View>
                    }
                    {
                        selectorChecked.value === 'teacher' &&
                        <View>
                            <View>
                                <AtInput
                                    title='账号'
                                    placeholder='输入账号'
                                    onChange={this.onTeacherAccountChange}
                                />
                            </View>
                            <View>
                                <AtInput
                                    title='密码'
                                    placeholder='密码'
                                    type='password'
                                    onChange={this.onTeacherPwdChange}
                                />
                            </View>

                            <AtButton
                                loading={false}
                                type='primary'
                                formType='submit'
                            >登陆</AtButton>
                        </View>
                    }
                    {
                        selectorChecked.value === 'manager' &&
                        <Text>机构</Text>
                    }
                </AtForm>



                {/* <navigator url="/pages/student/index">学生</navigator>
                <navigator url="/pages/teacher/index">老师</navigator>
                <navigator url="/pages/manager/index">机构人员</navigator>
                <navigator url="/pages/parents/index">家长</navigator>*/}


                {/*<Button className='add_btn' onClick={this.props.add}>+</Button>
                <Button className='dec_btn' onClick={this.props.dec}>-</Button>
                <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
                <View><Text>{this.props.counter.num}</Text></View>
                <View><Text>Hello, World</Text></View>*/}
            </View>
        )
    }

    onRoleChange = e => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value]
        })
    }

    onRegionChange = (e) => {
        const  {value, code, postcode} = e.detail;
        this.setState({region: e.detail})
    }

    onStudentAccountChange = e => this.setState({sAccount: e})
    onStudentPwdChange = e => this.setState({sPwd: e})
    onParentAccountChange = e => this.setState({pAccount: e})
    onParentPwdChange = e => this.setState({pPwd: e})
    onTeacherAccountChange = e => this.setState({tAccount: e})
    onTeacherPwdChange = e => this.setState({tPwd: e})


    onSubmit = e => {
        const {
            selectorChecked,
            sAccount,
            sPwd,
            pAccount,
            pPwd,
            tAccount,
            tPwd,
        } = this.state;
        // console.log(selectorChecked, sAccount, sPwd);
    }
}

export default Index
