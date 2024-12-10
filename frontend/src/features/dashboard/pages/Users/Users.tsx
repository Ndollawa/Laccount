import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { FaEye, FaListAlt } from 'react-icons/fa'
import { IoGridOutline } from 'react-icons/io5'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import MainBody from '@dashboard/components/MainBody'
import { setPreloader } from '@components/preloader/slices/preloader.slice'
import UsersTableData from './components/UsersTableData'
import {useGetUsersQuery, useDeleteUserMutation } from './slices/usersApi.slice'
import showToast from '@utils/showToast'
import {getUserFullName} from '@utils/getUserName'
import useUserImage from '@hooks/useUserImage'
import useToggle from '@hooks/useToggle'
import UserCard from './components/UserCard'
import DataTableComponent from '@components/DataTableComponent' 
import userInterface from '@props/userProps'
import PageProps from '@props/pageProps'
import { MdVerifiedUser } from 'react-icons/md'

    
interface modalDataProps {
    data:{
       user:any;
   } | null,
   showModal:boolean,
 }

    const Users = ({pageData}:PageProps)  => {

// const [users, setusers] = useState<any>([])
    const [viewType,toggleViewType] = useToggle('viewType','List');
    const dispatch =useDispatch()
  
    const {
        data:users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    // const userImage = useUserImage(user)

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteUserMutation()
    const onDeleteUser = async (id:string) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-sm m-2 btn-success',
              cancelButton: 'btn btn-sm m-2 btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {  
        await deleteUser({ id })
        if(isDelError) return showToast('error',JSON.stringify(delError?.data))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Operation aborted, entry is safe  :)',
                'error'
              )
            }
          })
      
    }


const renderAccountStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="badge badge-primary light">{status}</span>;
      case 'ACTIVE':
        return <span className="badge badge-success light">{status}</span>;
      case 'INACTIVE':
        return <span className="badge badge-danger light">{status}</span>;
      default:
        return null;
    }
  };
const renderVerificationStatus = (status: boolean) => status? <>Verified <MdVerifiedUser size={'1.5rem'} className="text-success"/></> :<>Unverified <MdVerifiedUser size={'1.5rem'} className="text-grey" /></>;
 const tableHead =  ["S/N","Name","Username","Verification Status","Country","Account Status","Date Created","Action"];
        useEffect(() => {
            dispatch(setPreloader(isLoading?true:false)) 
             
            }, [isLoading])

            const [modalData,setModalData] = useState<modalDataProps>({
                data:null, 
                showModal:false,
                })
          const showEditForm = (modalData:modalDataProps)=>{
                 setModalData(modalData);
                 }

let usersCard
usersCard = users?.ids? users?.ids.map((userId:string)=> <UserCard key={userId}  userId={userId} />): null ;
const usersTableData = users?.entities && Object.values(users?.entities)?.map((user:unknown | userInterface, i:number)=>({
    i:(i+1),
    name: getUserFullName(user),
    username: user?.username,
    verificationStatus: user?.verificationStatus,
    country: user?.profile?.country,
    accountStatus: user?.profile?.status,
    createdAt: new Date(user?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' }),
    user:user
   })) || [];
 
   const slots = {
        3: (data:any, row:any) => <div>
             { renderVerificationStatus(row.verificationStatus) }
            </div>,    
        5: (data:any, row:any) =>  <div>
                    { renderAccountStatus(row.accountStatus) }
                </div>, 
        7: (data:any, row:any) => (
            <div className="d-flex action-button">
            <button className="btn btn-info btn-xs light px-2"   onClick={()=>showEditForm(row.user)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
           <> <a href={`/dashboard/users/${row.user?.id}`} className='btn btn-success btn-xs light px-2 ms-2'>
                <FaEye fontSize={'1.2rem'}/>
            </a></>
            <button className="ms-2 btn btn-xs px-2 light btn-danger" onClick={()=>onDeleteUser(row.user?.id)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

            </button>
        </div>
        )
    }


const tprops = {
    data: usersTableData,
    slots,
    options: {
    columns: [
            { data: 'i', name: 'i', width:'5%' },
            { data: 'name',name:'name', width:'15%' },
            { data: 'username',name:'username', width:'7%'  },
            { data: 'verificationStatus',name:'verificationStatus', width:'5%', className:'text-center'  },
            { data: 'country', name:'country', width:'5%' },
            { data: 'accountStatus',name:'accountStatus', width:'3%' , className:'text-center'  },
            { data: 'createdAt',name:'createdAt', width:'5%'  },
            { data: 'user', name:'actions', width:'10%' },
          ],
      autoWidth: true,
      processing: true,
      responsive: true,
      scrollX: true,
      scrollY: 'true',
      stateSave: true,
      select: false,
    },
  };
    const setView = ()=>{
        if(viewType){
        toggleViewType(false)
        }else{
        toggleViewType(true)
        }
    }
     return (
        <>
        <MainBody>
        <div className="container-fluid">
            <div className="row">
            <div className="col-12">
            <div className="card-body d-flex justify-content-between align-items-center">
								<div>
									<h4>Users {viewType? "List": "Card"} View</h4>
									<span>All Users Record</span>
								</div>
								<button className="btn btn-info light" onClick={setView}>{viewType? <FaListAlt fontSize={'1.2rem'}/> : <IoGridOutline fontSize={'1.2rem'} />}</button>
							</div>
                            </div>
                       {viewType? 
                        (
                            <>  <div className="">
                            <div className="mb-5 d-flex">
                                 {/* <CreateUserForm/> */}
                                 </div>
                                    <div className="card-body">
                                        <DataTableComponent tableHead={tableHead} dataTableProps={tprops} />
                                           </div>
                                       </div>
                                   </>
                        )
                        :
                          <>{ usersCard}</>
                          } 
                        </div>
                    </div>
        </MainBody>
        </>
      )
    }
    

export default React.memo(Users)