    import React,{useState,useEffect} from 'react'
    import MainBody from '../../components/MainBody'
    import CreateFaqModal from './components/CreateSlideForm'
    import EditSlideForm from './components/EditSlideForm'
    import { useDispatch, useSelector } from 'react-redux'
    import { setPreloader } from '../../../components/preloader/slices/preloader.slice'
    import pageProps from '../../../../app/props/pageProps'
    import SlideTableData from './components/SlideTableData'
    import initDataTables,{destroyDataTables} from '../../../../app/utils/initDataTables'
    import $ from 'jquery'
    import {HomeSlide} from '../../../../app/props/settingsProps'
import { useLandingConfig } from '../Settings/slices/settings.slice'
import { ModalDataProps } from '../../../../app/props/modalProps'


    const Slide = ({pageData}:pageProps)  => {
        const { id, settings: {sliders, ...otherSettings } = {} } = useSelector(useLandingConfig);
     const [modalData,setModalData] = useState<ModalDataProps<HomeSlide>["modalData"]>({
            data:null, 
            showModal:false,
           })
    
    const showEditForm = (modalData:ModalDataProps<HomeSlide>["modalData"])=>{
        setModalData(modalData);
        }

useEffect(() => {

destroyDataTables($('#dataTable'))
initDataTables($('#dataTable'),"All Slides")
return () => {
destroyDataTables($('#dataTable'))
}
}, [sliders])


       
        const tableContent = sliders?.length
            ? sliders.map((slide:HomeSlide ,i:number) =><SlideTableData key={slide.id} slide={slide} index={i} showEditForm={showEditForm} />) 
            : null
    
     return (
        <>
        <MainBody>
        <div className="container-fluid">
            <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">All Slides</h4>
                                </div>
                                <div className="card-body">
    
                                    <div className="mb-5 d-flex">
                                    
                        <CreateFaqModal/>
                                    </div>
                            <EditSlideForm modalData={modalData} />
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
    

export default React.memo(Slide)