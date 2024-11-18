import React from 'react'
import { useGetCategoriesQuery } from '@dashboard/pages/Category/slices/categoryApi.slice'
import { useGetUsersQuery } from '@dashboard/pages/Users/slices/usersApi.slice'
import { useGetPostCommentQuery } from '@dashboard/pages/Post/postCommentApiSlice'
import PostProps from '@props/postProps'
import PostCommentProps from '@props/postCommentProps'
import CategoryProps from '@props/categoryProps'
const BLOG_ASSETS =  import.meta.env.VITE_BLOG_ASSETS

const PostList = ({post}:{post:PostProps}) => {
    const { category } = useGetCategoriesQuery("categoryList", {
        selectFromResult: ({ data }) => ({
          category: data?.entities[post?.category]	 
        }),
        })
   
        const { postComment } = useGetPostCommentQuery("postCommentsList", {
            selectFromResult: ({ data }) => ({
              postComment: data && data.ids.map((id:string) => data?.entities[id]).filter((comment:PostCommentProps) =>comment.status === 'active')	 
            }),
            })
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
          user: data?.entities[post?.author]	 
        }),
        })

  return (

    <div className="col-lg-4 col-md-12 col-sm-12" key={post?.id}>
    <div className="blog-card">
      <div className="blog-card__image">
        <div className="blog-card__date">
          <span>{new Date(user.updatedAt).toLocaleString('en-US', { day: 'numeric'})}</span>{new Date(user.createdAt).toLocaleString('en-US', {month: 'short'})}
        </div>
        <a href={`/our-blog/posts/${post?.id}`}>
        <img
          decoding="async"
            src={BLOG_ASSETS+post?.image} alt={post?.title}
          className="img-fluid"

        /></a>
      </div>
      <div className="blog-card__content">
        <div className="blog-card__meta">
          
          <span className="meta-list byline_author">
            <i className="far fa-user-circle"></i>
            <a
              className="url fn n"
              href="#"
            >
             {user?.fullName || user?.username}
            </a>
          </span>
          <span className="meta-list blog_comment">
            
            <i className="far fa-comments"></i>
            <a href={`/our-blog/posts/${post?.id}`}>
             {postComment?.length} Comment(s)
            </a>
          </span>
        </div>
        <h3 className="blog-card__title">
          <a href={`/our-blog/posts/${post?.id}`}>
            {post?.title}
          </a>
        </h3>
        <p className="blog-card__text" dangerouslySetInnerHTML={{__html:post?.description || (post?.body.length > 100)? post?.body?.substring(0,100)+"..." : post?.body?.substring(0,100)}}>
        </p>
        <a
          href={`/our-blog/posts/${post?.id}`}
          className="blog-card__link"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
   
  )
}

export default React.memo(PostList)