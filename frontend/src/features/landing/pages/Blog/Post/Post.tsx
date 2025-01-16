// import React,{useState,FormEvent} from "react";
// import {useParams, useNavigate} from 'react-router-dom'
// import { useSelector } from "react-redux";
// import { useGetPostsQuery } from "@dashboard/pages/Post/slices/postApi.slice";
// // import { useAddNewPostCommentMutation, useGetPostCommentQuery } from "@dashboard/pages/Post/postCommentApiSlice";
// import { useGetUsersQuery } from "@dashboard/pages/Users/slices/usersApi.slice";
// import Breadcrum from "@landing/components/Breadcrum";
// import { selectCurrentUser } from "@auth/slices/auth.slice";
// import useLocalStorage from "@hooks/useLocalStorage";
// import showToast from "@utils/showToast";
// import PostProps from "@props/postProps";
// import PostCommentProps from "@props/postCommentProps";
// import PageProps from "@props/pageProps";
// // import PostComment from "./components/postComment";
// // import PostSidebar from "./components/postSidebar";
// import { filterPosts } from "../Blog";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const Post = ({ pageData }: PageProps) => {
//   const {id} = useParams()
//   const [userInfo] = useLocalStorage('commentUserInfo',{})
// const navigate = useNavigate()
//    const { post } = useGetPostsQuery("postsList", {
//             selectFromResult: ({ data }) => ({
//               post: id && data?.entities[id]		 
//             }),
//             }) 
//             const { posts } = useGetPostsQuery("postsList", {
//               selectFromResult: ({ data }) => ({
//                 posts: (data?.ids?.map((id:string)=>data?.entities[id]))?.filter((post:PostProps) => post.status === 'published')		 
//               }),
//               })    
//    const { postIndex } = useGetPostsQuery("postsList", {
//             selectFromResult: ({ data }) => ({
//               postIndex: id && data?.ids.indexOf(id)
//             }),
//             }) 
//     const { user } = useGetUsersQuery("usersList", {
//       selectFromResult: ({ data }) => ({
//         user: data?.entities[post?.author]	 
//       }),
//       })
      
//       const { postComment } = useGetPostCommentQuery("postCommentsList", {
//         selectFromResult: ({ data }) => ({
//           postComment: data && data.ids.map((id:string) => data?.entities[id]).filter((comment:PostCommentProps) =>comment.postId === post?.id) 
//         }),
//         })
//         const { data } = useGetPostsQuery("postsList");
//         const prevPost = data && postIndex > 0 ? data.entities[data.ids[postIndex - 1]] : null;
//         const nextPost = data && postIndex < data.ids.length - 1 ? data.entities[data.ids[postIndex + 1]] : null;
        
// if(!post) navigate('/error/404')
//   const [email, setEmail] = useState(userInfo?.email || '')
//   const [fullName, setFullName] = useState(userInfo?.fullName || '')
//   const [phone, setPhone] = useState(userInfo?.phone || '')
//   const [comment, setComment] = useState('')
//   const [subject, setSubject] = useState('')
//   const [search, setSearch] = useState('')
//   const [saveInfo, setSaveInfo] = useState(false)
//   const [showCommentForm, setShowCommentForm] = useState(false)

// //    const { services } = useGetServicesQuery("servicesList", {
// //             selectFromResult: ({ data }) => ({
// //               services: data?.ids?.map((id:string)=>data?.entities[id])		 
// //             }),
// //             }) 
// const currentUser = useSelector(selectCurrentUser)

