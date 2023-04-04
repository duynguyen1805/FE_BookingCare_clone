import './ThietBi.scss'
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import hinh1 from '../../../assets/ThietBi/hinh1.jpg';
import hinh2 from '../../../assets/ThietBi/hinh2.jpg';
import hinh3 from '../../../assets/ThietBi/hinh3.jpg';
import hinh4 from '../../../assets/ThietBi/hinh4.jpg';
import hinh5 from '../../../assets/ThietBi/hinh5.jpg';
import hinh6 from '../../../assets/ThietBi/hinh6.jpg';
import hinh7 from '../../../assets/ThietBi/hinh7.jpg';
import hinh8 from '../../../assets/ThietBi/hinh8.jpg';

const ThietBi = () => {
    return(
        <div>
            <h2 class="sz_24 text-uppercase text-center" >trang thiết bị hiện đại bậc nhất</h2>
                <div className='thietbi col-sm-12 col-xs-12'>
                    <Col sm className='thietbi-item col-sm-3 col-xs-6'>
                        <div className='tb'>
                            <div className='item1'>
                                <img src={hinh1} alt={"hinh1"}/>
                            </div>
                            <div className='item2'>
                                <img src={hinh2} alt={"hinh2"}/>
                            </div>
                        </div>
                    </Col>

                    <Col sm className='thietbi-item col-sm-3 col-xs-6'>
                        <div className='tb'>
                            <div className='item2'>
                                <img src={hinh3} alt={"hinh3"}/>
                            </div>
                            <div className='item1'>
                                <img src={hinh4} alt={"hinh4"}/>
                            </div>
                        </div>
                    </Col>

                    <Col sm className='thietbi-item col-sm-3 col-xs-6'>
                        <div className='tb'>
                            <div className='item1'>
                                <img src={hinh5} alt={"hinh5"}/>
                            </div>
                            <div className='item2'>
                                <img src={hinh6} alt={"hinh6"}/>
                            </div>
                        </div>
                    </Col>

                    <Col sm className='thietbi-item col-sm-3 col-xs-6'>
                        <div className='tb'>
                            <div className='item2'>
                                <img src={hinh7} alt={"hinh7"}/>
                            </div>
                            <div className='item1'>
                                <img src={hinh8} alt={"hinh8"}/>
                            </div>
                        </div>
                    </Col>

                </div>
        </div>
    )
}
export default ThietBi;