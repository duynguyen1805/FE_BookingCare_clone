// import Row from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
import './GiaTriKhacBiet.scss'
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import hinh1 from '../../../assets/GiaTri/hinh1.png';
import hinh2 from '../../../assets/GiaTri/hinh2.png';
import hinh3 from '../../../assets/GiaTri/hinh3.png';
import hinh4 from '../../../assets/GiaTri/hinh4.png';
import hinh5 from '../../../assets/GiaTri/hinh5.png';
const GiaTriKhacBiet = () => {
    return(
        <div className='GTKB'>
            <h2 className='sz_24 text-uppercase text-center sz_mb_18 mt_0'>Giá trị khác biệt</h2>
                <div className='giatri'>
                    <Col sm className='a'>
                        <div className='item'>
                            <img src={hinh1} alt={"hinh1"}/>
                            <span><br/>Chuyên gia đầu ngành - Bác sĩ giỏi - chuyên viên giàu kinh nghiệm</span>
                        </div>
                    </Col>

                    <Col sm className='a'>
                        <div className='item'>
                            <img src={hinh2} alt={"hinh1"}/>
                            <span><br/>Trang thiết bị hiện đại bật nhất</span>
                        </div>
                    </Col>

                    <Col sm className='a'>
                        <div className='item'>
                            <img src={hinh3} alt={"hinh1"}/>
                            <span><br/>Hiệu quả điều trị cao thành tựu nổi bật</span>
                        </div>
                    </Col>

                    <Col sm className='a'>
                        <div className='item'>
                            <img src={hinh4} alt={"hinh1"}/>
                            <span><br/>Quy trình toàn diện, khoa học và chuyên nghiệp</span>
                        </div>
                    </Col>

                    <Col sm className='a'>
                        <div className='item'>
                            <img src={hinh5} alt={"hinh1"}/>
                            <span><br/>Dịch vụ cao cấp<br/>chi phí hợp lí</span>
                        </div>
                    </Col>
                    
                </div>
        </div>
    )
}
export default GiaTriKhacBiet;