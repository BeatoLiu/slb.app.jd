import React, { useEffect, useState } from 'react'
import { auth } from '@/components/wrapper/auth'
import { ActionBar, Button, SwipeCell } from 'react-vant'
import { useNavigate } from 'react-router'
import '../Address/index.less'
import { getInvoiceInfoList } from '@/apis/invoice'
import { IGetInvoiceInfoListItem } from '@/apis/models/invoiceModel'

function Index() {
	const navigate = useNavigate()
	const [list, setList] = useState<IGetInvoiceInfoListItem[]>([])
	useEffect(() => {
		getInvoiceInfoList().then(res => {
			if (res.resultCode === 1) {
				setList([...res.data])
			}
		})
	}, [])
	const goNext = () => {
		navigate('/mine/invoice/add')
	}

	const deleteItem = (invoiceCode: number) => {
		console.log(invoiceCode)
	}
	return (
		<div>
			{list.map(item => {
				return (
					<SwipeCell
						key={item.invoiceCode}
						rightAction={
							<div className="btn-list">
								<Button square type="danger" onClick={() => deleteItem(item.invoiceCode)}>
									删除
								</Button>
							</div>
						}
					>
						<div className="flex-space address-item">
							<div className="address-content">
								{/*<p className="da-detail-address">{item.daDetailAddress}</p>*/}
								<p className="da-info">
									{item.regCompanyName}
									<span className="da-mobile" style={{display: 'block',margin: 0,color: '#999'}}>
										{item.regCode}
									</span>
								</p>
							</div>
							{/*<Icon name="edit" size={20} />*/}
						</div>
					</SwipeCell>
				)
			})}
			<ActionBar>
				<ActionBar.Button icon="plus" type="danger" text="添加发票抬头" onClick={() => goNext()} />
			</ActionBar>
		</div>
	)
}

export default auth(Index)
