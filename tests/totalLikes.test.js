const listHelper = require('../utils/list_helper')

const { listWithoutBlogs, listWithOneBlog, listWithBlogs } = require('./_data')

describe('total likes', () => {
  test('when list has no blogs', () => {
    const result = listHelper.totalLikes(listWithoutBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has any amount of blogs', () => {
    const result = listHelper.totalLikes(listWithBlogs)
    expect(result).toBe(36)
  })
})
