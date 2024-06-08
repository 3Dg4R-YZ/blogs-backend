const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const server = require('../index')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  // parallel
  // const blogsObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  // const promises = blogsObjects.map((blog) => blog.save())
  // await Promise.all(promises)

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 15000)

test('server is on', async () => {
  await api.get('/').expect(200).expect('<h1>Hola Mundo</h1>')
})

test.skip('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.skip('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test.skip('one blog is titled as HTML is easy', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map((e) => e.title)
  expect(titles).toContain('HTML is easy')
})

// POST

test.skip('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Testing Post',
    author: 'Peter Parker',
    url: 'https://spiderman.com',
    likes: 500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((r) => r.title)
  expect(titles).toContain(newBlog.title)
})

test.skip('a valid blog has 0 likes by default', async () => {
  const newBlog = {
    title: 'Testing Likes',
    author: 'Carlos Chang',
    url: 'https://elchino.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find((r) => r.title === 'Testing Likes')
  expect(blog.likes).toBe(0)
})

test('an invalid blog cannot be created', async () => {
  const newBlog = {
    title: 'Testing whithout url',
    author: 'Andy Martinez'
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map((r) => r.title)
  expect(titles).not.toContain(newBlog.title)
})

// GET BY ID

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resultBlog.body).toStrictEqual(blogToView)
})

// DELETE

test('a blog can be deleted', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToDelete = blogAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map((r) => r.title)

  expect(titles).not.toContain(blogToDelete.title)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
