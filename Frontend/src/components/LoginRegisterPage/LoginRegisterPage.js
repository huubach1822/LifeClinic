import "./LoginRegisterPage.scss";
import loginWallpaper from '../../asset/image/LoginRegisterPage/login-wallpaper.jpg';
import loginWallpaper2 from '../../asset/image/LoginRegisterPage/side-wallpaper.jpg';
import Logo from '../../asset/image/Logo.png';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { loginUser, registerUser } from "../../redux/slices/userSlice"

const LoginRegisterPage = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [flag, setFlag] = useState(1);
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onClickBtn = async () => {
        if (flag === 1) {
            let result = await dispatch(loginUser(input));
            if (result.payload.code === 0) {
                navigate("/");
            } else {
                setInput({
                    username: '',
                    password: '',
                    confirmPassword: ''
                });
            }
            toast(result.payload.message);
        } else {
            if (input.password === input.confirmPassword) {
                let result = await dispatch(registerUser(input));
                toast(result.payload.message);
                if (result.payload.code === 0) {
                    navigate("/");
                } else {
                    setInput({
                        username: '',
                        password: '',
                        confirmPassword: ''
                    })
                }
            } else {
                toast("Passwords do not match");
                setInput({
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
            }
        }
    }

    return (
        <div className="page-container" style={{ backgroundImage: `url("${loginWallpaper}")` }}>
            <div className="wrapper" >
                <div className="left" style={{ backgroundImage: `url("${loginWallpaper2}")` }}>
                    <Link to="/"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Link>
                </div>
                <div className="right">
                    <div className="d-flex justify-content-center mb-1"><img alt="" className="login-logo" src={Logo} /></div>
                    <div className="tabs">
                        <ul>
                            <li className={flag === 0 ? "login_li" : "login_li active"} onClick={() => setFlag(1)}>Login</li>
                            <li className={flag === 1 ? "register_li" : "register_li active"} onClick={() => setFlag(0)}>Register</li>
                        </ul>
                    </div>

                    {flag === 0 && (
                        <div className="register">
                            <div className="input_field">
                                <input type="text" placeholder="Username" className="input" name="username" value={input.username} onChange={onInputChange} />
                            </div>
                            <div className="input_field">
                                <input type="password" placeholder="Password" name="password" className="input" value={input.password} onChange={onInputChange} />
                            </div>
                            <div className="input_field">
                                <input type="password" placeholder="Re-enter Password" name="confirmPassword" className="input" value={input.confirmPassword} onChange={onInputChange} />
                            </div>

                        </div>
                    )}

                    {flag === 1 && (
                        <div className="login">
                            <div className="input_field">
                                <input type="text" placeholder="Username" className="input" name="username" value={input.username} onChange={onInputChange} />
                            </div>
                            <div className="input_field">
                                <input type="password" placeholder="Password" className="input" name="password" value={input.password} onChange={onInputChange} />
                            </div>
                        </div>
                    )}

                    <button type="button" className="btn btn-primary" onClick={() => onClickBtn()}>{flag === 1 ? 'Login' : 'Register'}</button>

                </div>
            </div>


        </div>
    )
}

export default LoginRegisterPage;