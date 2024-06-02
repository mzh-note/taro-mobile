import Taro from '@tarojs/taro';
import {View, Image, Button, Input, Form, Text} from '@tarojs/components';
import {useState} from 'react';
import {uploadAvatar, userLogin, wxLogin} from '@/http/api';
import defaultIcon from '@/assets/default-icon.png'
import {useDispatch} from 'react-redux';
import {setUser} from '@/store/modules/userReducer';
import styles from './index.module.less'

export default function NickName () {
  let fromInviteCode = ''
  try {
    fromInviteCode = Taro.getStorageSync('fromInviteCode')
  } catch(e) {

  }
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
    Taro.login({
      success: async function (res) {
        console.log('获取登录凭证（code）', res.code)
        const code = res.code
        if (code) {
          await submitLogin(code)
        }
      }
    })
  }
  const submitLogin = async (code: string) => {
    const response = await wxLogin({ code })
    console.log('登陆成功', response?.data?.data)
    // 设置openid、session_key
    dispatch(setUser(response?.data?.data))
    const userAvatarResponse = await uploadAvatar(avatar, response?.data?.data?.openid)
    console.log('userAvatarResponse', userAvatarResponse)
    try {
      const imgUrl = JSON.parse(userAvatarResponse.data)
      console.log('inviter_code', fromInviteCode)
      const userNicknameResponse = await userLogin({
        nickName: nickname,
        inviter_code: fromInviteCode
      })
      console.log('userNicknameResponse', userNicknameResponse)
      // 设置头像、昵称
      dispatch(setUser({
        fromInviteCode: fromInviteCode,
        userStatus: 1,
        avatar: imgUrl?.data?.url,
        name: userNicknameResponse?.data?.data?.nikeName
      }))
      Taro.showToast({
        icon: 'none',
        title: '设置成功',
        success: () => {
          Taro.switchTab({
            url: '/pages/mine/mine'
          })
        }
      })
    } catch (e) {
      Taro.showToast({
        icon: 'none',
        title: '设置失败'
      })
    }
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
          mode='aspectFill'
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
