import { IHomeBlogs, IGetHomeBlogsType, GET_HOME_BLOGS, IGetBlogsCategoryType } from '../types/blogTypes'

const blogsReducer = (state: IHomeBlogs[] = [], action: IGetHomeBlogsType): IHomeBlogs[] => {
  switch (action.type) {
    case GET_HOME_BLOGS:
      return action.payload

    default:
      return state
  }
}

export default blogsReducer
