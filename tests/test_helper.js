const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Edgar Davian',
    url: 'https://geckoshop.net',
    likes: 12
  },
  {
    title: 'A ver si funciona',
    author: 'Edgar Davian',
    url: 'https://geckoshop.net',
    likes: 12
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'A new one' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
