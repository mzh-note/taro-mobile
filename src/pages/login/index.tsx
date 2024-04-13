import { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import {
  Form,
  Button,
  Input,
} from '@nutui/nutui-react-taro';
import Taro, { useLoad, useReady } from '@tarojs/taro'
import { loginPhone } from '@/http/api'

import styles from './index.module.less'

// type InfoType = {
//   id: string,
//   name: string
// }
// type ReqType = {username: string, password: string, code: string}
// interface ResType<T> {
//   code: number,
//   message: string,
//   data: T[]
// }
export default function Login() {
  let [username, setUsername] = useState('13729002133')
  let [password, setPassword] = useState('G0161316')
  let [code, setCode] = useState('4321')

  useEffect(() => {
    console.log('login Page useEffect.', process.env.TARO_APP_BASEURL)
  }, [])

  useLoad(() => {
    console.log('login Page loaded.')
  })

  useReady(() => {
    console.log('login Page ready.')
  })

  Taro.nextTick(() => {
    console.log('nextTick~~~')
  })
  const login = async () => {
    if (username.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '请输入账号'
      })
      return false
    }
    if (password.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '请输入密码'
      })
      return false
    }
    if (code.length === 0) {
      Taro.showToast({
        icon: 'none',
        title: '验证码不能为空'
      })
      return false
    }
    // Taro.showToast({
    //   icon: 'loading',
    //   title: '登陆中...'
    // })
    Taro.showLoading({
      title: '登陆中...',
      mask: true
    })
    const data = {phone: username, password: password}
    try {
      const res = await loginPhone(data)
      console.log(res.data)
      Taro.hideLoading()
      if (res.data.code === 200) {
        Taro.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 500,
          success(){
            Taro.setStorageSync('token', res.data.token)
            Taro.setStorageSync('id', res.data.account.id)
            console.log('登录成功，跳转token', Taro.getStorageSync('token'))
            Taro.redirectTo({
              url: '/pages/home/index'
            })
          }
        })
      } else {
        Taro.showToast({
          title: '账号或密码错误',
          icon: 'error'
        })
      }
    } catch (e) {
      Taro.showToast({
        title: '账号或密码错误',
        icon: 'error'
      })
    }
    // const res = await Taro.request({
    //   url: process.env.TARO_APP_BASEURL + '/login/cellphone',
    //   method: 'POST',
    //   data: {
    //     phone: username,
    //     password: password
    //   },
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //     'cookie': ''
    //   },
    //   credentials: 'include'
    // })
    // console.log(res)

  }
  const getCode = () => {
    console.log('getCode')
    Taro.showToast({icon: 'none', title: '验证码已发送'})
  }

  return (
    <>
      <View className={styles.login}>
        <Form
          initialValues={{ password, username}}
          labelPosition='right'
          footer={
            <>
              <Button className={styles.loginBtn} type='primary' onClick={login}>
                登录
              </Button>
            </>
          }
        >
          <Form.Item required label='账号' name='username'>
            <Input
              className='nut-input-text'
              placeholder='请输入账号'
              type='text'
              value={username}
              onChange={(val) => setUsername(val)}
            />
          </Form.Item>
          <Form.Item required label='密码' name='password'>
            <Input
              value={password}
              onChange={(val) => setPassword(val)}
              className='nut-input-text'
              placeholder='请输入密码'
              type='password'
            />
          </Form.Item>
          <Form.Item required label='验证码' name='code'>
            <div className={styles.codeInput}>
              <Input type='number' placeholder='请输入验证码' maxLength={4} value={code}
                onChange={(val) => setCode(val)}
              />
              <div className={styles.right}>
                <Button type='primary' size='small' onClick={getCode}>
                  获取验证码
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </View>
    </>
  )
}
