const listHelper = require('../utils/list_helper')
const { listWithoutBlogs, listWithOneBlog, listWithBlogs } = require('./_data')

describe('favorite blog', () => {
  test('when list has no blogs', () => {
    const answer = {}
    const result = listHelper.favoriteBlog(listWithoutBlogs)
    expect(result).toStrictEqual(answer)
  })
  test('when list has only one blog, equals the element', () => {
    const answer = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toStrictEqual(answer)
  })
  test('when list has any amount of blogs', () => {
    const answer = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.favoriteBlog(listWithBlogs)
    expect(result).toStrictEqual(answer)
  })
})
