import React from 'react'
import PageProps from '@props/PageProps'
import Breadcrum from '@landing/components/Breadcrum'
import { useGetFaqsQuery } from '@dashboard/pages/Faq/slices/faqApi.slice'
import { FaqProps } from '@props/FaqProps'
import NoResult from '@landing/components/NoResult'

const Faq:React.FC<PageProps> = ({pageData}:PageProps) => {

    const { faqs } = useGetFaqsQuery("faqsList", {
        selectFromResult: ({ data }) => ({
          faqs: (data?.ids?.map((id:string)=>data?.entities[id]))?.filter((c:FaqProps) => c?.status === 'active')		 
        }),
        }) 
        console.log(faqs)
    return (

      <>
  <Breadcrum pageData={pageData}/>


  <section className="faq-grid pt-120 pb-120">
    <div className="container">
        <div className="row row-gutter-y-20">
              { faqs.length ? 
            
            faqs?.map((f:FaqProps)=>(
            <div className="col-lg-6">
                <div className={`accrodion-grp faq-${f?.id}-accrodion`} data-grp-name={`faq-one-accrodion-${f?.id}`}>
                    
                    <div className="accrodion  wow fadeInUp" data-wow-delay="0ms">
                        <div className="accrodion-title">
                            <h4>{f?.question}<span className="accrodion-icon"></span></h4>
                        </div>
                        <div className="accrodion-content">
                            <div className="inner">
                                <p dangerouslySetInnerHTML={{__html:f?.response}}></p>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div> 
            ))
                    
            : <NoResult/> }  
        </div>
    </div>
</section>
{/* <!-- /.faq-grid --> */}
<section className="faq-form pt-120 pb-120">
    <div className="container">
        <div className="block-title text-center">
            <p className="block-title__tagline">contact</p>
            {/* <!-- /.block-title__tagline --> */}
            <h2 className="block-title__title">Feel free to get in touch <br/> with our team</h2>
            {/* <!-- /.block-title__title --> */}
        </div>
        {/* <!-- /.block-title --> */}
        <form className="form-one contact-form-validated">
            <div className="row row-gutter-y-20 row-gutter-20 ">
                <div className="col-md-6">
                    <input type="text" placeholder="Full name" name="name"/>
                </div>
                {/* <!-- /.col-md-6 --> */}
                <div className="col-md-6">
                    <input type="email" placeholder="Email address" name="email"/>
                </div>
                {/* <!-- /.col-md-6 --> */}
                <div className="col-md-6">
                    <input type="text" placeholder="Phone number" name="phone"/>
                </div>
                {/* <!-- /.col-md-6 --> */}
                <div className="col-md-6">
                    <input type="text" placeholder="Subject" name="subject"/>
                </div>
                {/* <!-- /.col-md-6 --> */}
                <div className="col-md-12">
                    <textarea placeholder="Message" name="message"></textarea>
                </div>
                {/* <!-- /.col-md-6 --> */}
                <div className="col-md-12 text-center">
                    <button type="submit" className="thm-btn">Send a Message</button>
                    {/* <!-- /.thm-btn --> */}
                </div>
                {/* <!-- /.col-md-6 --> */}
            </div>
            {/* <!-- /.row --> */}
        </form>
    </div>
    {/* <!-- /.container --> */}
</section>
{/* <!-- /.faq-form --> */}
    </>
  )
}

export default React.memo(Faq)
