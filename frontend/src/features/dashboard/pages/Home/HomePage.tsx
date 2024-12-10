import React,{useEffect, useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { selectCurrentUser } from '@auth/slices/auth.slice';
// import $ from 'jquery';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
import MainBody from '@dashboard/components/MainBody';
import PageHeading from '@dashboard/components/PageHeading';
import { getUserFullName } from '@utils/getUserName';
import { Wallet } from '@props/userProps';
import ModalComponent from '@dashboard/components/Modal';
import CheckoutForm from '@dashboard/components/CheckoutForm';
import StripeElement from '@dashboard/components/StripeElement';
interface FundWalletFormInputs {
	amount: number;
  }
  


const HomePage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const [show, setShow] = useState(false);
    const handleOpen = useCallback(() => setShow(true), [show]);
    const handleClose = useCallback(() => setShow(false), [show]);
	const [showCheckout, setShowCheckout] = useState(false)
	const [amount, setAmount] = useState(1)
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FundWalletFormInputs>();

	const getWalletSVG = (i:number) =>{
		let svg;
		switch(i){
			case 1:
				svg = (
				<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="../../www.w3.org/2000/svg.html">
					<path d="M19.2744 18.8013H16.0334V23.616H19.2744C19.9286 23.616 20.5354 23.3506 20.9613 22.9053C21.4066 22.4784 21.672 21.8726 21.672 21.1989C21.673 19.8813 20.592 18.8013 19.2744 18.8013Z" fill="white"/>
					<path d="M18 0C8.07429 0 0 8.07429 0 18C0 27.9257 8.07429 36 18 36C27.9257 36 36 27.9247 36 18C36 8.07531 27.9247 0 18 0ZM21.6627 26.3355H19.5398V29.6722H17.3129V26.3355H16.0899V29.6722H13.8528V26.3355H9.91954V24.2414H12.0898V11.6928H9.91954V9.59863H13.8528V6.3288H16.0899V9.59863H17.3129V6.3288H19.5398V9.59863H21.4735C22.5535 9.59863 23.5491 10.044 24.2599 10.7547C24.9706 11.4655 25.416 12.4611 25.416 13.5411C25.416 15.6549 23.7477 17.3798 21.6627 17.4744C24.1077 17.4744 26.0794 19.4647 26.0794 21.9096C26.0794 24.3453 24.1087 26.3355 21.6627 26.3355Z" fill="white"/>
					<path d="M20.7062 15.8441C21.095 15.4553 21.3316 14.9338 21.3316 14.3465C21.3316 13.1812 20.3842 12.2328 19.2178 12.2328H16.0334V16.4695H19.2178C19.7959 16.4695 20.3266 16.2226 20.7062 15.8441Z" fill="white"/>
				</svg>

				)
			break;
			case 2:
				svg = (
				<svg width="55" height="34" viewBox="0 0 55 34" fill="none" xmlns="../../www.w3.org/2000/svg.html">
					<circle cx="38.0091" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
					<circle cx="17.4636" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
				</svg>
				)
			break;
			case 3:
				svg = (
					<svg width="55" height="34" viewBox="0 0 55 34" fill="none" xmlns="../../www.w3.org/2000/svg.html">
						<circle cx="38.0091" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
						<circle cx="17.4636" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
					</svg>
				)
			break;
			case 4:
				svg = (
					<svg width="55" height="34" viewBox="0 0 55 34" fill="none" xmlns="../../www.w3.org/2000/svg.html">
					<circle cx="38.0091" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
					<circle cx="17.4636" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
				</svg>
				)
			break;
			default :
				svg = ''
			break;

		}
		return svg
	}
useEffect(() => {
// 	$('.owl-carousel').owlCarousel();
//   return () => {
// 	$('.owl-carousel').owlCarousel('destroy');
//   };
}, [])
// console.log(currentUser)
	const onSubmit: SubmitHandler<FieldValues> = async (formFields, e) => {
		e?.preventDefault()
			setAmount(parseFloat(formFields.amount))
			setShowCheckout(true)
	}
  return (
    <>
    <MainBody>
		<div className="container-fluid">
			<PageHeading pageHeading='Dashboard' />
				<div className="row">
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								<h2 className="text-black mb-2 font-w600">0</h2>
								<p className="mb-0 fs-14">
									
									Active Listing
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								<h2 className="text-black mb-2 font-w600">0</h2>
								<p className="mb-0 fs-13">
									
								Sold
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								<h2 className="text-black mb-2 font-w600">0</h2>
								<p className="mb-0 fs-14">
									
									Failed Orders
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								
								<h2 className="text-black mb-2 font-w600">0</h2>
								<p className="mb-0 fs-14">
									
								Total Listings
								</p>	
							</div>
						</div>
					</div>
				</div>
			
				<div className="row">
					<div className="col-xl-6 col-xxl-12">
					<ModalComponent {...{size:showCheckout? "lg": "sm", header:{show:true,title:'Fund Wallet'},modalStates:{show,handleOpen,handleClose}}} >
								{showCheckout ?
								<StripeElement amount={amount}>{amount && <CheckoutForm {...{styles:{buttonText:`Top up $${amount} `}, amount:amount}}/>}</StripeElement>
													
							:
							<form onSubmit={(e) => handleSubmit(onSubmit)(e) } >
									
						<div className="form-group">
                        <label htmlFor="amount" className='font-normal font-size-xs'>Amount</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaDollarSign />
                          </span>
                          <input
                            type="number"
                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                            id="amount"
							
                            {...register('amount', { required: 'Amount is required',
								min:{
										message:`Minimum of $3`,
										value:3
								},
								value:3

							 })}
                          />
                          {errors.amount && <div className="invalid-feedback">{errors.amount.message}</div>}
                        </div>
                      </div>
					  <div className="d-flex justify-content-end  w-100">
									<Button type='submit' size='sm' className='bg-primary' >Top up</Button>

									</div>
					  </form>
							}		
					
						</ModalComponent>	
						<div className="row">{
							currentUser.wallets.map((wallet:Wallet,i:number)=>(

								<div className="col-sm-6" key={i}>
								<div className="card-bx stacked card">
									<img src={`dashboard-assets/images/card/card${i+1}.jpg`} alt=""/>
									<div className="card-info">
										<p className="mb-1 text-white fs-14">Wallet Balance</p>
										<div className="d-flex justify-content-between">
											<h2 className="num-text text-white mb-5 font-w600">$ {parseFloat(wallet.balance).toFixed(2)}</h2>
											{ getWalletSVG(i+1) }
										</div>
										<div className="d-flex justify-content-between">
										{/* <div className="me-4 text-white">
												<p className="fs-12 mb-1 op6">VALID THRU</p>
												<span>08/21</span>
											</div> */}
											<div className="text-white">
												<p className="fs-12 mb-1 op6">CARD HOLDER</p>
												<span>{getUserFullName(currentUser)}</span>
											</div>
										<div className="me-4 text-white">
												<Button onClick={handleOpen} size='sm' className='bg-transparent border-white border-3'>Fund</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
							))}
							
						
							<div className="col-xl-12">
								<div className="card">
									<div className="card-header pb-2 d-block d-sm-flex flex-wrap border-0">
										<div className="mb-3">
											<h4 className="fs-20 text-black">Recent Trading Activities</h4>
											<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
										</div>
										<div className="card-action card-tabs mb-3 style-1">
											<ul className="nav nav-tabs" role="tablist">
												<li className="nav-item">
													<a className="nav-link active" data-bs-toggle="tab" href="#monthly">
														Monthly	
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" data-bs-toggle="tab" href="#Weekly">
														Weekly
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" data-bs-toggle="tab" href="#Today">
														Today
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="card-body tab-content p-0">
										<div className="tab-pane active show fade" id="monthly">
											<div className="table-responsive">
												<table className="table shadow-hover card-table border-no tbl-btn short-one">
													<tbody>
														<tr>
															<td>
																<span>
																	<svg width="50" height="50" viewBox="0 0 63 63" fill="none" xmlns="../../www.w3.org/2000/svg.html">
																		<rect width="63" height="63" rx="14" fill="#71B945"/>
																		<path d="M40.6186 32.7207L40.6186 32.7207L40.6353 39.6289C40.6354 39.6328 40.6354 39.6363 40.6353 39.6396M40.6186 32.7207L40.1353 39.6341L40.6353 39.635C40.6353 39.6481 40.6347 39.6583 40.6345 39.6627L40.6344 39.6642C40.6346 39.6609 40.6351 39.652 40.6353 39.6407C40.6353 39.6403 40.6353 39.64 40.6353 39.6396M40.6186 32.7207C40.6167 31.9268 39.9717 31.2847 39.1777 31.2866C38.3838 31.2885 37.7417 31.9336 37.7436 32.7275L37.7436 32.7275L37.7519 36.1563M40.6186 32.7207L37.7519 36.1563M40.6353 39.6396C40.6329 40.4282 39.9931 41.0705 39.2017 41.0726C39.2 41.0726 39.1983 41.0727 39.1965 41.0727L39.1944 41.0727L39.1773 41.0726L32.2834 41.056L32.2846 40.556L32.2834 41.056C31.4897 41.054 30.8474 40.4091 30.8494 39.615C30.8513 38.8211 31.4964 38.179 32.2903 38.1809L32.2903 38.1809L35.719 38.1892L22.5364 25.0066C21.975 24.4452 21.975 23.5351 22.5364 22.9737C23.0978 22.4123 24.0079 22.4123 24.5693 22.9737L37.7519 36.1563M40.6353 39.6396C40.6353 39.6376 40.6353 39.6356 40.6353 39.6336L37.7519 36.1563M39.1964 41.0726C39.1957 41.0726 39.1951 41.0726 39.1944 41.0726L39.1964 41.0726Z" fill="white" stroke="white"/>
																	</svg>
																</span>
															</td>
															<td className="wspace-no">
																<svg  className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="../../www.w3.org/2000/svg.html">
																	<path d="M16 9.50011C15.9992 8.67201 15.216 8.00092 14.2501 8H9V11H14.2501C15.216 10.9993 15.9992 10.328 16 9.50011Z" fill="#FFAB2D"/>
																	<path d="M9 16H14.2501C15.2165 16 16 15.3285 16 14.5001C16 13.6715 15.2165 13 14.2501 13H9V16Z" fill="#FFAB2D"/>
																	<path d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z" fill="#FFAB2D"/>
																</svg>
																<span className="font-w600 text-black">Bitcoin</span>
															</td>
															<td>
																<span className="text-black">06:24:45 AM</span>
															</td>
															<td>
																<span className="font-w600 text-black">+$5,553</span>
															</td>
															<td><Link className="btn btn-outline-success float-end" to="#">Completed</Link></td>
														</tr>
													
													</tbody>
												</table>
											</div>
										</div>
										<div className="tab-pane fade" id="Today">
											<div className="table-responsive">
												<table className="table shadow-hover card-table border-no tbl-btn short-one">
													<tbody>
														<tr>
															<td>
																<span>
																	<svg width="50" height="50" viewBox="0 0 63 63" fill="none" xmlns="../../www.w3.org/2000/svg.html">
																		<rect width="63" height="63" rx="14" fill="#71B945"/>
																		<path d="M40.6186 32.7207L40.6186 32.7207L40.6353 39.6289C40.6354 39.6328 40.6354 39.6363 40.6353 39.6396M40.6186 32.7207L40.1353 39.6341L40.6353 39.635C40.6353 39.6481 40.6347 39.6583 40.6345 39.6627L40.6344 39.6642C40.6346 39.6609 40.6351 39.652 40.6353 39.6407C40.6353 39.6403 40.6353 39.64 40.6353 39.6396M40.6186 32.7207C40.6167 31.9268 39.9717 31.2847 39.1777 31.2866C38.3838 31.2885 37.7417 31.9336 37.7436 32.7275L37.7436 32.7275L37.7519 36.1563M40.6186 32.7207L37.7519 36.1563M40.6353 39.6396C40.6329 40.4282 39.9931 41.0705 39.2017 41.0726C39.2 41.0726 39.1983 41.0727 39.1965 41.0727L39.1944 41.0727L39.1773 41.0726L32.2834 41.056L32.2846 40.556L32.2834 41.056C31.4897 41.054 30.8474 40.4091 30.8494 39.615C30.8513 38.8211 31.4964 38.179 32.2903 38.1809L32.2903 38.1809L35.719 38.1892L22.5364 25.0066C21.975 24.4452 21.975 23.5351 22.5364 22.9737C23.0978 22.4123 24.0079 22.4123 24.5693 22.9737L37.7519 36.1563M40.6353 39.6396C40.6353 39.6376 40.6353 39.6356 40.6353 39.6336L37.7519 36.1563M39.1964 41.0726C39.1957 41.0726 39.1951 41.0726 39.1944 41.0726L39.1964 41.0726Z" fill="white" stroke="white"/>
																	</svg>
																</span>
															</td>
															<td className="wspace-no">
																<svg  className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="../../www.w3.org/2000/svg.html">
																	<path d="M16 9.50011C15.9992 8.67201 15.216 8.00092 14.2501 8H9V11H14.2501C15.216 10.9993 15.9992 10.328 16 9.50011Z" fill="#FFAB2D"/>
																	<path d="M9 16H14.2501C15.2165 16 16 15.3285 16 14.5001C16 13.6715 15.2165 13 14.2501 13H9V16Z" fill="#FFAB2D"/>
																	<path d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z" fill="#FFAB2D"/>
																</svg>
																<span className="font-w600 text-black">Bitcoin</span>
															</td>
															<td>
																<span className="text-black">06:24:45 AM</span>
															</td>
															<td>
																<span className="font-w600 text-black">+$5,553</span>
															</td>
															<td><Link className="btn btn-outline-success float-end" to="#">Completed</Link></td>
														</tr>
											
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="card-footer border-0 p-0 caret mt-1">
										<Link to="/market" className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
									</div>
								</div>
							</div>
							<div className="col-xl-12 mt-2">
								<div className="card">
									<div className="card-header d-sm-flex d-block pb-0 border-0">
										<div>
											<h4 className="fs-20 text-black">Quick Transfer</h4>
											<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
										</div>
										<select className="form-control custom-image-select image-select mt-3 mt-sm-0">
											<option data-thumbnail="dashboard-assets/images/svg/btc.svg">Ripple</option>
											<option data-thumbnail="dashboard-assets/images/svg/eth.svg">Ethereum</option>
											<option data-thumbnail="dashboard-assets/images/svg/btc.svg">Bitcoin</option>
											<option data-thumbnail="dashboard-assets/images/svg/ltc.svg">Litecoin</option>
										</select>
									</div>
									<div className="card-body">
										<div className="form-wrapper">
											<div className="form-group">
												<div className="input-group input-group-lg">
													<div className="input-group-prepend">
														<span className="input-group-text">Amount BTC</span>
													</div>
													<input type="text" className="form-control" placeholder="742.2"/>
												</div>
											</div>
										</div>
										<div className="d-flex mb-3 mt-3 justify-content-between align-items-center">
											<h4 className="text-black fs-20 mb-0">Recent Contacts</h4>
											<Link to="#" className="btn-link">View more</Link>
										</div>
										<div className="testimonial-one px-4 owl-right-nav owl-carousel owl-loaded owl-drag">
											<div className="items">
												<div className="text-center">
													<img className="mb-3 rounded" src="dashboard-assets/images/contacts/Untitled-1.jpg" alt=""/>
													<h5 className="mb-0"><Link className="text-black" to="#">Samuel</Link></h5>
													<span className="fs-12">@sam224</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                    </div>
					<div className="col-xl-6 col-xxl-12">
						<div className="row">
							<div className="col-sm-12">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<h4 className="mb-0 fs-20 text-black">Sell Order</h4>
										<div className="dropdown custom-dropdown mb-0 tbl-orders-style">
											<div className="btn sharp tp-btn" data-bs-toggle="dropdown">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="../../www.w3.org/2000/svg.html">
													<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
													<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
													<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												</svg>
											</div>
											<div className="dropdown-menu dropdown-menu-end">
												<Link className="dropdown-item" to="#">Details</Link>
												<Link className="dropdown-item text-danger" to="#">Cancel</Link>
											</div>
										</div>
									</div>
									<div className="card-body p-3 pb-0 sell-order">
										<select className="form-control custom-image-select-2 image-select mt-3 mt-sm-0">
											<option data-thumbnail="dashboard-assets/images/svg/lit3.svg">Litecoin</option>
											<option data-thumbnail="dashboard-assets/images/svg/btc.svg">Ripple</option>
											<option data-thumbnail="dashboard-assets/images/svg/eth.svg">Ethereum</option>
											<option data-thumbnail="dashboard-assets/images/svg/btc.svg">Bitcoin</option>
										</select>
										<div className="table-responsive">
											<table className="table text-center bg-info-hover tr-rounded order-tbl">
												<thead>
													<tr>
														<th className="text-left">Price</th>
														<th className="text-center">Amount</th>
														<th className="text-right">Total</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="text-left">82.3</td>
														<td>0.15</td>
														<td className="text-right">$134,12</td>
													</tr>
													<tr>
														<td className="text-left">83.9</td>
														<td>0.18</td>
														<td className="text-right">$237,31</td>
													</tr>
													<tr>
														<td className="text-left">84.2</td>
														<td>0.25</td>
														<td className="text-right">$252,58</td>
													</tr>
													<tr>
														<td className="text-left">86.2</td>
														<td>0.35</td>
														<td className="text-right">$126,26</td>
													</tr>
													<tr>
														<td className="text-left">91.6</td>
														<td>0.75</td>
														<td className="text-right">$46,92</td>
													</tr>
													<tr>
														<td className="text-left">92.6</td>
														<td>0.21</td>
														<td className="text-right">$123,27</td>
													</tr>
													<tr>
														<td className="text-left">93.9</td>
														<td>0.55</td>
														<td className="text-right">$212,56</td>
													</tr>
													<tr>
														<td className="text-left">94.2</td>
														<td>0.18</td>
														<td className="text-right">$129,26</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div className="card-footer border-0 p-0 caret">
										<Link to="/market" className="btn-link"><i className="fa fa-caret-down" aria-hidden="true"></i></Link>
									</div>
								</div>	
							</div>
							
							
						</div>
					</div>
                </div>
			</div>
             </MainBody>       
    </>
  )
}

export default HomePage