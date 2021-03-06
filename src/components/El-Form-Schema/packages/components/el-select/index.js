import { createElementBySlot, createTipComponent, getOptionList } from '../utils'

export default function(createElement, value, data) {
  const {
    on = {},
    attrs = {},
    props = {},
    style = {},
    keys = null,
    scopedSlots = null,
    eventOn = {},
  } = data

  const items = getOptionList(data)

  const nodes = [
    createElementBySlot.call(this, createElement, data, 'before'),
    createElement(
      'el-select',
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
          'el-option',
          {
            style: { minWidth: style.width },
            props: {
              key: option.value,
              disabled: option.disabled,
              label: keys ? option[keys['label']] : option['label'],
              value: keys ? option[keys['value']] : option['value']
            },
            scopedSlots: typeof scopedSlots === 'function' ? scopedSlots(createElement, option) : null
          },
          null
        )
      })
    ),
    createElementBySlot.call(this, createElement, data, 'after'),
    createTipComponent(createElement, data)
  ]

  return nodes
}
