import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FeatureItems from './FeatureItems/FeatureItems';
import './MainPage.css';

import MenuCategory from './MenuCategory/MenuCategory';
import { Tabs, Tab } from 'react-bootstrap';
import NewBooks from './Tabs/NewBooks/NewBooks';
import Artists from './Tabs/Artists/Artists';
import News from './Tabs/News/News';
import { Container, Row, Col } from 'react-bootstrap';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [
                {
                    name: 'Thể loại',
                    path: 'categories'
                }, {
                    name: 'Tác Giả',
                    path: 'artists'
                }, {
                    name: 'Ngôn Ngữ',
                    path: 'languages'
                }
            ],
            keyTab: 'newBook'
        }
    }

    render() {
        return (
            <section>
                <Container>
                    <Row>
                        <Col sm={3} className='title'>
                            {this.state.menus && this.state.menus.map((menu, key) => {
                                return <MenuCategory key={key} menu={menu} />
                            })}
                        </Col>
                        <Col sm={9} className='padding-right'>
                            <Switch>
                                <Route exact path='/' >
                                    <FeatureItems />
                                </Route>
                                <Route path='/:cat/:catroutine'>
                                    <FeatureItems />
                                </Route>
                            </Switch>
                            <div className='title tabs'>
                                <h2>Có thể bạn cần</h2>
                                <Tabs
                                    id='controller-tabs'
                                    className='tabs-hot'
                                    activeKey={this.state.keyTab}
                                    onSelect={k => { this.setState({ keyTab: k }) }}
                                >
                                    <Tab eventKey='newBook' title='Sắp ra mắt'>
                                        <NewBooks />
                                    </Tab>
                                    <Tab eventKey='artist' title='Tác giả'>
                                        <Artists />
                                    </Tab>
                                    <Tab eventKey='news' title='Bạn đọc quan tâm'>
                                        <News />
                                    </Tab>
                                </Tabs>
                            </div>
                            <div className='recommend-items'>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}
export default MainPage;