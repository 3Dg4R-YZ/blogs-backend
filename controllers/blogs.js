const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', 'username')
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).json({ message: 'user not found' })
    next()
  }
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalido' })
  }

  const user = await User.findById(req.user.id)

  if (!body.title || !body.url) return res.status(400).end()

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: req.user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalido' })
  }
  if (!blog) {
    return res.status(404).json({ error: 'No existe ese blog' })
  }
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  }
  res.status(401).json({ error: 'No esta autorizado' })
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = new Blog(req.body)

  const result = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: 'true'
  })
  res.json(result)
})

module.exports = blogsRouter
