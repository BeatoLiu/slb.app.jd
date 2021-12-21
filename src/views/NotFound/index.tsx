import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rootState } from '@/store'
import { GetProductDetailItem } from '@/apis/models/homeModel'
import { Dispatch } from 'redux'
import { Button,Empty } from 'react-vant'
import types from '@/store/constant'

interface IProps {
	goodsInfo?: GetProductDetailItem,
	setGoodsInfo?:(count:number)=>void
}
interface IState{
	price:number
}
class NotFound extends Component<IProps> {
	state:IState = {price:this.props.goodsInfo?.jdProductPriceBean.price as number}
	setPrice = (count:number)=>{
		this.setState({price:this.state.price+count})
		this.props.setGoodsInfo && this.props.setGoodsInfo(this.state.price)
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<Empty image="error" description="404" />
				<br />
				{this.props.goodsInfo?.jdProductPriceBean.price}
				<br />
				<Button type="danger" onClick={()=>this.setPrice(2)}>回到首页</Button>
			</div>
		)
	}
}

const mapStateToProps = (state: rootState) => {
	return { ...state.goods }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setGoodsInfo: (count:number) => {
		console.log(count)
		dispatch({
			type: types.SET_GOODS_DETAIL,
			data: { goodsInfo: {jdProductPriceBean: {price: ++count }}}
		})
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
