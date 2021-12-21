import React from 'react'
import { auth } from '@/components/wrapper/auth'
import { ActionBar, Icon } from 'react-vant'
import { useNavigate } from 'react-router'

import './index.less'
import { useGetJDDeliveryAddress } from '@/hooks/useGetJDDeliveryAddress'

function Index() {
	const navigate = useNavigate()
	const {list} = useGetJDDeliveryAddress()
	const goNext = () => {
		navigate('/mine/address/add')
	}
	return (
		<div>
			{list.map(item => {
				return (
					<div className="flex-space address-item" key={item.daCode}>
						<div>
							<p className="a-name">
								{item.daAcquiesceType ? <span className="da-acquiesce">默认</span> : ''}
								{item.aName}
							</p>
							<p className="da-detail-address">{item.daDetailAddress}</p>
							<p className="da-info">
								{item.daName}
								<span className="da-mobile">
									{item.daMobile.substring(0, 3) + '****' + item.daMobile.substring(7, 11)}
								</span>
							</p>
						</div>
						<Icon name="edit" size={20} />
					</div>
				)
			})}
			<ActionBar>
				<ActionBar.Button icon="plus" type="danger" text="新建地址" onClick={() => goNext()} />
			</ActionBar>
		</div>
	)
}

export default auth(Index)
