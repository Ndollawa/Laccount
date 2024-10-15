    import React,{useState,useEffect, useTransition} from 'react'
    import MainBody from '../../components/MainBody'
    import CreateFaqModal from './components/CreateMailerForm'
    import EditMailerForm from './components/EditMailerForm'
    import { useDispatch, useSelector } from 'react-redux'
    import { setPreloader } from '../../../components/preloader/slices/preloader.slice'
    import PageProps from '../../../../app/props/PageProps'
    import MailerTableData from './components/MailerTableData'
    import initDataTables,{destroyDataTables} from '../../../../app/utils/initDataTables'
    import $ from 'jquery'
    import {HomeMailer} from '../../../../app/props/settingsProps'
import { useLandingConfig } from '../Settings/slices/settings.slice'
import { ModalDataProps } from '../../../../app/props/modalProps'


    const Mailer = ({pageData}:PageProps)  => {
        const { id, settings: {mailerrs, ...otherSettings } = {} } = useSelector(useLandingConfig);
     const [modalData,setModalData] = useState<ModalDataProps<HomeMailer>["modalData"]>({
            data:null, 
            showModal:false,
           })
           const [isPending, startTransition] = useTransition();
          
    const showEditForm = (modalData:ModalDataProps<HomeMailer>["modalData"])=>{
        setModalData(modalData);
        }

useEffect(() => {
 startTransition(() => {
 destroyDataTables($('#dataTable'))
initDataTables($('#dataTable'),"All Mailers")       
     });

return () => {
destroyDataTables($('#dataTable'))
}
}, [mailerrs])


       
        const tableContent = mailerrs?.length
            ? mailerrs.map((mailer:HomeMailer ,i:number) =><MailerTableData key={mailer.id} mailer={mailer} index={i} showEditForm={showEditForm} />) 
            : null
    
     return (
        <>
        <MainBody>
        <div className="container-fluid">
            <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">All Mailers</h4>
                                </div>
                                <div className="card-body">
    
                                    <div className="mb-5 d-flex">
                                    
                        <CreateFaqModal/>
                                    </div>
                            <EditMailerForm modalData={modalData} />
                            <div className="table-responsive table-scrollable">
                                        <table id="dataTable" className="table table-striped mt-10 table-bordered table-hover table-checkable order-column valign-middle border mb-0 align-items-centerid" style={{minWidth: '845px'}}>
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Sub Heading</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                               
                                               {tableContent}
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div>
        </MainBody>
        </>
      )
    }
    

export default React.memo(Mailer)