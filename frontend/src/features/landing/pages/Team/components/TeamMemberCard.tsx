import React from 'react'
import TeamProps from '@props/teamProps'
const TEAM_ASSETS = import.meta.env.VITE_TEAM_ASSETS;

const TeamMemberCard = ({member:t}:{member:TeamProps}) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="000ms">
                <div className="team-card">
                    <div className="team-card__image">
                        <img src={TEAM_ASSETS+t?.image} alt={`${t?.firstName} ${t?.lastName} `}/>
                        <div className="team-card__social">
                          
                            {t?.socialMedia &&<>
                                {t?.socialMedia?.twitterHandle &&   <a href={t?.socialMedia?.twitterHandle}><i className="fab fa-twitter"></i></a>}
                                {t?.socialMedia.facebookHandle && <a href={t?.socialMedia.facebookHandle}><i className="fab fa-facebook"></i></a>}
                                {t?.socialMedia.whatsapp && <a href={t?.socialMedia.whatsapp}><i className="fab fa-pinterest"></i></a>}
                                {t?.socialMedia.instagram && <a href={t?.socialMedia.instagram}><i className="fab fa-instagram"></i></a>}

                            </>}
                          
                            
                            
                            
                        </div>
                        {/* <!-- /.team-card__social --> */}
                    </div>
                    {/* <!-- /.team-card__image --> */}
                    <div className="team-card__content">
                        <div className="team-card__content__inner">
                            <h3 className="team-card__title"><a href={`/our-team/${t.id}`}>{t?.firstName} {t?.lastName}</a></h3>
                            <p className="team-card__designation">{t?.position}</p>
                        </div>
                        {/* <!-- /.team-card__content__inner --> */}
                    </div>
                    {/* <!-- /.team-card__content --> */}
                </div>
                {/* <!-- /.team-card --> */}
            </div>

                
  )
}

export default TeamMemberCard