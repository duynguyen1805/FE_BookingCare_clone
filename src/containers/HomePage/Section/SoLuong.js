import './SoLuong.scss'
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const SoLuong = () => {
    return(
        <div>
            <h2 className='sz_24 text-uppercase text-center sz_mb_18 mt_0'>Chuyên gia đầu ngành - bác sĩ giỏi - chuyên viên giàu kinh nghiệm</h2>

                <div className='giatri1'>
                    <Col sm className='a'>
                        <div className='sl'>19</div>
                        <div className='cv'>Giáo sư - P.giáo sư</div>
                    </Col>
                    <Col sm className='a'>
                        <div className='sl'>51</div>
                        <div className='cv'>tiến sĩ - bác sĩ ckii</div>
                    </Col>

                    <Col sm className='a'>
                        <div className='sl'>162</div>
                        <div className='cv'>thạc sĩ - bác sĩ cki</div>
                    </Col>

                    <Col sm className='a'>
                        <div className='sl'>98</div>
                        <div className='cv'>bác sĩ</div>
                    </Col>

                    <Col sm className='a'>
                        <div className='sl'>155</div>
                        <div className='cv'>kỹ thuật viên</div>
                    </Col>

                    <Col sm className='a'>
                        <div className='sl'>803</div>
                        <div className='cv'>điều dưỡng</div>
                    </Col>
                </div>

        </div>
    )
}
export default SoLuong;
