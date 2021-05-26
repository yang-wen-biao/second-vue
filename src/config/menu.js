//将menu中的component转化为对象
import axios from 'axios'

export const findAllMenus=(router,store)=>{
    if(store.state.routes.length>0) {
        return;
    }
    axios.get("/menu").then( (resp)=>{
        if(resp.data) {
            // console.log(resp);
            // console.log(1);
            let tfRoutes = transformRoutes(resp.data)
            router.addRoutes(tfRoutes)
            store.commit("findAllRoutes",tfRoutes)
        }
    })
}


export const transformRoutes=(routes)=>{
    // console.log(routes);
    // console.log(2);
    let tfRoutes = [];
    routes.forEach(router=>{
        let {
            pattern,
            component,
            name,
            children
        } =router
        if (children && children instanceof Array) {
            children = transformRoutes(children)
        }
        let tfRouter = {
            path:pattern,
            name: name,
            children: children,
            component(k) {
                require(["../views/" + component + '.vue'],k)
            }
        }
        // console.log(tfRouter);
        tfRoutes.push(tfRouter)
    })
    return tfRoutes;
}