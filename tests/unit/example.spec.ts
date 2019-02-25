import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import MdcButton from '@/components/mdc-button/mdc-button.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MdcButton, {
      // propsData: { msg },
    })
    expect(wrapper.text()).to.include(msg)
  })
})
