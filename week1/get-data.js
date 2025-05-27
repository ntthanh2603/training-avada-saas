const getData = async link => {
  try {
    const response = await fetch(link)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const URL = 'https://jsonplaceholder.typicode.com'

;(async () => {
  const [users, posts, comments] = await Promise.all([
    getData(`${URL}/users`),
    getData(`${URL}/posts`),
    getData(`${URL}/comments`)
  ])
  // console.log(users)
  // console.log(posts)
  // console.log(comments)

  // 3. Get all the posts and comments from the API. Map the data with the users array. The data format should be like this:
  const require3 = () => {
    const temp = users.map(user => {
      const userPosts = posts
        .filter(post => post.userId === user.id)
        .map(post => {
          return { id: post.id, title: post.title, body: post.body }
        })

      const listPostId = userPosts.map(post => post.id)

      const userComments = comments
        .filter(comment => listPostId.includes(comment.postId))
        .map(comment => {
          return {
            id: comment.id,
            name: comment.name,
            email: comment.email,
            body: comment.body
          }
        })

      return {
        ...user,
        posts: userPosts,
        comments: userComments
      }
    })
    return temp
  }
  // console.log(require3)

  // 5. Reformat the data with the count of comments and posts
  const require5 = () => {
    const resultRequire3 = require3()
    const result = resultRequire3.map(user => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        postCount: user.posts.length,
        commentCount: user.comments.length
      }
    })

    return result
  }
  // console.log(await require5())

  // 4. Filter only users with more than 3 comments.
  const require4 = () => {
    const resultRequire5 = require5()
    return resultRequire5.filter(user => user.commentCount > 3)
  }
  // console.log(require4())

  // 6. Who is the user with the most comments/posts?
  const require6 = () => {
    const resultRequire5 = require5()
    const maxComment = Math.max(
      ...resultRequire5.map(user => user.commentCount)
    )
    const maxPost = Math.max(...resultRequire5.map(user => user.postCount))

    const userComment = resultRequire5.filter(
      user => user.commentCount === maxComment
    )
    const userPost = resultRequire5.filter(user => user.postCount === maxPost)

    return {
      userComment,
      userPost
    }
  }

  // console.log(require6())

  // 7. Sort the list of users by the postsCount value descending?
  const require7 = () => {
    const resultRequire5 = require5()
    return resultRequire5.sort((a, b) => b.postCount - a.postCount)
  }
  // console.log(require7())

  // 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
  const require8 = () => {
    const result = posts.map(post => {
      const postComment = comments.filter(comment => comment.postId === post.id)
      return {
        ...post,
        comments: postComment
      }
    })
    return result
  }
  console.log(require8()[0])
})()
