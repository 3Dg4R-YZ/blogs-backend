const listHelper = require('../utils/list_helper')
const { listWithoutBlogs, listWithOneBlog, listWithBlogs } = require('./_data')

describe('most likes', () => {
  test('when list has no blogs', () => {
    const answer = {}
    const result = listHelper.mostLikes(listWithoutBlogs)
    expect(result).toStrictEqual(answer)
  })
  test('when list has only one blog, equals the element', () => {
    const answer = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toStrictEqual(answer)
  })
  test('when list has any amount of blogs', () => {
    const answer = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    const result = listHelper.mostLikes(listWithBlogs)
    expect(result).toStrictEqual(answer)
  })
})
