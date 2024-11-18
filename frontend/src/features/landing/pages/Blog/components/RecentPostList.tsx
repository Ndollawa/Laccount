import React from 'react'
import { useGetCategoriesQuery } from '@dashboard/pages/Category/slices/categoryApi.slice'
import { useGetUsersQuery } from '@dashboard/pages/Users/slices/usersApi.slice'
import PostProps from '@props/postProps'
import { format } from 'timeago.js'
import CategoryProps from '@props/categoryProps'
const BLOG_ASSETS =  import.meta.env.VITE_BLOG_ASSETS

const RecentPostList = ({post}:{post:PostProps}) => {
    const { category } = useGetCategoriesQuery("categoryList", {
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
    <li className="blog-sidebar__post__item" key={post?.id}>
    <div className="blog-sidebar__post__image">
      <img
        src={BLOG_ASSETS+post?.image} 
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
        <a href={`/our-blog/posts/${post?.id}`}>
          {post?.title}
        </a>
      </h3>
    </div>
  </li>
   
  )
}

export default React.memo(RecentPostList)