



import React from 'react'
import { Menu } from 'antd'

import "./menu.style.scss"

function MenuAtom({
    items=[]
}) {
  return (
    <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['core1']}
        defaultOpenKeys={['core1']}        
        items={items}
    />  
  )
}

export default MenuAtom