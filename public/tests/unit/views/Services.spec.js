import { shallowMount } from '@vue/test-utils'
import Services from '@/views/Services'

describe('Services.vue', () => {
  it('get the search prop', () => {
    const query = 'twitter'
    const wrapper = shallowMount(Services, {
      propsData: { search: query }
    })
    expect(wrapper.props().search).toMatch(query)
  })
})
