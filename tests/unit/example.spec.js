import Home from '@/views/Home'
import { mount } from '@vue/test-utils'

test('Verificar se o Home é montado', () => {
  const wrapper = mount(Home)
  expect(wrapper).toBeTruthy()
})