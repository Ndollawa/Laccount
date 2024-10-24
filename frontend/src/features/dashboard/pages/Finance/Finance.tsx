import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../../auth/slices/auth.slice';
// import $ from 'jquery';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
import MainBody from '../../components/MainBody';
import PageHeading from '../../components/PageHeading';
import { useSelector } from 'react-redux';


const Finance = () => {
	const currentUser = useSelector(selectCurrentUser)
useEffect(() => {
// 	$('.owl-carousel').owlCarousel();
//   return () => {
// 	$('.owl-carousel').owlCarousel('destroy');
//   };
}, [])
// console.log(currentUser)
  return (
    <>
    <MainBody>
		<div className="container-fluid">
			<PageHeading pageHeading='Dashboard' />
				<div className="row">
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								<svg className="mb-3 currency-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="../../www.w3.org/2000/svg.html">
									<circle cx="40" cy="40" r="40" fill="white"/>
									<path d="M40.725 0.00669178C18.6241 -0.393325 0.406678 17.1907 0.00666126 39.275C-0.393355 61.3592 17.1907 79.5933 39.2749 79.9933C61.3592 80.3933 79.5933 62.8093 79.9933 40.7084C80.3933 18.6241 62.8092 0.390041 40.725 0.00669178ZM39.4083 72.493C21.4909 72.1597 7.17362 57.3257 7.50697 39.4083C7.82365 21.4909 22.6576 7.17365 40.575 7.49033C58.5091 7.82368 72.8096 22.6576 72.493 40.575C72.1763 58.4924 57.3257 72.8097 39.4083 72.493Z" fill="#00ADA3"/>
									<path d="M40.5283 10.8305C24.4443 10.5471 11.1271 23.3976 10.8438 39.4816C10.5438 55.549 23.3943 68.8662 39.4783 69.1662C55.5623 69.4495 68.8795 56.599 69.1628 40.5317C69.4462 24.4477 56.6123 11.1305 40.5283 10.8305ZM40.0033 19.1441L49.272 35.6798L40.8133 30.973C40.3083 30.693 39.6966 30.693 39.1916 30.973L30.7329 35.6798L40.0033 19.1441ZM40.0033 60.8509L30.7329 44.3152L39.1916 49.022C39.4433 49.162 39.7233 49.232 40.0016 49.232C40.28 49.232 40.56 49.162 40.8117 49.022L49.2703 44.3152L40.0033 60.8509ZM40.0033 45.6569L29.8296 39.9967L40.0033 34.3364L50.1754 39.9967L40.0033 45.6569Z" fill="#00ADA3"/>
								</svg>
								<h2 className="text-black mb-2 font-w600">$168,331.09</h2>
								<p className="mb-0 fs-14">
									<svg  width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="../../www.w3.org/2000/svg.html">
										<g filter="url(#filter0_d1)">
										<path d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4" stroke="#2BC155" strokeWidth="2" strokeLinecap="round"/>
										</g>
										<defs>
										<filter id="filter0_d1" x="-3.05176e-05" y="-6.10352e-05" width="28.5001" height="22.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
										<feOffset dy="1"/>
										<feGaussianBlur stdDeviation="2"/>
										<feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
										</filter>
										</defs>
									</svg>
									<span className="text-success me-1">45%</span>This week
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								<svg className="mb-3 currency-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="../../www.w3.org/2000/svg.html">
									<circle cx="40" cy="40" r="40" fill="white"/>
									<path d="M40 0C17.9083 0 0 17.9083 0 40C0 62.0917 17.9083 80 40 80C62.0917 80 80 62.0917 80 40C80 17.9083 62.0917 0 40 0ZM40 72.5C22.0783 72.5 7.5 57.92 7.5 40C7.5 22.08 22.0783 7.5 40 7.5C57.9217 7.5 72.5 22.0783 72.5 40C72.5 57.9217 57.92 72.5 40 72.5Z" fill="#FFAB2D"/>
									<path d="M42.065 41.2983H36.8133V49.1H42.065C43.125 49.1 44.1083 48.67 44.7983 47.9483C45.52 47.2566 45.95 46.275 45.95 45.1833C45.9517 43.0483 44.2 41.2983 42.065 41.2983Z" fill="#FFAB2D"/>
									<path d="M40 10.8333C23.9167 10.8333 10.8333 23.9166 10.8333 40C10.8333 56.0833 23.9167 69.1666 40 69.1666C56.0833 69.1666 69.1667 56.0816 69.1667 40C69.1667 23.9183 56.0817 10.8333 40 10.8333ZM45.935 53.5066H42.495V58.9133H38.8867V53.5066H36.905V58.9133H33.28V53.5066H26.9067V50.1133H30.4233V29.7799H26.9067V26.3866H33.28V21.0883H36.905V26.3866H38.8867V21.0883H42.495V26.3866H45.6283C47.3783 26.3866 48.9917 27.1083 50.1433 28.26C51.295 29.4116 52.0167 31.025 52.0167 32.775C52.0167 36.2 49.3133 38.995 45.935 39.1483C49.8967 39.1483 53.0917 42.3733 53.0917 46.335C53.0917 50.2816 49.8983 53.5066 45.935 53.5066Z" fill="#FFAB2D"/>
									<path d="M44.385 36.5066C45.015 35.8766 45.3983 35.0316 45.3983 34.08C45.3983 32.1916 43.8633 30.655 41.9733 30.655H36.8133V37.52H41.9733C42.91 37.52 43.77 37.12 44.385 36.5066Z" fill="#FFAB2D"/>
								</svg>
								<h2 className="text-black mb-2 font-w600">$24,098</h2>
								<p className="mb-0 fs-13">
									<svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="../../www.w3.org/2000/svg.html">
										<g filter="url(#filter0_d2)">
										<path d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4" stroke="#2BC155" strokeWidth="2" strokeLinecap="round"/>
										</g>
										<defs>
										<filter id="filter0_d2" x="-3.05176e-05" y="-6.10352e-05" width="28.5001" height="22.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
										<feOffset dy="1"/>
										<feGaussianBlur stdDeviation="2"/>
										<feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
										</filter>
										</defs>
									</svg>
									<span className="text-success me-1">45%</span>This week
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								<svg className="mb-3 currency-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="../../www.w3.org/2000/svg.html">
									<circle cx="40" cy="40" r="40" fill="white"/>
									<path d="M40.725 0.00669178C18.6241 -0.393325 0.406678 17.1907 0.00666126 39.275C-0.393355 61.3592 17.1907 79.5933 39.2749 79.9933C61.3592 80.3933 79.5933 62.8093 79.9933 40.7084C80.3933 18.6241 62.8092 0.390041 40.725 0.00669178ZM39.4083 72.493C21.4909 72.1597 7.17362 57.3257 7.50697 39.4083C7.82365 21.4909 22.6576 7.17365 40.575 7.49033C58.5091 7.82368 72.8096 22.6576 72.493 40.575C72.1763 58.4924 57.3257 72.8097 39.4083 72.493Z" fill="#374C98"/>
									<path d="M40.5283 10.8305C24.4443 10.5471 11.1271 23.3976 10.8438 39.4816C10.5438 55.549 23.3943 68.8662 39.4783 69.1662C55.5623 69.4495 68.8795 56.599 69.1628 40.5317C69.4462 24.4477 56.6123 11.1305 40.5283 10.8305ZM52.5455 56.9324H26.0111L29.2612 38.9483L25.4944 39.7317V36.6649L29.8279 35.7482L32.6447 20.2809H43.2284L40.8283 33.4481L44.5285 32.6647V35.7315L40.2616 36.6149L37.7949 50.2154H54.5122L52.5455 56.9324Z" fill="#374C98"/>
								</svg>
								<h2 className="text-black mb-2 font-w600">$667,224</h2>
								<p className="mb-0 fs-14">
									<svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="../../www.w3.org/2000/svg.html">
										<g filter="url(#filter0_d4)">
										<path d="M5 4C5.91797 5.08433 8.89728 8.27228 10.5 10L16.5 7L23.5 16" stroke="#FF2E2E" strokeWidth="2" strokeLinecap="round"/>
										</g>
										<defs>
										<filter id="filter0_d4" x="-3.05176e-05" y="0" width="28.5001" height="22.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
										<feOffset dy="1"/>
										<feGaussianBlur stdDeviation="2"/>
										<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.61 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
										</filter>
										</defs>
									</svg>
									<span className="text-danger me-1">45%</span>This week
								</p>	
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 m-t35">
						<div className="card card-coin">
							<div className="card-body text-center">
								<svg className="mb-3 currency-icon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="../../www.w3.org/2000/svg.html">
									<circle cx="40" cy="40" r="40" fill="white"/>
									<path d="M40.725 0.00669178C18.6241 -0.393325 0.406708 17.1907 0.00669178 39.275C-0.393325 61.3592 17.1907 79.5933 39.275 79.9933C61.3592 80.3933 79.5933 62.8093 79.9933 40.7084C80.3933 18.6241 62.8093 0.390041 40.725 0.00669178ZM39.4083 72.493C21.4909 72.1597 7.17365 57.3257 7.507 39.4083C7.82368 21.4909 22.6576 7.17365 40.575 7.49033C58.5091 7.82368 72.8097 22.6576 72.493 40.575C72.1763 58.4924 57.3257 72.8097 39.4083 72.493Z" fill="#FF782C"/>
									<path d="M40.525 10.8238C24.441 10.5405 11.1238 23.391 10.8405 39.475C10.7455 44.5352 11.9605 49.3204 14.1639 53.5139H23.3326V24.8027C23.3326 23.0476 25.7177 22.4893 26.4928 24.0643L40 51.4171L53.5072 24.066C54.2822 22.4893 56.6674 23.0476 56.6674 24.8027V53.5139H65.8077C67.8578 49.6171 69.0779 45.2169 69.1595 40.525C69.4429 24.441 56.609 11.1238 40.525 10.8238Z" fill="#FF782C"/>
									<path d="M53.3339 55.1806V31.943L41.4934 55.919C40.9334 57.0574 39.065 57.0574 38.5049 55.919L26.6661 31.943V55.1806C26.6661 56.1007 25.9211 56.8474 24.9994 56.8474H16.2474C21.4326 64.1327 29.8629 68.9795 39.475 69.1595C49.4704 69.3362 58.3908 64.436 63.786 56.8474H55.0006C54.0789 56.8474 53.3339 56.1007 53.3339 55.1806Z" fill="#FF782C"/>
								</svg>
								<h2 className="text-black mb-2 font-w600">$667,224</h2>
								<p className="mb-0 fs-14">
									<svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="../../www.w3.org/2000/svg.html">
										<g filter="url(#filter0_d5)">
										<path d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4" stroke="#2BC155" strokeWidth="2" strokeLinecap="round"/>
										</g>
										<defs>
										<filter id="filter0_d5" x="-3.05176e-05" y="-6.10352e-05" width="28.5001" height="22.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
										<feFlood floodOpacity="0" result="BackgroundImageFix"/>
										<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
										<feOffset dy="1"/>
										<feGaussianBlur stdDeviation="2"/>
										<feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"/>
										<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
										<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
										</filter>
										</defs>
									</svg>
									<span className="text-success me-1">45%</span>This week
								</p>	
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-9 col-xxl-8">
						<div className="card">
							<div className="card-header border-0 flex-wrap pb-0">
								<div className="mb-3">
									<h4 className="fs-20 text-black">Market Overview</h4>
									<p className="mb-0 fs-12 text-black">Lorem ipsum dolor sit amet, consectetur</p>
								</div>
								<div className="d-flex flex-wrap mb-2">
									<div className="form-check me-4 mb-2">
									  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1"/>
									  <label className="form-check-label" htmlFor="flexCheckDefault1"><span className="d-block  font-w500">BTS</span></label>
									</div>
									<div className="form-check me-4 mb-2">
									  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2"/>
									  <label className="form-check-label" htmlFor="flexCheckDefault2"><span className="d-block  font-w500">XRP</span></label>
									</div>
									<div className="form-check me-4 mb-2">
									  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3"/>
									  <label className="form-check-label" htmlFor="flexCheckDefault3"><span className="d-block  font-w500">ETH</span></label>
									</div>
									<div className="form-check me-4 mb-2">
									  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4"/>
									  <label className="form-check-label" htmlFor="flexCheckDefault4"><span className="d-block  font-w500">ZEC</span></label>
									</div>
								</div>
								<select className="style-1 btn-secondary default-select">
									<option>Weekly (2021)</option>
									<option>Daily (2021)</option>
									<option>Yearly (2021)</option>
								</select>
							</div>
							<div className="card-body pb-2 px-3">
								<div id="marketChart" className="market-line"></div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-xxl-4">
						<div className="card">
							<div className="card-header border-0 pb-0">
								<h4 className="fs-20 text-black">Current Statistic</h4>
							</div>
							<div className="card-body pb-0">
								<div id="currentChart" className="current-chart"></div>
								<div className="chart-content">	
									<div className="d-flex justify-content-between mb-2 align-items-center">
										<div>
											<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<rect width="15" height="15" rx="7.5" fill="#EB8153"/>
											</svg>
											<span className="fs-14">Income (66%)</span>
										</div>
										<div>
											<h5 className="mb-0">$167,884.21</h5>
										</div>
									</div>
									<div className="d-flex justify-content-between mb-2 align-items-center">
										<div>
											<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<rect width="15" height="15" rx="7.5" fill="#71B945"/>
											</svg>

											<span className="fs-14">Income (50%)</span>
										</div>
										<div>
											<h5 className="mb-0">$56,411.33</h5>
										</div>
									</div>
									<div className="d-flex justify-content-between mb-2 align-items-center">
										<div>
											<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<rect width="15" height="15" rx="7.5" fill="#4A8CDA"/>
											</svg>
											<span className="fs-14">Income (11%)</span>
										</div>
										<div>
											<h5 className="mb-0">$81,981.22</h5>
										</div>
									</div>
									<div className="d-flex justify-content-between mb-2 align-items-center">
										<div>
											<svg className="me-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<rect width="15" height="15" rx="7.5" fill="#6647BF"/>
											</svg>
											<span className="fs-14">Income (23%)</span>
										</div>
										<div>
											<h5 className="mb-0">$12,432.51</h5>
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-6 col-xxl-12">
						<div className="row">
							<div className="col-sm-6">
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
							<div className="col-sm-6">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<h4 className="mb-0 text-black fs-20">Buy Order</h4>
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
									<div className="card-body p-3 pb-0">
										<select className="form-control custom-image-select-2 image-select mt-3 mt-sm-0">
											<option data-thumbnail="dashboard-assets/images/svg/monero.svg">Monero</option>
											<option data-thumbnail="dashboard-assets/images/svg/eth.svg">Ethereum</option>
											<option data-thumbnail="dashboard-assets/images/svg/btc.svg">Bitcoin</option>
											<option data-thumbnail="dashboard-assets/images/svg/ltc.svg">Litecoin</option>
										</select>
										<div className="table-responsive">
											<table className="table text-center bg-warning-hover tr-rounded order-tbl">
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
							<div className="col-xl-12 mt-2">
								<div className="card">
									<div className="card-header d-sm-flex d-block pb-0 border-0">
										<div>
											<h4 className="fs-20 text-black">Quick Trade</h4>
											<p className="mb-0 fs-12">Lorem ipsum dolor sit amet, consectetur</p>
										</div>
										<select className="form-control custom-image-select image-select mt-3 mt-sm-0">
											<option data-thumbnail="dashboard-assets/images/svg/ltc.svg">Yearly (2021)</option>
											<option data-thumbnail="dashboard-assets/images/svg/eth.svg">Weekly (2021)</option>
											<option data-thumbnail="dashboard-assets/images/svg/btc.svg">Daily (2021)</option>
										</select>
									</div>
									<div className="card-body">
										<div className="basic-form">
											<form className="form-wrapper">
												<div className="form-group">
													<div className="input-group input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text">Amount BTC</span>
														</div>
														<input type="text" className="form-control" placeholder="52.5"/>
													</div>
												</div>
												<div className="form-group">
													<div className="input-group input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text ">Price BPL</span>
														</div>
														<input type="text" className="form-control" placeholder="0,000000"/>
													</div>
												</div>
												<div className="form-group">
													<div className="input-group input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text">Fee (1%)</span>
														</div>
														<input type="text" className="form-control" placeholder="0,000000"/>
													</div>
												</div>
												<div className="form-group">
													<div className="input-group input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text">Total BPL</span>
														</div>
														<input type="text" className="form-control" placeholder="0,000000"/>
													</div>
												</div>
												<div className="row mt-4 align-items-center">
													<div className="col-lg-6">
														<div>
															<p className="mb-0 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
														</div>
													</div>
													<div className="col-lg-6">
														<div className="d-flex justify-content-end">
															<Link to="#" className="btn  btn-success text-white text-nowrap">
															BUY
																<svg className="ms-3 scale3" width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="../../www.w3.org/2000/svg.html">
																<path d="M16.9638 11.5104L16.9721 14.9391L3.78954 1.7565C3.22815 1.19511 2.31799 1.19511 1.75661 1.7565C1.19522 2.31789 1.19522 3.22805 1.75661 3.78943L14.9392 16.972L11.5105 16.9637L11.5105 16.9637C10.7166 16.9619 10.0715 17.6039 10.0696 18.3978C10.0677 19.1919 10.7099 19.8369 11.5036 19.8388L11.5049 19.3388L11.5036 19.8388L18.3976 19.8554L18.4146 19.8555L18.4159 19.8555C18.418 19.8555 18.42 19.8555 18.422 19.8555C19.2131 19.8533 19.8528 19.2114 19.8555 18.4231C19.8556 18.4196 19.8556 18.4158 19.8556 18.4117L19.8389 11.5035L19.8389 11.5035C19.8369 10.7097 19.1919 10.0676 18.3979 10.0695C17.604 10.0713 16.9619 10.7164 16.9638 11.5103L16.9638 11.5104Z" fill="white" stroke="white"></path>
																</svg>
															</Link>
															<Link to="#" className="btn btn-danger ms-3 text-nowrap">
															SELL
																<svg className="ms-3 scale5" width="16" height="16" viewBox="0 0 29 29" fill="none" xmlns="../../www.w3.org/2000/svg.html">
																	<path d="M5.35182 13.4965L5.35182 13.4965L5.33512 6.58823C5.33508 6.5844 5.3351 6.58084 5.33514 6.57759M5.35182 13.4965L5.83514 6.58306L5.33514 6.58221C5.33517 6.56908 5.33572 6.55882 5.33597 6.5545L5.33606 6.55298C5.33585 6.55628 5.33533 6.56514 5.33516 6.57648C5.33515 6.57684 5.33514 6.57721 5.33514 6.57759M5.35182 13.4965C5.35375 14.2903 5.99878 14.9324 6.79278 14.9305C7.58669 14.9287 8.22874 14.2836 8.22686 13.4897L8.22686 13.4896L8.21853 10.0609M5.35182 13.4965L8.21853 10.0609M5.33514 6.57759C5.33752 5.789 5.97736 5.14667 6.76872 5.14454C6.77041 5.14452 6.77217 5.14451 6.77397 5.14451L6.77603 5.1445L6.79319 5.14456L13.687 5.16121L13.6858 5.66121L13.687 5.16121C14.4807 5.16314 15.123 5.80809 15.1211 6.6022C15.1192 7.3961 14.4741 8.03814 13.6802 8.03626L13.6802 8.03626L10.2515 8.02798L23.4341 21.2106C23.9955 21.772 23.9955 22.6821 23.4341 23.2435C22.8727 23.8049 21.9625 23.8049 21.4011 23.2435L8.21853 10.0609M5.33514 6.57759C5.33513 6.57959 5.33514 6.58159 5.33514 6.5836L8.21853 10.0609M6.77407 5.14454C6.77472 5.14454 6.77537 5.14454 6.77603 5.14454L6.77407 5.14454Z" fill="white" stroke="white"></path>
																</svg>
															</Link>
														</div>	
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-xxl-12">
						<div className="row">
							<div className="col-sm-6">
								<div className="card-bx stacked card">
									<img src="dashboard-assets/images/card/card1.jpg" alt=""/>
									<div className="card-info">
										<p className="mb-1 text-white fs-14">Main Balance</p>
										<div className="d-flex justify-content-between">
											<h2 className="num-text text-white mb-5 font-w600">$673,412.66</h2>
											<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<path d="M19.2744 18.8013H16.0334V23.616H19.2744C19.9286 23.616 20.5354 23.3506 20.9613 22.9053C21.4066 22.4784 21.672 21.8726 21.672 21.1989C21.673 19.8813 20.592 18.8013 19.2744 18.8013Z" fill="white"/>
												<path d="M18 0C8.07429 0 0 8.07429 0 18C0 27.9257 8.07429 36 18 36C27.9257 36 36 27.9247 36 18C36 8.07531 27.9247 0 18 0ZM21.6627 26.3355H19.5398V29.6722H17.3129V26.3355H16.0899V29.6722H13.8528V26.3355H9.91954V24.2414H12.0898V11.6928H9.91954V9.59863H13.8528V6.3288H16.0899V9.59863H17.3129V6.3288H19.5398V9.59863H21.4735C22.5535 9.59863 23.5491 10.044 24.2599 10.7547C24.9706 11.4655 25.416 12.4611 25.416 13.5411C25.416 15.6549 23.7477 17.3798 21.6627 17.4744C24.1077 17.4744 26.0794 19.4647 26.0794 21.9096C26.0794 24.3453 24.1087 26.3355 21.6627 26.3355Z" fill="white"/>
												<path d="M20.7062 15.8441C21.095 15.4553 21.3316 14.9338 21.3316 14.3465C21.3316 13.1812 20.3842 12.2328 19.2178 12.2328H16.0334V16.4695H19.2178C19.7959 16.4695 20.3266 16.2226 20.7062 15.8441Z" fill="white"/>
											</svg>
										</div>
										<div className="d-flex">
											<div className="me-4 text-white">
												<p className="fs-12 mb-1 op6">VALID THRU</p>
												<span>08/21</span>
											</div>
											<div className="text-white">
												<p className="fs-12 mb-1 op6">CARD HOLDER</p>
												<span>Marquezz Silalahi</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="card-bx stacked card">
									<img src="dashboard-assets/images/card/card2.jpg" alt=""/>
									<div className="card-info">
										<p className="fs-14 mb-1 text-white">Main Balance</p>
										<div className="d-flex justify-content-between">
											<h2 className="num-text text-white mb-5 font-w600">$673,412.66</h2>
											<svg width="55" height="34" viewBox="0 0 55 34" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<circle cx="38.0091" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
												<circle cx="17.4636" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
											</svg>
										</div>
										<div className="d-flex">
											<div className="me-4 text-white">
												<p className="fs-12 mb-1 op6">VALID THRU</p>
												<span>08/21</span>
											</div>
											<div className="text-white">
												<p className="fs-12 mb-1 op6">CARD HOLDER</p>
												<span>Marquezz Silalahi</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="card-bx stacked card">
									<img src="dashboard-assets/images/card/card3.jpg" alt=""/>
									<div className="card-info">
										<p className="mb-1 text-white fs-14">Main Balance</p>
										<div className="d-flex justify-content-between">
											<h2 className="num-text text-white mb-5 font-w600">$673,412.66</h2>
											<svg width="55" height="34" viewBox="0 0 55 34" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<circle cx="38.0091" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
												<circle cx="17.4636" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
											</svg>
										</div>
										<div className="d-flex">
											<div className="me-4 text-white">
												<p className="fs-12 mb-1 op6">VALID THRU</p>
												<span>08/21</span>
											</div>
											<div className="text-white">
												<p className="fs-12 mb-1 op6">CARD HOLDER</p>
												<span>Marquezz Silalahi</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="card-bx stacked card">
									<img src="dashboard-assets/images/card/card4.jpg" alt=""/>
									<div className="card-info">
										<p className="mb-1 text-white fs-14">Main Balance</p>
										<div className="d-flex justify-content-between">
											<h2 className="num-text text-white mb-5 font-w600">$673,412.66</h2>
											<svg width="55" height="34" viewBox="0 0 55 34" fill="none" xmlns="../../www.w3.org/2000/svg.html">
												<circle cx="38.0091" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
												<circle cx="17.4636" cy="16.7788" r="16.7788" fill="white" fillOpacity="0.67"/>
											</svg>
										</div>
										<div className="d-flex">
											<div className="me-4 text-white">
												<p className="fs-12 mb-1 op6">VALID THRU</p>
												<span>08/21</span>
											</div>
											<div className="text-white">
												<p className="fs-12 mb-1 op6">CARD HOLDER</p>
												<span>Marquezz Silalahi</span>
											</div>
										</div>
									</div>
								</div>
							</div>
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
                </div>
			</div>
             </MainBody>       
    </>
  )
}

export default Finance