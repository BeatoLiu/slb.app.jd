import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { IRootState } from '@/store'
// import { GetProductDetailItem } from '@/apis/models/homeModel'
// import { Dispatch } from 'redux'
import { Empty } from 'react-vant'
import { NavLink } from 'react-router-dom'
// import types from '@/store/constant'

// interface IProps {
// 	goodsInfo?: GetProductDetailItem,
// 	setGoodsInfo?:(count:number)=>void
// }
// interface IState{
// 	price:number
// }
class NotFound extends Component {
	// state:IState = {price:this.props.goodsInfo?.jdProductPriceBean.price as number}
	// setPrice = (count:number)=>{
	// 	this.setState({price:this.state.price+count})
	// 	this.props.setGoodsInfo && this.props.setGoodsInfo(this.state.price)
	// }
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<Empty image="error" description="404" />
				<br />
				<br />
				<NavLink to="/" replace={true}>
					回到首页
				</NavLink>
				{/*<Button type="danger" onClick={() => <Navigate to="/" replace={true}/>}>*/}
				{/*	回到首页*/}
				{/*</Button>*/}
			</div>
		)
	}
}

export default NotFound

// const mapStateToProps = (state: IRootState) => {
// 	return { ...state.goods }
// }
//
// const mapDispatchToProps = (dispatch: Dispatch) => ({
// 	setGoodsInfo: (count:number) => {
// 		console.log(count)
// 		dispatch({
// 			type: types.SET_GOODS_DETAIL,
// 			data: { goodsInfo: {jdProductPriceBean: {price: ++count }}}
// 		})
// 	}
// })
// export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
