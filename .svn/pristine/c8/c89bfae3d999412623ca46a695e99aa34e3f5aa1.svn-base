import { useLocation, Navigate } from 'react-router-dom'
import React from 'react'

/**
 * @description 用于鉴权
 * @param Component
 * @returns
 */
// !这个名字不能首字母大写 不知道这个类型是啥，用的any
export const auth =
	<T extends Record<string, never>>(Component: React.ComponentType<T>) =>
	(props: T) => {
		const location = useLocation()
		const token = localStorage.token
		return <>{token ? <Component {...props} /> : <Navigate to="/login" state={location} />}</>
	}
