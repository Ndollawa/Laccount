import React,{useState,useEffect, useTransition} from 'react'
import MainBody from '../../components/MainBody'
import { useDispatch } from 'react-redux'
import { FaListAlt } from 'react-icons/fa'
import { IoGridOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { useGetContactsQuery } from './slices/contactsApi.slice'
import { setPreloader } from '@components/preloader/slices/preloader.slice'
import PageProps from '@props/pageProps'
import ContactsTable from './components/ContactsTable'
import useToggle from '@hooks/useToggle'
import ContactCard from './components/ContactCard'
import { selectCurrentUser } from '@auth/slices/auth.slice'
import contactProps from '@props/contactProps'
import { ModalDataProps } from '@props/modalProps'
import GeneralPreloader from '@components/preloader/GeneralPreloader'

    
    const Contacts = ({pageData}:PageProps)  => {

// const [contacts, setcontacts] = useState<any>([])
    const [viewType,toggleViewType] = useToggle('viewType','List');
    const dispatch =useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const [isPending, startTransition] = useTransition();
    const {
        data:contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery('contactsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
   
        useEffect(() => {
            dispatch(setPreloader(isLoading?true:false)) 
             
            }, [isLoading])

            const [modalData,setModalData] = useState<ModalDataProps<contactProps>["modalData"]>({
                data:null, 
                showModal:false,
                })
          const showEditForm = (modalData:ModalDataProps<contactProps>["modalData"])=>{
                 setModalData(modalData);
                 }
         
          let tableContent
         
let contactsCard
   if(isSuccess && !isLoading){
    const {ids,entities} = contacts
    const userContactId = ids.filter((contactId:string)=> entities[contactId].user === currentUser.id)

contactsCard =  <ContactCard key={userContactId}  contactId={userContactId} />
tableContent = <ContactsTable key={userContactId} contactId={userContactId} showEditForm={showEditForm} />
   }
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
									<h4>Contacts {viewType? "List": "Card"} View</h4>
									<span>All Contacts Record</span>
								</div>
								<button className="btn btn-info light" onClick={setView}>{viewType? <FaListAlt fontSize={'1.2rem'}/> : <IoGridOutline fontSize={'1.2rem'} />}</button>
							</div>
                            </div>
                       {viewType? 
                        (
                            <>  <div className="card">
                            <div className="mb-5 d-flex">
                                               
                                               {/* <CreateContactForm/> */}
                                               </div>
                                    <div className="card-body">
                                       <div className="table-responsive table-scrollable">
                                                   <table id="dataTable" className="table table-striped mt-10 table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
                                                       <thead>
                                                           <tr>
                                                               <th>S/N</th>
                                                               <th>Name</th>
                                                               <th>Username</th>
                                                               <th>Verification Status</th>
                                                               <th>Country</th>
                                                               <th>Account Status</th>
                                                               <th>Date Created</th>
                                                               <th>Action</th>
                                                           </tr>
                                                       </thead>
                                                       <tbody>
                                                          
                                                           
                                               {isPending? <GeneralPreloader/> : tableContent}
                                                       
                                                       </tbody>
                                                   </table>
                                               </div>
                                           </div>
                                       </div>
                                   </>
                        )
                        :
                          <>{ contactsCard}</>
                          } 
                        </div>
                    </div>
        </MainBody>
        </>
      )
    }
    

export default React.memo(Contacts)