import React,{FormEvent, useState} from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import RecentPostList from '../../components/RecentPostList'
import PostProps from '@props/PostProps'
import { useGetPostsQuery } from '@dashboard/pages/Post/slices/postApi.slice'
import { useGetCategoriesQuery } from '@dashboard/pages/Category/slices/categoryApi.slice'	
import CategoryProps from '@props/categoryProps'
import useDebounce from '@hooks/useDebounce'


const PostSidebar = ({posts,filterPosts,setPostList, sFormA =false}:{posts:PostProps[],filterPosts:any,setPostList?:any,sFormA?:boolean}) => { 
const [search, setSearch] = useState('')
    const { tags  } = useGetPostsQuery("postsList", {
        selectFromResult: ({ data }) => ({
          tags: Array.from(new Set(
            (data?.ids?.map((id:string)=>data?.entities[id]))
            ?.filter((post:PostProps) => post.status === 'published')
            .flatMap((p:PostProps)=>p?.tags)
            ))	as string[]as string[]	 
        }),
        }) 
        const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

        // console.log(tags) 
     const { category } = useGetCategoriesQuery("categoryList", {
selectFromResult: ({ data }) => ({
  category: data?.ids?.map((id:string)=>data?.entities[id])?.filter((c:CategoryProps) => c?.status === 'active')		 
}),
}) 
const { allPosts } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      allPosts: (data?.ids?.map((id:string)=>data?.entities[id]))?.filter((post:PostProps) => post.status === 'published')		 
    }),
    }) 
const debouncedQuery = useDebounce(search)
const searchPost = (e:FormEvent)=>{
    e.preventDefault()
    if(sFormA){
   navigate(`/our-blog/posts?search=${debouncedQuery}`) 
    }else{
       setPostList(filterPosts(allPosts,debouncedQuery)) 
       setSearchParams({search:debouncedQuery})
     }

}
  return (
    <div
    id="secondary"
    className="widget-area col-lg-4 blog-sidebar"
  >
    <div
      id="search-2"
      className="widget blog-sidebar__box widget_search"
    >
      <div className="searchbox-form">
        <form role="search" onSubmit={searchPost} className="search-form">
          <span className="screen-reader-text">Search for:</span>
          <input
            type="search"
            className="search-field"
            placeholder="Search "
            value={search}
           onChange={(e)=>setSearch(e.target.value)}
            title="Search for:"
          />
          <button type="submit" className="search-submit">
            <span className="icon-magnifying-glass"></span>
          </button>
        </form>
      </div>
    </div>
    <div
      id="finlon_recent_post_widget-2"
      className="widget blog-sidebar__box blog-sidebar__item--posts"
    >
      <h3 className="blog-sidebar__title">Recent Posts</h3>
      <ul className="list-unstyled blog-sidebar__post">
        {  posts?.slice(0,6)?.map((post:PostProps)=><RecentPostList post={post} key={post?.id}/>)}
       
      
      </ul>
    </div>
    <div
      id="categories-2"
      className="widget blog-sidebar__box widget_categories"
    >
      <h3 className="blog-sidebar__title">Categories</h3>
      <ul>
        {
           category?.map((c:CategoryProps,i:number)=> ( 
           <li className={`cat-item cat-item-${i}`} key={c?.id}>
          <a href={`/our-blog/posts?category=${c?.title}`}>
            {c?.title}
          </a>
        </li>) )
        }
       
       
      </ul>
    </div>
    <div
      id="tag_cloud-2"
      className="widget blog-sidebar__box widget_tag_cloud"
    >
      <h3 className="blog-sidebar__title">Tags</h3>
      <div className="tagcloud">
      {
           tags?.map((tag:string,i:number)=> ( 
        <a href={`/our-blog/posts?tag=${tag}`} key={i}
          className={`tag-cloud-link tag-link-${i} tag-link-position-${i}`}
          style={{ fontSize: "8pt" }}
          aria-label={tag}
        > {tag}
        </a>) )
        }
      
       
      </div>
    </div>
  </div>
  )
}

export default React.memo(PostSidebar)