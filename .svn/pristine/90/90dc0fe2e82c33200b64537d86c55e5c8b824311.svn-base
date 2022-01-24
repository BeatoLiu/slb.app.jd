import { IRouteObject } from '@/routes'

export const getPageTitle = (routes: IRouteObject[]) => {
	const arr: IRouteObject[] = []
	routes.forEach(item => {
		if (item.children && item.children.length > 0) {
			item.children.forEach(j => {
				if (j.index) {
					j.path = item.path
				} else {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					j.path = item.path + j.path
				}
				arr.push(j)
			})
		} else {
			arr.push(item)
		}
	})
	return arr
}
