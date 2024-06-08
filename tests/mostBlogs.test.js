const listHelper = require('../utils/list_helper')
const { listWithoutBlogs, listWithOneBlog, listWithBlogs } = require('./_data')

describe('most blog', () => {
  test('when list has no blogs', () => {
    const answer = {}
    const result = listHelper.mostBlogs(listWithoutBlogs)
    expect(result).toStrictEqual(answer)
  })
  test('when list has only one blog, equals the element', () => {
    const answer = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toStrictEqual(answer)
  })
  test('when list has any amount of blogs', () => {
    const answer = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(listWithBlogs)
    expect(result).toStrictEqual(answer)
  })
})
