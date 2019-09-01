import {
  shallowMount
} from '@vue/test-utils'
import Logo from '@/components/elements/Logo.vue'

describe('Logo.vue', () => {
  it('renders logo as icon properly', () => {
    const wrapper = shallowMount(Logo, {
      propsData: {
        icon: true
      }
    })
    expect(wrapper.contains('g')).toBe(true)
  })
  it('renders logo wordmark without logo items', () => {
    const wrapper = shallowMount(Logo, {
      propsData: {}
    })
    expect(wrapper.contains('g')).toBe(false)
  })
})
