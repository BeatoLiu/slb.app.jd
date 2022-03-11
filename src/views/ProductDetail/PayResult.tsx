import React from 'react'
import { Button, Icon } from 'react-vant'
import { useNavigate } from 'react-router-dom'
import './payResult.less'

const PayResult = () => {
	const navigate = useNavigate()
	return (
		<div className="pay-result">
			<div className="success content">
				<p>
					<Icon name="passed" className="success-icon" />
				</p>
				<p className="desc">支付成功</p>
			</div>
			<Button className="btn" type="primary" size="large" round onClick={() => navigate('/', { replace: true })}>
				完成
			</Button>
		</div>
	)
}

export default PayResult
