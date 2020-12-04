import React, { Component, Fragment } from 'react';
import axios from 'axios';
//import Modal from 'react-modal';
import './user.css';
import CarbonDatePicker from 'react-carbon-datepicker';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Carousel from 'nuka-carousel';

class BaseInput extends Component {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		this.state = {
			modal: false,
			nombreInputSearch: '',
			users: [],
			rotation: 0,
			id: '',
			nombre: '',
			apellidop: '',
			apellidom: '',
			domicilio: '',
			clave_electoral: '',
			curp: '',
			year_registro: '',
			fecha_nacimiento: '',
			seccion: '',
			vigencia: '',
			correo: '',
			tipo_celular: '',
			telefono_casa: '',
			celular: '',
			distrito: [],
			estado: '',
			ciudad: '',
			distritoS: '',
		};
	}

	onNameChangeInputSearch = (event) => {
		this.setState({ nombreInputSearch: event.target.value });
	};

	onNameEndChangeInputSearch = () => {
		this.setState({ nombreInputSearch: '' });
	};

	onNameModalChange = (event) => {
		this.setState({ nombre: event.target.value });
	};

	onLastNamePModalChange = (event) => {
		this.setState({ apellidop: event.target.value });
	};

	onLastNameMModalChange = (event) => {
		this.setState({ apellidom: event.target.value });
	};

	onAddressModalChange = (event) => {
		this.setState({ domicilio: event.target.value });
	};

	onElectoralKeyModalChange = (event) => {
		this.setState({ clave_electoral: event.target.value });
	};

	onCurpModalChange = (event) => {
		this.setState({ curp: event.target.value });
	};

	onBirthDateModalChange = (event) => {
		this.setState({ fecha_nacimiento: event.target.value });
	};

	onSectionModalChange = (event) => {
		this.setState({ seccion: event.target.value });
	};

	onEmailModalChange = (event) => {
		this.setState({ correo: event.target.value });
	};

	onPhoneHomeModalChange = (event) => {
		this.setState({ telefono_casa: event.target.value });
	};

	onPhoneModalChange = (event) => {
		this.setState({ celular: event.target.value });
	};

	componentWillUpdate() {
		this.getUsers();
	}

	getUsers = async () => {
		await axios
			.get(`http://206.189.213.37:3200/datos/encuestado/nombre/${this.state.nombreInputSearch}`)
			.then((res) => {
				const users = res.data;
				this.setState({ users });
			})
			.catch((err) => {
				return Promise.reject(err);
			});
	};

	getDistrict = async () => {
		await axios
			.get(`http://206.189.213.37:3200/baja-california/norte/seccion/${this.state.seccion}`)
			.then((res) => {
				this.setState({ distrito: res.data });
			})
			.catch((err) => {
				console.log('Show error notification!');
				return Promise.reject(err);
			});
	};

	updateUser = async () => {
		const infoUser = {
			nombre: this.state.nombre,
			apellidop: this.state.apellidop,
			apellidom: this.state.apellidom,
			domicilio: this.state.domicilio,
			clave_electoral: this.state.clave_electoral,
			curp: this.state.curp,
			year_registro: this.state.year_registro,
			fecha_nacimiento: moment(new Date(this.state.fecha_nacimiento)).format('YYYY/MM/DD'),
			seccion: this.state.seccion,
			vigencia: this.state.vigencia,
			correo: this.state.correo,
			tipo_celular: this.state.tipo_celular,
			telefono_casa: this.state.telefono_casa,
			celular: this.state.celular,
			estado: this.state.estado,
			ciudad: this.state.ciudad,
			distirto_estatal: this.state.distritoS,
			distirto_federal: this.state.distritoS,
			estatus: 'listo',
			fecha_actualizado: moment(new Date()).format('YYYY/MM/DD'),
		};

		await axios
			.put(`http://206.189.213.37:3200/encuestado/update/${this.state.id}`, infoUser)
			.then(() => {
				console.log('%c Succes', 'color: green; font-size: 1.5em');
			})
			.catch((err) => {
				console.log('%c Error', 'color: red; font-size: 1.5em');
				return Promise.reject(err);
			});
	};

	openModal = async (
		id,
		nombre,
		apellidop,
		apellidom,
		domicilio,
		clave_electoral,
		curp,
		year_registro,
		fecha_nacimiento,
		seccion,
		vigencia,
		correo,
		tipo_celular,
		telefono_casa,
		celular
	) => {
		this.setState({ modal: true });
		this.setState({ id: id });
		this.setState({ nombre: nombre });
		this.setState({ apellidop: apellidop });
		this.setState({ apellidom: apellidom });
		this.setState({ domicilio: domicilio });
		this.setState({ clave_electoral: clave_electoral });
		this.setState({ curp: curp });
		this.setState({ year_registro: year_registro });
		this.setState({ fecha_nacimiento: fecha_nacimiento });
		this.setState({ seccion: seccion });
		this.setState({ vigencia: vigencia });
		this.setState({ correo: correo });
		this.setState({ tipo_celular: tipo_celular });
		this.setState({ telefono_casa: telefono_casa });
		this.setState({ celular: celular });
		this.onNameEndChangeInputSearch();
	};

	closeModal = async () => {
		this.setState({ modal: false });
	};

	rotateImage = async () => {
		let angulo = this.state.rotation;
		this.setState({ rotation: angulo + 90 });
	};

	render() {
		const rot = {
			transform: `rotate(${this.state.rotation}deg)`,
		};
		const hadleDate = (date) => {
			this.setState({ fecha_nacimiento: date });
		};
		return (
			<Fragment>
				<div className="modal-body row ">
					<div className="col-md-2 divContainer card">
						<form>
							<div className="form-group">
								<h3 className="mt-2">Buscar por Nombre</h3>
								<input
									type="text"
									className="form-control"
									id="inputCedula"
									placeholder="Nombre"
									onChange={this.onNameChangeInputSearch}
								/>
							</div>
						</form>
					</div>

					<div className="col-md-8">
						<table className="table table-striped ">
							<thead>
								<tr>
									<th className="text-white borderTableTL tableBack">Nombre</th>
									<th className="text-white  tableBack">Paterno</th>
									<th className="text-white  tableBack">Materno</th>
									<th className="text-white  tableBack  text-center">Telefono</th>
									<th className="text-white  tableBack  text-center">Celular</th>
									<th className="text-white  tableBack">Tipo celular</th>
									<th className="text-white  tableBack">Correo</th>
									<th className="text-white  tableBack">Estatus</th>
									<th className="text-white borderTableTR tableBack">Editar</th>
								</tr>
							</thead>
							{this.state.users.map((user) => (
								<tbody key={user.ID}>
									<tr>
										<td ref className="tableBackRes borderTableBL">
											{user.NOMBRE ? user.NOMBRE : 'Nombre Desconocido'}{' '}
										</td>
										<td className="tableBackRes">
											{user.APELLIDOP ? user.APELLIDOP : 'Apellido Paterno Desconocido'}{' '}
										</td>
										<td className="tableBackRes">
											{user.APELLIDOM ? user.APELLIDOM : 'Apellido Materno Desconocido'}{' '}
										</td>
										<td className="text-center tableBackRes">
											{user.TELEFONO_CASA ? user.TELEFONO_CASA : 'Telefono de Casa Desconocido'}{' '}
										</td>
										<td className="text-center tableBackRes">
											{user.CELULAR ? user.CELULAR : 'Celular Desconocido'}{' '}
										</td>
										<td className="tableBackRes">
											{user.TIPO_CELULAR ? user.TIPO_CELULAR : 'Tipo Desconocido'}{' '}
										</td>
										<td className="tableBackRes">
											{user.CORREO ? user.CORREO : 'Correo Desconocido'}{' '}
										</td>
										<td className="tableBackRes text-center">
											{user.ESTATUS === 'listo' ? (
												<i
													class="fa fa-check-circle fa-lg text-success mr-4"
													aria-hidden="true"
												/>
											) : (
												<i
													class="fa fa-times-circle fa-lg text-danger mr-4"
													aria-hidden="true"
												/>
											)}{' '}
										</td>
										<td className="text-center tableBackRes borderTableBR">
											<i
												className="fa fa-pencil fa-lg text-white"
												aria-hidden="true"
												onClick={() =>
													this.openModal(
														user.ID,
														user.NOMBRE,
														user.APELLIDOP,
														user.APELLIDOM,
														user.DOMICILIO,
														user.CLAVE_ELECTORAL,
														user.CURP,
														user.YEAR_REGISTRO,
														user.FECHA_NACIMIENTO,
														user.SECCION,
														user.VIGENCIA,
														user.CORREO,
														user.TIPO_CELULAR,
														user.TELEFONO_CASA,
														user.CELULAR
													)
												}
											/>
										</td>
									</tr>
								</tbody>
							))}
						</table>

						<div className="card-body btn-showcase">
							<Modal size="lg" isOpen={this.state.modal}>
								<ModalHeader>Acutalizar datos</ModalHeader>
								<ModalBody>
									<form>
										<div className="form-row">
											<div className="form-group col-md-12">
												<Carousel>
													<img
														style={rot}
														alt=""
														className="rotated form-group col-md-6"
														src={`http://206.189.213.37/imagenes/ine/frente/${this.state.id}.jpg`}
													/>
													<img
														style={rot}
														alt=""
														className="rotated form-group col-md-6"
														src={`http://206.189.213.37/imagenes/ine/reverso/${this.state.id}.jpg`}
													/>
												</Carousel>
												<br />
												<Button
													onClick={this.rotateImage}
													className="btn btn-primary centerBtn"
												>
													Rotar imagen
												</Button>
											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-4">
												<label>PATERNO</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.apellidop}
													onChange={this.onLastNamePModalChange}
												/>
											</div>

											<div className="form-group col-md-4">
												<label>MATERNO</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.apellidom}
													onChange={this.onLastNameMModalChange}
												/>
											</div>

											<div className="form-group col-md-4">
												<label>NOMBRE</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.nombre}
													onChange={this.onNameModalChange}
												/>
											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label>DOMICILIO</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.domicilio}
													onChange={this.onAddressModalChange}
												/>
											</div>
											<div className="form-group col-md-6">
												<label>CLAVE ELECTORAL</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.clave_electoral}
													onChange={this.onElectoralKeyModalChange}
												/>
											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label>CURP</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.curp}
													onChange={this.onCurpModalChange}
												/>
											</div>

											<div className="form-group col-md-6">
												<label>AÑO DE REGISTRO</label>
												{/* For o dos inputs para escribir las fechas */}
												<select
													className="form-control"
													value={this.state.year_registro}
													onChange={(e) => this.setState({ year_registro: e.target.value })}
												>
													<option value="">Selecciona</option>
													<option value="2020 00">2020 00</option>
													<option value="2010 00">2010 00</option>
													<option value="2000 00">2000 00</option>
													<option value="2000 00">1990 00</option>
												</select>
											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-4">
												<label>FECHA DE NACIMIENTO</label>
												<br />
												<div class="container">
													<CarbonDatePicker onChange={hadleDate} config={this.config} />
												</div>
											</div>
											<div className=" form-group col-md-3">
												<label>SECCION</label>
												<input
													type="text"
													className="form-control span2"
													defaultValue={this.state.seccion}
													onChange={this.onSectionModalChange}
												/>
											</div>
											<div className="buttonTop form-group col-md-1">
												<i
													class="btn btn-sm fa fa-search-plus"
													aria-hidden="true"
													onClick={this.getDistrict}
												/>
											</div>

											<div className="form-group col-md-4">
												<label>VIGENCIA</label>
												<select
													className="form-control"
													defaultValue={this.state.vigencia}
													onChange={(e) => this.setState({ vigencia: e.target.value })}
												>
													<option value="">Selecciona</option>
													<option value="2020-2030">2020-2030</option>
													<option value="2010-2020">2010-2020</option>
													<option value="2000-2010">2000-2010</option>
													<option value="1090-2000">1090-2000</option>
												</select>
											</div>
										</div>
										<div className="form-row">
											{this.state.distrito.map((item) => {
												return (
													<div className="form-row">
														<div className="form-group col-md-4">
															<div>
																<label>ESTADO</label>
																<input
																	type="text"
																	className="form-control"
																	defaultValue={item.ESTADO}
																	onClick={(e) =>
																		this.setState({ estado: e.target.value })
																	}
																/>
															</div>
														</div>

														<div className="form-group col-md-3">
															<div>
																<label>CIUDAD</label>
																<input
																	type="text"
																	className="form-control"
																	defaultValue={item.CIUDAD}
																	onClick={(e) =>
																		this.setState({ ciudad: e.target.value })
																	}
																/>
															</div>
														</div>

														<div className="form-group col-md-3">
															<div>
																<label>DISTRITO</label>
																<input
																	type="text"
																	className="form-control"
																	defaultValue={item.DISTRITO}
																	onClick={(e) =>
																		this.setState({ distritoS: e.target.value })
																	}
																/>
															</div>
														</div>
													</div>
												);
											})}
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label>CORREO</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.correo}
													onChange={this.onEmailModalChange}
												/>
											</div>
											<div className="form-group col-md-6">
												<label>TIPO CELULAR</label>
												<select
													className="form-control"
													defaultValue={this.state.tipo_celular}
													onChange={(e) => this.setState({ tipo_celular: e.target.value })}
												>
													<option value=""> </option>
													<option value="SMARTPHONE">SMARTPHONE</option>
													<option value="GMS">GMS</option>
												</select>
											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label>TELEFONO CASA</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.telefono_casa}
													onChange={this.onPhoneHomeModalChange}
												/>
											</div>
											<div className="form-group col-md-6">
												<label>CELULAR</label>
												<input
													type="text"
													className="form-control"
													defaultValue={this.state.celular}
													onChange={this.onPhoneModalChange}
												/>
											</div>
										</div>
										<Button onClick={this.updateUser}>Actualizar</Button>
										&nbsp;
										<Button onClick={this.closeModal} className="btn btn-danger">
											Cancelar
										</Button>
									</form>
								</ModalBody>
							</Modal>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default BaseInput;
