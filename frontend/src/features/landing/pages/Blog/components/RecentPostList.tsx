import React from 'react'
import { useGetPostCategoryQuery } from '../../../../dashboard/pages/PostCategory/slices/postCategoryApi.slice'
import { useGetUsersQuery } from '../../../../dashboard/pages/Users/slices/usersApi.slice'
import PostProps from '../../../../../app/props/PostProps'
import { format } from 'timeago.js'
import PostCategoryProps from '../../../../../app/props/PostCategoryProps'

const RecentPostList = ({post}:{post:PostProps}) => {
    const { category } = useGetPostCategoryQuery("categoryList", {
        selectFromResult: ({ data }) => ({
          category: data?.entities[post?.category]	 
        }),
        })
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
          user: data?.entities[post?.author]	 
        }),
        })

  return (
    <li className="blog-sidebar__post__item" key={post?._id}>
    <div className="blog-sidebar__post__image">
      <img
        src={process.env.REACT_APP_BASE_URL+"/uploads/posts/"+post?.coverImage} 
        alt={post?.title}
      />
    </div>
    <div className="blog-sidebar__post__content">
      <span className="meta-list byline_author">
        <i className="far fa-user-circle"></i>
        <a
          className="url fn n"
          href="#">

                  {user?.fullName || user?.username}
        </a>
      </span>
      <h3 className="blog-sidebar__post__title">
        <a href={`/our-blog/posts/${post?._id}`}>
          {post?.title}
        </a>
      </h3>
    </div>
  </li>
   
  )
}

export default React.memo(RecentPostList)