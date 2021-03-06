import { createElementBySlot, createTipComponent, getOptionList } from '../utils'

export default function(createElement, value, data) {
  const {
    on = {},
    attrs = {},
    props = {},
    style = {},
    keys = null,
    eventOn = {},
  } = data

  const items = getOptionList(data)

  if (!this.inline) style.width = ''

  const nodes = [
    createElementBySlot.call(this, createElement, data, 'before'),
    createElement(
      'el-radio-group',
      {
        props: {
          value,
          placeholder: props.placeholder || '请选择',
          ...attrs,
          ...props
        },
        style: { ...style },
        on: { ...eventOn }
      },
      (items || []).map(option => {
        return createElement(
          'el-radio',
          {
            style: { lineHeight: '32px' },
            props: {
              key: option.value,
              disabled: option.disabled,
              label: keys ? option[keys['value']] : option['value']
            }
          },
          keys ? option[keys['label']] : option['label']
        )
      })
    ),
    createElementBySlot.call(this, createElement, data, 'after'),
    createTipComponent(createElement, data)
  ]
  return nodes
}
