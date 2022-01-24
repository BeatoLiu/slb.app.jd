import React, { useState } from 'react'
import { Popup, PasswordInput, NumberKeyboard, Dialog } from 'react-vant'

import './InputPayPWD.less'
interface IProps {
	show: boolean
	typeName: string
	amount: string | number
	pwdError: string,
	onClose: (pwd?:string) => void
}
/**
 * @description 在涉及到转账支付的地方，需要输入平台的支付密码
 */
const InputPayPWD = (props: IProps) => {
	const [pwd, setPwd] = useState('')
	// const pwd = ref('')
	// const { push } = useRouter()
	// const store = useStore()
	// const hasAllianceWalletPwd = computed(() => store.state.user.userInfo.hasAllianceWalletPwd)

	const closePop = (password?: string) => {
		// emit('close', password)
		// pwd.value = ''
	}
	const onChange = (val:string) => {
		setPwd(val)
		if(val.length === 6) {
			props.onClose(val)
		}
	}
	return (
		<Popup
			visible={props.show}
			className="pwd-pop"
			position="bottom"
			onClickCloseIcon={() => props.onClose()}
			closeable
		>
			<div className="pwd-top">
				<p className="title">请输入支付密码</p>
				<p className="money">
					<span>{props.typeName}</span> {props.amount || 0}
				</p>
			</div>
			<PasswordInput value={pwd} error-info={props.pwdError} />
			<p className="forget-pwd">忘记密码</p>
			<NumberKeyboard value={pwd} visible={props.show} maxlength={6} onChange={onChange} />
		</Popup>
	)
}
export default InputPayPWD
