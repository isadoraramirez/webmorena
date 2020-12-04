import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import { Button } from 'reactstrap';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			admin: [],
			nombre: '',
			apellidop: '',
			apellidom: '',
			usuario: '',
			password: '',
			url_img_perfil: '',
			id: '',
		};
	}
	onUserFormChange = (event) => {
		this.setState({ usuario: event.target.value });
	};

	onPasswordFormChange = (event) => {
		this.setState({ password: event.target.value });
	};

	getAdmin = async (event) => {
		event.preventDefault();
		const infoAdmin = {
			usuario: this.state.usuario,
			password: this.state.password,
		};
		await axios
			.post('http://206.189.213.37:3200/encuestado/login', infoAdmin)
			.then((res) => {
				const admin = res.data;
				if(res.error){
					alert("todo mal")
				}else{
					this.setState({ admin });
					console.log(admin);
					setTimeout( ()=> {
						window.location.href = '/inicio';
                    }, 4000);

				}
                
			})
			.catch((err) => {
				return Promise.reject(err);
			});
	};

	render() {

        console.log(this.state.usuario);
        console.log(this.state.password);
		return (

			<div className="container h-100">
				<div className="row justify-content-md-center h-100">
					<div className="card-wrapper">
						<div className="brand">
							<img src="https://pulsoam.com/wp-content/uploads/2017/09/Morena.png" alt="logo" />
						</div>
						<div className="card fat">
							<div className="card-body">
								<h4 className="card-title text-center">Inicio Sesion</h4>
								<form className="my-login-validation mt-5">
									<div className="form-group">
										<h5 className="card-title text-center">Usuario</h5>
										<input
											type="text"
											className="form-control"
											required
                                            onChange={this.onUserFormChange}
										/>
										<div className="invalid-feedback">Usuario Invalido</div>
									</div>

									<div className="form-group">
										<h5 className="card-title text-center">Contraseña</h5>
										<input
											type="password"
											className="form-control"
											required
                                            data-eye
                                            onChange={this.onPasswordFormChange}
										/>
										<div className="invalid-feedback">Contraseña Invalida</div>
									</div>
									{/* 	
                                    <div className="form-group">
									    <div className="custom-checkbox custom-control">
										    <label for="remember" className="custom-control-label">Remember Me</label>
								        </div>
								    </div>
									<div className="mt-4 text-center">
										Don't have an account? <a href="register.html">Create One</a>
									</div>*/}
								</form>
                                <Button className="btn btn-primary btn-block" onClick={this.getAdmin}>Listo</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
