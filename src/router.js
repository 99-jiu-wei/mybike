import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './Admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/spin'
import Notic from './pages/ui/notic'
import Message from './pages/ui/message'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import FormLogin from './pages/form/FormLogin'
import FormRegister from './pages/form/FormRegister'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
export default class IRouter extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path='/loging' component={Login} />
                        <Route path='/admin' render={() =>
                            <Admin>
                                <Switch>
                                    <Route path='/admin/ui/buttons' component={Buttons} />
                                    <Route path='/admin/ui/modals' component={Modals} />
                                    <Route path='/admin/ui/loadings' component={Loading} />
                                    <Route path='/admin/ui/notification' component={Notic} />
                                    <Route path='/admin/ui/messages' component={Message} />
                                    <Route path='/admin/ui/tabs' component={Tab} />
                                    <Route path='/admin/ui/gallery' component={Gallery} />
                                    <Route path='/admin/ui/carousel' component={Carousels} />

                                    <Route path='/admin/form/login' component={FormLogin} />
                                    <Route path='/admin/form/reg' component={FormRegister} />

                                    <Route path='/admin/table/basic' component={BasicTable} />
                                    <Route path='/admin/table/high' component={HighTable} />

                                    <Route path='/admin/city' component={City} />

                                    <Route path='/admin/order' component={Order} />

                                    <Route path='/admin/user' component={User} />


                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                        <Route path='/common' render={() =>
                            <Common>
                                <Route path='/common/order/detail/:orderId' component={OrderDetail} />

                            </Common>
                        } />
                    </Switch>
                </App>
            </Router>
        )
    }
}
