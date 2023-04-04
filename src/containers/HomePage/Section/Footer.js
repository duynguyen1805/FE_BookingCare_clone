import React from "react"
import './Footer.scss'
import logo from '../../../assets/logo.svg';
import { NavLink } from "react-router-dom";
import bocongthuong from '../../../assets/bocongthuong.png';

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="row-item col-md-5 mt-md-0 mt-3">
                <img src={logo} alt={"logo"}/>
                <p><b>Công ty Cổ phần Công nghệ BookingCare</b></p>
                <p><span> <i className="fa fa-map-marker"></i>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span></p>
                <p><span> <i className="fa fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span></p>  
                <div className="icons">
                    <NavLink to="/"><img src={bocongthuong} alt ={"bocongthuong"}/></NavLink>
                    <NavLink to="/"><img src={bocongthuong} alt ={"bocongthuong"}/></NavLink>
                </div>

            </div>

            <div className="row-item col-md-3 mb-md-0 mb-3">
                <ul className="list-unstyled">
                    <li><NavLink to="/">Liên hệ hợp tác</NavLink></li>
                    <li><NavLink to="/">Gói chuyển đổi số doanh nghiệp</NavLink></li>
                    <li><NavLink to="/">Tuyển dụng</NavLink></li>
                    <li><NavLink to="/">Câu hỏi thường gặp</NavLink></li>
                    <li><NavLink to="/">Điều khoản sử dụng</NavLink></li>
                    <li><NavLink to="/">Chính sách bảo mật</NavLink></li>
                    <li><NavLink to="/">Quy trình hỗ trợ giải quyết khiếu nại</NavLink></li>
                    <li><NavLink to="/">Quy chế hoạt động</NavLink></li>
                    
                    
                </ul>
            </div>

            <div className="row-item col-md-4 mb-md-0 mb-3">
                <div><strong>Trụ sở tại Hà Nội</strong><br/>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>         
                <div><strong><br/>Văn phòng tại TP Hồ Chí Minh</strong><br/>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>         
                <div><strong><br/>Hỗ trợ khách hàng</strong><br/>support@bookingcare.vn (7h - 18h)</div>
            </div>
        </div>
    </div>


</footer>

export default Footer;