// const [addNewPostComment, {
//   isLoading,
//   isSuccess,
//   isError,
//   error
// }] = useAddNewPostCommentMutation()
// const canSave = [comment,fullName,email,subject].every(Boolean)
// const submitComment = async(e:FormEvent)=>{
//  e.preventDefault() 
//  if(saveInfo){
//   const info = {fullName,email,phone}
//   localStorage.setItem('commentUserInfo',JSON.stringify(info))
//  }
//  await addNewPostComment({
//   comment,
//   postId:post?.id,
//   author:currentUser?.id,
//   authorType:currentUser?.id? 'user': 'guest',
//   fullName:currentUser?.id? currentUser?.fullName: fullName,
//   email:currentUser?.id? currentUser?.email: email,
//   phone:currentUser?.id? currentUser?.phone : phone,
//   subject
// })
// if(isError) return showToast('error', 'Sorry couldn\'t submit post comment.')
// showToast('success','Comment received successfully')
// setShowCommentForm(false)
//       setComment('')
//       setSubject('')
// }
// // console.log(currentUser)
//   return (
//     <>
//       <Breadcrum pageData={pageData} />
//       <section className="blog-details blog-main-page">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-8">
//               <div id="primary" className="site-main layout-right-sidebar">
//                 <article
//                   id={`post-${post?.id}`}
//                   className={`post-${post?.id} post type-post status-${post?.status} format-standard has-post-thumbnail hentry category-finance category-studies tag-education-loan tag-mortage`}
//                 >
//                   <div className="blog-card__image">
//                     <div className="post-thumbnail">
//                       <img
//                         src={BASE_URL+"/uploads/posts/"+post?.coverImage}  
//                         className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
//                         alt={post?.title}/>
//                     </div>
//                   </div>
//                   <div className="blog-card__meta">
//                     <span className="meta-list posted-on">
//                       <i className="far fa-calendar-alt"></i>
//                       <a href="index.html" rel="bookmark">
//                         { (new Date(post?.createdAt!).getUTCDate >=  new Date(post?.updatedAt!).getUTCDate)?
//                         <time
//                           className="entry-date published"
//                           dateTime={post?.createdAt.toString()}
//                         >
//                              {new Date(post?.createdAt!).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })}   
//                         </time>
//                        : <time
//                           className="updated"
//                           dateTime={post?.updatedAt.toString()}
//                         >
//                               {new Date(post?.updatedAt!).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })}   
//                         </time>}
//                       </a>
//                     </span>
//                     <span className="meta-list byline_author">
//                       <i className="far fa-user-circle"></i>
//                       <a className="url fn n" href="#">
//                        {user?.fullName || user?.username}
//                       </a>
//                     </span>
//                     <span className="meta-list blog_comment">
//                       <i className="far fa-comments"></i>
//                       <a href="index.html#respond">{postComment?.length} Comment(s)</a>
//                     </span>
//                   </div>
//                   <div className="entry-content">
//                     <p dangerouslySetInnerHTML={{__html:post?.body}}></p>
                   
//                     <div className="page-list-single"></div>
//                   </div>
//                   <div className="blog-details__meta">
//                     <div className="blog-details__tags">
//                       <span>Tags:</span>
//                       {post?.tags.map((tag:string )=><a href={`/our-blog/posts?tag=${tag}`} key={tag}>
//                         {tag}
//                       </a>)}
//                     </div>
//                     <div className="blog-details__social team-details__social">
//                       <div className="blog-details__social">
                        
//                         <a href="https://twitter.com/intent/tweet?text=http://Education%20Loan%20Quisque%20rhoncus%20massa%20et&amp;url=https://thegenius.co/wp/finlon/live/education-loan-quisque-rhoncus-massa-et/&amp;via=Crunchify">
//                           <i className="fab fa-twitter"></i>
//                         </a>
//                         <a href="https://www.facebook.com/sharer/sharer.php?u=https://thegenius.co/wp/finlon/live/education-loan-quisque-rhoncus-massa-et/">
//                           <i className="fab fa-facebook"></i>
//                         </a>
//                         <a href="https://twitter.com/intent/tweet?text=http://Education%20Loan%20Quisque%20rhoncus%20massa%20et&amp;url=https://thegenius.co/wp/finlon/live/education-loan-quisque-rhoncus-massa-et/&amp;via=Crunchify">
//                           <i className="fab fa-linkedin"></i>
//                         </a>
//                         <a href="https://pinterest.com/pin/create/bookmarklet/?&amp;url=https://thegenius.co/wp/finlon/live/education-loan-quisque-rhoncus-massa-et/&amp;description=http://Education%20Loan%20Quisque%20rhoncus%20massa%20et">
//                           <i className="fab fa-pinterest-p"></i>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="blog-next-prev-main">
//                     <div className="blog-next-prev-box">
//                     <div className={`row ${!prevPost && 'justify-content-end'}`}>
//                    {prevPost &&  
//                    <div className="col-md-6 prev-post">
//                    <div className="single-next-pre-box">
//                       <div className="single-next-pre-inner">
//                         <a href={`/our-blog/posts/${prevPost?.id}`} className="next-link single-post-pre-next-link">
//                           <span>Previous</span></a>
//                         </div>
//                         <a href={`/our-blog/posts/${prevPost?.id}`} title={prevPost?.title} className="post-title">
//                           <span className="single-post-link-title">{prevPost?.title}</span>
//                           </a>
//                      </div>
//                           </div>
//                           }
//                         {nextPost &&  


//                         <div className="col-md-6 next-post">
//                             <div className="single-next-pre-box">
//                               <div className="single-next-pre-inner">
//                                 <a href={`/our-blog/posts/${nextPost?.id}`} className="prev-link single-post-pre-next-link">
//                                   <span>Next</span>
//                                   </a>
//                               </div>
//                               <a href={`/our-blog/posts/${nextPost?.id}`} title={nextPost?.title} className="post-title">
//                                 <span className="single-post-link-title">{nextPost?.title}</span></a>
//                                 </div>
//                                 </div>}
//                   </div>
//                   </div>
//                   </div>
//                 </article>
                
