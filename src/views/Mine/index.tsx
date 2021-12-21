import React from 'react'
import { Cell } from 'react-vant'
import {useNavigate} from "react-router";

export default function index() {

    const navigate = useNavigate()
	const navList = [{ title: '我的地址', path: '/mine/address', isShow: true }]
	return <div>
        <Cell.Group>
            {
                navList.map(item=> item.isShow && <Cell title={item.title} isLink key={item.title} onClick={()=>navigate(item.path)}/>)
            }
        </Cell.Group>
    </div>
}
