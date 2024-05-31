import TestUtils from '@tarojs/test-utils-react'

describe('Testing', () => {

  test('Test', async () => {
    const testUtils = new TestUtils()
    await testUtils.createApp()
    await testUtils.PageLifecycle.onShow('pages/login/login')
    expect(testUtils.html()).toMatchSnapshot()
  })

})