//                 <div className="blog-comment-form">
//                   <div className="contact-one__form form-one">
//                     <div id="comments" className="comments-area">
//                       <h3 className="post-comment__title">{postComment?.length} Comment(s)</h3>
// <ul className="blog-comment" style={{maxHeight:'50rem',overflowY:'scroll',overflowX:'clip',msOverflowY:'scroll',msOverflowX:'clip', scrollBehavior:'smooth'}}>
//   {
//     postComment?.map((pc:PostCommentProps)=><PostComment pc={pc}/>)
//   }
  
//         </ul>                    
//                       <div id="respond" className="comment-respond">
//                         <h3 id="reply-title" className="comment-reply-title"><i className="fa fa-finger-dowm"></i>
//                          <span   onClick={()=>setShowCommentForm(true)}>Leave a Comment</span> 
//                           {showCommentForm && 
//                             <button className="btn-link btn-sm mx-5 btn-primary rounded-pill"
//                               onClick={()=>setShowCommentForm(false)}
//                             >
//                               Cancel reply
//                             </button>}
//                         </h3>
//                      {showCommentForm &&  <><form
//                         onSubmit={submitComment}
//                           id="commentform"
//                           className="comment-form"
//                         >
//                           { !currentUser.id &&
//                            <p className="comment-notes">
//                             <span id="email-notes">
//                               Your email address will not be published.
//                             </span>
//                             <span className="required-field-message">
//                               Required fields are marked
//                               <span className="required">*</span>
//                             </span>
//                           </p>}
//                           <div className="row">
//                           { !currentUser.id &&  <>
//                           <div className="comment-form-author col-lg-6 mb-4">
//                               <input
//                                 id="author"
//                                 placeholder="Full Name *"
//                                 name="author"
//                                 type="text"
//                                 onChange={(e)=>setFullName(e.target.value)}
//                                 className="form-control"
//                                 value={fullName}
//                                 area-required="true"
//                               />
//                             </div>
//                             <div className="comment-form-email col-lg-6 mb-4">
//                               <input
//                                 id="email"
//                                 placeholder="Email Address *"
//                                 name="email"
//                                 type="email"
//                                 onChange={(e)=>setEmail(e.target.value)}
//                                 className="form-control"
//                                 value={email}
//                                 area-required="true"
//                               />
//                             </div>
//                             <div className="comment-form-phone col-lg-6 mb-4">
//                               <input
//                                 id="phone"
//                                 placeholder="Phone No"
//                                 name="phone"
//                                 type="text"
//                                 onChange={(e)=>setPhone(e.target.value)}
//                                 className="form-control"
//                                 value={phone}
//                               />
//                             </div>
//                             </>}
//                             <div className="comment-form-subject col-lg-6 mb-4">
//                               <input
//                                 id="subject"
//                                 placeholder="Subject *"
//                                 name="subject"
//                                 type="text"
//                                 onChange={(e)=>setSubject(e.target.value)}
//                                 className="form-control"
//                                 area-required="true"
//                                 value={subject}
//                               />
//                             </div>
//                             <div className="comment-form-comment col-lg-12 mb-3">
//                               <textarea
//                                 id="comment"
//                                 placeholder="Comment *"
//                                 name="comment"
//                                 value={comment}
//                                 onChange={(e)=>setComment(e.target.value)}
//                                 rows={5}
//                                 area-required="true"
//                               ></textarea>
//                             </div>
//                            { !currentUser.id && <p className="comment-form-cookies-consent">
//                               <input
//                                 id="wp-comment-cookies-consent"
//                                 name="wp-comment-cookies-consent"
//                                 type="checkbox"
//                                 checked={saveInfo}
//                                 onChange={(e)=>setSaveInfo(prev => !prev)}
//                               />
//                               <label htmlFor="wp-comment-cookies-consent mx-3">
//                                 Save my name, email, and website in this browser
//                                 for the next time I comment.
//                               </label>
//                             </p>}
//                           </div>
//                           <div className="row">
//                             <div className="form-submit col-lg-12">
//                               <button
//                                 name="submit"
//                                 type="submit"
//                                 id="submit"
//                                 className="btn-sm thm-btn hover-black"
//                                 disabled={!canSave}
//                               >Post Comment</button>
                        
//                             </div>
//                           </div>
//                         </form>
//                         </>
//                         } 
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//            <PostSidebar posts={posts} sFormA={true} filterPosts={filterPosts} />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default React.memo(Post);
import React from 'react'

const Post = () => {
  return (
    <div>Post</div>
  )
}

export default Post
