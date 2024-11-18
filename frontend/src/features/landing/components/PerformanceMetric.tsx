import React from 'react'

const PerformanceMetric = () => {
  return (
    <section className="fact-one pt-140 pb-100">
    <div className="container">
        <div className="row row-gutter-y-30">
            <div className="col-lg-3 col-md-6">
                <div className="fact-one__item">
                    <div className="fact-one__count">
                        <span className="count-box">
                            <span className="count-text" data-stop="90" data-speed="1500"></span>
                        </span>%
                    </div>
                     {/* <!-- /.fact-one__count --> */}
                    <h3 className="fact-one__title">Successful Transactions</h3>
                     {/* <!-- /.fact-one__title --> */}
                </div>
                 {/* <!-- /.fact-one__item --> */}
            </div>
             {/* <!-- /.col-lg-3 col-md-6 --> */}
            <div className="col-lg-3 col-md-6">
                <div className="fact-one__item">
                    <div className="fact-one__count">$<span className="count-box">
                            <span className="count-text" data-stop="90" data-speed="1500"></span>
                        </span>k</div>
                         {/* <!-- /.fact-one__count --> */}
                    <h3 className="fact-one__title">Payments</h3>
                     {/* <!-- /.fact-one__title --> */}
                </div>
                 {/* <!-- /.fact-one__item --> */}
            </div>
             {/* <!-- /.col-lg-3 col-md-6 --> */}
            <div className="col-lg-3 col-md-6">
                <div className="fact-one__item">
                    <div className="fact-one__count"><span className="count-box">
                            <span className="count-text" data-stop="90" data-speed="1500"></span>
                        </span>k</div>
                         {/* <!-- /.fact-one__count --> */}
                    <h3 className="fact-one__title">Happy Customers</h3>
                     {/* <!-- /.fact-one__title --> */}
                </div>
                 {/* <!-- /.fact-one__item --> */}
            </div>
             {/* <!-- /.col-lg-3 col-md-6 --> */}
            <div className="col-lg-3 col-md-6">
                <div className="fact-one__item">
                    <div className="fact-one__count"><span className="count-box">
                            <span className="count-text" data-stop="290" data-speed="1500"></span>
                        </span>
                         {/* <!-- /.count-box --> */}
                    </div>
                     {/* <!-- /.fact-one__count --> */}
                    <h3 className="fact-one__title">Expert People</h3>
                     {/* <!-- /.fact-one__title --> */}
                </div>
                 {/* <!-- /.fact-one__item --> */}
            </div>
             {/* <!-- /.col-lg-3 col-md-6 --> */}
        </div>
         {/* <!-- /.row --> */}
    </div>
     {/* <!-- /.container --> */}
</section>
  )
}

export default PerformanceMetric