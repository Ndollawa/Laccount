import React from 'react'
import { useGetCategoriesQuery } from '@dashboard/pages/Category/slices/categoryApi.slice'
import { useGetUsersQuery } from '@dashboard/pages/Users/slices/usersApi.slice'
import { useGetPostCommentQuery } from '@dashboard/pages/Post/postCommentApiSlice'
import PostProps from '@props/postProps'
import CategoryProps from '@props/categoryProps'
import PostCommentProps from '@props/postCommentProps'
const BLOG_ASSETS =  import.meta.env.VITE_BLOG_ASSETS

const PostList = ({post}:{post:PostProps}) => {
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
    const { postComment } = useGetPostCommentQuery("postCommentsList", {
        selectFromResult: ({ data }) => ({
          postComment: data && data.ids.map((id:string) => data?.entities[id]).filter((comment:PostCommentProps) =>comment.postId === post?.id)	 
        }),
        })

  return (
    <div className="col-lg-12 single-post-item mb-5" key={post?.id}>
    <article
      id={`post-${post?.id}`}
      className="post type-post status-publish format-standard has-post-thumbnail hentry category-finance category-studies tag-education-loan tag-mortage"
    >
      <div className="blog-card">
        <div className="blog-card__image">
          <a
            href={`/our-blog/${post?.id}`}
            rel="bookmark"
          > <img src={BLOG_ASSETS+post?.image} alt={post?.title} />
         </a>
        </div>
        <div className="blog-card__content">
          <div className="blog-top">
            <div className="blog-card__meta">
              
              <span className="meta-list posted-on">
                <i className="far fa-calendar-alt"></i>
                <a
                  href={`/our-blog/${post?.id}`}
                  rel="bookmark"
                >{
                  (new Date(post?.createdAt!).getUTCDate >=  new Date(post?.updatedAt!).getUTCDate)?
                  <time
                    className="entry-date published"
                    dateTime={post?.createdAt?.toString()}
                  >
                  {new Date(post?.createdAt!).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })}                                   
                   </time>
                   :
                   <time
                          className="updated"
                          dateTime={post?.updatedAt!.toString()}
                        >
                          {new Date(post?.updatedAt!).toLocaleString('en-US', { day: 'numeric', month: 'long', year:'numeric' })}
                        </time>
                        }
                 </a>
              </span>
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
              <a
                href={`/our-blog/posts/${post?.id}`}
                rel="bookmark"
              >
                {post?.title}
              </a>
            </h3>
          </div>
          <div className="blog-dec">
            <p dangerouslySetInnerHTML={{__html:post?.description || (post?.body.length > 100)? post?.body?.substring(0,100)+"..." : post?.body?.substring(0,100)}}></p>
          </div>
          <div className="blog-card-bottom">
            <div className="blog-card-bottom-btn">
              
              <a
                href={`/our-blog/posts/${post?.id}`}
                className="blog-card-btn-link"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
  )
}

export default React.memo(PostList)