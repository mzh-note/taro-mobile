import Taro from '@tarojs/taro';
import {View, Image, Button, Input, Form, Text} from '@tarojs/components';
import {useState} from 'react';
import {uploadAvatar, userLogin, wxLogin} from '@/http/api';
import defaultIcon from '@/assets/default-icon.png'
import {useDispatch} from 'react-redux';
import {setUser} from '@/store/modules/userReducer';
import styles from './index.module.less'

export default function NickName () {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')
  let nickname = ''
  const getChooseAvatar = async (event: any) => {
    setAvatar(event.detail.avatarUrl)
  }
  const formSubmit = async (e: any) => {
    nickname = e.currentTarget.value.nickname
    // console.log(e, nickname)
    if (nickname.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '请填写昵称',
      })
      return
    }
    await saveNickname()
  }
  const saveNickname = async () => {
    if (avatar.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '请完善头像',
      })
      return
    }
    Taro.showLoading({
      title: ''
    })
    Taro.login({
      success: async function (res) {
        // console.log('获取登录凭证（code）', res.code)
        const code = res.code
        if (code) {
          await submitLogin(code)
        }
      }
    })
  }
  const submitLogin = async (code: string) => {
    // console.log('wxlogin')
    const response = await wxLogin({ code })
    // console.log('登陆成功', response.data.data)
    // 设置openid、session_key
    dispatch(setUser(response?.data?.data))
    // console.log('uploadAvatar')
    const userAvatarResponse = await uploadAvatar(avatar)
    // console.log('userAvatarResponse')
    const imgUrl = JSON.parse(userAvatarResponse.data)
    // console.log('userLogin')
    const userNicknameResponse = await userLogin({
      nickName: nickname
    })
    // console.log('userNicknameResponse')
    // 设置头像、昵称
    dispatch(setUser({
      avatar: `${process.env.TARO_APP_BASEURL}${imgUrl.data.url}?t=${new Date().getTime()}`,
      name: userNicknameResponse?.data?.data?.nikeName
    }))
    Taro.hideLoading()
    Taro.showToast({
      title: '设置成功',
      success: () => {
        Taro.switchTab({
          url: '/pages/mine/mine'
        })
      }
    })
  }
  return (
    <View className={styles.nickname}>
      <Button
        className={styles.nickname__setup}
        openType='chooseAvatar'
        onChooseAvatar={getChooseAvatar}
      >
        <Image
          className={styles.nickname__img}
          mode='aspectFit'
          src={avatar ? avatar : defaultIcon}
        />
      </Button>
      <Form onSubmit={formSubmit} className={styles.nickname__form}>
        <View className={styles.nickname__form__content}>
          <Text className={styles.nickname__form__label}>昵称</Text>
          <Input
            name='nickname'
            className={styles.nickname__form__input}
            type='nickname'
            placeholder='请输入昵称'
            v-model={nickname}
          />
        </View>
        <Button formType='submit' className={styles.nickname__form__btn}>确定</Button>
      </Form>
    </View>
  )
}
