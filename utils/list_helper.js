const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes > blog.likes) return favorite
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  }, {})
}

const mostBlogs = (blogs) => {
  // const _ = require('lodash')
  // const count = _.countBy(blogs, 'author')
  const map = new Map()
  blogs.forEach((blog) => {
    map.set(blog.author, map.get(blog.author) ? map.get(blog.author) + 1 : 1)
  })
  let resp = { author: '', blogs: 0 }
  for (const key of map) {
    if (key[1] > resp.blogs) {
      resp = {
        author: key[0],
        blogs: key[1]
      }
    }
  }
  return resp.blogs ? resp : {}
}

const mostLikes = (blogs) => {
  const map = new Map()
  blogs.forEach((blog) => {
    map.set(
      blog.author,
      map.get(blog.author) ? map.get(blog.author) + blog.likes : blog.likes
    )
  })
  let resp = { author: '', likes: 0 }
  for (const key of map) {
    if (key[1] > resp.likes) {
      resp = {
        author: key[0],
        likes: key[1]
      }
    }
  }
  return resp.likes ? resp : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
